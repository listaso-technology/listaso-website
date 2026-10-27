# Contrato de contenido — Company y Pricing (EN)

**Fecha:** 16 de octubre de 2026
**Agentes:** Claude y Codex, `feat/homepage`
**Estado:** Implementado, pendiente de revisión de Erick y de validación de
Development, Ventas y RR. HH. donde se indica.

Etiquetas (PROJECT_MASTER): CONFIRMADO, OBSERVACIÓN, HIPÓTESIS,
RECOMENDACIÓN, DESCONOCIDO, REQUIERE VALIDACIÓN DEV.

## 1. Alcance

| Ruta | Fuente (`start-version/source/build/`) | Contenido (`src/content/`) | Cierre |
| --- | --- | --- | --- |
| `/about/` | `pages_company.py`, `about_body()` | `company/about.ts` | `FinalCta` |
| `/industries/` | `pages.py`, `industries_body()` + bloque `ind` de `home_extras.html` | `company/industries.ts` | `FinalCta` |
| `/support/` | `pages_company.py`, `support_body()` | `company/support.ts` | `FinalCta` |
| `/listaso-impact/` | `pages_company.py`, `impact_body()` | `company/impact.ts` | Sin banda CTA (igual que la fuente) |
| `/join-us/` | `pages_company.py`, `careers_body()` | `company/careers.ts` | Sin banda CTA (igual que la fuente) |
| `/contact-us/` | `pages_company.py`, `contact_body()` | `company/contact.ts` | `FinalCta` |
| `/plans/` | `pages_more.py`, `plans_body`, `COMPARE`, `PLANS_FAQ` | `pricing/plans.ts` | `FinalCta` |
| `/rating/` | Página pública de WordPress capturada el 15 de octubre de 2026 | `company/rating.ts` | `FinalCta` |

El blog sigue en WordPress (DEC-011). `/rating/` ya tiene vista en la aplicación
nueva y forma parte de `NextPage`; su publicación sigue dependiendo de validar
la continuidad del endpoint de Site Reviews antes del cutover (DEC-019).

Titles y meta descriptions: los de la fuente indicada en la tabla, en cada
archivo de contenido (`metadata`).

## 2. Reutilización de datos aprobados (DEC-013)

CONFIRMADO. Estos datos se importan de `src/content/home/en.ts` y no se
duplican, para que la Homepage y las páginas internas digan siempre lo mismo:

- **Pricing:** planes, precios mensuales y anuales, total anual, etiquetas de
  facturación, notas, CTA de demo y el add-on de Sami (`board = pricing`).
- **Support:** tabla de tiempos de respuesta, horario, calificaciones (4.7
  Google · 42 reseñas, 5.0 QuickBooks App Store) y testimonios de clientes.
- **About:** cifras de marca vía `ProofStrip`, el mismo componente de la
  Homepage (Homepage y About us únicamente, DEC-016). `MetricOdometer` se
  retiró el 20 de octubre de 2026.

## 3. Preguntas abiertas

| # | Tema | Estado | Responsable |
| --- | --- | --- | --- |
| C1 | Tabla comparativa de `/plans/` (qué incluye cada plan, fila por fila) viene de `COMPARE` en `start-version` | REQUIERE VALIDACIÓN | Ventas / Producto |
| C2 | FAQ de precios: tarifa de onboarding, requisitos de dispositivos (iPhone 13+, iOS 16+, Android 8.1+ con 3 GB) y horario de soporte | REQUIERE VALIDACIÓN | Ventas / Development |
| C3 | "Send us a message" enlaza al formulario de Zoho `https://zfrmz.com/h6RkbByHQKx7RtjV0sUn` de la fuente. Confirmar que sigue activo y quién recibe los envíos. La integración API de Zoho sigue fuera de alcance (DEC-011) | REQUIERE VALIDACIÓN DEV | Development |
| C4 | Aliados de Impact (USAID, FUSALMO, UCA, Albergue Misericordia, UDB, Manos Amigas): confirmar relación vigente y permiso para nombrarlos. Se muestran sólo como texto, sin logos | DESCONOCIDO | Marketing |
| C5 | Cinco publicaciones de LinkedIn en Impact: confirmar que siguen públicas | DESCONOCIDO | Marketing |
| C6 | `info@listaso.com` aparece sólo en la fuente de Contact, no en `navigation.ts`. Confirmar que el buzón se atiende | DESCONOCIDO | Operaciones |
| C7 | Direcciones de Miami y El Salvador | REQUIERE VALIDACIÓN | Operaciones |
| C8 | Beneficios de Careers (8) y enlace de vacantes en LinkedIn | REQUIERE VALIDACIÓN | RR. HH. |
| C9 | Selector de facturación con el logo de SAMI: es una interpretación, porque el enlace de CodePen mencionado por Erick no llegó en el mensaje (ver DEC-017) | HIPÓTESIS | Erick |
| C10 | El formulario de `/rating/` envía al endpoint público actual `https://listaso.com/wp-json/site-reviews/v1/submissions`. Validar CORS, antispam, moderación y continuidad del endpoint desde el dominio final antes del cutover; no se creó una reseña de prueba pública | REQUIERE VALIDACIÓN DEV | Development |

## 4. Fotografía (DEC-009)

Todas las fotos son temporales (Unsplash, licencia libre), autohospedadas en
`public/images/sections/` con `srcset` 768/1280/1920 y registradas en
`src/content/media/sections.ts` con autor, enlace y brief para Diseño.

- Ninguna foto de archivo representa al equipo, a clientes, oficinas reales
  ni eventos de Impact.
- **About:** se descartó `storeCounter` (dos personas con delantal junto a
  "About us" podían leerse como el equipo). Se usa `warehouseAerial`, sin
  personas.
- **Contact e Impact:** las fotos de oficina son contexto de ciudad (skyline
  de Miami, San Salvador). Deben reemplazarse por fotos reales aprobadas.
- **Industries:** una foto por industria (6 nuevas, sin marcas legibles);
  alimentos y bebidas reutiliza `productMedia.dsdCrates`.
- El logo de SAMI (`/brand/sami/sami-logo.webp`) se usa como perilla
  decorativa (`alt=""`) del selector y en la franja del add-on.

## 5. Accesibilidad del contenido

- Precios: el valor visual que "rueda" es `aria-hidden`; el precio activo se
  lee en `sr-only` (el inactivo usa `display: none`).
- Tabla comparativa: `<table>` con `caption`, encabezados de columna, un
  encabezado `rowgroup` por app y texto `sr-only` "Included" / "Not
  included". "Optional" es texto visible.
- Enlaces externos de LinkedIn: aviso `sr-only` de pestaña nueva.
- Rating: grupo de radios requerido en orden 1–5, foco visible, campos con
  labels, estado de envío anunciado con `aria-live` y distribución expuesta
  como barras de progreso con nombre y valor.
