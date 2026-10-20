# Handoff: foundation visual (Chat 5)

```text
Tarea: Chat 5 — foundation visual
Objetivo: activos oficiales, tokens aprobados, iconografía, primitivas y muestra
  interna /foundation/, sin páginas comerciales
Estado: complete (pendiente de revisión de Erick)
Agente implementador: Claude
Branch: ux/visual-foundation (sigue a origin/ux/visual-foundation)
Commit base: bf63e2e "Actualizacion de marca"
Working tree: cambios sin commit; commit, push y PR no autorizados
Archivos reservados: ninguno (liberados)
```

## Archivos añadidos

**Activos y fuentes.**
- `public/brand/`: 16 SVG oficiales, byte a byte iguales a los entregados.
- `assets/icons/listaso-icons.json`: copia sin cambios.
- `assets/icons/icon-map.json`.
- `assets/icons/README.md`.
- `assets/icons/material/open_in_new-rounded-24px.svg`.
- `scripts/build-icons.mjs`.

**Componentes y contenido.**
- `src/components/icons/Icon.tsx` y `icon-data.ts` (generado).
- `src/components/ui/`: `Button`, `TextLink`, `Card`, `GlassPanel` (más su
  `.module.css`), `FormField` y `StatusMessage`.
- `src/components/brand/BrandAsset.tsx`, que incluye `ThemedLogo`.
- `src/content/brand/assets.ts`: manifiesto de activos.
- `src/lib/utils/cx.ts`.
- `src/app/foundation/`: `page.tsx`, `_components.tsx`, `_data.ts` y
  `foundation.module.css`.

**Documentación y herramientas.**
- `.claude/launch.json`: servidor estático local de `out/` para la vista
  previa (`python3 -m http.server`).
- `docs/handoffs/2026-10-09-visual-foundation.md` (este archivo).

## Archivos modificados

- `src/styles/tokens.css`, `base.css` y `motion.css`.
- `src/app/globals.css` y `src/app/page.tsx`.
- `package.json`: sólo el script `icons`; sin dependencias nuevas.
- `docs/DECISIONS.md`: DEC-008 aprobado, DEC-010 actualizado, DEC-012 nuevo.
- `docs/WORKLOG.md`.
- `docs/CURRENT_ARCHITECTURE.md`. Se actualizó por exactitud, aunque no estaba
  en la reserva.
- `.agents/skills/listaso-design-system/SKILL.md` y sus tres referencias.

## Activos

**Vigentes (`active`).**
- Listaso: horizontal navy y blanco, stacked navy y blanco, símbolo multicolor,
  símbolo blanco y wordmark navy.
- Sales Order & Catalog: alias del símbolo multicolor, sin duplicar el SVG.
- Productos: Advanced Inventory, Back Office (navy y blanco), Delivery, Van
  Sales y Warehouse Inventory.

**Temporales.** Se conservan tal como se entregaron:
- `listaso-ecommerce.svg`: 749 KB, incrusta un PNG.
- `sami.svg`: 735 KB, incrusta un PNG.

**Descontinuados.** `listaso-customer-order-catalog.svg`, en
`public/brand/legacy/`. Sólo aparece como registro histórico.

**No publicados.** Están registrados en `unresolvedBrandAssets`:
- `listaso-van-sales-1.svg`: icono tricolor con efecto vidrio; producto
  desconocido.
- Sales Advanced: no se entregó ningún archivo `listaso-sales`.
- `LOGO-LISTASO.png`: raster histórico, idéntico al de `origin/main`.

**Duplicados detectados (no copiados).**
- `listaso-sales-order-&-catalog.svg` es idéntico al símbolo multicolor.
- `Custom Import/.../horizontal-white.svg` es idéntico a la versión navy. Por
  eso el blanco real se tomó de `~/Downloads`.

**Colores del isotipo (CONFIRMADO).** Los vectores oficiales usan `#003F69`,
`#00BDA9` y `#FF1975`. Son colores del logo, no tokens de interfaz.

## Tokens implementados

**Paleta y roles.**
- Las 9 primitivas oficiales.
- Todos los roles claros y oscuros aprobados.

**Valores derivados en este chat** (requieren el visto bueno de Erick):
- `link.hover` oscuro: `#8DB3FF`.
- `icon.accent` oscuro: `#3FD9C6`.
- `text.on-error`: `#FFFFFF` en claro y `#151726` en oscuro.
- `text.on-status`: `#151726`.
- `surface.raised`: `#FFFFFF` en claro y `#151B2E` en oscuro.
- Sombras en oscuro: e1 `none`; e2 y e3 negras suaves.

**Contextos.**
- `[data-surface="band"]`: navy, con foco `#70D4FF`.
- `[data-surface="sami"]`: tema SAMI completo.

**Temas.**
- `color-scheme: light dark`.
- El oscuro sigue `prefers-color-scheme` y se puede forzar con
  `[data-theme="light"]` o `[data-theme="dark"]`.
- No hay selector público.

