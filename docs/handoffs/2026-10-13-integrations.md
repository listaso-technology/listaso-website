# Handoff: Sección Integrations en inglés

```text
Tarea: hub de Integrations, 8 integraciones contables y Printers and scanners
Estado: complete (pendiente de revisión de Erick y validación Dev)
Agente implementador: Claude, en paralelo con Codex (interacción móvil de la Homepage)
Branch: feat/homepage
Working tree: cambios sin commit; commit, push y PR no autorizados
Archivos reservados: ninguno (liberados)
```

## Coordinación con Codex

Codex tiene reservados `ProofStrip*`, `ProofCounter`, los componentes de
SAMI, `SupportSection*`, `CustomerProof*`, `PricingPlans*`, `SnapCarousel*`,
`backdrops.module.css` y `docs/WORKLOG.md`. **No se editó ninguno.**
`ProofStrip`, `FinalCta`, `HomeMotion`, `Stars` y `backdrops.module.css` se
importan sin cambios.

## Archivos

**Añadidos.**
- Rutas: `src/app/(site)/{integrations,quickbooks,sage,acumatica,sap,netsuite,zoho,acctivate,accountmate,printers-and-scanners}/page.tsx`.
- Contenido: `src/content/integrations/` (`hub.ts`, `systems.ts`,
  `printers.ts`).
- Componentes: `src/components/sections/integrations/` (`IntegrationHubMedia`,
  `HubSections`, `SyncTable`, `SystemHeroMedia`, `SystemExtras`, `SystemPage`,
  `PrintersSections`).
- Compartidos nuevos: `product/LinkCard.tsx` y `product/PrintedReceipt.tsx`
  (extraídos de mis componentes de producto).
- `docs/INTEGRATIONS_CONTENT_CONTRACT.md` (contrato y viabilidad) y este
  handoff.

**Modificados (propios).**
- `product/Breadcrumbs.tsx`: niveles intermedios (`trail`).
- `product/ProductHero.tsx`: `trail` y `ctas` opcionales.
- `product/IntegrationsBand.tsx`: copy, CTA y exclusión configurables.
- `product/RelatedProducts.tsx` y `direct-sales/DriversSection.tsx`: usan
  `LinkCard` y `PrintedReceipt`, sin cambio visual.
- `docs/DECISIONS.md`: DEC-015.

## Validaciones

| Comprobación | Resultado |
| --- | --- |
| `pnpm lint` / `pnpm typecheck` | 0 / 0 |
| `pnpm build` (export estático) | 0; 24 rutas estáticas |
| Export estático (`static-export`, :4173) | 10 × 200 |
| Estructura | 1 `h1` por página, sin saltos, sin IDs duplicados, `alt` y `aria-labelledby` válidos, breadcrumb Home / Integrations / Sistema |
| Overflow horizontal a 375 px | 0 en las 10 |
| Contraste AA (texto sobre fondo sólido) | Claro: 736 textos, 0 fallos. Oscuro: 736, 0 fallos |
| HTML exportado | 176–226 KB (23–35 KB gzip) |
| Revisión visual | Hub, QuickBooks, Sage y Printers en claro; Zoho en oscuro, a 1440 px |
| Client Components nuevos / imágenes nuevas / iconos nuevos | 0 / 0 / 0 |
| `start-version/` | 0 cambios |

**No medido:** el texto sobre la banda de marca y el vidrio (171 nodos), que
usan las recetas ya validadas en la Homepage.

## Warnings

- `next dev` (:3000) responde 404 en `/acumatica/` por una caché de rutas
  anterior a la carpeta. El build lo genera bien; basta reiniciar `pnpm dev`.
- `ProofStrip` está en modificación por Codex. Si cambia su API, las diez
  páginas lo heredan.
- El enlace a QuickBooks Online no respondió a la comprobación automática;
  verificarlo a mano.

## Pendientes

Preguntas I1–I9 y la lista de viabilidad de
`docs/INTEGRATIONS_CONTENT_CONTRACT.md`: tablas de sync, "4+ years", Zoho
CRM, productos exactos de Sage y SAP, QuickBooks Desktop, reseña de AH,
logos de terceros, hardware vigente, nota de marcas registradas, redirects de
Cloudflare.

## Siguiente acción recomendada

1. Erick revisa `http://localhost:4173/integrations/` (export estático) o
   reinicia `pnpm dev`.
2. Development valida las tablas de sincronización y la lista de hardware.
3. Con autorización: commit en `feat/homepage` y PR hacia `dev`.

## Bloque sugerido para `docs/WORKLOG.md` (reservado por Codex)

> - Sección Integrations en inglés (Claude, `feat/homepage`, sin commit): hub
>   `/integrations/`, ocho integraciones contables y
>   `/printers-and-scanners/` con el copy de `start-version` (DEC-015), cifras
>   y calificación reutilizadas de la Homepage, claro y oscuro. Sin fotos,
>   iconos ni Client Components nuevos. Lint, typecheck y build pasan; 0
>   fallos AA en ambos temas, sin overflow a 375 px. Viabilidad y preguntas
>   I1–I9 en `docs/INTEGRATIONS_CONTENT_CONTRACT.md`.

## Actualización del 13 de octubre de 2026

Por decisión de Erick, la sección de cifras de marca (Since 2015, 400+, 2,000+,
2M+, $1.8B+) se muestra sólo en la Homepage y en About us. Se retiró de las
19 páginas de Products e Integrations: Pre-sales, Inventory, Delivery, B2B, el
hub y las 8 integraciones (`SystemPage`). En el hub, el divisor pixelado ahora
une el hero con la banda de sincronización. `MetricOdometer` queda sin uso y
se conserva para About us. Lint, typecheck y build pasan; ninguna de las 19
páginas exportadas contiene las cifras y la Homepage las conserva.
