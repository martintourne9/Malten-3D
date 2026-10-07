import { useEffect, useRef } from 'react'
import { categories } from './data/products'
import Icon from './Icon'

export default function ProductDetail({ product, onDismiss }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const category = categories.find(item => item.id === product.category)
  const message = `Hola, Malten. Me interesa el producto ${product.name}. ¿Me pasás información sobre medidas, colores y precio?`
  const whatsapp = `https://wa.me/59899999101?text=${encodeURIComponent(message)}`

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    closeRef.current.focus()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function dismissBackdrop(event) {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onDismiss()
  }

  return <dialog ref={dialogRef} className="product-dialog" aria-labelledby="product-detail-title" onClick={dismissBackdrop} onCancel={event => { event.preventDefault(); onDismiss() }}>
    <button ref={closeRef} type="button" className="product-dialog-close" aria-label="Cerrar ficha del producto" onClick={onDismiss}>×</button>
    <div className="product-dialog-layout">
      <div className="product-dialog-photo"><img src={product.image} alt={product.alt} width={product.imageWidth} height={product.imageHeight} /></div>
      <div className="product-dialog-info">
        <p className="eyebrow">{category.name}</p>
        <h2 id="product-detail-title">{product.name}</h2>
        {product.custom && <span className="product-custom">A medida</span>}
        <p className="product-dialog-description">{product.description}</p>
        {product.dimensions && <p><strong>Medidas:</strong> {product.dimensions}</p>}
        {product.priceUyu != null && <p className="product-dialog-price">{new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(product.priceUyu)}</p>}
        <p className="product-dialog-help">Consultá las medidas, los colores y el precio de este modelo por WhatsApp.</p>
        <a className="button product-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer"><Icon name="message" />Consultar este producto</a>
        <p className="product-dialog-note">El mensaje incluye el nombre del modelo para que podamos ayudarte.</p>
      </div>
    </div>
  </dialog>
}
