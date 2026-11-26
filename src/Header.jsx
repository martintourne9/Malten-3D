import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import './header.css'

const sections = [
  ['Inicio', '/#inicio', 'home'],
  ['Qué hacemos', '/#servicios', 'wrench'],
  ['Cómo pedir', '/#como-pedir', 'steps'],
  ['Páginas web', '/#proyecto', 'code'],
  ['Productos', '/productos', 'grid'],
  ['Contacto', '/#contacto', 'message'],
]

export default function Header({ isCatalog }) {
  const [open, setOpen] = useState(false)
  const header = useRef(null)
  const toggle = useRef(null)
  useEffect(() => {
    if (!open) return
    function dismiss(event) {
      if (!header.current.contains(event.target)) setOpen(false)
    }
    function escape(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current.focus()
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('focusin', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('focusin', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [open])
  return <header ref={header} className="masthead">
    <a href="/#inicio" className="brand" aria-label="Malten 3D Lab, inicio" onClick={() => setOpen(false)}>MALTEN<span>3D LAB</span></a>
    <div className="masthead-tools">
      <a href="/productos" aria-current={isCatalog ? 'page' : undefined}><Icon name="grid" />Productos</a>
      <button type="button" ref={toggle} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="principal"><Icon name={open ? 'close' : 'menu'} />Menú</button>
    </div>
    <nav id="principal" aria-label="Navegación principal" data-open={open}>
      {sections.map(([label, href, icon]) => <a key={href} href={href} onClick={() => setOpen(false)} aria-current={isCatalog && href === '/productos' ? 'page' : undefined}>
        <Icon name={icon} />{label}
      </a>)}
    </nav>
  </header>
}
