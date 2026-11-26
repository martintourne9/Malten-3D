import { useEffect, useState } from 'react'
import { categories, products } from './data/products'
import Icon from './Icon'
import Cart, { pesos } from './Cart'
import ProductDetail from './ProductDetail'
import { recordEvent } from './analytics'

const categoryIcons = { lamparas: 'lamp', floreros: 'vase', decoracion: 'leaf', escritorio: 'pencil', accesorios: 'wrench', souvenirs: 'gift', riego: 'droplet', comercios: 'store' }

export default function Catalog() {
  const [selected, setSelected] = useState('todos')
  const [activeProduct, setActiveProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(() => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('carrito') === '1')
  const [quantities, setQuantities] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem('malten-cart-v1'))
      return Object.fromEntries(products.filter(p => p.priceUyu != null && Number.isSafeInteger(saved?.[p.id]) && saved[p.id] > 0).map(p => [p.id, saved[p.id]]))
    } catch { return {} }
  })
  useEffect(() => {
    try { window.localStorage.setItem('malten-cart-v1', JSON.stringify(quantities)) } catch { /* Private browsing may disable storage. */ }
  }, [quantities])
  const items = products.filter(p => quantities[p.id] > 0).map(product => ({ product, quantity: quantities[product.id] }))
  const total = items.reduce((sum, { product, quantity }) => sum + product.priceUyu * quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  function addProduct(product) {
    setQuantities(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }))
    setActiveProduct(null)
    setCartOpen(true)
  }
  function changeQuantity(id, quantity) {
    setQuantities(prev => {
      const next = { ...prev }
      if (quantity > 0) next[id] = quantity
      else delete next[id]
      return next
    })
  }
  const category = selected === 'todos' ? { name: 'Todos los productos' } : categories.find(item => item.id === selected)
  const visibleProducts = products.filter(product => selected === 'todos' || product.category === selected)
  function openProduct(product) {
    setActiveProduct(product)
    recordEvent('product_view', { product_id: product.id, product_name: product.name, category: product.category })
  }
  function selectCategory(id) {
    setSelected(id)
    if (id !== selected) recordEvent('category_selected', { category: id })
  }
  return <section id="productos" className="section-wrap catalog">
    <p className="eyebrow">Catálogo Malten</p>
    <h1>Productos.</h1>
    <p className="catalog-intro">Objetos para tu casa, tus plantas y tu negocio. Precios en pesos uruguayos. Consultá por WhatsApp los colores disponibles antes de pedir.</p>
    <nav className="category-nav" aria-label="Secciones de productos"><button type="button" aria-label="Todos" aria-pressed={selected === 'todos'} onClick={() => selectCategory('todos')}><Icon name="grid" />Todos <span>{products.length}</span></button>{categories.map(item => <button key={item.id} type="button" aria-label={item.name} aria-pressed={selected === item.id} onClick={() => selectCategory(item.id)}><Icon name={categoryIcons[item.id]} />{item.name} <span>{products.filter(product => product.category === item.id).length}</span></button>)}</nav>
    <div className="category-content" aria-live="polite">
      <div className="catalog-section-title"><h2>{category.name}</h2><span>{visibleProducts.length} {visibleProducts.length === 1 ? 'modelo' : 'modelos'}</span></div>
      {visibleProducts.length ? <div className="catalog-grid">{visibleProducts.map(product => <article className="catalog-card" key={product.id}>
        {product.image && <button className="product-photo-button" type="button" aria-label={`Ver ${product.name}`} onClick={() => openProduct(product)}><img src={product.image} srcSet={`${product.imageSmall} 640w, ${product.image} 1280w`} sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw" alt={product.alt} width={product.imageWidth} height={product.imageHeight} loading={product.imageLoading || 'lazy'} /></button>}
        <div><p className="product-category">{categories.find(item => item.id === product.category).name}{product.custom && <span className="product-custom">A medida</span>}</p><h3>{product.name}</h3><p>{product.description}</p>{product.dimensions && <p>{product.dimensions}</p>}{product.priceUyu != null && <strong>{new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(product.priceUyu)}</strong>}{product.priceUyu != null && <button type="button" className="cart-add" onClick={() => addProduct(product)} aria-label={'Agregar al carrito: ' + product.name}>Agregar al carrito</button>}<button type="button" className="product-detail-button" onClick={() => openProduct(product)} aria-label={`Ver ficha de ${product.name}`}>Ver producto <Icon name="arrow-right" /></button></div>
      </article>)}</div> : <div className="catalog-empty"><Icon name="box" /><p>Todavía no hay modelos publicados en esta sección.</p></div>}
    </div>
    <div className="cart-bar"><button type="button" onClick={() => setCartOpen(true)}>Ver carrito ({count}) · {pesos(total)}</button></div>
    {cartOpen && <Cart items={items} total={total} onChange={changeQuantity} onClose={() => setCartOpen(false)} />}
    {activeProduct && <ProductDetail onAdd={addProduct} product={activeProduct} onDismiss={() => setActiveProduct(null)} />}
  </section>
}
