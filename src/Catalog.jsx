import { useState } from 'react'
import { categories, products } from './data/products'
import Icon from './Icon'

export default function Catalog() {
  const [selected, setSelected] = useState(categories[0].id)
  const category = categories.find(item => item.id === selected)
  const visibleProducts = products.filter(product => product.category === selected)
  return <section id="productos" className="section-wrap catalog">
    <p className="eyebrow">Catálogo Malten</p>
    <h2>Productos.</h2>
    <p className="catalog-intro">Modelos definidos, organizados por sección. Estamos preparando el catálogo.</p>
    <nav className="category-nav" aria-label="Secciones de productos">{categories.map(item => <button key={item.id} type="button" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.name}</button>)}</nav>
    <div className="category-content" aria-live="polite">
      <h3>{category.name}</h3>
      {visibleProducts.length ? <div className="catalog-grid">{visibleProducts.map(product => <article className="catalog-card" key={product.id}>
        <img src={product.image} srcSet={`${product.imageSmall} 640w, ${product.image} 1280w`} sizes="(max-width: 760px) 100vw, 50vw" alt={product.alt} width="1280" height="853" loading="lazy" />
        <div><h4>{product.name}</h4><p>{product.description}</p><p>{product.dimensions}</p><strong>{new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }).format(product.priceUyu)}</strong></div>
      </article>)}</div> : <div className="catalog-empty"><Icon name="box" /><p>Todavía no hay modelos publicados en esta sección.</p></div>}
    </div>
  </section>
}
