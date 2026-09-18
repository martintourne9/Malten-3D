
alter table public.quotes
  add column if not exists printer_name_snapshot text,
  add column if not exists material_name_snapshot text;

update public.quotes q set printer_name_snapshot=p.name
from public.printers p where q.printer_id=p.id and q.printer_name_snapshot is null;

update public.quotes q set material_name_snapshot=m.name
from public.materials m where q.material_id=m.id and q.material_name_snapshot is null;

alter table public.quotes drop constraint if exists quotes_printer_id_fkey;
alter table public.quotes add constraint quotes_printer_id_fkey
foreign key (printer_id) references public.printers(id) on delete set null;

alter table public.quotes drop constraint if exists quotes_material_id_fkey;
alter table public.quotes add constraint quotes_material_id_fkey
foreign key (material_id) references public.materials(id) on delete set null;

create table if not exists public.quote_usage_monthly (
  user_id uuid not null references auth.users(id) on delete cascade,
  month_start date not null,
  created_count integer not null default 0 check (created_count >= 0),
  primary key (user_id, month_start)
);
alter table public.quote_usage_monthly enable row level security;
grant select on public.quote_usage_monthly to authenticated;
drop policy if exists "Users can read own quote usage" on public.quote_usage_monthly;
create policy "Users can read own quote usage" on public.quote_usage_monthly
for select to authenticated using ((select auth.uid()) = user_id);

insert into public.quote_usage_monthly (user_id, month_start, created_count)
select user_id,date_trunc('month',created_at)::date,count(*)::integer
from public.quotes group by user_id,date_trunc('month',created_at)::date
on conflict (user_id,month_start) do update
set created_count=greatest(public.quote_usage_monthly.created_count,excluded.created_count);

create or replace function public.enforce_free_quote_limit()
returns trigger language plpgsql security definer set search_path=public
as $function$
declare
  current_plan text;
  new_count integer;
  usage_month date := date_trunc('month', now())::date;
begin
  insert into public.quote_usage_monthly(user_id,month_start,created_count)
  values(new.user_id,usage_month,1)
  on conflict(user_id,month_start)
  do update set created_count=public.quote_usage_monthly.created_count+1
  returning created_count into new_count;

  select plan into current_plan from public.profiles where id=new.user_id;

  if coalesce(current_plan,'free')='free' and new_count>5 then
    raise exception 'FREE PLAN QUOTE LIMIT REACHED';
  end if;
  return new;
end;
$function$;

revoke all on function public.enforce_free_quote_limit() from public;
revoke all on function public.enforce_free_quote_limit() from anon;
revoke all on function public.enforce_free_quote_limit() from authenticated;
