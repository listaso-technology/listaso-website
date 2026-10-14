# Contrato de contenido — Páginas de producto en inglés

**Fecha:** 13 de octubre de 2026
**Agente:** Claude, `feat/homepage` (en paralelo con Codex; sin tocar sus
archivos reservados)
**Estado:** Implementado, pendiente de revisión de Erick.

Etiquetas (PROJECT_MASTER): CONFIRMADO, OBSERVACIÓN, HIPÓTESIS,
RECOMENDACIÓN, DESCONOCIDO, REQUIERE VALIDACIÓN DEV.

## Instrucción de origen

Erick pidió el 12 de octubre de 2026 implementar las nueve páginas de
Products con el copy de referencia existente y fotografías de Unsplash como
relleno temporal, en tema claro y oscuro, sin modificar el trabajo de Codex.
Se registra como DEC-014 (propuesta en `docs/DECISIONS.md`).

**Fuente de copy (CONFIRMADO):** `start-version/source/build/pages.py`
(`product_page`, `R`, `related`, `int_section`), `pages_more.py`
(`sami_body`, `SAMI_FAQ`, `forms_body`) y `lsbuild.py` (`phero`,
`cta_band`). Se usó el texto en inglés tal cual, con dos ajustes de forma:

- etiquetas alineadas con la navegación ya revisada ("Forms and surveys",
  "Excel and PDF reports", "Works with ChatGPT and Claude");
- "pick &amp; pack" pasa a "pick and pack".

No se añadieron claims, cifras, precios, integraciones ni compromisos.

## Rutas implementadas

| Ruta | Title | Hero (eyebrow / H1) | Plan | Secciones | Relacionados |
| --- | --- | --- | --- | --- | --- |
| `/pre-sales/` | Mobile Order Taking App for Sales Reps \| Listaso | Pre-sales app / *Take orders faster* with every customer's prices in hand | Included in every plan, from Growth at $57.99 per user a month | Features (9), A store visit (4 pasos) | DSD, Forms, Sami |
| `/direct-sales/` | Direct Store Delivery (DSD) & Van Sales App \| Listaso | Direct store delivery (DSD) / *Sell, invoice and collect* right from the truck | Included from Professional, $67.99 per user a month | Features (9), For your drivers (4 checks + hardware + factura impresa) | Inventory, Delivery, Pre-sales |
| `/inventory/` | Warehouse & Inventory App for Distributors \| Listaso | Inventory app / *Know what you have* in every warehouse and every truck | Included from Professional. Lot tracking, multi-bin and truck loading in Enterprise 360. | Features (9), Fresh product (6 checks + lotes FIFO + Which plan?) | Delivery, DSD, Back Office |
| `/delivery/` | Delivery App with Routes & Proof of Delivery \| Listaso | Delivery app / *Deliver on time* and prove every delivery | Included from Professional. Delivery route planner in Enterprise 360. | Features (6), Why it matters (4 checks + ruta del día) | Inventory, DSD, Back Office |
| `/back-office/` | Back Office for Sales, Inventory & Routes \| Listaso | Back Office / *One office system* for all your sales and inventory | Included in every plan | Features (9), Better decisions (4 checks + Meet Sami + flujo de pedidos) | Forms, Sami, Custom |
| `/b2b-ecommerce/` | B2B Online Store for Distributors \| Listaso | B2B online store / *Take orders* even while you sleep | Professional includes 40 customer logins. Enterprise 360: unlimited. | Features (3 destacadas + 6) | Pre-sales, Back Office, DSD |
| `/forms/` | Retail Execution: Forms & Surveys for Store Visits \| Listaso | New · Forms and surveys / *Know what happens* at every store visit | Included in Enterprise 360 | How it works (4), Question types (12), Ideas (3) | Pre-sales, Back Office, Sami |
| `/sami/` | Sami: AI Assistant for Distributors \| Listaso | Badge New · AI assistant / *Meet Sami.* Ask your business anything. | From $57.99 a month · first month free | Examples (6), Included (4), Pricing (3 planes + SAMI Credit), FAQ (6) | — (como en la fuente) |
| `/custom-development/` | Custom Development & Reports for Distributors \| Listaso | Custom development / *Made for the way* your business works | — (la fuente no tiene) | What we build (3), How it works (4) | Back Office, Sami, Forms |

Todas las páginas de producto, salvo Forms y Sami, incluyen la franja de
integraciones (como `product_page` en la fuente). Todas cierran con el
`FinalCta` de la Homepage.

**CTAs.** Hero: "Book a free demo" (Calendly, DEC-011) y "See pricing" →
`/plans/`. Sami: "Start my free month" (Calendly) y "See pricing" →
`#sami-pricing`, ambas etiquetas de la fuente.

**Metadata.** Title y description de la fuente; canonical
`https://listaso.com/<ruta>/`; Open Graph básico (`type`, `url`,
`site_name`, `title`, `description`, `locale`). Siguen `noindex, nofollow`
por el layout raíz (DEC-006). Sin hreflang, sin `og:image` y sin JSON-LD.

