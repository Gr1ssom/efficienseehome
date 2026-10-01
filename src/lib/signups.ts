/*
 * Early-access / meeting sign-ups go to the `early_access_signups` table in
 * Supabase. The key below is the project's publishable key: it is meant to be
 * public, and the table only allows inserts (nobody can read rows through it).
 */
const SUPABASE_URL = 'https://wywrpegovbmnbrtqwyyy.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_QT8tT0YxmSftFGTd4XVVUg_B3liXz4l'

/** Google Calendar appointment page for booking a meeting. */
export const BOOKING_URL = 'https://calendar.app.google/7wPj6n5qL6PGE7caA'

export interface Signup {
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  facility_type?: string
  interests: string[]
  wants_meeting: boolean
  notes?: string
  source?: string
}

export async function submitSignup(signup: Signup): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/early_access_signups`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(signup),
  })
  if (!res.ok) {
    throw new Error(`Sign-up failed (${res.status})`)
  }
}
