import { createClient } from "@/lib/supabase/server";
import { QuoteCalculator } from "@/components/quote-calculator";

export default async function QuotePage({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims(); const userId = claims?.claims?.sub!;
  const [{ data: printers }, { data: materials }, { data: profile }] = await Promise.all([
    supabase.from("printers").select("id,name,hourly_cost,watts").order("created_at"),
    supabase.from("materials").select("id,name,kg_price").order("created_at"),
    supabase.from("profiles").select("electricity_rate,labor_hourly,currency").eq("id", userId).single(),
  ]);
  return <div className="pageStack"><div><div className="eyebrow">NUEVA COTIZACIÓN</div><h1>Costeo de pieza</h1><p className="muted">Los datos se recalculan en el servidor al guardar.</p></div>{params.error && <div className="alert error">{String(params.error)}</div>}<QuoteCalculator printers={(printers || []).map(p=>({...p,hourly_cost:Number(p.hourly_cost),watts:Number(p.watts)}))} materials={(materials || []).map(m=>({...m,kg_price:Number(m.kg_price)}))} profile={{electricity_rate:Number(profile?.electricity_rate || 0),labor_hourly:Number(profile?.labor_hourly || 0),currency:profile?.currency || "UYU"}} /></div>;
}
