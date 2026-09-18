import { createClient } from "@/lib/supabase/server";
import { deleteQuote } from "@/app/actions/quotes";
import { money } from "@/lib/format";

export default async function History({ searchParams }: { searchParams: Promise<Record<string,string|string[]|undefined>> }) {
  const params = await searchParams; const supabase = await createClient();
  const { data: quotes } = await supabase.from("quotes").select("id,name,client_name,total_cost,suggested_price,profit,currency,created_at").order("created_at", { ascending: false }).limit(100);
  return <div className="pageStack"><div><div className="eyebrow">HISTORIAL</div><h1>Cotizaciones guardadas</h1></div>{params.saved && <div className="alert ok">Cotización guardada.</div>}<section className="panel tableLike">{quotes?.length ? quotes.map(q=><article className="quoteRow historyRow" key={q.id}><div><b>{q.name}</b><span>{q.client_name || "Sin cliente"} · {new Date(q.created_at).toLocaleDateString("es-UY")}</span></div><div><span>Costo</span><b>{money(Number(q.total_cost), q.currency)}</b></div><div><span>Precio</span><b>{money(Number(q.suggested_price), q.currency)}</b></div><div><span>Ganancia</span><b>{money(Number(q.profit), q.currency)}</b></div><form action={deleteQuote}><input type="hidden" name="id" value={q.id}/><button className="dangerBtn">Eliminar</button></form></article>) : <div className="emptyState">No hay cotizaciones todavía.</div>}</section></div>;
}
