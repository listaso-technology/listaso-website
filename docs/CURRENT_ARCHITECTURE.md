# Arquitectura actual

**Actualizado:** 9 de octubre de 2026

## Aplicación nueva

```text
src/
├── app/          routing, layout, metadata y globals
│   └── foundation/   muestra interna de la foundation visual (noindex)
├── components/
│   ├── ui/       Button, TextLink, Card, GlassPanel, FormField, StatusMessage
│   ├── icons/    Icon semántico y datos generados (icon-data.ts)
│   └── brand/    BrandAsset y ThemedLogo
├── features/     capacidades de negocio justificadas
├── content/
│   └── brand/    manifiesto de activos de marca (assets.ts)
├── lib/
│   └── utils/    utilidades enfocadas (cx)
├── styles/       tokens, base y motion compartido
└── types/        tipos realmente compartidos

public/
├── brand/        logos oficiales de Listaso, productos, SAMI y legacy
├── images/
├── icons/
└── fonts/

assets/icons/     fuentes internas de iconos (no públicas) y mapa semántico
scripts/          build-icons.mjs (`pnpm icons`)
```

- Next.js 16.4, React 19.3, TypeScript 5.9 y ESLint 9.
- Tailwind CSS 4.3 mediante PostCSS; la detección de clases se limita a `src/`.
- **Tokens.** `src/styles/tokens.css` define primitivas, roles semánticos claros
  y oscuros (sistema u override `data-theme`) y los contextos `band` y `sami`.
  El tema de Tailwind sólo expone esos roles y las escalas aprobadas.
- **Componentes.** Todos son Server Components. Los estados y temas funcionan
  sin JavaScript.
- **Tipografía.** Montserrat todavía no está autohospedada; se usa la pila de
  respaldo.
- Static export a `out/`, `trailingSlash` e imágenes sin runtime de servidor.
- Foundation `noindex` y robots bloqueado.
- Aún no hay páginas migradas, analytics, SAMI funcional, Zoho, GSAP ni tests.

## Referencia heredada

`start-version/` contiene el generador Python, HTML estático bilingüe, CSS, JS,
assets, metadata, redirects e integraciones heredadas. Es read-only, no participa
en lint, tipos o build, y no es source of truth automático para contenido.

## Deployment

**Ramas.** `dev` integra el trabajo activo y `main` conserva la propuesta
estable para las validaciones presenciales. No hay rama `qa` en esta etapa.
`main` no implica todavía un cutover productivo: el dominio y DNS no se
modifican hasta una autorización posterior de Erick.

**GitHub Actions.** El check `CI / Quality` valida cada push y PR a `dev` y
`main`.

**Cloudflare Pages.** Publica previews por rama en `*.listaso-website.pages.dev`
(ver `docs/CI_CLOUDFLARE.md`).
