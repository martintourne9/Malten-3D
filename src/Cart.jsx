import { useEffect, useRef } from 'react'
import Icon from './Icon'
import './cart.css'

const currency = new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 })
export const pesos = value => currency.format(value)

export default function Cart({ items, total, onChange, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
    }
  }, [])

  const message = [
    'Hola, Malten. Me interesa hacer este pedido:',
    ...items.map(({ product, quantity }) => quantity + ' × ' + product.name + ' — ' + pesos(product.priceUyu * quantity)),
    'Total de productos: ' + pesos(total) + ' UYU.',
    '¿Me confirman disponibilidad, colores y opciones de entrega?',
  ].join('\n')
  return <dialog ref={ref} className="cart-dialog" aria-labelledby="cart-title" onCancel={onClose}>
    <div className="cart-heading"><h2 id="cart-title">Tu carrito</h2><button type="button" onClick={onClose} aria-label="Cerrar carrito"><Icon name="close" /></button></div>
    {items.length === 0 ? <><p>Tu carrito está vacío.</p><button type="button" className="cart-action" onClick={onClose}>Explorar productos</button></> : <>
      <ul className="cart-lines">{items.map(({ product, quantity }) => <li key={product.id}>
        <div><strong>{product.name}</strong><small>{pesos(product.priceUyu)} por unidad</small></div>
        <strong>{pesos(product.priceUyu * quantity)}</strong>
        <div className="cart-quantity">
          <button type="button" aria-label={'Restar una unidad de ' + product.name} disabled={quantity === 1} onClick={() => onChange(product.id, quantity - 1)}>−</button>
          <span>{quantity}</span>
          <button type="button" aria-label={'Sumar una unidad de ' + product.name} onClick={() => onChange(product.id, quantity + 1)}>+</button>
        </div>
        <button className="cart-remove" type="button" aria-label={'Quitar ' + product.name} onClick={() => onChange(product.id, 0)}>Quitar</button>
      </li>)}</ul>
      <p className="cart-total"><strong>Total de productos</strong><strong>{pesos(total)} UYU</strong></p>
      <p>Confirmá colores, disponibilidad y costo de entrega por WhatsApp.</p>
      <a className="cart-action" href={'https://wa.me/59899999101?text=' + encodeURIComponent(message)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" />Consultar pedido por WhatsApp</a>
    </>}
  </dialog>
}
