# Contrato de contenido — Homepage en inglés (`/`)

**Fecha:** 9 de octubre de 2026
**Etapa:** 6.1, auditoría read-only (Claude, `feat/homepage`)
**Estado:** Inventario completo y decisiones cerradas por Erick (DEC-013).
Implementado en `feat/homepage`. La auditoría inicial se conserva abajo como
evidencia; la sección "Contrato final" manda.

Etiquetas (PROJECT_MASTER): CONFIRMADO, OBSERVACIÓN, HIPÓTESIS,
RECOMENDACIÓN, DESCONOCIDO, REQUIERE VALIDACIÓN DEV.

## Fuentes comparadas

| Fuente | Evidencia | Autoridad |
| --- | --- | --- |
| WordPress publicado | Export WXR `listasotechnology.WordPress.2026-10-08.xml`, página ID 11 `home` (Elementor), modificada el 2026-09-17 | Contenido vigente y publicado |
| Sitio en vivo | `GET https://listaso.com/`, 9 de octubre de 2026 (HTTP 200): metadata Yoast, header y footer | Lo que ve hoy el visitante |
| `start-version/` | `website/index.html` y `source/build/home_body.html` | Propuesta de rediseño. Evidencia, no fuente de verdad (PROJECT_MASTER) |
| Matriz | `docs/ROUTE_CONTENT_MATRIX.md`, fila `/`: GA 1921 sesiones, GSC 0 clics / 40 impresiones; "reconstruir misma URL; validar copy, assets y metadata" | Inventario |
| Activos | `public/brand/` y `src/content/brand/assets.ts` | Oficiales (DEC-012) |

**Hallazgo principal (CONFIRMADO).** Las dos fuentes de copy cuentan historias
distintas.
- **WordPress (en vivo).** Mensaje "Revolutionize your Sales and Distribution
  with Smart B2B Technology!". Grid de 7 productos, FIFOX, testimonios y blog.
- **`start-version`.** Otro H1, "Sell more. Deliver on time. Get paid faster.".
  Añade métricas (400+ distribuidores, $1.8B+ procesados, 2M+ órdenes),
  precios ($57.99/mes para SAMI y planes), tiempos de soporte y "1 de cada 3
  clientes lleva más de 5 años". Ninguno de esos datos aparece en el sitio
  publicado ni tiene fuente aprobada.

Usar `start-version` como copy base cambiaría el mensaje comercial, así que
requiere una decisión (D1).

## Metadata

| Campo | Valor | Evidencia | Estado |
| --- | --- | --- | --- |
| URL | `/` | Yoast, matriz | CONFIRMADO |
| Idioma | `en` | WP, en vivo | CONFIRMADO |
| `<title>` | `Home - Listaso Technology` | En vivo (Yoast; sin título SEO propio en WP) | CONFIRMADO. RECOMENDACIÓN: mejorarlo es una decisión SEO (D5) |
| Description | "Revolutionize your Sales and Distribution with Smart B2B Technology! Simplify your Sales, Inventory Management, and Delivery Processes with a seamless solution built and designed for Wholesalers and Manufacturers." | `_yoast_wpseo_metadesc` y en vivo | CONFIRMADO (213 caracteres; Google la truncará) |
| Canonical | `https://listaso.com/` | En vivo | CONFIRMADO |
| `og:title` / `og:site_name` / `og:type` / `og:locale` | `Home - Listaso Technology` / `Listaso Technology` / `website` / `en_US` | En vivo | CONFIRMADO |
| `og:image` | En vivo: `wp-content/uploads/2025/10/Meta-Home.jpg` (1920×1080, no local). En `start-version`: `og-listaso.jpg` (1200×630, wordmark "Listaso" escrito, no oficial) | — | PENDIENTE (D4) |
| robots | `noindex, nofollow` durante la prueba | DEC-006 | CONFIRMADO |
| hreflang | ninguno hasta tener paridad en español | Instrucción de la etapa | CONFIRMADO |

## Inventario por sección (orden del sitio en vivo)

