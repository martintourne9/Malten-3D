import { useEffect, useRef, useState } from 'react'
import { categories } from './data/products'
import Icon from './Icon'

export default function ProductDetail({ product, onDismiss, onAdd }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [shareState, setShareState] = useState('')
  const [showAlternate, setShowAlternate] = useState(false)
  const photo = (showAlternate && product.alternatePhoto) || product
  const shareUrl = new URL('/fichas/' + encodeURIComponent(product.id) + '.html', window.location.origin)

  async function shareProduct() {
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name + ' · Malten 3D Lab', url: shareUrl.href })
        return
      } catch (error) {
        if (error.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl.href)
      setShareState('copied')
    } catch {
      setShareState('manual')
    }
  }

  const category = categories.find(item => item.id === product.category)
  const message = `Hola, Malten. Me interesa el producto ${product.name}. ¿Qué colores están disponibles?`
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

  useEffect(() => {
    const originalTitle = document.title
    document.title = product.name + ' · Malten 3D Lab'
    return () => { document.title = originalTitle }
  }, [product.name])

  function dismissBackdrop(event) {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onDismiss()
  }

  return <dialog ref={dialogRef} className="product-dialog" aria-labelledby="product-detail-title" onClick={dismissBackdrop} onCancel={event => { event.preventDefault(); onDismiss() }}>
    <button ref={closeRef} type="button" className="product-dialog-close" aria-label="Cerrar ficha del producto" onClick={onDismiss}><Icon name="close" /></button>
    <div className="product-dialog-layout" style={product.image ? undefined : { display: 'block' }}>
      {product.image && <div className="product-dialog-photo" style={{ flexDirection: 'column' }}>
        <img src={photo.image} alt={photo.alt} width={photo.imageWidth} height={photo.imageHeight} />
        {product.alternatePhoto && <button type="button" className="product-detail-button" onClick={() => setShowAlternate(value => !value)}>
          {showAlternate ? 'Ver foto principal' : 'Ver lámparas encendidas'}
        </button>}
      </div>}
      <div className="product-dialog-info">
        <p className="eyebrow">{category.name}</p>
        <h2 id="product-detail-title">{product.name}</h2>
        {product.custom && <span className="product-custom">A medida</span>}
        <p className="product-dialog-description">{product.description}</p>
        {product.dimensions && <p><strong>Medidas:</strong> {product.dimensions}</p>}
        {product.priceUyu != null && <p className="product-dialog-price">{new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(product.priceUyu)}</p>}
        <p className="product-dialog-help">Antes de pedir, consultá los colores disponibles por WhatsApp.</p>
        {product.priceUyu != null && <button type="button" className="cart-add" onClick={() => onAdd(product)}><Icon name="cart" />Agregar al carrito</button>}
        <a className="button product-whatsapp" data-product-id={product.id} data-product-name={product.name} data-category={product.category} href={whatsapp} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /><span className="button-label">Consultar este producto</span><Icon name="arrow-right" className="button-arrow" /></a>
        <button className="product-detail-button" type="button" onClick={shareProduct}>Compartir producto</button>
        <span role="status">{shareState === 'copied' ? 'Enlace copiado.' : ''}</span>
        {shareState === 'manual' && <label>Copiá el enlace del producto
          <input type="url" value={shareUrl.href} readOnly onFocus={event => event.target.select()} style={{ width: '100%' }} />
        </label>}
      </div>
    </div>
  </dialog>
}
