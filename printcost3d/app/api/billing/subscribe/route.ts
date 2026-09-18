import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createProSubscription, getSubscription } from "@/lib/billing/mercadopago";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user?.email) return NextResponse.redirect(new URL("/login", request.url), 303);

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan,mp_subscription_id,mp_status")
      .eq("id", user.id)
      .single();

    if (profile?.plan === "pro") {
      return NextResponse.redirect(new URL("/app/billing", request.url), 303);
    }

    if (profile?.mp_subscription_id && profile.mp_status === "pending") {
      const existing = await getSubscription(profile.mp_subscription_id);
      if (existing.init_point) return NextResponse.redirect(existing.init_point, 303);
    }

    const base = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const subscription = await createProSubscription({
      userId: user.id,
      email: user.email,
      backUrl: `${base}/app/billing?checkout=return`,
    });

    const admin = createAdminClient();
    await admin.from("profiles").update({
      mp_subscription_id: subscription.id,
      mp_status: subscription.status,
    }).eq("id", user.id);

    return NextResponse.redirect(subscription.init_point, 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo iniciar el pago";
    return NextResponse.redirect(new URL(`/app/billing?error=${encodeURIComponent(message)}`, request.url), 303);
  }
}
