import "server-only";
import crypto from "node:crypto";

const API = "https://api.mercadopago.com";

function accessToken() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) throw new Error("MERCADOPAGO_ACCESS_TOKEN no configurado");
  return token;
}

export async function createProSubscription(input: {
  userId: string;
  email: string;
  backUrl: string;
}) {
  const price = Number(process.env.PRO_PRICE_UYU || 199);
  const response = await fetch(`${API}/preapproval`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reason: "PrintCost 3D Pro",
      external_reference: input.userId,
      payer_email: input.email,
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: price,
        currency_id: "UYU",
      },
      back_url: input.backUrl,
      status: "pending",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Mercado Pago respondió ${response.status}: ${detail}`);
  }

  return response.json() as Promise<{
    id: string;
    init_point: string;
    status: string;
    external_reference?: string;
  }>;
}

export async function getSubscription(id: string) {
  const response = await fetch(`${API}/preapproval/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${accessToken()}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`No se pudo consultar la suscripción (${response.status})`);
  return response.json() as Promise<{
    id: string;
    status: string;
    external_reference?: string;
    init_point?: string;
  }>;
}

export async function cancelSubscription(id: string) {
  const response = await fetch(`${API}/preapproval/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "cancelled" }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`No se pudo cancelar la suscripción (${response.status})`);
  return response.json();
}

export function validateWebhookSignature(input: {
  xSignature: string | null;
  xRequestId: string | null;
  dataId: string | null;
}) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret || !input.xSignature) return false;

  const parts = Object.fromEntries(
    input.xSignature.split(",").map((piece) => {
      const [key, ...rest] = piece.trim().split("=");
      return [key, rest.join("=")];
    }),
  );
  const ts = parts.ts;
  const received = parts.v1;
  if (!ts || !received) return false;

  let manifest = "";
  if (input.dataId) manifest += `id:${input.dataId};`;
  if (input.xRequestId) manifest += `request-id:${input.xRequestId};`;
  manifest += `ts:${ts};`;

  const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(received, "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
