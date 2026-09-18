"use client";

import { useMemo, useState } from "react";
import { createQuote } from "@/app/actions/quotes";
import { calculateQuote, money } from "@/lib/format";

type Printer = { id: string; name: string; hourly_cost: number; watts: number };
type Material = { id: string; name: string; kg_price: number };

export function QuoteCalculator({
  printers,
  materials,
  profile,
}: {
  printers: Printer[];
  materials: Material[];
  profile: { electricity_rate: number; labor_hourly: number; currency: string };
}) {
  const [printerId, setPrinterId] = useState(printers[0]?.id || "");
  const [materialId, setMaterialId] = useState(materials[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const [grams, setGrams] = useState(50);
  const [hours, setHours] = useState(4);
  const [laborMinutes, setLaborMinutes] = useState(15);
  const [extras, setExtras] = useState(0);
  const [failureRate, setFailureRate] = useState(8);
  const [marginRate, setMarginRate] = useState(55);
  const [commissionRate, setCommissionRate] = useState(0);
  const [fixedFee, setFixedFee] = useState(0);
  const [roundTo, setRoundTo] = useState(10);

  const printer = printers.find((p) => p.id === printerId) || printers[0];
  const material = materials.find((m) => m.id === materialId) || materials[0];
  const result = useMemo(() => calculateQuote({
    quantity, grams, hours, laborMinutes, extras, failureRate, marginRate,
    commissionRate, fixedFee, roundTo,
    materialKgPrice: Number(material?.kg_price || 0),
    machineHourly: Number(printer?.hourly_cost || 0),
    watts: Number(printer?.watts || 0),
    electricityRate: Number(profile.electricity_rate || 0),
    laborHourly: Number(profile.labor_hourly || 0),
  }), [quantity, grams, hours, laborMinutes, extras, failureRate, marginRate, commissionRate, fixedFee, roundTo, material, printer, profile]);

  if (!printer || !material) return <div className="panel"><p>Primero configurá una impresora y un material.</p></div>;

  return (
    <form action={createQuote} className="quoteGrid">
      <section className="panel formPanel">
        <div className="eyebrow">1 · Pieza</div><h2>Datos del trabajo</h2>
        <div className="fields2">
          <label>Nombre<input name="name" placeholder="Ej. Llavero personalizado" required /></label>
          <label>Cliente<input name="clientName" placeholder="Opcional" /></label>
          <label>Cantidad<input name="quantity" type="number" min="1" step="1" value={quantity} onChange={(e)=>setQuantity(Math.max(1, Number(e.target.value)))} /></label>
          <label>Impresora<select name="printerId" value={printerId} onChange={(e)=>setPrinterId(e.target.value)}>{printers.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
          <label>Material<select name="materialId" value={materialId} onChange={(e)=>setMaterialId(e.target.value)}>{materials.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select></label>
          <label>Gramos del lote<input name="grams" type="number" min="0" step="0.1" value={grams} onChange={(e)=>setGrams(Number(e.target.value))} /></label>
          <label>Horas del lote<input name="hours" type="number" min="0" step="0.1" value={hours} onChange={(e)=>setHours(Number(e.target.value))} /></label>
          <label>Trabajo manual total (min)<input name="laborMinutes" type="number" min="0" value={laborMinutes} onChange={(e)=>setLaborMinutes(Number(e.target.value))} /></label>
          <label>Packaging / extras del lote<input name="extras" type="number" min="0" step="0.01" value={extras} onChange={(e)=>setExtras(Number(e.target.value))} /></label>
        </div>
      </section>

      <section className="panel formPanel">
        <div className="eyebrow">2 · Rentabilidad</div><h2>Cómo querés vender</h2>
        <div className="fields2">
          <label>Riesgo de falla (%)<input name="failureRate" type="number" min="0" max="100" value={failureRate} onChange={(e)=>setFailureRate(Number(e.target.value))} /></label>
          <label>Margen objetivo (%)<input name="marginRate" type="number" min="1" max="90" value={marginRate} onChange={(e)=>setMarginRate(Number(e.target.value))} /></label>
          <label>Comisión de venta (%)<input name="commissionRate" type="number" min="0" max="80" step="0.1" value={commissionRate} onChange={(e)=>setCommissionRate(Number(e.target.value))} /></label>
          <label>Cargo fijo por venta<input name="fixedFee" type="number" min="0" step="0.01" value={fixedFee} onChange={(e)=>setFixedFee(Number(e.target.value))} /></label>
          <label>Redondear a<select name="roundTo" value={roundTo} onChange={(e)=>setRoundTo(Number(e.target.value))}><option value="1">1</option><option value="5">5</option><option value="10">10</option><option value="50">50</option><option value="100">100</option></select></label>
          <label>Moneda<input value={profile.currency} disabled /></label>
        </div>
      </section>

      <aside className="panel resultPanel">
        <div className="eyebrow">Resultado</div>
        <div className="costLine"><span>Costo de producción</span><strong>{money(result.totalCost, profile.currency)}</strong></div>
        <div className="suggested"><span>Precio total sugerido</span><strong>{result.invalidPricing ? "—" : money(result.suggestedPrice, profile.currency)}</strong></div>
        <div className="costLine"><span>Precio por unidad</span><strong>{result.invalidPricing ? "—" : money(result.unitPrice, profile.currency)}</strong></div>
        <div className="breakdown">
          <span>Material <b>{money(result.materialCost, profile.currency)}</b></span>
          <span>Máquina <b>{money(result.machineCost, profile.currency)}</b></span>
          <span>Luz <b>{money(result.electricityCost, profile.currency)}</b></span>
          <span>Trabajo <b>{money(result.laborCost, profile.currency)}</b></span>
          <span>Fallas <b>{money(result.failureReserve, profile.currency)}</b></span>
          <span>Venta/comisión <b>{money(result.salesFee, profile.currency)}</b></span>
        </div>
        <div className="profitLine"><span>Ganancia estimada</span><strong>{result.invalidPricing ? "—" : money(result.profit, profile.currency)}</strong></div>
        <p className="fine">{result.invalidPricing ? "Revisá margen y comisión: juntos dejan muy poco espacio para calcular el precio." : `Margen final ${(result.achievedMargin*100).toFixed(1)}% · Recargo sobre costo ${(result.markup*100).toFixed(1)}%`}</p>
        <button className="primary full" type="submit" disabled={result.invalidPricing}>Guardar cotización</button>
        <p className="fine">El servidor vuelve a calcular todo antes de guardar para evitar datos manipulados.</p>
      </aside>
    </form>
  );
}
