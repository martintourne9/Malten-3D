alter table public.profiles
  drop constraint if exists profiles_electricity_rate_nonnegative,
  add constraint profiles_electricity_rate_nonnegative check (electricity_rate >= 0),
  drop constraint if exists profiles_labor_hourly_nonnegative,
  add constraint profiles_labor_hourly_nonnegative check (labor_hourly >= 0);

alter table public.printers
  drop constraint if exists printers_hourly_cost_nonnegative,
  add constraint printers_hourly_cost_nonnegative check (hourly_cost >= 0),
  drop constraint if exists printers_watts_nonnegative,
  add constraint printers_watts_nonnegative check (watts >= 0);

alter table public.materials
  drop constraint if exists materials_kg_price_nonnegative,
  add constraint materials_kg_price_nonnegative check (kg_price >= 0);

alter table public.quotes
  drop constraint if exists quotes_grams_nonnegative,
  add constraint quotes_grams_nonnegative check (grams >= 0),
  drop constraint if exists quotes_print_hours_nonnegative,
  add constraint quotes_print_hours_nonnegative check (print_hours >= 0),
  drop constraint if exists quotes_labor_minutes_nonnegative,
  add constraint quotes_labor_minutes_nonnegative check (labor_minutes >= 0),
  drop constraint if exists quotes_extras_nonnegative,
  add constraint quotes_extras_nonnegative check (extras >= 0),
  drop constraint if exists quotes_failure_rate_range,
  add constraint quotes_failure_rate_range check (failure_rate >= 0 and failure_rate <= 100),
  drop constraint if exists quotes_margin_rate_range,
  add constraint quotes_margin_rate_range check (margin_rate > 0 and margin_rate <= 95),
  drop constraint if exists quotes_round_to_positive,
  add constraint quotes_round_to_positive check (round_to > 0),
  drop constraint if exists quotes_material_cost_nonnegative,
  add constraint quotes_material_cost_nonnegative check (material_cost >= 0),
  drop constraint if exists quotes_machine_cost_nonnegative,
  add constraint quotes_machine_cost_nonnegative check (machine_cost >= 0),
  drop constraint if exists quotes_electricity_cost_nonnegative,
  add constraint quotes_electricity_cost_nonnegative check (electricity_cost >= 0),
  drop constraint if exists quotes_labor_cost_nonnegative,
  add constraint quotes_labor_cost_nonnegative check (labor_cost >= 0),
  drop constraint if exists quotes_failure_reserve_nonnegative,
  add constraint quotes_failure_reserve_nonnegative check (failure_reserve >= 0),
  drop constraint if exists quotes_total_cost_nonnegative,
  add constraint quotes_total_cost_nonnegative check (total_cost >= 0),
  drop constraint if exists quotes_suggested_price_nonnegative,
  add constraint quotes_suggested_price_nonnegative check (suggested_price >= 0);