"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function num(formData: FormData, key: string, fallback = 0) {
  const parsed = Number(formData.get(key));
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function updateWorkshop(formData: FormData) {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) redirect("/login");

  const printerId = String(formData.get("printerId") || "");
  const materialId = String(formData.get("materialId") || "");

  const [printerResult, materialResult, profileResult] = await Promise.all([
    supabase.from("printers").update({
      name: String(formData.get("printerName") || "Impresora").trim().slice(0, 80),
      hourly_cost: Math.max(0, num(formData, "machineHourly")),
      watts: Math.max(0, num(formData, "watts")),
    }).eq("id", printerId),
    supabase.from("materials").update({
      name: String(formData.get("materialName") || "Material").trim().slice(0, 80),
      kg_price: Math.max(0, num(formData, "kgPrice")),
    }).eq("id", materialId),
    supabase.from("profiles").update({
      electricity_rate: Math.max(0, num(formData, "electricityRate")),
      labor_hourly: Math.max(0, num(formData, "laborHourly")),
      currency: String(formData.get("currency") || "UYU") === "USD" ? "USD" : "UYU",
    }).eq("id", userId),
  ]);

  const error = printerResult.error || materialResult.error || profileResult.error;
  if (error) redirect(`/app/settings?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/app");
  revalidatePath("/app/quote");
  redirect("/app/settings?saved=1");
}
