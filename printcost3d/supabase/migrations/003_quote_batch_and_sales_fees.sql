alter table public.quotes
  add column if not exists quantity integer not null default 1,
  add column if not exists commission_rate numeric(6,2) not null default 0,
  add column if not exists fixed_fee numeric(12,2) not null default 0,
  add column if not exists sales_fee numeric(12,2) not null default 0,
  add column if not exists unit_price numeric(12,2) not null default 0;

update public.quotes
set unit_price = suggested_price
where unit_price = 0;

alter table public.quotes
  drop constraint if exists quotes_quantity_check,
  add constraint quotes_quantity_check check (quantity >= 1),
  drop constraint if exists quotes_commission_rate_check,
  add constraint quotes_commission_rate_check check (commission_rate >= 0 and commission_rate < 100),
  drop constraint if exists quotes_fixed_fee_check,
  add constraint quotes_fixed_fee_check check (fixed_fee >= 0),
  drop constraint if exists quotes_sales_fee_check,
  add constraint quotes_sales_fee_check check (sales_fee >= 0),
  drop constraint if exists quotes_unit_price_check,
  add constraint quotes_unit_price_check check (unit_price >= 0);
