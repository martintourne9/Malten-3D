import { track } from '@vercel/analytics'

// Record catalogue metadata only; never include messages or contact information.
export function recordEvent(name, data) {
  if (!import.meta.env.PROD) return
  try {
    track(name, data)
  } catch {
    // Analytics must never interrupt browsing or a WhatsApp inquiry.
  }
}

export function recordWhatsappClick(event) {
  const link = event.target.closest?.('a[href]')
  if (!link) return
  const url = new URL(link.href)
  if (url.hostname !== 'wa.me') return
  recordEvent('whatsapp_click', {
    location: link.closest('section')?.id || 'productos',
    product_id: link.dataset.productId || 'consulta_general',
    product_name: link.dataset.productName || 'Consulta general',
    category: link.dataset.category || 'servicios',
  })
}
