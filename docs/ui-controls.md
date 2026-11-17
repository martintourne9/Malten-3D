# Botones e iconos — 17 de noviembre de 2026

## Cambios
- Familia SVG de trazo uniforme para servicios, categorías, WhatsApp, Instagram, navegación y cierre de fichas. Iconos decorativos ocultos a lectores de pantalla.
- Botones principales con contraste verde oscuro, texto y flecha alineados; acciones secundarias con borde y fondos suaves.
- Filtros del catálogo con icono y estado seleccionado; fichas con consulta destacada y cierre de 44 px.
- Foco de teclado visible, estados de interacción y respeto por movimiento reducido.
- Ajustes de espaciado en móvil y tablet, conservando las seis secciones del menú.

## Verificación
- npm run build: correcto; prerenderizado de inicio y /productos.
- git diff --check: correcto.
- Vista previa en marcos de 320, 390, 820 y 1280 px: sin desborde horizontal de página.
- Menú móvil: seis enlaces de 44 px; catálogo: filtro Lámparas muestra dos modelos; ficha abre, conserva imagen y enlace de consulta, y cierra con Escape.
- Destinos y atributos de enlaces comparados con HEAD: sin cambios.
- Datos de productos, precios, seguimiento de eventos y lógica de fichas sin cambios.
