"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { calculateQuote } from "@/lib/format";

function num(formData: FormData, key: string, fallback = 0) {
  const parsed = Number(formData.get(key));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function createQuote(formData: FormData) {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect("/login");

  const printerId = String(formData.get("printerId") || "");
  const materialId = String(formData.get("materialId") || "");

  const [{ data: printer }, { data: material }, { data: profile }] = await Promise.all([
    supabase.from("printers").select("id,name,hourly_cost,watts").eq("id", printerId).single(),
    supabase.from("materials").select("id,name,kg_price").eq("id", materialId).single(),
    supabase.from("profiles").select("electricity_rate,labor_hourly,currency").eq("id", userId).single(),
  ]);

  if (!printer || !material || !profile) redirect("/app/settings?error=Configurá impresora y material primero");

  const input = {
    quantity: Math.max(1, Math.floor(num(formData, "quantity", 1))),
    grams: Math.max(0, num(formData, "grams")),
    hours: Math.max(0, num(formData, "hours")),
    laborMinutes: Math.max(0, num(formData, "laborMinutes")),
    extras: Math.max(0, num(formData, "extras")),
    failureRate: Math.max(0, num(formData, "failureRate", 8)),
    marginRate: Math.min(90, Math.max(1, num(formData, "marginRate", 55))),
    commissionRate: Math.min(80, Math.max(0, num(formData, "commissionRate", 0))),
    fixedFee: Math.max(0, num(formData, "fixedFee", 0)),
    roundTo: Math.max(1, num(formData, "roundTo", 10)),
    materialKgPrice: Number(material.kg_price),
    machineHourly: Number(printer.hourly_cost),
    watts: Number(printer.watts),
    electricityRate: Number(profile.electricity_rate),
    laborHourly: Number(profile.labor_hourly),
  };

  const result = calculateQuote(input);
  if (result.invalidPricing) {
    redirect("/app/quote?error=Revisá margen y comisión antes de guardar");
  }
  const { error } = await supabase.from("quotes").insert({
    user_id: userId,
    name: String(formData.get("name") || "Sin nombre").trim().slice(0, 120),
    client_name: String(formData.get("clientName") || "").trim().slice(0, 120) || null,
    printer_id: printer.id,
    material_id: material.id,
    quantity: input.quantity,
    grams: input.grams,
    print_hours: input.hours,
    labor_minutes: input.laborMinutes,
    extras: input.extras,
    failure_rate: input.failureRate,
    margin_rate: input.marginRate,
    commission_rate: input.commissionRate,
    fixed_fee: input.fixedFee,
    sales_fee: result.salesFee,
    round_to: input.roundTo,
    material_cost: result.materialCost,
    machine_cost: result.machineCost,
    electricity_cost: result.electricityCost,
    labor_cost: result.laborCost,
    failure_reserve: result.failureReserve,
    total_cost: result.totalCost,
    suggested_price: result.suggestedPrice,
    unit_price: result.unitPrice,
    profit: result.profit,
    currency: profile.currency,
  });

  if (error) {
    const hitLimit = error.message.toLowerCase().includes("free plan quote limit");
    redirect(hitLimit ? "/app/billing?limit=1" : `/app/quote?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/app");
  revalidatePath("/app/history");
  redirect("/app/history?saved=1");
}

export async function deleteQuote(formData: FormData) {
  const id = String(formData.get("id") || "");
  const supabase = await createClient();
  await supabase.from("quotes").delete().eq("id", id);
  revalidatePath("/app/history");
  revalidatePath("/app");
}
