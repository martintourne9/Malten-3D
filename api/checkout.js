import process from 'node:process'
import { createHash } from 'node:crypto'
import { products } from '../src/data/products.js'

const catalog = new Map(products.map(product => [product.id, product]))
const headers = { 'Cache-Control': 'no-store' }
const error = (status, message) => Response.json({ message }, { status, headers })

function testToken() {
  return process.env.VERCEL_ENV === 'preview' && process.env.MALTEN_MP_TEST_ACCESS_TOKEN
}

export function GET() {
  return Response.json({ available: Boolean(testToken()) }, { headers })
}

export async function POST(request) {
  const token = testToken()
  if (!token) return error(503, 'El pago de prueba todavía no está disponible.')
  const origin = new URL(request.url).origin
  if (request.headers.get('origin') !== origin) return error(403, 'No se pudo iniciar el pago desde esta página.')

  let body
  try {
    body = await request.json()
  } catch {
    return error(400, 'No se pudo leer el carrito.')
  }
  const lines = body?.items
  const attempt = body?.attempt
  if (!Array.isArray(lines) || !lines.length || lines.length > catalog.size || typeof attempt !== 'string' || !/^[0-9a-f-]{36}$/.test(attempt)) {
    return error(400, 'Revisá el carrito y volvé a intentar.')
  }
  const ids = new Set()
  let total = 0
  const items = []
  for (const line of lines) {
    const { id, quantity } = line ?? {}
    const product = catalog.get(id)
    if (!product || product.custom || !Number.isSafeInteger(product.priceUyu) || product.priceUyu <= 0 || ids.has(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return error(400, 'El carrito incluye un producto o una cantidad que no se puede pagar en línea.')
    }
    ids.add(id)
    total += product.priceUyu * quantity
    items.push({ external_code: id, title: product.name, unit_price: product.priceUyu.toFixed(2), quantity })
  }
  items.sort((a, b) => a.external_code.localeCompare(b.external_code))
  const key = createHash('sha256').update(JSON.stringify([attempt, origin, items])).digest('hex')
  const returnUrl = origin + '/productos?pago=regreso'
  try {
    const response = await fetch('https://api.mercadopago.com/v1/orders', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'X-Idempotency-Key': key },
      body: JSON.stringify({
        type: 'online', processing_mode: 'manual', total_amount: total.toFixed(2),
        external_reference: `malten-test-${key.slice(0, 32)}`, items,
        config: { online: { success_url: returnUrl, failure_url: returnUrl, pending_url: returnUrl, auto_return: 'approved' } },
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!response.ok) {
      console.error('Malten checkout: Mercado Pago HTTP', response.status)
      return error(502, 'Mercado Pago no pudo iniciar el pago de prueba. Probá de nuevo.')
    }
    const result = await response.json()
    const url = new URL(result.checkout_url)
    if (!/^ORDTST[0-9A-Z]+$/.test(result.id) || result.currency !== 'UYU' || url.origin !== 'https://www.mercadopago.com.uy' || url.pathname !== '/checkout/v1/redirect' || url.searchParams.get('order_id') !== result.id) {
      console.error('Malten checkout: unexpected test order response')
      return error(502, 'No pudimos verificar que el pago sea de prueba y en pesos uruguayos.')
    }
    return Response.json({ url: url.href }, { headers })
  } catch {
    console.error('Malten checkout: request or response failure')
    return error(502, 'No pudimos abrir Mercado Pago. Probá de nuevo.')
  }
}