**Analytics.** Atributos `data-analytics-*` neutros, sin scripts:
`cta_demo_click` (`<ruta>-hero`, `sami-pricing-<plan>`), `cta_secondary_click`,
`product_card_click` (tarjetas relacionadas) y `sami_cta_click`
(`back-office`).

## Ejemplos ilustrativos

Los mocks (pedido, inventario del camión, lista de picking, lotes FIFO,
parada entregada, dashboard, flujo de pedidos, tienda B2B, encuesta, plan de
proyecto) son composiciones ilustrativas, igual que en la Homepage:

- reutilizan los nombres y productos de ejemplo ya aprobados en
  `src/content/home/en.ts` (Mercado La Esperanza, Tienda El Sol, Carnicería
  Jalisco, Panadería La Fe; tortillas, queso fresco, horchata, jalapeños);
- se exponen como una sola imagen accesible (`role="img"` + descripción) con
  el detalle interno `aria-hidden`;
- las cantidades de stock, lotes, fechas y barras del dashboard son
  ilustrativas y no representan métricas de Listaso.

La encuesta de Forms reemplaza el cliente de ejemplo de la fuente
("&Alaska, Inc.") por el de la Homepage, para no mostrar una empresa real.

## Fotografía temporal (DEC-009)

Nueve imágenes de Unsplash, licencia gratuita (ninguna Unsplash+, verificado
con el endpoint de descarga de cada foto), autohospedadas y optimizadas en
WebP. Recortes elegidos para no mostrar marcas de terceros. Manifiesto con
autor, URL y brief de reemplazo: `src/content/media/products.ts`.

| Archivo | Uso | Autor | Tamaño | Peso |
| --- | --- | --- | --- | --- |
| `presales-tablet-order.webp` | Hero Pre-sales | Björn Antonissen | 1000×1250 | 97.6 KB |
| `dsd-produce-crates.webp` | Hero DSD | Ali Nuredini | 1000×1250 | 148.8 KB |
| `inventory-warehouse-floor.webp` | Hero Inventory | Adrian Sulyok | 1000×1250 | 173.5 KB |
| `inventory-forklift.webp` | Planes de Inventory | Homa Appliances | 640×800 | 66.0 KB |
| `delivery-hand-truck.webp` | Hero Delivery | Richard Stachmann | 1000×1250 | 145.0 KB |
| `delivery-driver-van.webp` | Why it matters | Polina Kuzovkova | 880×660 | 66.5 KB |
| `backoffice-dashboards.webp` | Hero Back Office | Apex Virtual Education | 1000×1250 | 81.1 KB |
| `forms-produce-shelf.webp` | Encuesta e Ideas de Forms | Hanz Dela Cruz | 640×800 | 74.7 KB |
| `custom-whiteboard.webp` | Hero Custom development | Kaleidico | 1200×900 | 59.8 KB |

Todos dentro del presupuesto (hero ≤ 200 KB, tarjeta ≤ 80 KB). Se
descartaron candidatas con marcas visibles (Renault, Square, SpotOn, Cova,
Columbia, Hyster, Apple, cajas con marca). B2B online store no usa foto: su
hero es la tienda ilustrada.

## Excepciones a `start-version`

- Grids de 3 columnas de la fuente pasan a listas tipo ficha técnica con
  icono Listaso por función.
- B2B: tres funciones destacadas (Made for each customer, Quick reorders,
  Invoice payments) y las otras seis en lista; mismo copy.
- "A store visit", "From the office to the store and back" y "How it works"
  se presentan como recorridos numerados.
- FAQ de Sami con `<details>` nativos; no hay JSON-LD `FAQPage`.
- Breadcrumb visible (Home / página); el JSON-LD `BreadcrumbList` de la
  fuente se omite, igual que el resto de structured data.
- La tira de ERPs omite la etiqueta "Certified" de QuickBooks hasta
  confirmarla.

## Decisiones abiertas (para Erick)

| ID | Pregunta | Estado actual |
| --- | --- | --- |
| P1 | ¿Se aprueban los precios y planes de las líneas de plan (Growth $57.99, Professional $67.99, 40 customer logins, Enterprise 360)? | Publicados en la fuente y coherentes con DEC-013 (Homepage). Implementados |
| P2 | ¿Se aprueba el SAMI Credit ($9.99) y el aviso al 80 %? | De la fuente; no estaba en la Homepage. Implementado |
| P3 | ¿Se aprueban los modelos de hardware nombrados (Zebra, Bixolon, Woosim, Star Micronics, Socket Mobile, Brother)? | De la fuente. Implementado como texto, sin logos |
| P4 | ¿QuickBooks "Certified"? | Omitido |
| P5 | Producto → logo (D6 de la Homepage): ¿usar los logos oficiales de Delivery, Back Office, eCommerce, Van Sales y Warehouse/Advanced Inventory en sus páginas? | Sin logos de producto; se usan iconos Listaso |
| P6 | JSON-LD (`BreadcrumbList`, `SoftwareApplication`, `FAQPage`) | Omitido hasta validar datos |
| P7 | `og:image` por página | Pendiente (igual que la Homepage) |
| P8 | Versión en español (`/es/...`) | Fuera de alcance |
