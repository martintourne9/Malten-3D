import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'

// Enter the usual catalogue route so Back, the cart and filters work on shared links.
const sharedProduct = document.querySelector('meta[name="malten-product"]')?.content
if (sharedProduct) {
  document.title = 'Catálogo de productos impresos en 3D | Malten 3D Lab'
  const url = new URL(window.location.href)
  url.pathname = '/productos'
  url.searchParams.set('producto', sharedProduct)
  window.history.replaceState(window.history.state, '', url)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {import.meta.env.PROD && <Analytics />}
  </StrictMode>,
)