**Escalas.**
- Radios: 4, 8, 16, 24 y 32px, más píldora.
- Sombras: e1 a e3.
- Contenedores: 1200px y 1440px, más el ancho de prosa.
- Tipografía: display a caption, en rem.
- Movimiento: 150, 250 y 400 ms, con easing.

**Restricción en Tailwind.** Se borraron la paleta, los radios, las sombras y
los tamaños de texto por defecto; sólo existen los valores aprobados.

## Componentes creados

- Todos son Server Components; no hay `"use client"`.
- Button tiene variantes principal, secundaria y terciaria, en tamaños md y lg,
  y se renderiza como enlace si recibe `href`.
- Estados cubiertos: hover, focus-visible, active, disabled y error.

## Validaciones

Con Node 24.21.0 y pnpm 12.10.1, desde una instalación limpia:

| Comprobación | Resultado |
| --- | --- |
| `pnpm install --frozen-lockfile` | 0 |
| `pnpm peers check` | 0 |
| `pnpm lint` | 0 |
| `pnpm typecheck` | 0 |
| `pnpm build` | 0 (5 rutas estáticas, incluida `/foundation`) |
| `git diff --check`, y los archivos nuevos revisados aparte | limpio |
| `test -f out/index.html` | ok |
| `test -f out/foundation/index.html` | ok |
| `noindex, nofollow` y `Disallow: /` | presentes |
| `output: "export"` y `trailingSlash` | sin cambios |
| Server Actions, Route Handlers y Client Components | ninguno |
| Secretos | ninguno detectado |
| `start-version/` | 0 cambios |
| Hashes de los SVG publicados | iguales a los originales |
| CSS final | 29.7 KB, sin colores por defecto de Tailwind |

**Revisión en navegador** (export estático servido localmente):
- **Breakpoints.** 320, 375, 768, 1024 y 1440 px, sin scroll horizontal.
- **Contraste AA.** Auditoría automática de 418 textos en claro y en oscuro: 0
  fallos. Los 3 textos sobre vidrio se calcularon aparte: ≥10:1 en claro y
  ≥12:1 en SAMI.
- **Estructura.** Un `<main>` y un `h1`, con headings en orden.
- **Formularios.** 7 inputs con label real, y `aria-describedby` y
  `aria-invalid` en ayuda y error.
- **Nombres accesibles.** Ningún botón ni enlace sin nombre.
- **Imágenes.** Los 16 activos responden 200.
- **Teclado.** El foco visible se comprobó con Tab: 2px `#70D4FF` en oscuro y
  `#0960FF` en claro.

## Warnings

- **Montserrat sin autohospedar.** No hay archivos en `start-version/` (cargaba
  Google Fonts en runtime). La copia local de esta Mac son TTF variables de unos
  750 KB cada uno y no hay herramienta para convertirlos a WOFF2 sin instalar
  algo. Se usa la pila de respaldo. Opciones, ambas requieren aprobación:
  - `next/font/google`, integrado en Next: descarga y autohospeda en el build,
    con subset y WOFF2.
  - Entregar archivos WOFF2 oficiales (OFL) para `public/fonts/montserrat/`.
- **Peso de dos activos temporales.** eCommerce y SAMI pesan unos 1.5 MB entre
  los dos. Se cargan en diferido, pero conviene pedir los vectores.
- **Preferencias no emuladas.** `prefers-reduced-motion`,
  `prefers-reduced-transparency` y `forced-colors` no se pudieron emular en el
  navegador de prueba. Están implementadas y se verificaron en el CSS
  compilado. La página `/foundation/` tiene una sección que muestra su estado
  detectado, para revisarlas a mano.
- **Falso positivo de contraste.** Al cambiar el esquema de color en vivo, los
  elementos con `transition-colors` mostraron colores intermedios porque el
  panel de prueba no pintaba frames. Al recargar, todo resolvió bien. No afecta
  a un navegador real.
- **Variante `dark:` de Tailwind.** Sólo sigue el media query, así que no debe
  usarse. Los componentes usan tokens.

## Desconocidos

- Producto de `listaso-van-sales-1.svg` y archivo de Sales Advanced.
- Regla del wordmark sin símbolo, tamaño mínimo y espacio libre del logo
  (siguen `PROPUESTOS`).
- Mapeo 60-30-10 y magenta definitivo (auditoría de Marketing).

## Requiere validación Dev

- Revisar el preview de Cloudflare de `ux/visual-foundation` después del push.
- Validar `/foundation/` con lector de pantalla, con colores forzados de Windows
  y con las preferencias de movimiento y transparencia del sistema.

## Siguiente acción recomendada

1. Erick revisa el diff y `/foundation/` en local o en el preview.
2. Si lo aprueba, autoriza el commit en `ux/visual-foundation` y, por separado,
   el push. Después, el PR hacia `dev`.
3. Decidir cómo cargar Montserrat y confirmar los activos pendientes.
4. Chat 6: elegir la primera ruta a implementar con estas primitivas.
