# Sincronización Website NEXT.js ↔ Figma

**Estado:** importación desktop completada y validada el 19 de octubre de 2026
**Archivo:** [Website NEXT.js · página Website](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=8-9)  
**Índice editable:** [WEB / 00 / STATIC INDEX & HANDOFF](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=39-2)  
**Figma file key:** `b8KTxbbW8Ogsqu1IzeRnQW`

Este documento es el contrato de trabajo entre el código, Figma, Claude y
Codex. No autoriza publicar, desplegar ni sustituir el código por decisiones
visuales que no estén aprobadas en los documentos canónicos del proyecto.

## Logos Listaso (19 de octubre de 2026)

Se actualizaron las 56 ubicaciones de marca de los 28 frames estáticos de la
página `Website`: variante `listaso-technology-logo-stacked-navy.svg` en cada
header claro y variante `listaso-technology-logo-stacked-white.svg` en cada
footer oscuro. Los logos se importaron como vectores editables dentro de sus
contenedores existentes; el índice `39:2` y las dimensiones de los frames no
cambiaron. Los archivos compartidos por el usuario son byte a byte idénticos a
los SVG existentes bajo `public/brand/listaso/stacked/`. La verificación
visual de ambas variantes se hizo en los nodos `42:7` (header) y `42:1229`
(footer) de HOME.

## Autoridad y flujo

1. El código de `src/app/(site)/` sigue siendo la fuente canónica.
2. Los frames Figma se usan para revisión, exploración y cambios específicos.
3. Una propuesta Figma sólo cambia el producto después de aprobarse,
   documentarse y aplicarse en código conforme a `AGENTS.md` y
   `docs/PROJECT_MASTER.md`.
4. Claude y Codex deben citar el node ID, ruta, breakpoint y estado afectados.
5. No se inventan copy, claims, precios, testimonios, URLs ni traducciones.

## Resultado y editabilidad

- 28 rutas implementadas importadas en la página `Website`.
- Índice/handoff editable: node `39:2`.
- Cada frame final está identificado con el sufijo `/ Static` y organizado en
  una cuadrícula de revisión estable.
- Las 28 vistas se capturaron con `prefers-reduced-motion`, animaciones,
  transiciones, autoplay y parallax congelados. B2B eCommerce, Delivery, Forms
  y QuickBooks se recapturaron el 15 de octubre de 2026 después de detectar
  que sus primeras capas no producían una vista visual válida.
- La estructura contiene texto, contenedores, formas e imágenes discretas; no
  son capturas planas.
- Las importaciones son capas derivadas del DOM. Todavía no son componentes de
  librería ni tienen Code Connect.
- Motion, hover, foco, scroll, estados interactivos y reflow responsive se
  verifican exclusivamente en desarrollo; Figma representa el baseline visual.
- Las 28 vistas finales usan un viewport desktop de 1280 px.

## Convención de nombres

- Página Figma: `Website`.
- Índice: `WEB / 00 / STATIC INDEX & HANDOFF`.
- Frame desktop: `WEB / {NN} / {route} / Desktop / {viewport} / Static`.
- Frame móvil futuro: `WEB / {NN} / {route} / Mobile / 390`.
- Sección futura: `Section / {order} / {semantic-name}`.
- Componentes compartidos futuros: `Web / {component}`.
- Estado exploratorio: sufijo `/ Draft`; aprobado: sufijo `/ Approved`.

## Inventario importado

