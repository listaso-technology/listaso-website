# Products hub — contrato editorial y de medios (EN)

**Fecha:** 27 de octubre de 2026  
**Ruta:** `/products/`  
**Estado:** Implementado en `dev`; copy nuevo pendiente de revisión de Erick.

## Propósito y contenido

`/products/` reúne las nueve rutas de producto existentes. El hero, la agrupación
por tarea y el cierre hacia Integrations son copy editorial nuevo para este hub;
las descripciones de cada producto se reutilizan de `src/content/products/shared.ts`.
No se presentan grupos como planes, paquetes ni disponibilidad comercial.

| Elemento | Copy actual | Estado |
| --- | --- | --- |
| H1 | *From the first order* to the final delivery | RECOMENDACIÓN editorial; revisar |
| Lead | Explore the Listaso tools for your sales team, warehouse, drivers, customers and office. | RECOMENDACIÓN editorial; revisar |
| CTA principal | Explore products → ancla local | Implementado |
| CTA secundario | See integrations → `/integrations/` | Implementado |
| Índice | Field sales; Inventory & delivery; Customer ordering; Office & more | Agrupación editorial, no comercial |
| Cierre de conexiones | Your products and your accounting system → `/integrations/` | RECOMENDACIÓN editorial; revisar |

La metadata, canonical y Open Graph se generan con `pageMetadata`. La ruta
mantiene `noindex, nofollow` por la política de foundation; no añadirla al
sitemap ni habilitar indexación hasta la revisión editorial y SEO.

## Apps oficiales

Los destinos de `src/content/products/hub.ts` se contrastaron el 27 de octubre
de 2026 con las fichas públicas de Listaso, Inc. en Apple App Store y Google
Play. Se muestran como enlaces externos con el nombre exacto de cada app.

| Página seleccionada | Apps enlazadas |
| --- | --- |
| Pre-sales | Listaso Sales (Apple, Google); Listaso Sales Order & Catalog (Apple, Google) |
| Direct store delivery | Listaso Van Sales (Apple, Google) |
| Inventory | Listaso Advanced Inventory (Google) |
| Delivery | Listaso Delivery (Google) |
| B2B e-Commerce | Listaso eCommerce (Apple, Google); Listaso B2B Sales (Apple) |
| Enlace adicional | Listaso Advanced (Apple), sin asignar un módulo exclusivo |

**REQUIERE VALIDACIÓN Producto:** la asociación de cada app con la página del
sitio antes de publicación. La app histórica Listaso Customer Order Catalog
permanece fuera del hub porque DEC-012 la marca como descontinuándose, aunque
su ficha siga en Google Play. Las fichas son evidencia de existencia y nombre;
sus ratings, promesas y fechas no se trasladaron al copy.

## Marcos para imágenes de Diseño

El explorador reserva un marco 8:5 con `data-media-slot` por producto. La
ilustración vectorial actual ocupa ese mismo marco y puede sustituirse por un
asset optimizado sin alterar la jerarquía. Los briefs completos viven en
`src/content/products/hub.ts` (`mediaBriefs`).

| Slot | Imagen solicitada |
| --- | --- |
| `pre-sales` | Representante tomando pedido en tienda con pantalla real |
| `direct-sales` | Venta desde camión con contexto de inventario y factura |
| `inventory` | Escaneo en almacén y flujo reconocible |
| `delivery` | Confirmación de entrega en destino |
| `b2b-ecommerce` | Cliente haciendo pedido en tienda móvil B2B |
| `back-office` | Captura autorizada de Back Office |
| `forms` | Encuesta o captura de foto durante visita |
| `sami` | Conversación con datos ilustrativos aprobados |
| `custom-development` | Ejemplo autorizado sin datos de cliente |

Entrega recomendada: WebP/AVIF autohospedado, tamaños responsive y peso de
tarjeta ≤ 80 KB cuando sea viable. No usar marcas o datos de terceros sin
permiso. La sustitución debe revisar alt, recorte, claro/oscuro y 320–1440 px.

## Interacción y movimiento

- El hero usa SVG inline y cuatro nodos HTML. Los nodos entran una vez para
  explicar el recorrido; con `prefers-reduced-motion` quedan estáticos.
- La elección de producto usa botones `aria-pressed`. En móvil el detalle aparece
  bajo la fila elegida; en escritorio ocupa un panel lateral.
- Todas las nueve páginas conservan un enlace directo en el HTML, también si
  JavaScript no inicia. El panel inicial muestra Pre-sales.
- Las apps se abren en otra pestaña y llevan `external_appstore_click`; los
  enlaces de producto llevan `product_card_click`. Los atributos no activan
  analytics por sí solos.

## Comprobaciones

`pnpm lint`, `pnpm typecheck`, `pnpm build --webpack` y `git diff --check`
pasaron. El export incluye `/products/` con un H1, canonical y noindex.
Revisión local en navegador: 390 px claro y 1440 px oscuro, selección de
Inventory, 320 y 768 px sin overflow horizontal, cero errores de consola.
Quedan pendientes revisión editorial de Erick, confirmación de asociaciones
app-producto, medios finales y QA con movimiento reducido en dispositivo real.
