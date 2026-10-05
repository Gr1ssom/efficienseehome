// notify-signup — emails each new website sign-up (early_access_signups) to Efficiensee.
//
// Called by the database trigger `notify_early_access_signup` after every insert,
// with body { "id": "<row uuid>" }. The function loads the row itself and claims it
// by setting notified_at, so calling it directly can only ever re-send nothing:
// each real sign-up is emailed once.
//
// Configuration:
//   Resend API key     read from Supabase Vault (secret name 'resend_api_key') through the
//                      service-role-only RPC get_signup_email_key(); an RESEND_API_KEY
//                      Edge Function secret, if set, takes precedence.
//   SIGNUP_EMAIL_TO    optional — defaults to dylan@efficiensee.io
//   SIGNUP_EMAIL_FROM  optional — defaults to Resend's test sender, which only delivers
//                      to the email address that owns the Resend account. After verifying
//                      efficiensee.io in Resend, set e.g. "Efficiensee <signups@efficiensee.io>".
import { createClient } from 'npm:@supabase/supabase-js@2'

const TO = Deno.env.get('SIGNUP_EMAIL_TO') ?? 'dylan@efficiensee.io'
const FROM = Deno.env.get('SIGNUP_EMAIL_FROM') ?? 'Efficiensee website <onboarding@resend.dev>'

const INTERESTS: Record<string, string> = {
  early_access_v2: 'Early access to HarvestHub V2',
  info_meeting: 'Informational meeting when available',
  v1_demo: 'Live walkthrough of HarvestHub today',
}

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method !== 'POST') return json(405, { error: 'POST only' })

  const { id } = await req.json().catch(() => ({}))
  if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id)) return json(400, { error: 'id required' })

  const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  const apiKey = Deno.env.get('RESEND_API_KEY') ?? (await db.rpc('get_signup_email_key')).data
  if (!apiKey) return json(500, { error: 'Resend API key not configured' })

  // Claim the row: only a sign-up that has not been emailed yet is sent.
  const { data: row, error } = await db
    .from('early_access_signups')
    .update({ notified_at: new Date().toISOString() })
    .eq('id', id)
    .is('notified_at', null)
    .select()
    .maybeSingle()
  if (error) return json(500, { error: error.message })
  if (!row) return json(200, { skipped: true })

  const interests = (row.interests ?? []).map((i: string) => INTERESTS[i] ?? i)
  const rows: [string, string][] = [
    ['Name', row.name],
    ['Email', row.email],
    ['Phone', row.phone],
    ['Company', row.company],
    ['Role', row.role],
    ['Facility type', row.facility_type],
    ['Interested in', interests.join(', ')],
    ['Wants a meeting', row.wants_meeting ? 'Yes' : 'No'],
    ['Notes', row.notes],
    ['Source', row.source],
    ['Submitted', new Date(row.created_at).toLocaleString('en-US', { timeZone: 'America/Chicago' }) + ' CT'],
  ].filter(([, v]) => v !== null && v !== undefined && v !== '') as [string, string][]

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#111a13">
      <h2 style="margin:0 0 12px">New early-access sign-up</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td style="color:#6b746c;vertical-align:top">${esc(k)}</td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}
      </table>
      <p style="color:#6b746c;font-size:13px;margin-top:16px">Reply to this email to answer ${esc(row.name)} directly.</p>
    </div>`
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: row.email,
      subject: `New sign-up: ${row.name}${row.company ? ` (${row.company})` : ''}`,
      html,
      text,
    }),
  })

  if (!res.ok) {
    // Release the claim so the sign-up can be re-sent once the problem is fixed.
    await db.from('early_access_signups').update({ notified_at: null }).eq('id', id)
    return json(502, { error: 'email failed', status: res.status, detail: await res.text() })
  }

  return json(200, { sent: true })
})
