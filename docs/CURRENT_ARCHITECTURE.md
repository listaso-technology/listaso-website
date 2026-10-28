# Arquitectura actual

## Actualización: hubs Products e Integrations (27 de octubre de 2026)

`/products/` es un nuevo índice EN de las nueve páginas de producto. Su copy
está separado en `src/content/products/hub.ts`; el explorador interactivo vive
en `src/components/sections/products/` y reserva marcos 8:5 para los medios
definitivos de Diseño. La ruta es estática y sólo el explorador es Client
Component. El hub existente `/integrations/` enlaza ahora al índice de
Products. Menú y footer incluyen `All Products`. Ambas rutas siguen `noindex`.
Ver `docs/PRODUCTS_HUB_CONTENT_CONTRACT.md` para copy, apps y pendientes.

La descripción histórica siguiente refleja el estado de foundation del 9 de
octubre; `docs/WORKLOG.md` registra las páginas comerciales posteriores.

**Actualizado:** 9 de octubre de 2026

## Aplicación nueva

```text
src/
├── app/          routing, layout, metadata y globals
│   ├── (site)/       shell público (header, main, footer) y la Homepage `/`
│   └── foundation/   muestra interna de la foundation visual (noindex)
├── components/
│   ├── layout/   Container, SiteHeader, SiteFooter, NavDisclosures (único Client Component)
│   ├── sections/ secciones de página; home/ para la Homepage
│   ├── ui/       Button, TextLink, Card, GlassPanel, FormField, StatusMessage
│   ├── icons/    Icon semántico y datos generados (icon-data.ts)
│   └── brand/    BrandAsset y ThemedLogo
├── features/     capacidades de negocio justificadas
├── content/
│   ├── brand/    manifiesto de activos de marca (assets.ts)
│   ├── site/     navegación, contacto y legales (inglés)
│   └── home/     copy de la Homepage en inglés (en.ts)
├── lib/
│   └── utils/    utilidades enfocadas (cx)
├── styles/       tokens, base y motion compartido
└── types/        tipos realmente compartidos

public/
├── brand/        logos oficiales de Listaso, productos, SAMI y legacy
├── customers/    logos de clientes (de start-version, DEC-013)
├── images/
├── icons/
├── fonts/
└── llms.txt     guía pública para asistentes y descubrimiento de fuentes

assets/icons/     fuentes internas de iconos (no públicas) y mapa semántico
scripts/          build-icons.mjs (`pnpm icons`)
```

- Next.js 16.4, React 19.3, TypeScript 5.9 y ESLint 9.
- Tailwind CSS 4.3 mediante PostCSS; la detección de clases se limita a `src/`.
- **Tokens.** `src/styles/tokens.css` define primitivas, roles semánticos claros
  y oscuros (sistema u override `data-theme`) y los contextos `band` y `sami`.
  El tema de Tailwind sólo expone esos roles y las escalas aprobadas.
- **Componentes.** Server Components por defecto. Los estados, los temas, los
  menús (`<details>`) y el selector de precios funcionan sin JavaScript. El
  único Client Component, `NavDisclosures`, añade Escape y clic fuera a los
  menús.
- **Contenido.** El copy vive en `src/content/` y la presentación en
  `src/components/`.
- **Páginas implementadas.** `/` (Homepage inglesa, DEC-013) y `/foundation/`
  (interna).
- **Footer.** Directorio editorial responsive con contacto, redes y legales;
  publica `/llms.txt` y ofrece accesos externos a ChatGPT, Gemini, Perplexity y
  Claude con una consulta precargada basada en esa guía. El lockup oficial de
  Listaso usa parallax CSS progresivo, sin cliente ni dependencia de animación.
- **Tipografía.** Montserrat todavía no está autohospedada; se usa la pila de
  respaldo.
- Static export a `out/`, `trailingSlash` e imágenes sin runtime de servidor.
- Foundation `noindex` y robots bloqueado.
- Aún no hay otras páginas comerciales, analytics activo, SAMI funcional, Zoho,
  GSAP ni tests.

## Referencia heredada

`start-version/` contiene el generador Python, HTML estático bilingüe, CSS, JS,
assets, metadata, redirects e integraciones heredadas. Es read-only, no participa
en lint, tipos o build, y no es source of truth automático para contenido.

## Deployment

**Ramas.** Sólo `dev`, `qa` y `main` (DEC-021). `dev` integra el trabajo
activo, `qa` valida y `main` conserva la propuesta estable para las
validaciones presenciales.
`main` no implica todavía un cutover productivo: el dominio y DNS no se
modifican hasta una autorización posterior de Erick.

**GitHub Actions.** El check `CI / Quality` valida cada push y PR a `dev` y
`main`.

**Cloudflare Pages.** Publica previews por rama en `*.listaso-website.pages.dev`
(ver `docs/CI_CLOUDFLARE.md`).
