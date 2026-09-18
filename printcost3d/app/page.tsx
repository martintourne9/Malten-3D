import Link from "next/link";

export default function Landing() {
  const proPrice = Number(process.env.PRO_PRICE_UYU || 199);
  return (
    <main className="landing">
      <header className="landingNav"><div className="brand"><span className="logoMark">P3</span><span>PrintCost 3D</span></div><div><Link href="/login" className="ghostBtn">Entrar</Link><Link href="/signup" className="primaryBtn">Crear cuenta</Link></div></header>
      <section className="heroLanding">
        <div><div className="eyebrow">HECHO PARA MAKERS QUE VENDEN</div><h1>Dejá de adivinar cuánto cobrar por una impresión 3D.</h1><p>Calculá material, horas de máquina, electricidad, trabajo, fallas y margen real. Guardá tus presupuestos y conocé la rentabilidad antes de aceptar el trabajo.</p><div className="heroActions"><Link href="/signup" className="primaryBtn big">Empezar gratis</Link><span>5 cotizaciones gratis por mes</span></div></div>
        <div className="mockCard"><div className="eyebrow">Cotización #024</div><h3>Cartel personalizado</h3><div className="mockPrice"><span>Costo real</span><b>$ 286</b></div><div className="mockPrice accent"><span>Precio sugerido</span><b>$ 640</b></div><div className="mockProfit">Ganancia estimada <b>$ 354</b></div></div>
      </section>
      <section className="featureStrip"><div><b>Material</b><span>Precio real por gramo</span></div><div><b>Máquina</b><span>Amortización por hora</span></div><div><b>Fallas</b><span>Reserva de riesgo</span></div><div><b>Margen</b><span>Margen bruto correcto</span></div></section>
      <section className="pricingLanding"><div className="eyebrow">PRECIOS SIMPLES</div><h2>Probalo gratis. Pagá cuando realmente te sirva.</h2><div className="pricingCards"><article><h3>Free</h3><strong>$0</strong><p>5 cotizaciones por mes, historial y configuración básica.</p></article><article className="featuredPrice"><span className="pill">Recomendado</span><h3>Pro</h3><strong>${proPrice} <small>UYU/mes</small></strong><p>Cotizaciones ilimitadas, pensado para quien ya vende impresiones.</p><Link href="/signup" className="primaryBtn full">Crear cuenta</Link></article></div></section>
    </main>
  );
}
