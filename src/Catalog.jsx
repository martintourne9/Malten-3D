import { useState } from 'react'
import { categories, products } from './data/products'
import Icon from './Icon'
import ProductDetail from './ProductDetail'

export default function Catalog() {
  const [selected, setSelected] = useState('todos')
  const [activeProduct, setActiveProduct] = useState(null)
  const category = selected === 'todos' ? { name: 'Todos los productos' } : categories.find(item => item.id === selected)
  const visibleProducts = products.filter(product => selected === 'todos' || product.category === selected)
  return <section id="productos" className="section-wrap catalog">
    <p className="eyebrow">Catálogo Malten</p>
    <h1>Productos.</h1>
    <p className="catalog-intro">Objetos para tu casa, tus plantas y tu negocio. Encontrá cada modelo en su categoría.</p>
    <nav className="category-nav" aria-label="Secciones de productos"><button type="button" aria-label="Todos" aria-pressed={selected === 'todos'} onClick={() => setSelected('todos')}>Todos <span>{products.length}</span></button>{categories.map(item => <button key={item.id} type="button" aria-label={item.name} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.name} <span>{products.filter(product => product.category === item.id).length}</span></button>)}</nav>
    <div className="category-content" aria-live="polite">
      <div className="catalog-section-title"><h2>{category.name}</h2><span>{visibleProducts.length} {visibleProducts.length === 1 ? 'modelo' : 'modelos'}</span></div>
      {visibleProducts.length ? <div className="catalog-grid">{visibleProducts.map(product => <article className="catalog-card" key={product.id}>
        <button className="product-photo-button" type="button" aria-label={`Ver ${product.name}`} onClick={() => setActiveProduct(product)}><img src={product.image} srcSet={`${product.imageSmall} 640w, ${product.image} 1280w`} sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw" alt={product.alt} width={product.imageWidth} height={product.imageHeight} loading={product.imageLoading || 'lazy'} /></button>
        <div><p className="product-category">{categories.find(item => item.id === product.category).name}{product.custom && <span className="product-custom">A medida</span>}</p><h3>{product.name}</h3><p>{product.description}</p>{product.dimensions && <p>{product.dimensions}</p>}{product.priceUyu != null && <strong>{new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(product.priceUyu)}</strong>}<button type="button" className="product-detail-button" onClick={() => setActiveProduct(product)} aria-label={`Ver ficha de ${product.name}`}>Ver producto <span aria-hidden="true">↗</span></button></div>
      </article>)}</div> : <div className="catalog-empty"><Icon name="box" /><p>Todavía no hay modelos publicados en esta sección.</p></div>}
    </div>
    {activeProduct && <ProductDetail product={activeProduct} onDismiss={() => setActiveProduct(null)} />}
  </section>
}
