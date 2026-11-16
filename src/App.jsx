import Catalog from './Catalog'
import Icon from './Icon'
import { products } from './data/products'
import { recordWhatsappClick } from './analytics'

const instagram = 'https://www.instagram.com/malten3dlab/'
const whatsapp = (message) => `https://wa.me/59899999101?text=${encodeURIComponent(message)}`
const generalInquiry = whatsapp('Hola, vengo desde la web de Malten 3D Lab. Quiero consultar por una idea o pieza personalizada. Tengo una referencia para mostrarles.')
const services = [
  { number: '01', title: 'Regalos y personalizados', description: 'Llaveros, souvenirs y detalles para regalar, recordar una fecha o darle tu identidad a un objeto.', examples: 'Nombres · Colores · Diseños por encargo', cta: 'Consultar por un personalizado', message: 'Hola, quiero consultar por un regalo o souvenir personalizado. La idea y cantidad son:' },
  { number: '02', title: 'Decoración y hogar', description: 'Lámparas, floreros, macetas y objetos que suman diseño a tus espacios. Explorá los modelos del catálogo.', examples: 'Lámparas · Floreros · Macetas', cta: 'Consultar por decoración', message: 'Hola, me interesa un producto de decoración de Malten. El modelo o referencia es:' },
  { number: '03', title: 'Piezas y soluciones', description: 'Soportes, accesorios y evaluación de repuestos o réplicas de piezas plásticas. Vemos cada caso según su uso, medidas y material.', examples: 'Soportes · Accesorios · Reposición de piezas', cta: 'Evaluar mi pieza', message: 'Hola, necesito evaluar una pieza para imprimir en 3D. Puedo enviar fotos, medidas y explicar para qué se usa.' },
  { number: '04', title: 'Identidad y comercios', description: 'Placas de puerta, cartelería, llaveros con identidad y exhibidores. Objetos para presentar tu marca o identificar tu espacio.', examples: 'Placas · Carteles · Artículos para negocios', cta: 'Consultar por mi proyecto', message: 'Hola, quiero consultar por una placa, cartel o producto para mi negocio. Necesito:' },
]
const steps = [
  { title: 'Contanos qué imaginás.', text: 'Mandanos una foto, un boceto o una referencia. Sumá medidas aproximadas, cantidad y para qué lo necesitás.' },
  { title: 'Evaluamos tu proyecto.', text: 'Revisamos si podemos realizarlo y definimos diseño, material, opciones, presupuesto y plazo antes de empezar.' },
  { title: 'Coordinamos la entrega.', text: 'Una vez confirmado el trabajo, acordamos la producción y la entrega en Minas o el envío a otro punto de Uruguay.' },
]
const instagramExamples = [
  { title: 'Placas de puerta', detail: 'Números, nombres e identidad para tu espacio.', url: 'https://www.instagram.com/malten3dlab/reel/DbZb6yCxv2r/' },
  { title: 'Reparación y réplica de piezas', detail: 'Una posibilidad para resolver una pieza plástica, previa evaluación.', url: 'https://www.instagram.com/malten3dlab/reel/DdKHnpDxgXB/' },
  { title: 'Ideas para regalar', detail: 'Souvenirs, colores y pequeños detalles con personalidad.', url: 'https://www.instagram.com/malten3dlab/p/DdW46r7xgrg/' },
]
function ProductImage({ id, eager = false, className }) {
  const product = products.find(item => item.id === id)
  return <img className={className} src={product.imageSmall} srcSet={`${product.imageSmall} 640w, ${product.image} 1280w`} sizes="(max-width: 760px) 50vw, 28vw" alt={product.alt} width={product.imageWidth} height={product.imageHeight} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} />
}
export default function App({ pathname = typeof window === 'undefined' ? '/' : window.location.pathname }) {
  const isCatalog = /^\/productos\/?$/.test(pathname)
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <a href="/#inicio" className="brand" aria-label="Malten 3D Lab, inicio">MALTEN<span>3D LAB</span></a>
      <nav aria-label="Navegación principal"><a className="nav-home" href="/#inicio">Inicio</a><a href="/#servicios">Qué hacemos</a><a href="/#como-pedir">Cómo pedir</a><a className="nav-products" href="/productos" aria-current={isCatalog ? 'page' : undefined}><Icon name="box" />Productos</a><a className="nav-contact" href="/#contacto">Hablemos</a></nav>
    </header>
    <main onClick={recordWhatsappClick} id="contenido" className={isCatalog ? 'catalog-page' : undefined}>
      {isCatalog ? <Catalog /> : <>
        <section id="inicio" className="hero home-hero section-wrap">
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><Icon name="pin" /> Minas, Uruguay · Impresión por encargo</p>
              <h1>Impresión 3D<br />para <span>tus ideas.</span></h1>
              <p className="hero-description">Un regalo, algo para tu casa, una pieza que necesitás resolver o una idea para tu negocio. En Malten le damos forma con impresión 3D.</p>
              <div className="hero-actions"><a className="button primary" href={generalInquiry} target="_blank" rel="noopener noreferrer"><Icon name="message" />Contanos tu idea</a><a className="hero-catalog-link" href="/productos">Explorar productos <span aria-hidden="true">↗</span></a></div>
              <p className="hero-delivery">Desde Minas, Lavalleja · Envíos a todo Uruguay</p>
            </div>
            <div className="hero-mosaic" aria-label="Una muestra de los productos de Malten">
              <a href="/productos" className="mosaic-tall"><ProductImage id="lampara-espiral" eager /><span>Para tus espacios</span></a>
              <a href="/productos"><ProductImage id="cubos-sorpresa" /><span>Para regalar</span></a>
              <a href="/productos"><ProductImage id="soporte-celular" /><span>Para el día a día</span></a>
            </div>
          </div>
          <div className="hero-rule"><span>DECORACIÓN · PERSONALIZADOS · PIEZAS FUNCIONALES</span><span>UNA IDEA ES EL PUNTO DE PARTIDA</span></div>
        </section>
        <section id="servicios" className="section-wrap services home-services">
          <div className="section-heading"><p className="eyebrow">Qué podemos crear</p><h2>Muchas posibilidades.<br />Tu necesidad primero.</h2></div>
          <div className="service-grid">{services.map(service => <article className="service" key={service.number}><div className="service-marker"><Icon name={service.number === '03' ? 'wrench' : 'box'} /><span className="service-number">{service.number}</span></div><h3>{service.title}</h3><p>{service.description}</p><p className="examples">{service.examples}</p><a className="text-link" href={whatsapp(service.message)} target="_blank" rel="noopener noreferrer">{service.cta}<span aria-hidden="true">↗</span></a></article>)}</div>
          <p className="custom-note">¿No encontrás lo que buscás? El catálogo es una muestra. Mandanos tu referencia y evaluamos si podemos hacerlo.</p>
        </section>
        <section id="comercios" className="section-wrap home-showcase" aria-labelledby="showcase-title">
          <div className="showcase-heading"><div><p className="eyebrow">Del diseño al objeto</p><h2 id="showcase-title">Distintas ideas.<br />El mismo cuidado.</h2></div><a className="hero-catalog-link" href="/productos">Ver el catálogo completo <span aria-hidden="true">↗</span></a></div>
          <div className="sample-grid">{[
            ['maceta-acanalada', 'Decorar', 'Objetos para tus espacios'],
            ['anillo-riego', 'Resolver', 'Accesorios con una función'],
            ['portalapices-trenzado', 'Organizar', 'Diseño para el día a día'],
            ['exhibidores-personalizados', 'Mostrar', 'Piezas para tu negocio'],
          ].map(([id, label, text]) => <a href="/productos" className="sample-item" key={id}><ProductImage id={id} /><div><span>{label}</span><h3>{text}</h3><span aria-hidden="true">↗</span></div></a>)}</div>
        </section>
        <section id="como-pedir" className="section-wrap order-section" aria-labelledby="order-title">
          <div className="section-heading"><p className="eyebrow">Del primer mensaje a tu pedido</p><h2 id="order-title">No necesitás llegar<br />con todo resuelto.</h2></div>
          <ol className="order-steps">{steps.map((step, index) => <li key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
          <a className="button primary" href={generalInquiry} target="_blank" rel="noopener noreferrer"><Icon name="message" />Consultar por mi idea</a>
        </section>
        <section id="instagram" className="section-wrap instagram-section" aria-labelledby="instagram-title">
          <div className="showcase-heading"><div><p className="eyebrow">Más de Malten</p><h2 id="instagram-title">Lo que compartimos<br />en Instagram.</h2></div><a className="hero-catalog-link" href={instagram} target="_blank" rel="noopener noreferrer">Ver @malten3dlab <span aria-hidden="true">↗</span></a></div>
          <div className="instagram-examples">{instagramExamples.map(item => <a href={item.url} target="_blank" rel="noopener noreferrer" key={item.url}><h3>{item.title}<span aria-hidden="true">↗</span></h3><p>{item.detail}</p><span className="instagram-link-label">Ver publicación en Instagram</span></a>)}</div>
        </section>
        <section id="proyecto" className="project section-wrap">
          <div className="project-intro"><p className="eyebrow">También creamos herramientas web</p><h2>PrintCost 3D</h2><p>Nuestra calculadora gratuita para conocer los costos y el precio de venta de una impresión 3D. Ingresá material, tiempo y otros costos, y ajustá el margen sin registrarte.</p><a className="button secondary" href="https://printcost3d.vercel.app/calculadora-costos-impresion-3d" target="_blank" rel="noopener noreferrer">Calculadora de costos de impresión 3D</a></div>
          <div className="project-detail"><span className="project-label">TU NEGOCIO, TAMBIÉN ONLINE</span><p className="web-service-copy">Además de los objetos, desarrollamos páginas, catálogos digitales y herramientas web. Definimos cada proyecto según lo que necesitás.</p><a className="text-link" href={whatsapp('Hola, quiero consultar por una página o herramienta web para mi negocio.')} target="_blank" rel="noopener noreferrer">Consultar por una solución web<span aria-hidden="true">↗</span></a></div>
        </section>
        <section id="contacto" className="section-wrap contact">
          <div><p className="eyebrow">Hablemos de tu próximo proyecto</p><h2>Tu idea puede<br /><span>empezar acá.</span></h2></div>
          <div className="contact-copy"><p>Contanos qué necesitás. Con una foto o referencia, medidas aproximadas, cantidad y fecha podemos empezar a evaluar tu pedido.</p><a className="button primary" href={generalInquiry} target="_blank" rel="noopener noreferrer"><Icon name="message" />Hablar con Malten por WhatsApp</a><p className="contact-note">Confirmamos viabilidad, presupuesto y plazo antes de producir. Minas, Lavalleja · Envíos a todo Uruguay.</p></div>
        </section>
      </>}
    </main>
    <footer className="section-wrap footer"><a className="brand" href="/#inicio">MALTEN<span>3D LAB</span></a><p>Minas, Uruguay</p><a href="https://printcost3d.vercel.app/calculadora-costos-impresion-3d" target="_blank" rel="noopener noreferrer">PrintCost 3D · Calculadora gratuita</a><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a></footer>
  </>
}
