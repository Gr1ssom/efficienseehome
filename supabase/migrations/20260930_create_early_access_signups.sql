-- Applied to Supabase project wywrpegovbmnbrtqwyyy (bolt-native-database-67568152).
-- Marketing-site sign-ups (efficiensee website "Get early access" form).
-- The public site can only insert; nobody can read rows through the API.
create table if not exists public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text check (phone is null or char_length(phone) <= 40),
  company text check (company is null or char_length(company) <= 160),
  role text check (role is null or char_length(role) <= 120),
  facility_type text check (facility_type is null or char_length(facility_type) <= 60),
  interests text[] not null default '{}' check (cardinality(interests) <= 6),
  wants_meeting boolean not null default false,
  notes text check (notes is null or char_length(notes) <= 2000),
  source text check (source is null or char_length(source) <= 60)
);

alter table public.early_access_signups enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'early_access_signups' and policyname = 'Public can submit sign-ups'
  ) then
    create policy "Public can submit sign-ups"
      on public.early_access_signups
      for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;

revoke all on public.early_access_signups from anon, authenticated;
grant insert on public.early_access_signups to anon, authenticated;
