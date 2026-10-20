# Contrato de contenido y viabilidad — Integrations (EN)

**Fecha:** 13 de octubre de 2026
**Agente:** Claude, `feat/homepage` (en paralelo con Codex; sin editar sus
archivos reservados)
**Estado:** Implementado, pendiente de revisión de Erick y de validación Dev.

Etiquetas (PROJECT_MASTER): CONFIRMADO, OBSERVACIÓN, HIPÓTESIS,
RECOMENDACIÓN, DESCONOCIDO, REQUIERE VALIDACIÓN DEV.

## 1. Alcance

Diez rutas: el hub nuevo, ocho integraciones contables y la página de
hardware. Las nueve últimas **ya están publicadas en WordPress** y tienen
impresiones en Search Console.

| Ruta | Estado actual | GA / GSC (68 días) | Title nuevo (fuente: `start-version`) | Title publicado (Yoast) |
| --- | --- | --- | --- | --- |
| `/integrations/` | Nueva (DEC-013) | — | Integrations: QuickBooks, Sage, SAP, NetSuite & More \| Listaso | — |
| `/quickbooks/` | WP publicada | 15 s · 4 c / 607 i | QuickBooks Integration for Distributors \| Listaso | Integrations - QuickBooks |
| `/sage/` | WP publicada | 6 s · 1 c / 53 i | Sage 100 Integration for Distributors \| Listaso | Integrations - Sage |
| `/acumatica/` | WP publicada | 7 s · 0 c / 435 i | Acumatica Integration for Distributors \| Listaso | Integrations - Acumatica |
| `/sap/` | WP publicada | 5 s · 0 c / 54 i | SAP Integration: Sales & Inventory App \| Listaso | Integrations - SAP |
| `/netsuite/` | WP publicada | 3 s · 0 c / 39 i | NetSuite Integration for Field Sales & Inventory \| Listaso | Integrations - NetSuite |
| `/zoho/` | WP publicada | 8 s · 0 c / 79 i | Zoho Books & Zoho Inventory Integration \| Listaso | Integrations - Zoho |
| `/acctivate/` | WP publicada | 7 s · 0 c / 176 i | Acctivate Integration for Mobile & DSD Sales \| Listaso | Integrations - Acctivate |
| `/accountmate/` | WP publicada | 5 s · 1 c / 76 i | AccountMate Integration for Distributors \| Listaso | Integrations - AccountMate |
| `/printers-and-scanners/` | WP publicada | 11 s · 5 c / 76 i | Compatible Printers & Scanners \| Listaso | Integrations - Printers and Scanners |

Fuentes: `start-version/source/build/pages_more.py` (`integrations_body`,
`erp_page`, `QB_EXTRA`, `SAGE_EXTRA`, `printers_body`), export WXR de
WordPress del 8 de octubre de 2026 (sólo lectura) y
`docs/ROUTE_CONTENT_MATRIX.md`.

## 2. Estructura implementada

**Hub `/integrations/`.** Hero → "Two directions, zero double entry"
(qué entra y qué sale) → "Pick your system" (8 tarjetas) → "Hardware and
custom work" → banda final de demo.

**Cada sistema contable.** Hero con breadcrumb Home / Integrations / Sistema,
panel ilustrativo de sincronización (primeras filas de la tabla) y línea de
compatibilidad cuando la fuente la tiene → "What you get with Listaso and X" → tabla "How the X sync works" (tabla de datos real, con
la dirección escrita) → prueba social cuando existe → "Other systems we
connect to" (excluye el sistema actual) → banda final.

- QuickBooks añade "Find us in the QuickBooks App Store": enlaces a los
  listados Desktop y Online, calificación 5.0 y reseña de AH (Quickchoice).
- Sage 100 añade la reseña de Mark Somwaru (ya aprobada en la Homepage).

**Printers and scanners.** Hero sin CTAs (como la fuente) con la factura
impresa → "Three ways to print" → tabla de 13 modelos compatibles →
requisitos de teléfonos y tabletas.

## 3. Qué se reutilizó

| Recurso | Origen | Uso |
| --- | --- | --- |
| Cifras de marca (Since 2015, 400+, 2,000+, 2M+, $1.8B+) | `ProofStrip` de la Homepage, aprobado en DEC-013 | **Retiradas** el 13 de octubre de 2026 por decisión de Erick: sólo Homepage y About us |
| Calificación 5.0 en QuickBooks App Store y `Stars` | Homepage (DEC-013) | Hero y sección certificada de QuickBooks |
| Reseña de Mark Somwaru | `customers.testimonials` (DEC-013 D8) | Sage 100 |
| `FinalCta`, `HomeMotion`, `SectionHeader`, `Signature`, `brandMesh` | Homepage | Todas |
| `ProductHero`, `FeatureGrid`, `CheckList`, `IntegrationsBand`, `LinkCard`, `PrintedReceipt`, `ProductSection` | Páginas de producto | Todas |

Sin fotos nuevas, sin iconos nuevos, sin Client Components nuevos y sin
dependencias.

## 4. Viabilidad: lo que se debe tomar en cuenta

### A. Claims técnicos (REQUIERE VALIDACIÓN DEV / Producto)

WordPress ya publica estos mismos claims en esas URLs ("certified",
"4+ years", "two-way", "real-time", "GPS", "Zoho CRM"), así que el copy no
introduce promesas nuevas. Aun así son hechos técnicos que deben confirmarse
antes del cutover:

1. **Tablas de sincronización.** Dirección de cada dato en los ocho sistemas.
   Llamativos:
   - en QuickBooks todo es "Both ways", incluidos "Custom developments";
   - en SAP "Warehouse transfers" entra a Listaso, mientras que en los demás
     sistemas sale.
