import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { build } from 'vite'
import { products } from '../src/data/products.js'

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
    title: 'Malten 3D Lab | Impresión 3D y páginas web en Minas',
    description: 'Impresión 3D personalizada y creación de páginas web en Minas, Uruguay. Regalos, decoración, piezas funcionales y soluciones digitales para tu negocio.',
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

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

// Shared links must describe the item even for clients that never run JavaScript.
const catalogHtml = await readFile(new URL('../dist/productos.html', import.meta.url), 'utf8')
const directory = new URL('../dist/fichas/', import.meta.url)
await mkdir(directory, { recursive: true })
for (const product of products) {
  const target = '/productos?producto=' + encodeURIComponent(product.id)
  const shareUrl = origin + '/fichas/' + product.id + '.html'
  const title = escapeHtml(product.name + ' · Malten 3D Lab')
  const price = product.priceUyu == null ? '' : '$' + product.priceUyu.toLocaleString('es-UY') + ' UYU. '
  const description = escapeHtml(price + product.description)
  const imageTags = product.image
    ? '<meta property="og:image" content="' + escapeHtml(origin + product.image) + '" /><meta property="og:image:alt" content="' + escapeHtml(product.alt) + '" />'
    : ''
  let html = replaceRequired(catalogHtml, /<title>[^<]*<\/title>/, '<title>' + title + '</title>')
  for (const [selector, value] of [
    ['name="description"', description],
    ['property="og:title"', title],
    ['property="og:description"', description],
    ['property="og:url"', escapeHtml(shareUrl)],
  ]) {
    html = replaceRequired(html, new RegExp('<meta ' + selector + ' content="[^"]*"\\s*\\/>'), '<meta ' + selector + ' content="' + value + '" />')
  }
  html = html.replace('href="' + origin + '/productos"', 'href="' + origin + target + '"')
  html = html.replace('</head>', imageTags + '<meta name="malten-product" content="' + escapeHtml(product.id) + '" /></head>')
  await writeFile(new URL(product.id + '.html', directory), html)
}