| # | Ruta | Fuente | Viewport | Node | Estado |
|---:|---|---|---:|---|---|
| 01 | `/` | `src/app/(site)/page.tsx` | 1280 | [42:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=42-2) | Static validado |
| 02 | `/pre-sales/` | `src/app/(site)/pre-sales/page.tsx` | 1280 | [43:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=43-2) | Static validado |
| 03 | `/direct-sales/` | `src/app/(site)/direct-sales/page.tsx` | 1280 | [44:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=44-2) | Static validado |
| 04 | `/b2b-ecommerce/` | `src/app/(site)/b2b-ecommerce/page.tsx` | 1280 | [75:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=75-2) | Static validado |
| 05 | `/inventory/` | `src/app/(site)/inventory/page.tsx` | 1280 | [46:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=46-2) | Static validado |
| 06 | `/delivery/` | `src/app/(site)/delivery/page.tsx` | 1280 | [76:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=76-2) | Static validado |
| 07 | `/back-office/` | `src/app/(site)/back-office/page.tsx` | 1280 | [48:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=48-2) | Static validado |
| 08 | `/custom-development/` | `src/app/(site)/custom-development/page.tsx` | 1280 | [49:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=49-2) | Static validado |
| 09 | `/forms/` | `src/app/(site)/forms/page.tsx` | 1280 | [77:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=77-2) | Static validado |
| 10 | `/sami/` | `src/app/(site)/sami/page.tsx` | 1280 | [51:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=51-2) | Static validado |
| 11 | `/integrations/` | `src/app/(site)/integrations/page.tsx` | 1280 | [52:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=52-2) | Static validado |
| 12 | `/quickbooks/` | `src/app/(site)/quickbooks/page.tsx` | 1280 | [78:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=78-2) | Static validado |
| 13 | `/sage/` | `src/app/(site)/sage/page.tsx` | 1280 | [54:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=54-2) | Static validado |
| 14 | `/acumatica/` | `src/app/(site)/acumatica/page.tsx` | 1280 | [55:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=55-2) | Static validado |
| 15 | `/sap/` | `src/app/(site)/sap/page.tsx` | 1280 | [56:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=56-2) | Static validado |
| 16 | `/netsuite/` | `src/app/(site)/netsuite/page.tsx` | 1280 | [57:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=57-2) | Static validado |
| 17 | `/zoho/` | `src/app/(site)/zoho/page.tsx` | 1280 | [58:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=58-2) | Static validado |
| 18 | `/acctivate/` | `src/app/(site)/acctivate/page.tsx` | 1280 | [59:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=59-2) | Static validado |
| 19 | `/accountmate/` | `src/app/(site)/accountmate/page.tsx` | 1280 | [60:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=60-2) | Static validado |
| 20 | `/printers-and-scanners/` | `src/app/(site)/printers-and-scanners/page.tsx` | 1280 | [61:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=61-2) | Static validado |
| 21 | `/about/` | `src/app/(site)/about/page.tsx` | 1280 | [62:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=62-2) | Static validado |
| 22 | `/industries/` | `src/app/(site)/industries/page.tsx` | 1280 | [64:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=64-2) | Static validado |
| 23 | `/support/` | `src/app/(site)/support/page.tsx` | 1280 | [63:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=63-2) | Static validado |
| 24 | `/listaso-impact/` | `src/app/(site)/listaso-impact/page.tsx` | 1280 | [65:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=65-2) | Static validado |
| 25 | `/join-us/` | `src/app/(site)/join-us/page.tsx` | 1280 | [66:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=66-2) | Static validado |
| 26 | `/contact-us/` | `src/app/(site)/contact-us/page.tsx` | 1280 | [67:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=67-2) | Static validado |
| 27 | `/plans/` | `src/app/(site)/plans/page.tsx` | 1280 | [68:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=68-2) | Static validado |
| 28 | `/rating/` | `src/app/(site)/rating/page.tsx` | 1280 | [110:2](https://www.figma.com/design/b8KTxbbW8Ogsqu1IzeRnQW/Website-NEXT.js?node-id=110-2) | Static validado |

## Exclusiones actuales

- `/foundation/` es una ruta interna de referencia, no una página pública.
- `/blog/` y `/book-a-demo/` siguen fuera del export Next.js.
- Las rutas legales todavía no están implementadas en `src/app/(site)/`.
- Español requiere paridad aprobada antes de importarse.
- Los breakpoints móviles y el mapeo a componentes compartidos son fases
  posteriores; no se representan como completados en este documento.

## Reglas para handoff Figma → código

Cada propuesta debe registrar:

- URL y node ID exactos de Figma.
- Ruta, viewport/breakpoint y estado `Draft` o `Approved`.
- Persona que aprobó y fecha.
- Componentes, tokens, copy y assets modificados.
- Comportamiento esperado de hover, foco, teclado, scroll y movimiento
  reducido.
- Diferencias deliberadas entre desktop y móvil.
- Archivo o componente de código objetivo y pruebas requeridas.

Claude y Codex deben tratar los frames importados como referencia visual
editable, no como autorización para reemplazar componentes, introducir copy o
publicar cambios. Al cerrar una implementación, se actualiza este registro con
el node ID aprobado y el archivo de código modificado.
