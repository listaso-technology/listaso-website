# Handoff: Páginas de producto en inglés

```text
Tarea: nueve páginas de Products (EN) con el estilo de la Homepage, claro y oscuro
Estado: complete (pendiente de revisión de Erick)
Agente implementador: Claude, en paralelo con Codex (footer)
Branch: feat/homepage
Working tree: cambios sin commit; commit, push y PR no autorizados
Archivos reservados: ninguno (liberados)
```

## Coordinación con Codex

Codex tiene reservados `SiteFooter.*`, `navigation.ts`, `ai-assistants.ts`,
`public/llms.txt`, `public/brand/ai/*`, `docs/CURRENT_ARCHITECTURE.md`,
`docs/HOME_CONTENT_CONTRACT.md` y `docs/WORKLOG.md`. **No se tocaron.** Tampoco
se modificó ningún componente de la Homepage: se importan sin cambios
`SectionHeader`, `Signature`, `backdrops.module.css`, `FinalCta`, `HomeMotion`,
`SamiConversation`, `SamiLogoMark`, `GlassPanel`, `Button`, `Card` y
`TextLink`.

Al liberar la reserva, conviene copiar a `docs/WORKLOG.md` y
`docs/CURRENT_ARCHITECTURE.md` los bloques sugeridos al final de este
documento.

## Archivos

**Añadidos.**
- Rutas: `src/app/(site)/{pre-sales,direct-sales,inventory,delivery,back-office,b2b-ecommerce,forms,sami,custom-development}/page.tsx`.
- Contenido: `src/content/products/` (`types.ts`, `shared.ts` y un archivo por
  página).
- Medios: `src/content/media/products.ts` y 9 WebP en `public/images/products/`.
- Componentes: `src/components/sections/product/`
  - compartidos: `ProductHero`, `Breadcrumbs`, `PhotoStage`, `ProductSection`,
    `FeatureGrid` (+ `FeatureList`), `CheckList`, `StepRail`,
    `RelatedProducts`, `IntegrationsBand`;
  - por página: `pre-sales/`, `direct-sales/`, `inventory/`, `delivery/`,
    `back-office/`, `b2b-ecommerce/`, `forms/`, `sami/`,
    `custom-development/`.
- `src/lib/page-metadata.ts`: metadata con canonical y Open Graph, mismo
  patrón que la Homepage.
- `docs/PRODUCT_CONTENT_CONTRACT.md` y este handoff.

**Modificados.**
- `assets/icons/icon-map.json` y `src/components/icons/icon-data.ts`
  (`pnpm icons`): 28 iconos Listaso nuevos, sólo añadidos; ningún mapeo
  existente cambió.
- `docs/DECISIONS.md`: DEC-014.

## Diseño

- **Mismo lenguaje que la Homepage.** Hero en banda de marca (`brandMesh`),
  H1 con firma, fotografía 4:5 con ejemplos en vidrio (máximo dos superficies),
  reveals de `HomeMotion` y cierre con `FinalCta`.
- **Una idea por página.** Pre-sales: recorrido de visita en 4 pasos. DSD:
  inventario del camión que baja tras la venta y factura impresa. Inventory:
  lista de picking y rotación de lotes FIFO. Delivery: parada firmada y ruta
  del día. Back Office: dashboard y flujo de pedidos del vendedor al camión.
  B2B: la tienda del cliente como hero. Forms: la encuesta en tableta y los
  12 tipos de pregunta. Sami: lienzo SAMI, conversación animada, precios y
  FAQ. Custom development: pizarra y plan de proyecto.
- **Temas.** Todo consume tokens semánticos. Los mocks del hero fijan
  `data-theme="light"` (son UI de producto sobre la banda, como el vidrio
  claro); los del cuerpo siguen el tema. La factura impresa de DSD es papel
  y queda clara en ambos temas.
- **Sin JavaScript nuevo.** Ningún Client Component nuevo. FAQ con
  `<details>`. Sami reutiliza `SamiConversation` (cliente, de Codex).

