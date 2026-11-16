import { readFile, writeFile } from 'node:fs/promises'
import { build } from 'vite'

await build({
  publicDir: false,
  build: { ssr: 'src/entry-server.jsx', outDir: 'dist-ssr', emptyOutDir: true },
})
const { render } = await import('../dist-ssr/entry-server.js')
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const origin = 'https://malten-3-d.vercel.app'
const pages = [
  {
    path: '/', file: 'index.html',
    title: 'Malten 3D Lab | Impresión 3D personalizada en Minas',
    description: 'Impresión 3D personalizada en Minas, Uruguay. Regalos, decoración, placas, artículos para comercios y piezas funcionales. Envíos a todo el país.',
  },
  {
    path: '/productos', file: 'productos.html',
    title: 'Catálogo de productos impresos en 3D | Malten 3D Lab',
    description: 'Explorá el catálogo de Malten 3D Lab: lámparas, floreros, macetas, accesorios y exhibidores impresos en 3D. Consultá por tu modelo desde Minas, Uruguay.',
  },
]

function replaceRequired(html, pattern, replacement) {
  if (!(typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html))) {
    throw new Error(`Missing HTML template field: ${pattern}`)
  }
  return html.replace(pattern, () => replacement)
}

for (const page of pages) {
  let html = replaceRequired(template, '<!--app-html-->', render(page.path))
  html = replaceRequired(html, /<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
  html = replaceRequired(html, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${page.description}" />`)
  for (const [property, value] of [['og:title', page.title], ['og:description', page.description], ['og:url', origin + page.path]]) {
    html = replaceRequired(html, new RegExp(`<meta property="${property}" content="[^"]*"\\s*\\/>`), `<meta property="${property}" content="${value}" />`)
  }
  html = replaceRequired(html, /<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${origin + page.path}" />`)
  await writeFile(new URL(`../dist/${page.file}`, import.meta.url), html)
  console.log(`Prerendered ${page.path} → ${page.file}`)
}
