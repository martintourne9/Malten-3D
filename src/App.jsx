import Catalog from './Catalog'
import Icon from './Icon'

const instagram = 'https://www.instagram.com/malten3dlab/'
const whatsapp = (message) => `https://wa.me/59899999101?text=${encodeURIComponent(message)}`
const generalInquiry = whatsapp('Hola, vengo desde la web de Malten 3D Lab. Quiero consultar por un proyecto.')
const services = [
  { number: '01', title: 'Tu marca, en un objeto.', description: 'Llaveros personalizados, exhibidores y cartelería para mostrar tu negocio. También lámparas y regalos por encargo.', examples: 'Llaveros · Exhibidores · Cartelería · Lámparas', cta: 'Consultar por un producto', message: 'Hola, quiero consultar por un producto personalizado en 3D. Necesito:' },
  { number: '02', title: 'Una pieza para resolverlo.', description: 'Soportes, accesorios y piezas a medida. Mandanos una foto y las medidas para evaluar si podemos fabricarla en 3D.', examples: 'Soportes · Accesorios · Reposición de piezas', cta: 'Consultar por una pieza', message: 'Hola, necesito evaluar una pieza para imprimir en 3D. Tengo fotos y medidas.' },
  { number: '03', title: 'Tu negocio, también online.', description: 'Páginas para presentar tus servicios, catálogos digitales y herramientas web. Definimos el alcance según lo que necesitás.', examples: 'Páginas web · Catálogos · Herramientas de cálculo', cta: 'Consultar por una web', message: 'Hola, quiero consultar por una página o herramienta web para mi negocio.' },
]
export default function App() {
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <a href="#inicio" className="brand" aria-label="Malten 3D Lab, inicio">MALTEN<span>3D LAB</span></a>
      <nav aria-label="Navegación principal"><a className="nav-home" href="#inicio">Inicio</a><a href="#servicios">Qué hacemos</a><a href="#proyecto">Proyecto web</a><a className="nav-products" href="#productos"><Icon name="box" />Productos</a><a className="nav-contact" href="#contacto">Hablemos</a></nav>
    </header>
    <main id="contenido">
      <section id="inicio" className="hero section-wrap">
        <p className="eyebrow"><Icon name="pin" /> Minas, Uruguay · Trabajo por encargo</p>
        <h1>Objetos que sirven.<br /><span>Ideas que toman forma.</span></h1>
        <div className="hero-bottom"><p>Impresión 3D personalizada y desarrollo web para personas, comercios y emprendedores.</p><a className="button primary" href={generalInquiry} target="_blank" rel="noopener noreferrer"><Icon name="message" />Contanos qué necesitás</a></div>
        <div className="hero-rule"><span>DEL OBJETO A LA WEB</span><span>HECHO A MEDIDA</span></div>
      </section>
      <section id="servicios" className="section-wrap services">
        <div className="section-heading"><p className="eyebrow">Qué hacemos</p><h2>Tres formas de dar<br />el próximo paso.</h2></div>
        <div className="service-grid">{services.map(service => <article className="service" key={service.number}><div className="service-marker"><Icon name={service.number === '01' ? 'box' : service.number === '02' ? 'wrench' : 'code'} /><span className="service-number">{service.number}</span></div><h3>{service.title}</h3><p>{service.description}</p><p className="examples">{service.examples}</p><a className="text-link" href={whatsapp(service.message)} target="_blank" rel="noopener noreferrer">{service.cta}</a></article>)}</div>
        <a className="portfolio-link" href={instagram} target="_blank" rel="noopener noreferrer">Mirá nuestros trabajos de impresión 3D en Instagram</a>
      </section>
      <Catalog />
      <section id="proyecto" className="project section-wrap">
        <div className="project-intro"><p className="eyebrow">Un proyecto propio</p><h2>PrintCost 3D</h2><p>Una herramienta web para estimar costos de impresión y calcular el precio de una pieza según sus materiales, tiempo y margen.</p><a className="button secondary" href="https://printcost3d.vercel.app/calculadora-costos-impresion-3d" target="_blank" rel="noopener noreferrer">Probar la calculadora</a></div>
        <div className="project-detail"><span className="project-label">DEL DATO AL PRECIO</span><ol><li><span>01</span>Material y peso</li><li><span>02</span>Tiempo y otros costos</li><li><span>03</span>Margen y precio de venta</li></ol><p>Un ejemplo de las herramientas que desarrollamos.</p></div>
      </section>
      <section id="contacto" className="section-wrap contact">
        <div><p className="eyebrow">Empecemos por tu necesidad</p><h2>¿Qué querés<br /><span>hacer realidad?</span></h2></div>
        <div className="contact-copy"><p>Contanos qué necesitás, para cuándo y, si corresponde, la cantidad. Con eso evaluamos el trabajo y te pasamos un presupuesto.</p><a className="button primary" href={generalInquiry} target="_blank" rel="noopener noreferrer"><Icon name="message" />Consultar por WhatsApp</a><p className="contact-note">Coordinamos plazos y entrega antes de empezar.</p></div>
      </section>
    </main>
    <footer className="section-wrap footer"><a className="brand" href="#inicio">MALTEN<span>3D LAB</span></a><p>Minas, Uruguay</p><a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a></footer>
  </>
}
