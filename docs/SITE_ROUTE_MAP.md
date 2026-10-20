# Mapa de rutas y preservación SEO/Analytics

**Inventario:** 8 de octubre de 2026  
**Estado:** Inventario de migración; no autoriza cambios en producción, DNS,
Cloudflare, WordPress ni Analytics.

La matriz por ruta, enriquecida con WordPress, Yoast, GA4 y Search Console, vive
en `docs/ROUTE_CONTENT_MATRIX.md`.

## Fuentes

- Sitemap público de `listaso.com` y sitemaps WordPress/Yoast.
- `start-version/website/`.
- Redirects heredados de Apache y Nginx.

## Resumen

El sitemap público contiene 89 URLs: 27 páginas, 56 artículos, 5 categorías y
1 autor. Antes del cutover todas deben responder 200 o un único 301 hacia una
página equivalente que responda 200.

La referencia contiene 30 rutas inglesas, 30 bajo `/es/` y dos 404. Veinticuatro
rutas inglesas coinciden exactamente con producción; seis son páginas nuevas.
Las 30 rutas españolas también son nuevas.

## Pathnames que deben conservarse

```text
/
/pre-sales/              /direct-sales/          /b2b-ecommerce/
/inventory/              /delivery/              /back-office/
/custom-development/     /quickbooks/            /sage/
/acumatica/              /sap/                   /netsuite/
/zoho/                   /acctivate/             /accountmate/
/printers-and-scanners/  /contact-us/            /join-us/
/listaso-impact/         /plans/                 /privacy-policy/
/terms-and-conditions/   /subscription-agreement/
```

La URL sin slash debe normalizarse con un solo redirect permanente hacia la
canónica con slash.

## Rutas públicas faltantes en la referencia

- `/blog/`: conservar en WordPress y mantener exactamente la URL hasta la futura
  plataforma editorial.
- `/book-a-demo/`: preservar exactamente la URL; los CTA usan Calendly mientras
  la integración de Zoho API queda pendiente.
- `/rating/`: conservar como página independiente y añadir al dropdown Empresa;
  no redirigir a `/support/`.

## Rutas nuevas presentes sólo en la referencia

`/about/`, `/forms/`, `/industries/`, `/integrations/`, `/sami/` y `/support/`.
Sólo entrarán al sitemap cuando estén completas, tengan canonical y se apruebe
su indexación.

## Español

Publicar `/es/` sólo con navegación y contenido validados, equivalencia uno a
uno y `hreflang` real. No redirigir automáticamente por idioma ni incluir
traducciones incompletas en sitemap.

## Blog: preservación

Los 56 artículos, cinco categorías y autor conservarán sus URLs exactas en el
sistema actual hasta contar con un entorno aprobado para generar y administrar
blogs. La migración se hará después, sin perder slugs, contenido, canonical,
imágenes, fechas, schema, categorías, enlaces ni métricas. No se activarán
redirects generales del blog.

Taxonomías:

```text
/category/b2b-delivery/       /category/b2b-ecommerce/
/category/inventory/          /category/office-management/
/category/pre-sales/          /author/jafeth-guardado/
```

Artículos que deben conservar un destino válido:

