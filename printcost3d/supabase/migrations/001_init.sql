-- PrintCost 3D SaaS schema
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  plan text not null default 'free' check (plan in ('free','pro','business')),
  currency text not null default 'UYU' check (currency in ('UYU','USD')),
  electricity_rate numeric(12,4) not null default 11.5,
  labor_hourly numeric(12,2) not null default 250,
  mp_subscription_id text unique,
  mp_status text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.printers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  hourly_cost numeric(12,2) not null default 0,
  watts numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  kg_price numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  client_name text,
  printer_id uuid references public.printers(id) on delete set null,
  material_id uuid references public.materials(id) on delete set null,
  grams numeric(12,2) not null,
  print_hours numeric(12,2) not null,
  labor_minutes numeric(12,2) not null default 0,
  extras numeric(12,2) not null default 0,
  failure_rate numeric(6,2) not null default 0,
  margin_rate numeric(6,2) not null,
  round_to numeric(12,2) not null default 1,
  material_cost numeric(12,2) not null,
  machine_cost numeric(12,2) not null,
  electricity_cost numeric(12,2) not null,
  labor_cost numeric(12,2) not null,
  failure_reserve numeric(12,2) not null,
  total_cost numeric(12,2) not null,
  suggested_price numeric(12,2) not null,
  profit numeric(12,2) not null,
  currency text not null default 'UYU',
  created_at timestamptz not null default now()
);

create index if not exists quotes_user_created_idx on public.quotes(user_id, created_at desc);
create index if not exists printers_user_idx on public.printers(user_id);
create index if not exists materials_user_idx on public.materials(user_id);

alter table public.profiles enable row level security;
alter table public.printers enable row level security;
alter table public.materials enable row level security;
alter table public.quotes enable row level security;

create policy "profiles select own row" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "profiles update own row" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "printers own rows" on public.printers for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "materials own rows" on public.materials for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "quotes own rows" on public.quotes for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Users may edit workshop cost settings, but billing fields and plan cannot be self-promoted.
revoke update on public.profiles from authenticated;
grant update (currency, electricity_rate, labor_hourly) on public.profiles to authenticated;
grant select on public.profiles to authenticated;
grant select, insert, update, delete on public.printers to authenticated;
grant select, insert, update, delete on public.materials to authenticated;
grant select, insert, update, delete on public.quotes to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email) values (new.id, new.email);
  insert into public.printers (user_id, name, hourly_cost, watts) values (new.id, 'Bambu Lab A1', 18, 100);
  insert into public.materials (user_id, name, kg_price) values (new.id, 'PLA', 700);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.enforce_free_quote_limit()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  current_plan text;
  monthly_count integer;
begin
  select plan into current_plan from public.profiles where id = new.user_id;
  if coalesce(current_plan, 'free') = 'free' then
    select count(*) into monthly_count
    from public.quotes
    where user_id = new.user_id
      and created_at >= date_trunc('month', now());
    if monthly_count >= 5 then
      raise exception 'FREE PLAN QUOTE LIMIT REACHED';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists quotes_free_limit on public.quotes;
create trigger quotes_free_limit before insert on public.quotes for each row execute procedure public.enforce_free_quote_limit();

-- Trigger functions are not public API endpoints.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.enforce_free_quote_limit() from public, anon, authenticated;
