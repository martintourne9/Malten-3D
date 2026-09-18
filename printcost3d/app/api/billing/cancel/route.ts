import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cancelSubscription } from "@/lib/billing/mercadopago";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return NextResponse.redirect(new URL("/login", request.url), 303);

  const { data: profile } = await supabase.from("profiles").select("mp_subscription_id").eq("id", user.id).single();
  if (!profile?.mp_subscription_id) return NextResponse.redirect(new URL("/app/billing", request.url), 303);

  try {
    await cancelSubscription(profile.mp_subscription_id);
    const admin = createAdminClient();
    await admin.from("profiles").update({ plan: "free", mp_status: "cancelled" }).eq("id", user.id);
    return NextResponse.redirect(new URL("/app/billing?cancelled=1", request.url), 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo cancelar";
    return NextResponse.redirect(new URL(`/app/billing?error=${encodeURIComponent(message)}`, request.url), 303);
  }
}