```text
/12-distribution-terms-every-distributor-or-wholesaler-should-know/
/3-advantages-of-a-custom-mobile-solution-for-distributors/
/3-inventory-management-mistakes-every-wholesaler-or-distributor-should-avoid/
/4-b2b-ecommerce-mistakes-you-must-avoid-in-2024/
/4-key-benefits-of-mobile-inventory-control/
/4-little-known-tips-to-improve-the-performance-of-your-sales-rep/
/5-distribution-pain-points-that-a-mobile-solution-can-solve/
/5-inventory-management-best-practices-to-improve-efficiency/
/5-opportunities-to-increase-your-productivity-through-mobile-sales-orders-for-sage-100/
/5-signs-youve-outgrown-your-sales-process/
/6-must-have-features-for-any-mobile-sales-solution/
/6-trade-promotion-examples-that-will-boost-your-sales/
/8-inventory-management-rules-to-unlock-your-warehouse-potential/
/accurate-real-time-reporting-is-crucial/
/benefits-of-an-online-sales-platform-for-b2b-business/
/benefits-of-having-a-b2b-platform-for-your-wholesale-or-distribution-business-in-2021/
/best-barcode-scanners-for-inventory-management-in-2023/
/case-study-listasos-inventory-management-solution-roi/
/choosing-the-right-wms-a-guide-for-wholesalers-and-manufacturers/
/cyber-monday-and-black-friday-data-from-2022-what-every-distributor-needs-to-know-for-the-upcoming-shopping/
/digital-transformation-in-the-distribution-industry-why-is-it-necessary-and-how-can-you-enhance-your-mobile-solution/
/distribution-in-the-food-industry/
/do-you-want-to-know-the-secret-to-make-your-distribution-business-grow/
/dynamic-pricing-strategy-for-food-and-beverage-distributors/
/elevating-inventory-management-excel-vs-dedicated-storage-tracking-systems/
/from-retail-to-big-distribution-3-key-elements-that-help-boost-sales/
/history-of-cyber-monday/
/how-a-mobile-app-can-help-your-reps-improve-the-sales-process-from-beginning-to-end/
/how-a-mobile-app-can-improve-your-van-sales-process-and-increase-overall-sales/
/how-can-a-mobile-sales-solution-optimize-your-distribution-process/
/how-inventory-management-can-make-or-break-your-e-commerce-business/
/how-listaso-makes-quickbooks-mobile/
/how-to-assign-commissions-to-your-sales-team/
/how-to-calculate-your-return-on-investment-for-an-inventory-management-solution/
/how-to-cross-sell-more-effectively-as-a-distributor-or-wholesaler-in-2021/
/how-to-effectively-manage-dead-stock-in-your-inventory/
/how-to-keep-coffee-distribution-up-with-demand/
/how-to-optimize-your-sales-team-efforts/
/improve-traceability-with-a-warehouse-management-system/
/improving-last-mile-delivery-through-route-optimization/
/inventory-management-best-practices-for-the-pick-pack-and-ship-process/
/managing-seasonal-demand-strategies-for-efficient-deliveries/
/sell-24-7-this-cyber-monday-b2b-ecommerce-strategies-to-increase-profits/
/the-basics-of-cycle-counting/
/the-benefits-of-having-a-quickbooks-mobile-sales-app-in-2021/
/the-great-debate-plastic-vs-wood-pallets/
/the-growth-of-hispanic-products-in-the-distribution-industry-how-food-distributors-can-boost-their-processes/
/the-importance-of-on-time-delivery-for-b2b-companies/
/the-long-lasting-effects-of-a-bad-delivery-experience/
/the-perfect-quickbooks-integration-for-distributors/
/the-role-of-artificial-intelligence-in-inventory-management/
/three-strategies-to-speed-up-your-order-fulfillment-process/
/top-30-distribution-metric-for-2022-reporting/
/why-an-order-entry-system-is-a-must-have-for-2021-b2b-sales-reps/
/why-more-b2b-companies-are-using-e-commerce/
/why-you-should-do-b2b-ecommerce-in-2023/
```

## Redirects históricos aprobables

| Origen | Destino | Estado |
| --- | --- | --- |
| `/home[/]` | `/` | Válido |
| `/integrations/quickbooks[/]` | `/quickbooks/` | Válido |
| `/integrations/sage[/]` | `/sage/` | Válido |
| `/integrations/acumatica[/]` | `/acumatica/` | Válido |
| `/integrations/sap[/]` | `/sap/` | Válido |
| `/integrations/zoho[/]` | `/zoho/` | Válido |
| `/integrations/acctivate[/]` | `/acctivate/` | Válido |
| `/integrations/accountmate[/]` | `/accountmate/` | Válido |
| `/integrations/netsuite[/]` | `/netsuite/` | Válido |
| `/rating/` | `/support/` | Descartado: ambas serán páginas independientes |
| Blog, artículos y categorías | `blog.listaso.com` | No ejecutar; conservar URLs actuales |

## Navegación y contacto aprobados

- `/support/` será una página nueva.
- `/rating/` se conserva como página independiente.
- Ambas rutas estarán en el dropdown `Company` / `Empresa` de la nueva
  navegación.
- Los CTA de demo usarán temporalmente
  `https://calendly.com/ernesto-henriquez-viasql/60min`.
- La recepción mediante API de Zoho se implementará en una etapa posterior.
- `/book-a-demo/` permanece preservada mientras se define esa implementación.

## Criterios antes de usar `listaso.com`

- Las 89 URLs responden 200 o un único 301 equivalente que termina en 200.
- Ningún destino termina en login, 404, loop o cadena.
- `/book-a-demo/` y `/rating/` tienen decisión aprobada.
- GTM, GA4 y Clarity vigentes se cargan una vez y conservan eventos e IDs.
- Query strings y UTM se preservan.
- Sitemap, robots, canonical, hreflang y schema están verificados.
- Se ejecuta crawl antes y después del cambio.
- Se guarda baseline para comparar a 7, 14 y 30 días.