2. **"Certified for 4+ years".** Es un dato que envejece. RECOMENDACIÓN: usar
   el año de certificación ("certified since 20XX").
3. **Zoho.** La línea de compatibilidad dice "Zoho Books and Zoho Inventory",
   pero la primera función es "Zoho CRM contacts". Confirmar si CRM está
   soportado.
4. **"Real time"** (SAP, AccountMate, Sage, Acumatica). Confirmar la
   frecuencia real de sincronización.
5. **Producto exacto de cada fabricante.** Sage 100 (¿y Sage 50 o Intacct?)
   y SAP (¿Business One, S/4HANA?). La URL `/sage/` es genérica y la página
   habla sólo de Sage 100.
6. **QuickBooks Desktop.** OBSERVACIÓN externa: Intuit dejó de vender
   suscripciones nuevas de Desktop Pro, Premier y Mac en EE. UU. desde 2024 y
   mantiene Enterprise. Confirmar si el mensaje "Desktop and Online" sigue
   siendo correcto para clientes nuevos.
7. **Hardware y dispositivos.** Los 13 modelos y los mínimos (iPhone 13 con
   iOS 16, Android 8.1, 3 GB de RAM) deben estar vigentes en 2026.
8. **GPS tracking** ("ride along" con cada vendedor). Confirmar su
   disponibilidad por plan y el aviso de privacidad correspondiente.

### B. Prueba social

- La reseña de AH (Quickchoice) en QuickBooks **no es la misma** que la
  aprobada para la Homepage (allí habla del soporte). Verificar el texto en
  el App Store y aprobarla.
- Mark Somwaru ya estaba aprobado (DEC-013).

### C. Marcas de terceros

- Los nombres aparecen sólo como texto; no hay logos. RECOMENDACIÓN: no
  usar logos ni badges ("Certified", "App Partner") sin las guías y el
  permiso de cada fabricante (Intuit, Sage, SAP, Oracle NetSuite, Zoho,
  Acumatica, Acctivate, AccountMate) y la revisión legal.
- Usar el nombre oficial: "Oracle NetSuite", "QuickBooks Online",
  "QuickBooks Desktop", "Sage 100".
- RECOMENDACIÓN: una nota de marcas registradas en el pie legal (el footer
  es de Codex).
- Los dos enlaces al App Store se abren en otra pestaña. QuickBooks Desktop
  respondió 200; QuickBooks Online no respondió a la comprobación
  automática (posible protección anti-bot). Verificarlo manualmente.

### D. SEO y migración

- Se conservan los slugs exactos de las nueve URLs públicas. Los titles
  nuevos describen mejor la página que "Integrations - X" de Yoast; las
  descriptions también cambian. Riesgo bajo, pero conviene medir
  impresiones tras el cutover (`listaso-technical-seo-migration`).
- **Redirects pendientes** (el export estático no los sirve; requieren
  Cloudflare):
  - `/integrations/quickbooks` (y las otras siete variantes de
    `docs/SITE_ROUTE_MAP.md`) → `/quickbooks/` y equivalentes;
  - `/listaso-printers-and-scanners-compatibility/` (histórica, 5 sesiones
    en GA) → `/printers-and-scanners/`.
- `/integrations/` es nueva: sigue `noindex` y entra al sitemap sólo con el
  cutover.
- Enlazado interno: los tres artículos del blog sobre QuickBooks deberían
  enlazar a `/quickbooks/` (WordPress).
- Pendientes generales: JSON-LD `BreadcrumbList`, `og:image` y hreflang.

### E. Analytics

Atributos neutros, sin scripts: `cta_demo_click` (`<ruta>-hero`, `final`),
`cta_secondary_click`, `integration_card_click` (tarjetas del hub) y
`external_appstore_click` (listados de QuickBooks). Definir qué cuenta como
conversión antes de activar GTM o GA4.

### F. Técnica y coordinación

- Las cifras de marca ya no se usan en Integrations (sólo Homepage y About
  us), así que estas páginas no dependen de `ProofStrip`, que sigue reservado
  por Codex.
- `next dev` en `:3000` respondía 404 en `/acumatica/` porque esa ruta quedó
  en caché antes de existir la carpeta. El build y el export estático la
  generan bien. Basta con reiniciar `pnpm dev`.

### G. Comercial

- La comparación de planes de `start-version` incluye "Accounting system
  integration" en los tres planes; no se publicó como claim en estas páginas
  hasta aprobar `/plans/`.
- Las integraciones no listadas llevan a `/custom-development/` ("Using
  another system?"). Confirmar si ese es el flujo comercial deseado.

### H. Fuera de alcance

Versión en español, logos de terceros, JSON-LD, `og:image` y los redirects
de Cloudflare.

## 5. Decisiones abiertas (para Erick)

| ID | Pregunta |
| --- | --- |
| I1 | ¿Se aprueban las tablas de sincronización tal como están, o Dev las revisa primero? |
| I2 | ¿"Certified for 4+ years" o "certified since 20XX"? |
| I3 | ¿Zoho CRM está soportado? |
| I4 | ¿Qué productos exactos de Sage y SAP se soportan? |
| I5 | ¿Sigue siendo correcto "Works with QuickBooks Desktop and QuickBooks Online" para clientes nuevos? |
| I6 | ¿Se aprueba la reseña de AH (Quickchoice) específica de QuickBooks? |
| I7 | ¿Se gestionan permisos para logos de los ERP o se mantienen sólo nombres? |
| I8 | ¿Vigencia de los modelos de impresoras y requisitos de dispositivos? |
| I9 | ¿Se añade una nota de marcas registradas al pie legal? |
