revoke all on table public.profiles, public.printers, public.materials, public.quotes, public.feedback, public.quote_usage_monthly from anon;

revoke all on table public.feedback from authenticated;
grant select, insert on table public.feedback to authenticated;

revoke all on table public.printers from authenticated;
grant select, insert, update, delete on table public.printers to authenticated;

revoke all on table public.materials from authenticated;
grant select, insert, update, delete on table public.materials to authenticated;

revoke all on table public.quotes from authenticated;
grant select, insert, delete on table public.quotes to authenticated;

revoke all on table public.quote_usage_monthly from authenticated;
grant select on table public.quote_usage_monthly to authenticated;

revoke all on table public.profiles from authenticated;
grant select on table public.profiles to authenticated;
grant update (currency, electricity_rate, labor_hourly) on table public.profiles to authenticated;

revoke all on function public.enforce_free_quote_limit() from authenticated, anon, public;