| # | Sección | Propósito | Heading y copy | CTA → destino | Activos | Componente previsto | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Header | Navegación y conversión | Menú principal de WP: Products (Pre-Sales, Direct Sales, Inventory, B2B eCommerce, Back Office, Delivery, Custom Development); Integrations (QuickBooks, Sage, Acumatica, SAP, Zoho, Acctivate, AccountMate, NetSuite, Printers and Scanners); Plans; About Listaso (Join Us, Listaso Impact, Rate Listaso, Contact Us); Blog | "Request a Demo" → Calendly aprobado (DEC-011); "Log In" → `app.listaso.com/BOClassic/...` | Logo horizontal oficial | `SiteHeader` con disclosure nativo | CONFIRMADO (WP). HIPÓTESIS: DEC-011 añade `/support/` en Empresa, pero esa ruta aún no existe y no se enlaza |
| 2 | Hero | Propuesta de valor | H1 "Revolutionize your Sales and Distribution with Smart B2B Technology!"; P "Simplify your Sales, Inventory Management, and Delivery Processes with a seamless solution designed for Wholesalers, Distributors, and Manufacturers." | "Learn more about Listaso Technology" → `/join-us/` | Vídeo `home_video2.mp4` y galería de 5 JPG (medios de WP, no locales) | `HomeHero` | CONFIRMADO en WP. PENDIENTE: D1 (copy), D2 (CTA principal), D3 (medios) |
| 3 | Listaso 360 | Plataforma integral | "Listaso 360 automates your entire B2B Process" / "From Sales and Customer Purchases to Inventory Management and Deliveries, we've got you covered!" | — | Gráfico `flow_gradient1` (WP) | `PlatformIntro` | CONFIRMADO (copy). Activo PENDIENTE (D3) |
| 4 | Productos | Presentar soluciones | Encabezado "Keep your Sales and Logistics Teams perfectly in sync at all times!" (WP lo partía en P + H1: error de jerarquía). 7 tarjetas con H3 y P: Pre-Sales, Direct Sales, B2B eCommerce, Back Office, Inventory, Delivery, Custom Development | "View product" → `/pre-sales/`, `/direct-sales/`, `/b2b-ecommerce/`, `/back-office/`, `/inventory/`, `/delivery/`, `/custom-development/` | WP usa PNG propios (`card_*`, `i_*_gradient`). Logos de producto oficiales disponibles, pero sin mapeo confirmado | `ProductGrid` + `Card` | CONFIRMADO (copy y rutas). HIPÓTESIS: correspondencia producto → logo (D6). RECOMENDACIÓN: iconos semánticos mientras tanto |
| 5 | FIFOX | Otro producto o socio | H2 "FIFOX" y párrafo de WMS | "View product" → `http://www.fifox.com` (externo, http) | `mockup_fifox` (WP) | — | PENDIENTE (D7): DESCONOCIDO si FIFOX es producto de Listaso, socio o marca aparte |
| 6 | Testimonios | Prueba social | H2 "Your Feedback Powers Us: See What Customers Are Saying!" + intro. 6 citas con nombre y empresa (Mark Somwaru; Nazly Rojas, LADI; Emeterio Perez, Perez Distributing Fresno Inc.; Jesús Nuñez, Comercial Mexicana Internacional Inc.; Evelyn Alvarado, Boticas Mexicana; Eduardo Ch., Cecilia Bakery LLC) | — | — | `Testimonials` en carrusel con autoplay controlable, pausa por interacción y fallback de movimiento reducido | Publicado en WP. PENDIENTE (D8): la regla de Skills pide aprobación escrita para nombres y testimonios |
| 7 | Blog | Contenido | H2 "Get the Insights You Need to Succeed" | "Join Our Blog Community!" → `/blog/` (WordPress, DEC-011) | — | `BlogCta` | CONFIRMADO. Lista dinámica de artículos fuera de alcance |
| 8 | Footer | Navegación secundaria y contacto | Solutions (7 productos); About Listaso (Join Us, Listaso Impact, Contact Us, Plans, Blog); legales (Privacy Policy, Subscription Agreement, Terms & Conditions); Social (LinkedIn, YouTube, Instagram, Facebook); Contact (+1 305-912-7770, info@, cs@, sales@, Miami: 5966 S Dixie Hwy, Ste 300, South Miami, FL 33143); "Copyright © 2025 Listaso Technology - All Rights Reserved" | Mismos destinos | Logo | `SiteFooter` | CONFIRMADO. Newsletter (formulario Zoho) DESCARTADO en esta etapa: Zoho está fuera de alcance y no se crea un formulario falso. RECOMENDACIÓN: año del copyright (D9) |

## Secciones sólo en `start-version` (no publicadas)

