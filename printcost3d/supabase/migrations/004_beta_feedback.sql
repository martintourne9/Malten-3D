create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null default 'idea' check (type in ('idea','bug','other')),
  message text not null check (char_length(message) between 3 and 2000),
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;

grant select, insert on public.feedback to authenticated;

drop policy if exists "Users can read own feedback" on public.feedback;
create policy "Users can read own feedback"
on public.feedback for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can create own feedback" on public.feedback;
create policy "Users can create own feedback"
on public.feedback for insert
to authenticated
with check ((select auth.uid()) = user_id);

create index if not exists feedback_user_id_created_at_idx
on public.feedback(user_id, created_at desc);
