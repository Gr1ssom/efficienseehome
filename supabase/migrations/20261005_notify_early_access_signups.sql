-- Applied to Supabase project wywrpegovbmnbrtqwyyy (bolt-native-database-67568152).
-- Emails each new website sign-up via the notify-signup Edge Function
-- (supabase/functions/notify-signup). The Resend API key is stored in Vault as
-- 'resend_api_key' (not in this file) and read by the function through
-- get_signup_email_key(), which only the service role may call.

create extension if not exists pg_net;

alter table public.early_access_signups add column if not exists notified_at timestamptz;

create or replace function public.get_signup_email_key()
returns text
language sql
security definer
set search_path = ''
as $$
  select decrypted_secret from vault.decrypted_secrets where name = 'resend_api_key' limit 1;
$$;
revoke all on function public.get_signup_email_key() from public, anon, authenticated;
grant execute on function public.get_signup_email_key() to service_role;

create or replace function public.notify_early_access_signup()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  perform net.http_post(
    url := 'https://wywrpegovbmnbrtqwyyy.supabase.co/functions/v1/notify-signup',
    body := jsonb_build_object('id', new.id),
    headers := '{"Content-Type": "application/json"}'::jsonb,
    timeout_milliseconds := 10000
  );
  return new;
exception when others then
  -- Never block a sign-up because the notification could not be queued.
  raise warning 'notify_early_access_signup: %', sqlerrm;
  return new;
end;
$$;
revoke all on function public.notify_early_access_signup() from public, anon, authenticated;

drop trigger if exists early_access_signups_notify on public.early_access_signups;
create trigger early_access_signups_notify
  after insert on public.early_access_signups
  for each row execute function public.notify_early_access_signup();
