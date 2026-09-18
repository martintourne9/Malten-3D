import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { money } from "@/lib/format";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub!;
  const monthStart = new Date(); monthStart.setUTCDate(1); monthStart.setUTCHours(0,0,0,0);
  const [{ data: profile }, { data: quotes }, { count: monthly }] = await Promise.all([
    supabase.from("profiles").select("plan,currency").eq("id", userId).single(),
    supabase.from("quotes").select("id,name,client_name,suggested_price,profit,currency,created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("quotes").select("id", { count: "exact", head: true }).gte("created_at", monthStart.toISOString()),
  ]);
  const totalProfit = (quotes || []).reduce((sum, q) => sum + Number(q.profit || 0), 0);
  return <div className="pageStack"><section className="dashHero"><div><div className="eyebrow">TU TALLER</div><h1>Que cada impresión deje margen.</h1><p>Costeá antes de pasar precio y construí un historial real de rentabilidad.</p></div><Link className="primaryBtn big" href="/app/quote">Nueva cotización</Link></section><section className="statGrid"><article className="statCard"><span>Uso este mes</span><strong>{monthly || 0}{profile?.plan === "free" ? "/5" : ""}</strong><small>{profile?.plan === "free" ? "Plan Free" : "Sin límite Pro"}</small></article><article className="statCard"><span>Últimas operaciones</span><strong>{quotes?.length || 0}</strong><small>mostradas</small></article><article className="statCard"><span>Ganancia reciente</span><strong>{money(totalProfit, profile?.currency || "UYU")}</strong><small>sobre las últimas 5</small></article></section><section className="panel"><div className="sectionHead"><div><div className="eyebrow">ACTIVIDAD</div><h2>Últimas cotizaciones</h2></div><Link href="/app/history">Ver historial</Link></div><div className="tableLike">{quotes?.length ? quotes.map(q=><div className="quoteRow" key={q.id}><div><b>{q.name}</b><span>{q.client_name || "Sin cliente"}</span></div><div><span>Precio</span><b>{money(Number(q.suggested_price), q.currency)}</b></div><div><span>Ganancia</span><b>{money(Number(q.profit), q.currency)}</b></div></div>) : <div className="emptyState">Todavía no guardaste cotizaciones. Empezá con una pieza real.</div>}</div></section></div>;
}