| Sección | Contenido | Estado |
| --- | --- | --- |
| Franja de métricas | Since 2015; 400+ distributors; 2,000+ users; 2M+ orders/year; $1.8B+ processed in 2025 | DESCARTADO hasta que haya fuente aprobada (D1) |
| "From order to payment" | Flujo de 4 pasos (rep, almacén, chofer, oficina) y 4 extras | Copy sin claims numéricos. Reutilizable sólo si se aprueba `start-version` como fuente (D1) |
| SAMI | "Meet Sami", precio desde $57.99 | DESCARTADO en esta etapa: precio no aprobado y SAMI funcional fuera de alcance |
| Soporte | Tiempos de respuesta publicados, `sos@listaso.com` | DESCARTADO hasta aprobación |
| Precios | Planes Growth, Professional y Enterprise 360; precios de SAMI | DESCARTADO: precios no aprobados; `/plans/` sigue siendo el destino |
| Banda final | "See it working with your own products" + demo + teléfono | Reutilizable si D1 lo permite; el teléfono y `sales@` coinciden con el footer de WP |

## Analítica

**IDs observados en el sitio en vivo (OBSERVACIÓN):** GA4 `G-8G2Z9YQZLD` y GTM
`GTM-MSV6WDX6`; el mismo GTM aparece en `start-version`. No están
confirmados para el sitio nuevo, así que no se cargan scripts (DEC-011 y la
instrucción de la etapa).

**Eventos esperados** (documentados, no implementados):

| Evento | Disparador | Parámetros sugeridos |
| --- | --- | --- |
| `cta_demo_click` | Todos los CTA de demo | `location` (header, mobile-menu, hero, pricing-growth, pricing-professional, pricing-enterprise, final) |
| `cta_login_click` | "Log in" | `location` (header, mobile-menu) |
| `cta_secondary_click` | "Learn more about Listaso Technology" (hero) | `location` |
| `sami_cta_click` | "Meet Sami" (sección SAMI) | `location` |
| `product_card_click` | Enlaces de los 4 pasos de "How it works" | `label` |
| `nav_click` | Enlaces del menú | `menu`, `label` |
| `contact_click` | `tel:` y `mailto:` del footer | `channel` |

Los elementos llevarán atributos `data-analytics-*` neutros, para que GTM
pueda leerlos cuando se active, sin emitir eventos.

## Decisiones de Erick (9 de octubre de 2026)

| ID | Decisión |
| --- | --- |
| D1 | **Copy:** el de `start-version` completo. Se aprueban sus métricas, calificaciones, precios, tiempos de soporte, testimonios y logos de clientes |
| D2 | **CTA del hero:** "Book a free demo" (Calendly) como principal; "Learn more about Listaso Technology" → `/join-us/` como secundario |
| D3 | **Medios:** composición con activos oficiales, sin fotos ni vídeo |
| D4 | **OG image:** pendiente; no se publica `og:image` |
| D7 | **FIFOX:** se omite |
| D8 | **Testimonios:** se aprueban los 6, con nombre y empresa |
| Navegación | `start-version` + DEC-011: Support y Rate Listaso en Company; blog en `/blog/` |

**Aplicadas por Claude** (bajo impacto, reversibles):
- **D5:** title y description son los de `start-version`, porque esa es la
  fuente aprobada.
- **D6:** no se usan logos de producto en la Homepage. El copy de
  `start-version` no los necesita.
- **D9:** el copyright es el de `start-version`: "© 2026 Listaso Inc.".

## Contrato final (implementado)

### Revisión editorial del 12 de octubre de 2026

Codex revisó todas las cadenas visibles de la Homepage contra DEC-007,
DEC-013, `docs/BRAND_ANALYSIS.md` y la referencia de voz y tono de
`listaso-content-seo`.

- Se conservaron sin cambios de fondo los claims, cifras, precios, tiempos de
  soporte, integraciones, testimonios, clientes, destinos y condiciones
  comerciales aprobados por Erick.
- Se redujo el lenguaje absoluto o confrontativo, se acortó el hero y se
  explicaron términos como direct store delivery, variable weight y B2B.
- Se mejoraron metadata, navegación, headings, CTAs secundarios, labels,
  unidades de tiempo y descripciones accesibles de los mockups.
- Los testimonios permanecen textualmente iguales a la fuente aprobada.
- Validación posterior: lint, typecheck y build estático con webpack pasan;
  320 y 1440 px no presentan overflow horizontal en temas claro y oscuro.
  La jerarquía renderizada conserva un H1 y H2/H3 lógicos.

### Redirección visual del 12 de octubre de 2026

La Homepage adopta una composición editorial distinta de `start-version/`
sin cambiar el contenido ni la paleta aprobados:

