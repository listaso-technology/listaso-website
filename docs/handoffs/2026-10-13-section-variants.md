# Handoff: Variaciones de sección (Products e Integrations)

```text
Tarea: variantes de hero y secciones inspiradas en 4 referencias, en las 19 páginas
Estado: complete (pendiente de revisión de Erick)
Agente implementador: Claude, en paralelo con Codex (interacción móvil de la Homepage)
Branch: feat/homepage
Working tree: cambios sin commit; commit, push y PR no autorizados
Archivos reservados: ninguno (liberados)
```

## Coordinación con Codex

No se editó ningún archivo reservado por Codex (`ProofStrip*`, SAMI,
`SupportSection*`, `CustomerProof*`, `PricingPlans*`, `SnapCarousel*`,
`backdrops.module.css`, `WORKLOG.md`).

Se importan sin cambios: `FinalCta`, `HomeMotion`, `SamiConversation`,
`SamiLogoMark`, `Stars`, `backdrops.module.css`, `GlassPanel`, `Button`,
`Card`, `TextLink`, `SectionHeader` y `Signature`.

**Observación.** `SamiConversation` tiene un pseudo-elemento que desborda en
móvil; en la Homepage lo recorta su sección. En `/sami/` se resolvió con
`overflow-x-clip` en la sección propia, sin tocar el componente.

## Archivos

**Nuevos.**
- `src/components/sections/variants/`: 17 componentes y 5 módulos CSS (ver
  `docs/SECTION_VARIANTS.md`).
- `src/components/media/ResponsivePhoto.tsx`.
- `src/content/media/sections.ts` y 27 WebP en `public/images/sections/`.
- `src/components/sections/product/`: `RelatedRail.tsx`,
  `forms/ResultsPanel.tsx`.
- `docs/SECTION_VARIANTS.md` y este handoff.

**Adaptados (propios).**
- Paneles de ejemplo separados de sus contenedores: `OrderPanel`,
  `TruckStockPanel`, `StopPanel`, `DashboardPanel`, `SurveyScreen` y
  `PlanProgressPanel`.
- `DriversSection` y `WhyItMatters` pasan a `ColorBand`.
- `StoreVisit`, `FormsHowItWorks` y `CustomDevProcess` pasan a
  `StickyStory`.
- `QuestionTypes` usa una marquesina display.
- `SamiHero` usa `HeroDisplay`; `SamiExamples` incluye la conversación;
  `SamiIncluded` usa bento.
- `HubSections`: la sync va en banda con el diagrama y "Pick your system" se
  convierte en índice.
- `SystemPage` se rehace como caso de estudio con ficha técnica.
- Las 19 páginas en `src/app/(site)/`.
- Eliminado `StepRail.tsx`, que quedó sin uso.
- `docs/DECISIONS.md`: DEC-016.

## Validaciones

| Comprobación | Resultado |
| --- | --- |
| `pnpm lint` / `pnpm typecheck` | 0 / 0 |
| `pnpm build` (export estático) | 0; 24 rutas |
| Estructura (19 páginas) | 1 `h1`, sin saltos, sin IDs duplicados, `alt` y `aria-labelledby` válidos |
| Overflow horizontal | 0 a 320, 375, 768, 1024 y 1440 px |
| Contraste AA, fondo sólido | Claro 4,085 / oscuro 4,085 textos; 0 fallos reales (3 numerales decorativos `aria-hidden`) |
| Consola | Sin errores (Forms, Sami, Custom development) |
| HTML | 24–46 KB gzip por página |
| Revisión visual | 1440 px en claro: las 19 páginas; en oscuro: DSD, Sage y Pre-sales |
| `start-version/` | 0 cambios |

**No medido:** el texto sobre fotos y vidrio (275 nodos). Las celdas con foto
llevan navy sólido bajo el texto. Tampoco se emularon movimiento reducido ni
colores forzados; están implementados por CSS.

## Pendientes

1. Erick revisa en `http://localhost:4173/<ruta>/` (export estático) o tras
   reiniciar `pnpm dev`.
2. Medir INP/CLS en un móvil real.
3. Copiar a `WORKLOG.md` el bloque de abajo cuando Codex lo libere.
4. Reemplazar las fotos según los briefs de `src/content/media/sections.ts`.

## Bloque sugerido para `docs/WORKLOG.md`

> - Variaciones de sección para Products e Integrations (Claude,
>   `feat/homepage`, sin commit): heroes Statement, Editorial, Case study y
>   Display; odómetro, sticky story, bento, índices, marquesina ligada al
>   scroll, ficha técnica, banda en pareja, carril, divisor pixelado y
>   "siguiente página" (DEC-016, `docs/SECTION_VARIANTS.md`). Nueve fotos
>   Unsplash responsivas. Un solo componente cliente nuevo. Lint, typecheck y
>   build pasan; sin overflow de 320 a 1440 px; 0 fallos AA en ambos temas.

## Actualización del 13 de octubre de 2026

Por decisión de Erick, la sección de cifras de marca (Since 2015, 400+, 2,000+,
2M+, $1.8B+) se muestra sólo en la Homepage y en About us. Se retiró de las
19 páginas de Products e Integrations: Pre-sales, Inventory, Delivery, B2B, el
hub y las 8 integraciones (`SystemPage`). En el hub, el divisor pixelado ahora
une el hero con la banda de sincronización. `MetricOdometer` queda sin uso y
se conserva para About us. Lint, typecheck y build pasan; ninguna de las 19
páginas exportadas contiene las cifras y la Homepage las conserva.
