-- Performance indexes for foreign keys used by quotes
create index if not exists quotes_printer_idx on public.quotes(printer_id);
create index if not exists quotes_material_idx on public.quotes(material_id);
