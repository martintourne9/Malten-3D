export default function Malten3DLabLanding() {
  const services = [
    {
      title: "Impresión 3D personalizada",
      description:
        "Creamos productos funcionales, decorativos y a medida para personas, emprendedores y negocios que necesitan algo distinto, útil y bien hecho.",
      bullets: [
        "Soportes y accesorios",
        "Piezas personalizadas",
        "Productos decorativos y funcionales",
      ],
    },
    {
      title: "Páginas web con IA",
      description:
        "Desarrollamos webs modernas, rápidas y claras para que tu negocio tenga presencia online profesional sin complicaciones innecesarias.",
      bullets: [
        "Landing pages",
        "Webs para emprendedores",
        "Sitios pensados para vender",
      ],
    },
    {
      title: "Optimización de procesos",
      description:
        "Te ayudamos a ordenar tareas, ahorrar tiempo y mejorar la forma en que funciona tu negocio con soluciones simples y prácticas.",
      bullets: [
        "Orden operativo",
        "Mejora de tiempos",
        "Enfoque práctico para negocios reales",
      ],
    },
  ];

  const examples = [
    "Soportes para celular y escritorio",
    "Lámparas y piezas decorativas en 3D",
    "Macetas y productos personalizados",
    "Landing pages para comercios y emprendedores",
    "Presencia digital para negocios locales",
    "Mejoras simples para procesos de trabajo",
  ];

  const featuredWorks = [
    {
      title: "Lámparas 3D",
      text: "Piezas con diseño moderno, presencia visual y gran valor percibido para vender mejor.",
    },
    {
      title: "Soportes funcionales",
      text: "Productos útiles para escritorio, celular y organización, pensados para el uso diario.",
    },
    {
      title: "Macetas decorativas",
      text: "Diseños con personalidad para regalos, decoración y ventas por encargo.",
    },
    {
      title: "Webs para emprendedores",
      text: "Páginas claras, rápidas y modernas para mostrar servicios y generar consultas.",
    },
  ];

  const faqs = [
    {
      q: "¿Hacen trabajos personalizados?",
      a: "Sí. Tanto en impresión 3D como en páginas web, cada proyecto se adapta a la necesidad real del cliente.",
    },
    {
      q: "¿Cuánto demora una web?",
      a: "Depende de la complejidad, pero la idea es trabajar con velocidad y claridad para que puedas empezar a mostrar tu negocio cuanto antes.",
    },
    {
      q: "¿Trabajan con negocios pequeños?",
      a: "Sí. Malten 3D Lab está pensado especialmente para emprendedores, comercios y proyectos que quieren crecer de forma inteligente.",
    },
    {
      q: "¿Puedo pedir presupuesto sin compromiso?",
      a: "Sí. Podés contar tu idea y evaluamos la mejor forma de llevarla a algo útil, claro y vendible.",
    },
  ];

  const whatsappLink =
    "https://wa.me/59899999101?text=Hola%2C%20vengo%20desde%20la%20web%20de%20Malten%203D%20Lab%20y%20quiero%20consultar%20por%20sus%20servicios.";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-black tracking-tight">Malten 3D Lab</div>
            <div className="text-xs text-slate-500">
              Soluciones reales para emprendedores y negocios
            </div>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#servicios" className="hover:text-slate-600">
              Servicios
            </a>
            <a href="#ejemplos" className="hover:text-slate-600">
              Ejemplos
            </a>
            <a href="#faq" className="hover:text-slate-600">
              Preguntas
            </a>
            <a href="#contacto" className="hover:text-slate-600">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-200" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                Impresión 3D · Webs con IA · Optimización de procesos
              </div>
              <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Ayudo a emprendedores y negocios a verse mejor, vender mejor y trabajar mejor.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                En Malten 3D Lab combinamos impresión 3D, diseño web con inteligencia artificial y mejora de procesos para crear soluciones útiles, modernas y pensadas para negocios reales.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contacto"
                  className="rounded-2xl bg-slate-900 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  Pedir presupuesto
                </a>
                <a
                  href="#servicios"
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-4 text-center font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  Ver servicios
                </a>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Rápido", "Soluciones claras y directas"],
                  ["Personalizado", "Cada proyecto se adapta a vos"],
                  ["Práctico", "Tecnología aplicada a resultados"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="font-bold">{title}</div>
                    <div className="mt-1 text-sm text-slate-600">{text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
                <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
                  <div className="text-sm uppercase tracking-[0.3em] text-slate-400">
                    Malten 3D Lab
                  </div>
                  <div className="mt-4 text-2xl font-bold leading-snug">
                    Soluciones tecnológicas con enfoque real.
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      ✔ Productos impresos en 3D personalizados y funcionales
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      ✔ Páginas web modernas para mostrar y vender mejor
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      ✔ Mejora práctica de procesos para ahorrar tiempo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
              Sobre la marca
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              No hacemos cosas por hacer. Creamos herramientas útiles para crecer.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Malten 3D Lab nace para ayudar a personas y negocios a resolver necesidades reales con una mezcla de creatividad, tecnología y sentido práctico. La idea no es complicar: es encontrar la forma más clara de que tu proyecto se vea mejor, funcione mejor y tenga más valor.
            </p>
          </div>
        </section>

        <section id="servicios" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
                Servicios
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                Tres formas concretas de ayudarte a avanzar.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Desde productos físicos hasta presencia online y mejoras operativas. Todo pensado para gente que quiere resultados y no vueltas.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <h3 className="text-2xl font-black tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-xl bg-slate-100 px-4 py-3"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
                Por qué elegirnos
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                Tecnología útil, trato directo y foco en resultados.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Atención personalizada",
                "Soluciones simples que funcionan",
                "Velocidad para avanzar sin trabas",
                "Pensado para negocios pequeños y emprendedores",
                "Diseño moderno con utilidad real",
                "Enfoque comercial y práctico",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 p-5 text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ejemplos" className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
                Qué podemos crear
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                Ejemplos de soluciones que podemos desarrollar.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Cada proyecto cambia según la necesidad del cliente, pero estos son algunos ejemplos reales del tipo de trabajo que podemos hacer.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {examples.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
              Trabajos destacados
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Una muestra clara de lo que Malten 3D Lab puede hacer.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Estos bloques sirven para mostrar tus mejores trabajos y darle más confianza a quien entra. Después podés reemplazar cada tarjeta por proyectos reales con fotos tuyas.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredWorks.map((work) => (
              <div
                key={work.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-4 h-44 rounded-[1.5rem] bg-gradient-to-br from-slate-200 via-slate-100 to-white" />
                <h3 className="text-2xl font-black tracking-tight">
                  {work.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">{work.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
              Preguntas frecuentes
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              Lo importante, dicho claro.
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-[1.5rem] border border-slate-200 p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold">{faq.q}</h3>
                <p className="mt-3 leading-7 text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="rounded-[2rem] bg-white p-8 shadow-xl md:p-12">
              <div className="text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
                Contacto
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
                Si tenés una idea, la bajamos a algo real.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Ya sea un producto en 3D, una web para tu negocio o una mejora en tus procesos, la idea es simple: entender lo que necesitás y transformarlo en una solución útil, clara y profesional.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-slate-900 px-6 py-4 text-center font-semibold text-white shadow-lg"
                >
                  Escribime por WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/malten3dlab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-300 px-6 py-4 text-center font-semibold text-slate-900"
                >
                  Ver Instagram
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Contacto directo por WhatsApp e Instagram para consultas, presupuestos y pedidos por encargo.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-black">Malten 3D Lab</div>
            <div className="text-sm text-slate-500">
              Impresión 3D, webs con IA y soluciones prácticas para negocios.
            </div>
          </div>
          <div className="text-sm text-slate-500">Uruguay · Atención por encargo</div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 rounded-full bg-slate-900 px-5 py-4 text-sm font-bold text-white shadow-2xl transition hover:-translate-y-0.5"
        >
          WhatsApp
        </a>
      </footer>
    </div>
  );
}
