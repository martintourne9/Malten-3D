import { useEffect, useState } from 'react'
import { categories, products } from './data/products'
import Icon from './Icon'
import { productPrice } from './prices'
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import { recordEvent } from './analytics'

const cartKey = 'malten-catalog-cart'

function readCart() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(cartKey))
    return Object.fromEntries(products.filter(product => Number.isInteger(saved?.[product.id]) && saved[product.id] > 0).map(product => [product.id, Math.min(saved[product.id], 99)]))
  } catch {
    return {}
  }
}

export default function Catalog() {
  const [selected, setSelected] = useState(() => {
    const category = new URLSearchParams(window.location.search).get('categoria')
    return categories.some(item => item.id === category) ? category : 'todos'
  })
  const [activeProduct, setActiveProduct] = useState(null)
  const [cart, setCart] = useState(readCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const items = products.filter(product => cart[product.id]).map(product => ({ product, quantity: cart[product.id] }))
  const count = items.reduce((total, item) => total + item.quantity, 0)
  useEffect(() => {
    try {
      window.localStorage.setItem(cartKey, JSON.stringify(cart))
    } catch {
      // Keep the cart usable in memory when storage is unavailable.
    }
  }, [cart])

  function changeQuantity(product, delta) {
    setCart(current => {
      const next = { ...current }
      const quantity = Math.min(99, (next[product.id] || 0) + delta)
      if (quantity > 0) next[product.id] = quantity
      else delete next[product.id]
      return next
    })
  }

  function addProduct(product) {
    changeQuantity(product, 1)
    setNotice(`${product.name}: ${(cart[product.id] || 0) + 1} en el carrito.`)
    recordEvent('cart_add', { product_id: product.id, category: product.category })
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
    <div className="catalog-heading"><h1>Productos.</h1><button className="button primary cart-trigger" type="button" onClick={() => setCartOpen(true)}><Icon name="cart" />Carrito ({count})</button></div>
    <p className="cart-notice" role="status">{notice}</p>
    {new URLSearchParams(window.location.search).get('pago') === 'regreso' && <p role="status">Volviste de Mercado Pago. Consultá allí el resultado de la operación de prueba.</p>}
    <p className="catalog-intro">Objetos para tu casa, tus plantas y tu negocio. Encontrá cada modelo en su categoría.</p>
    <nav className="category-nav" aria-label="Secciones de productos"><button type="button" aria-label="Todos" aria-pressed={selected === 'todos'} onClick={() => selectCategory('todos')}>Todos <span>{products.length}</span></button>{categories.map(item => <button key={item.id} type="button" aria-label={item.name} aria-pressed={selected === item.id} onClick={() => selectCategory(item.id)}>{item.name} <span>{products.filter(product => product.category === item.id).length}</span></button>)}</nav>
    <div className="category-content" aria-live="polite">
      <div className="catalog-section-title"><h2>{category.name}</h2><span>{visibleProducts.length} {visibleProducts.length === 1 ? 'modelo' : 'modelos'}</span></div>
      {visibleProducts.length ? <div className="catalog-grid">{visibleProducts.map(product => <article className="catalog-card" key={product.id}>
        <button className="product-photo-button" type="button" aria-label={`Ver ${product.name}`} onClick={() => openProduct(product)}><img src={product.image} srcSet={`${product.imageSmall} 640w, ${product.image} 1280w`} sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw" alt={product.alt} width={product.imageWidth} height={product.imageHeight} loading={product.imageLoading || 'lazy'} /></button>
        <div><p className="product-category">{categories.find(item => item.id === product.category).name}{product.custom && <span className="product-custom">A medida</span>}</p><h3>{product.name}</h3><p>{product.description}</p>{product.dimensions && <p>{product.dimensions}</p>}{product.priceUyu != null && <strong>{productPrice(product)}</strong>}<button type="button" className="product-detail-button" onClick={() => openProduct(product)} aria-label={`Ver ficha de ${product.name}`}>Ver ficha <Icon name="arrow" /></button><button type="button" className="button cart-add" disabled={(cart[product.id] || 0) >= 99} onClick={() => addProduct(product)} aria-label={`Agregar ${product.name} al carrito`}><Icon name="cart" />Agregar{cart[product.id] ? ` · ${cart[product.id]} en carrito` : ''}</button></div>
      </article>)}</div> : <div className="catalog-empty"><Icon name="box" /><p>Todavía no hay modelos publicados en esta sección.</p></div>}
    </div>
    <aside className="catalog-help">
      <div><h2>¿Buscás algo a medida?</h2><p>Contanos qué necesitás, cuántas unidades y para cuándo.</p></div>
      <a className="button primary" href="/#contacto"><Icon name="arrow" />Ver cómo consultar</a>
    </aside>
    {activeProduct && <ProductDetail product={activeProduct} quantity={cart[activeProduct.id] || 0} onAdd={() => addProduct(activeProduct)} onDismiss={() => setActiveProduct(null)} />}
    {cartOpen && <Cart items={items} changeQuantity={changeQuantity} onDismiss={() => setCartOpen(false)} />}
  </section>
}