- El hero combina fotografía operativa a gran escala con los ejemplos ya
  aprobados de pedido y Sami en dos superficies de vidrio como máximo.
- "From order to payment" deja la cuadrícula uniforme de tarjetas y pasa a
  una secuencia numerada junto a una fotografía fija durante parte del scroll.
- Los encabezados aparecen desde una máscara de texto; los grupos usan
  entradas cortas y escalonadas con un desenfoque gaussiano transitorio de
  5–8 px, y los medios usan opacidad, traslación y escala. No hay scroll
  hijacking ni `backdrop-filter` animado.
- `HomeMotion` es una mejora progresiva con `IntersectionObserver`: el
  contenido es visible por defecto, se respeta `prefers-reduced-motion` y no
  se añadió GSAP ni otra dependencia.
- La conversación de SAMI reutiliza el patrón y la secuencia del componente
  `components/sami-conversation.tsx` incluido en el ZIP **Guide Sami Listaso
  AI**. La adaptación conserva el copy aprobado de esta Homepage, se ejecuta
  en loop sólo mientras permanece dentro del viewport y la pestaña está
  visible, conserva el punto de la secuencia al detenerse e incluye un control
  de pausa/reanudación. Con `prefers-reduced-motion` muestra directamente el
  estado final y elimina el movimiento.
- El fondo de SAMI suma dos orbes cromáticos de gradiente que se desplazan
  lentamente sólo con `transform`; el panel usa un borde luminoso estático y
  vidrio oscuro acotado. No se incorporaron filtros SVG, desenfoques globales
  ni nuevas dependencias.
- El header, los dropdowns de escritorio y el menú móvil adaptan el lenguaje
  de Neon Glass Context Menu con vidrio estático, borde cromático enmascarado y
  una entrada de 220 ms. Los colores provienen de roles semánticos de Listaso,
  por lo que responden a tema claro/oscuro y conservan fallbacks sólidos para
  transparencia reducida, falta de soporte y colores forzados.
- El logo de SAMI comparte línea con el badge “NEW · AI ASSISTANT”. Su hover
  reutiliza `NoticeLogo` de Guide Sami: rotación progresiva con retorno inercial
  y aura azul/aqua. Sólo responde a puntero no táctil; con movimiento reducido
  permanece estático.
- Las fotografías de Unsplash son placeholders autohospedados y optimizados.
  No representan clientes, empleados ni instalaciones de Listaso.
- El footer reorganiza la navegación, oficinas, contacto, redes y legales en
  una superficie editorial. Una banda final permite abrir una consulta
  precargada sobre Listaso en cuatro asistentes externos; el prompt exige usar
  `/llms.txt`, separar hechos de inferencias y citar las fuentes oficiales.
  Los logotipos identifican destinos externos y no declaran integraciones. El
  lockup oficial de Listaso tiene un parallax CSS progresivo, estático con
  movimiento reducido y sin JavaScript.

| Archivo | Fuente | Autor | Dimensiones | Peso | Estado |
| --- | --- | --- | --- | --- | --- |
| `public/images/home/warehouse-aisle.webp` | `https://unsplash.com/photos/M7G_m5XJ-go` | Russ Murray | 1000×1250 | 201,764 bytes | Placeholder hero; dentro del límite de 200 KiB |
| `public/images/home/operations-shelving.webp` | `https://unsplash.com/photos/rN6zOBGSZjM` | Adrien Olichon | 960×640 | 65,916 bytes | Placeholder de sección; dentro del límite de 80 KiB |

El manifiesto técnico y las instrucciones de reemplazo están en
`src/content/media/placeholders.ts`.

