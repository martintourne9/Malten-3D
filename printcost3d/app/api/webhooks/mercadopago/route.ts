import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSubscription, validateWebhookSignature } from "@/lib/billing/mercadopago";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const body = await request.json().catch(() => ({}));
  const dataId = url.searchParams.get("data.id") || body?.data?.id || null;

  const valid = validateWebhookSignature({
    xSignature: request.headers.get("x-signature"),
    xRequestId: request.headers.get("x-request-id"),
    dataId,
  });
  if (!valid) return NextResponse.json({ ok: false }, { status: 401 });

  if (body?.type === "subscription_preapproval" && dataId) {
    const subscription = await getSubscription(String(dataId));
    const userId = subscription.external_reference;
    if (userId) {
      const admin = createAdminClient();
      await admin.from("profiles").update({
        mp_subscription_id: subscription.id,
        mp_status: subscription.status,
        plan: subscription.status === "authorized" ? "pro" : "free",
      }).eq("id", userId);
    }
  }

  return NextResponse.json({ ok: true });
}
