# SEO de las rutas públicas de Malten

Actualización: 15 de noviembre de 2026.

## Problema corregido

La portada y `/productos` respondían con el mismo HTML inicial y los mismos metadatos, sin canonical. Google pudo renderizar el catálogo en la prueba en directo, pero la respuesta inicial no distinguía las dos páginas. Esto era una debilidad técnica; Search Console no confirmó que fuera la causa de la exclusión.

## Implementación

- `npm run build` genera los recursos Vite y ejecuta `scripts/prerender.mjs`.
- `src/entry-server.jsx` renderiza los mismos componentes React y los mismos datos del catálogo que utiliza el navegador. No mantiene una copia manual de productos, precios ni descripciones.
- La portada se escribe en `dist/index.html`; el catálogo completo en `dist/productos.html`.
- Cada HTML contiene un título, una descripción, metadatos Open Graph y una canonical propios.
- Las reescrituras de Vercel para `/productos` y `/productos/` apuntan al HTML del catálogo. La canonical de ambas variantes es `/productos`.
- React mantiene el montaje y las interacciones existentes en el navegador. No se cambia a hidratación ni se agregan dependencias.
- El archivo de verificación de Google, robots.txt, sitemap y enlaces a PrintCost permanecen disponibles.

## Verificación antes de publicar

Compilación de cliente y renderizado estático correctos. Se comprobó una canonical y un H1 por página, 15 productos en el catálogo inicial, existencia de imágenes y scripts referenciados, enlaces a PrintCost y conservación exacta del script de retorno de autenticación. `git diff --check` sin errores.

## Límite

La accesibilidad y los metadatos correctos no garantizan la indexación. Al realizar este cambio, Search Console aún mostraba las dos URLs como descubiertas y sin indexar. El sitemap ya se había procesado correctamente con dos URLs. No confundir una prueba en directo satisfactoria con inclusión confirmada en el índice.