| # | Sección | Componente | Contenido | CTA → destino | Activos | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| — | Header | `SiteHeader` | Navegación de `start-version` + DEC-011 | Log in → `app.listaso.com/BOClassic/site/login.aspx`; Book a demo → Calendly | Logo horizontal oficial (navy y blanco según tema) | CONFIRMADO |
| 1 | Hero | `HomeHero` | Eyebrow, H1 "Sell more. Deliver on time. Get paid faster.", lead, calificaciones (4.7 Google, 5.0 QuickBooks App Store) | Book a free demo → Calendly; Learn more about Listaso Technology → `/join-us/` | Fotografía Unsplash temporal; ejemplos de pedido y Sami en vidrio; SAMI WebP | CONFIRMADO |
| 2 | Cifras | `ProofStrip` | 5 cifras (Since 2015, 400+, 2,000+, 2M+, $1.8B+) | — | — | CONFIRMADO (D1) |
| 3 | Cómo funciona | `HowItWorks` | 4 pasos + 4 capacidades | `/pre-sales/`, `/inventory/`, `/delivery/`, `/back-office/`, `/b2b-ecommerce/`, `/forms/`, `/integrations/`, `/industries/` | Fotografía Unsplash temporal; iconos Listaso | CONFIRMADO |
| 4 | SAMI | `SamiSpotlight` + `SamiConversation` | Badge, H2 orientado a respuestas desde los datos del negocio, lead, 4 chips, precio "From $57.99" | Meet Sami → `/sami/` | SAMI WebP; conversación animada reutilizada de Guide Sami | CONFIRMADO (D1) |
| 5 | Soporte | `SupportSection` | Lenguaje no confrontativo, tabla de tiempos de respuesta, horario, cita AH/Quickchoice y puntuaciones | How support works → `/support/` | — | CONFIRMADO (D1) |
| 6 | Clientes | `CustomerProof` | 6 testimonios + 8 logos de clientes; 5 logos enlazan a los destinos entregados con `nofollow` | — | `public/customers/` (los tres recursos nuevos fueron entregados por Erick y optimizados localmente) | CONFIRMADO (D1, D8) |
| 7 | Precios | `PricingPlans` | Growth $57.99, Professional $67.99, Enterprise 360 $77.99 (anual $48.33 / $56.66 / $64.99), notas, add-on de Sami | Book a demo → Calendly; Compare every feature → `/plans/`; Meet Sami → `/sami/` | SAMI WebP | CONFIRMADO (D1) |
| 8 | Banda final | `FinalCta` | H2 "See Listaso with your products and workflow", lead, teléfono (opción 2), `sales@` | Book a free demo → Calendly; `tel:+13059127770,2`; `mailto:sales@listaso.com` | — | CONFIRMADO |
| — | Footer | `SiteFooter` | Oficinas Miami y El Salvador; Products, Integrations y Company; contacto; redes; legales; accesos externos de IA basados en `/llms.txt`; "© 2026 Listaso Inc." | Rutas del footer; ChatGPT, Gemini, Perplexity y Claude | Logo oficial de Listaso y marcas identificadoras de los asistentes | CONFIRMADO para contenido Listaso; enlaces de asistentes sujetos a cambios de terceros |

**Excepciones a `start-version`** (todas justificadas):
- Los carruseles de reseñas pasan a una cuadrícula estática: todo el contenido
  queda visible sin JavaScript.
- El selector mensual/anual es un grupo de radios nativo, sin JavaScript.
- El mockup de teléfono se recompone con vidrio y tokens.
- No hay selector de tema ni de idioma (DEC-007; `/es/` sin paridad).

## Estado de los destinos enlazados

| Tipo | Rutas |
| --- | --- |
| Implementada en esta app | `/` |
| Existen en el sitio publicado (WordPress), todavía no en esta app | `/pre-sales/`, `/direct-sales/`, `/inventory/`, `/delivery/`, `/back-office/`, `/b2b-ecommerce/`, `/custom-development/`, `/quickbooks/`, `/sage/`, `/acumatica/`, `/sap/`, `/netsuite/`, `/zoho/`, `/acctivate/`, `/accountmate/`, `/printers-and-scanners/`, `/plans/`, `/join-us/`, `/listaso-impact/`, `/rating/`, `/contact-us/`, `/blog/`, `/privacy-policy/`, `/subscription-agreement/`, `/terms-and-conditions/` |
| Rutas nuevas aprobadas (`start-version`), sin página todavía | `/forms/`, `/sami/`, `/integrations/`, `/about/`, `/industries/`, `/support/` |
| Externos | Calendly (DEC-011), `app.listaso.com` (login), LinkedIn, YouTube, Instagram, Facebook |

En el preview de Cloudflare, los destinos que no son `/` responden 404 hasta
implementarse. No hay ningún `href="#"`.

## Pendientes

- **OG image (D4):** falta una imagen oficial de 1200×630 o la aprobación para
  descargar `Meta-Home.jpg`.
- **FIFOX (D7):** confirmar qué es y si vuelve a la Homepage.
- **JSON-LD `Organization`:** existe en `start-version`, pero se omitió porque
  no se revisó contra datos confirmados (`legalName`, `sameAs`, etc.).
- **Analytics:** confirmar los IDs vigentes y el plan de eventos antes de
  cargar GTM o GA4.
