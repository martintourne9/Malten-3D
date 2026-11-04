import { useEffect, useRef, useState } from 'react'
import { recordEvent } from './analytics'
import { formatPrice } from './prices'

export default function Cart({ items, changeQuantity, onDismiss }) {
  const ref = useRef(null)
  const attempt = useRef(null)
  const inFlight = useRef(false)
  const [available, setAvailable] = useState(false)
  const [busy, setBusy] = useState(false)
  const [failure, setFailure] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/checkout', { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(result => setAvailable(result?.available === true))
      .catch(() => {})
    return () => controller.abort()
  }, [])
  useEffect(() => {
    const dialog = ref.current
    dialog.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
    }
  }, [])

  const subtotal = items.reduce((total, { product, quantity }) => total + product.priceUyu * quantity, 0)
  const hasCustom = items.some(({ product }) => product.custom)

  async function startCheckout() {
    if (!available || hasCustom || inFlight.current) return
    inFlight.current = true
    setBusy(true)
    setFailure('')
    try {
      const lines = items.map(({ product, quantity }) => ({ id: product.id, quantity }))
      const signature = JSON.stringify(lines)
      if (attempt.current?.signature !== signature) attempt.current = { signature, id: crypto.randomUUID() }
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lines, attempt: attempt.current.id }),
      })
      const result = await response.json()
      if (!response.ok) {
        setFailure(result.message || 'No pudimos abrir Mercado Pago.')
        return
      }
      recordEvent('checkout_test_open', { models: lines.length })
      window.location.assign(result.url)
    } catch {
      setFailure('No pudimos abrir Mercado Pago. Probá de nuevo.')
    } finally {
      inFlight.current = false
      setBusy(false)
    }
  }

  return <dialog ref={ref} className="product-dialog cart-dialog" aria-labelledby="cart-title" onCancel={event => { event.preventDefault(); if (!busy) onDismiss() }}>
    <button type="button" className="product-dialog-close" aria-label="Cerrar carrito" disabled={busy} onClick={onDismiss}>×</button>
    <p className="eyebrow">Catálogo Malten</p>
    <h2 id="cart-title">Tu carrito</h2>
    {items.length === 0 ? <p>Todavía no agregaste productos.</p> : <>
      <ul className="cart-items">{items.map(({ product, quantity }) => <li key={product.id}>
        <div><strong>{product.name}</strong><br /><span>{product.custom ? 'Desde ' : ''}{formatPrice(product.priceUyu * quantity)}</span><button type="button" className="cart-remove" disabled={busy} onClick={() => changeQuantity(product, -quantity)} aria-label={`Quitar ${product.name}`}>Quitar</button></div>
        <div className="cart-quantity" aria-label={`Cantidad de ${product.name}`}>
          <button type="button" disabled={busy || quantity <= 1} onClick={() => changeQuantity(product, -1)} aria-label={`Reducir cantidad de ${product.name}`}>−</button>
          <span aria-live="polite">{quantity}</span>
          <button type="button" disabled={busy || quantity >= 99} onClick={() => changeQuantity(product, 1)} aria-label={`Aumentar cantidad de ${product.name}`}>+</button>
        </div>
      </li>)}</ul>
      <p className="cart-total"><strong>{hasCustom ? 'Subtotal estimado' : 'Subtotal'}: {formatPrice(subtotal)} UYU</strong></p>
      {hasCustom && <p>El precio final de los productos a medida depende de las especificaciones.</p>}
      <p>El subtotal no incluye envío.</p>
      {hasCustom && <p>Para pagar en línea, quitá los productos a medida del carrito y consultalos por separado.</p>}
      {available ? <button className="button primary product-whatsapp" type="button" disabled={busy || hasCustom} onClick={startCheckout}>{busy ? 'Abriendo Mercado Pago…' : 'Probar pago con Mercado Pago'}</button> : <p>El pago en línea aún no está disponible.</p>}
      {failure && <p role="alert">{failure}</p>}
    </>}
    <button type="button" className="button cart-continue" disabled={busy} onClick={onDismiss}>Seguir viendo productos</button>
  </dialog>
}
