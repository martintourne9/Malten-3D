import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Render the same components used in the browser; product data stays in one place.
export function render(pathname) {
  return renderToString(<App pathname={pathname} />)
}