## Validaciones

| Comprobación | Resultado |
| --- | --- |
| `pnpm typecheck` | 0 |
| `pnpm lint` | 0 (se corrigió un `<a href="/">` → `Link`) |
| `pnpm build` (Turbopack, export estático) | 0; 14 rutas estáticas, incluidas las 9 nuevas |
| HTML exportado | 185–240 KB por página (27–40 KB gzip); Homepage 281 KB |
| Rutas en `next dev` (:3000) | 9 × 200 |
| Estructura (9 páginas) | 1 `h1`, sin saltos de heading, sin IDs duplicados, todas las imágenes con `alt`, `aria-labelledby` válidos, sin `href="#"` |
| Metadata | title y description de la fuente, canonical correcto, `noindex, nofollow` |
| Overflow horizontal a 375 px | 0 en las 9 |
| Contraste AA, texto sobre fondo sólido | Claro: 623 textos, 0 fallos. Oscuro: 623, 0 fallos. Únicas excepciones: 3 numerales decorativos `aria-hidden` en B2B |
| Revisión visual | 1440 px claro y oscuro en las 9; 375 px en Delivery y B2B |
| `start-version/` | 0 cambios |

**No medido automáticamente:** el texto sobre vidrio, gradiente o foto
(≈ 210 nodos). Usa las recetas ya validadas en la Homepage (vidrio claro con
tokens propios y banda con tokens `on-band`, mínimo 4.8:1). Reduced motion,
transparencia reducida y colores forzados heredan los fallbacks existentes,
pero no se emularon.

## Warnings

- **Iconos en el bundle cliente.** `SamiConversation` (cliente) importa
  `Icon`, así que `icon-data.ts` completo viaja al cliente en `/` y `/sami/`.
  Con los 28 iconos nuevos pasa de 43 KB a 78 KB sin comprimir (26.5 KB
  gzip). RECOMENDACIÓN: separar los glifos de los componentes cliente o
  generar un módulo por icono (`listaso-web-performance`).
- **`HomeMotion` y `.home-motion-ready`** ahora sirven a todas las páginas.
  RECOMENDACIÓN: renombrarlos a algo genérico cuando Codex libere esos
  archivos.
- **OBSERVACIÓN:** `HowItWorks.tsx` (Homepage) usa `border-line-strong`, que
  no existe en los tokens; no se tocó.
- **Header.** No marca la página activa (`aria-current`): requiere editar
  `SiteHeader`, que no forma parte de esta tarea.

## Pendientes

Decisiones P1–P8 en `docs/PRODUCT_CONTENT_CONTRACT.md` (precios de las
líneas de plan, SAMI Credit, hardware, "Certified", logos de producto,
JSON-LD, `og:image`, español).

## Siguiente acción recomendada

1. Erick revisa las nueve páginas en `http://localhost:3000/<ruta>/` y
   responde P1–P8.
2. Diseño recibe los briefs de `src/content/media/products.ts` para sustituir
   las fotos.
3. Con autorización: commit en `feat/homepage` y PR hacia `dev`.

## Bloques sugeridos para archivos reservados

**`docs/WORKLOG.md` → Últimas tareas cerradas:**

> - Páginas de producto en inglés (Claude, `feat/homepage`, sin commit): nueve
>   rutas de Products con el copy de `start-version` (DEC-014), estilo de la
>   Homepage, claro y oscuro, 9 fotos Unsplash temporales y 28 iconos
>   Listaso nuevos. Sin Client Components nuevos ni cambios en archivos de
>   Codex. Lint, typecheck y build pasan; 0 fallos AA sobre fondo sólido en
>   ambos temas y sin overflow a 375 px. Handoff:
>   `docs/handoffs/2026-10-13-product-pages.md`.

**`docs/CURRENT_ARCHITECTURE.md`:** añadir `product/` bajo `sections/`,
`products/` y `media/` bajo `content/`, `lib/page-metadata.ts`, y las nueve
rutas en "Páginas implementadas".
