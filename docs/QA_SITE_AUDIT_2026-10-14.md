# Auditoría integral y proceso QA por página

**Fecha:** 14 de octubre de 2026  
**Rama auditada:** `feat/homepage`  
**Estado:** Auditoría completa sobre el working tree actual; no se corrigió código
de producto.  
**Exclusión:** `start-version/` no se inspeccionó como implementación ni se
incluyó en build, lint, tipos o análisis de código sin uso.

Etiquetas: `CONFIRMADO`, `OBSERVACIÓN`, `RECOMENDACIÓN`,
`REQUIERE VALIDACIÓN DEV`, `REQUIERE APROBACIÓN`.

## 1. Resultado ejecutivo

La aplicación está técnicamente estable como preview: compila, exporta 21
páginas, no presenta overflow horizontal entre 320 y 1440 px, conserva una
jerarquía de encabezados válida, metadata única y fallbacks de movimiento
reducido. No está lista para sustituir por sí sola el sitio público.

Los bloqueadores principales antes de un cutover son:

1. **12 destinos enlazados no existen en el export nuevo.** Funcionan sólo si
   WordPress o una regla de edge continúa sirviéndolos. Un deployment aislado
   los convierte en 404.
2. **La indexación está bloqueada intencionalmente.** Todas las páginas tienen
   `noindex, nofollow` y `robots.txt` contiene `Disallow: /`. Es correcto para
   el preview, pero bloquea un lanzamiento público.
3. **Hay contenido comercial/técnico implementado que sigue pendiente de
   aprobación o validación Dev**, especialmente SAMI Credit, modelos de
   hardware, tablas/direcciones de sincronización, “real time”, productos
   exactos de Sage/SAP, Zoho CRM y certificaciones.
4. **`llms.txt` está desactualizado y se contradice con el sitio actual.** No
   incluye Forms, SAMI ni el hub de Integrations, y todavía afirma que no hay
   una fuente pública de SAMI.

No se detectaron fallos de build, TypeScript o ESLint, dependencias de runtime
innecesarias ni rutas implementadas que respondan distinto de 200.

## 2. Alcance y evidencia

Carpetas y superficies revisadas:

- `src/app/`: rutas, layouts, metadata y robots.
- `src/components/`: layout, UI, Home, Products, Integrations y variantes.
- `src/content/`: copy, navegación, contratos de tipos y manifiestos de medios.
- `src/styles/`: tokens, base y movimiento.
- `src/lib/`, `src/features/`, `src/types/`.
- `public/`: marca, imágenes, iconos, fuentes y `llms.txt`.
- `scripts/`, `.github/workflows/`, configuración de Next, TypeScript, ESLint,
  Tailwind/PostCSS y `package.json`.
- `docs/`: decisiones, contratos, route map, handoffs y worklog.
- `out/`: sólo como artefacto generado para comprobar páginas, payload y links.

Entorno de auditoría:

- Node local `26.11.1`; la referencia de CI continúa siendo `24.21.0`.
- pnpm `12.10.1`.
- Next.js `16.4.0`, export estático y webpack.
- Chromium automatizado contra el export local.
- Breakpoints: 320, 375, 768, 1024 y 1440 px; revisión adicional a 390 px en
  tema oscuro y `prefers-reduced-motion: reduce`.

Comandos ejecutados:

```text
pnpm peers check
pnpm lint
pnpm typecheck
pnpm exec next build --webpack
pnpm exec tsc --noEmit --noUnusedLocals --noUnusedParameters --incremental false
git diff --check
```

El último comando de TypeScript sólo reportó dos símbolos no usados dentro de
`.next/dev/types/validator.ts`, archivo generado por Next; no reportó código
fuente de `src/`.

## 3. Cobertura actual

El build genera 24 salidas: 21 páginas, `_not-found`, 404 y `robots.txt`.

### Páginas públicas implementadas

- `/`
- Products: `/pre-sales/`, `/direct-sales/`, `/inventory/`, `/delivery/`,
  `/back-office/`, `/b2b-ecommerce/`, `/forms/`, `/sami/` y
  `/custom-development/`.
- Integrations: `/integrations/`, `/quickbooks/`, `/sage/`, `/acumatica/`,
  `/sap/`, `/netsuite/`, `/zoho/`, `/acctivate/`, `/accountmate/` y
  `/printers-and-scanners/`.

### Página interna

- `/foundation/`: muestra de la foundation, correctamente excluida de
  indexación.

### Destinos enlazados que faltan en este export

`/about/`, `/blog/`, `/contact-us/`, `/industries/`, `/join-us/`,
`/listaso-impact/`, `/plans/`, `/privacy-policy/`, `/rating/`, `/support/`,
`/subscription-agreement/` y `/terms-and-conditions/`.

Esto no autoriza crear redirects o páginas. Antes del cutover debe existir una
de estas dos garantías por URL:

- la ruta permanece servida por WordPress; o
- el nuevo sitio la sirve/redirecta con una decisión aprobada, un solo salto y
  preservación de query strings/UTM.

Además, `/book-a-demo/`, los 56 artículos, cinco categorías y el autor del blog
siguen bajo la estrategia de coexistencia definida en `docs/SITE_ROUTE_MAP.md`.

## 4. Hallazgos priorizados

### Alta — bloqueadores de publicación

#### QA-001 — Links internos sin destino en el export

**Evidencia:** las 12 rutas listadas arriba aparecen en header, Home o footer,
pero no tienen `index.html` en `out/`.

**Impacto:** navegación rota si Cloudflare publica únicamente este export.

**Acción:** documentar explícitamente la convivencia con WordPress por ruta y
probar el preview integrado; antes del cutover, crawl completo de las 89 URLs
públicas y verificación de 200 o un único 301 equivalente.

#### QA-002 — Bloqueo total de indexación

**Evidencia:** 20 páginas comerciales devuelven `noindex, nofollow`; `robots.txt`
devuelve `Disallow: /`.

**Evaluación:** `CONFIRMADO` y correcto para esta fase por DEC-006. Es un
bloqueador deliberado, no un bug del preview.

**Acción:** crear un checklist de activación separado. No retirar el bloqueo
hasta que rutas, copy, metadata, redirects, sitemap y cutover estén aprobados.

#### QA-003 — Claims pendientes dentro de páginas implementadas

**Evidencia:** los contratos de Products e Integrations registran preguntas
abiertas P1–P8 e I1–I9. Entre ellas: SAMI Credit de $9.99, modelos de hardware,
“Certified”, “real time”, tablas de sync, Zoho CRM, productos exactos de Sage y
SAP, QuickBooks Desktop y prueba social de QuickBooks.

**Impacto:** riesgo comercial, técnico y legal si el preview se convierte en
producción sin revisión humana.

**Acción:** Product/Development/Marketing deben cerrar cada pregunta y dejar
evidencia por ruta. No usar la presencia en `start-version` como aprobación
automática.

### Media — corregir antes de aprobación de la rama

#### QA-004 — `llms.txt` desalineado con el sitio

**Evidencia:**

- “Last reviewed” continúa en `2026-10-05`.
- La guía de SAMI declara que no existe fuente pública, pero ahora existen `/`
  y `/sami/` con contenido detallado.
- Products omite `/forms/` y `/sami/`; Integrations omite el hub
  `/integrations/`.
- Enlaza `/plans/`, `/contact-us/` y las políticas, que no existen dentro del
  export nuevo y dependen de WordPress.
- Lista “Listaso Customer Order Catalog” como aplicación publicada, aunque
  DEC-012 la clasifica como producto en descontinuación y prohíbe presentarla
  como producto vigente sin aprobación.

**Acción:** revisión editorial fuente por fuente; actualizar fecha, cobertura y
estado de SAMI, y marcar explícitamente qué URLs continúan en WordPress. No
añadir hechos que no hayan sido aprobados.

#### QA-005 — Payload cliente y HTML por encima de una base ligera

**Evidencia local del export:**

- Páginas estándar: aproximadamente `199 KiB gzip` de JS+CSS referenciado.
- Home y SAMI: aproximadamente `231 KiB gzip` de JS+CSS referenciado.
- HTML comercial: `25–45 KiB gzip` (`182–297 KB` sin comprimir).
- Foundation: `86.6 KiB gzip` de HTML; es interna.
- Home crea 1,165 nodos DOM; las demás páginas comerciales, 747–990.
- `icon-data.ts` pesa 78,079 bytes fuente y entra al cliente cuando
  `SamiConversation` importa `Icon`.

**Impacto:** el resultado local carga rápido, pero localhost no representa red
móvil ni CPU media. El coste compartido puede afectar LCP/INP cuando se activen
analytics, fuentes y otras integraciones.

**Acción:** medir tres corridas móviles por plantilla en un preview Cloudflare
con caché fría/caliente. Separar los glifos usados por Client Components o
generar módulos por icono antes de añadir más iconos. Definir presupuestos
numéricos después de obtener esa línea base.

#### QA-006 — Movimiento continuo sin control propio de pausa

**Evidencia:**

- dos orbes SAMI: 16 s y 19 s infinitos;
- esfera decorativa de `/sami/`: giro infinito de 90 s;
- el control de `SamiConversation` pausa la conversación y el logo asociado,
  pero no gobierna necesariamente todas las decoraciones CSS del lienzo.

Todos se detienen con `prefers-reduced-motion`, lo que pasó en navegador.

**Acción:** decidir si el botón de pausa debe detener toda la sección SAMI o si
las decoraciones deben ser estáticas. La regla interna de QA exige revisar todo
movimiento superior a 5 s. Medir además fluidez en hardware móvil real.

#### QA-007 — Objetivos táctiles menores al estándar interno

**Evidencia a 320 px:**

- el botón “Pause animation” mide aproximadamente 37 px de alto;
- enlaces sociales del footer miden 40 px;
- enlaces de directorio/legal del footer miden 28–38 px;
- varios enlaces de sección miden 24–28 px de alto y no todos son enlaces
  puramente inline dentro de un párrafo;
- el `<summary>` del menú conserva un hijo visual de 48 px, pero su propio
  rectángulo medido puede ser menor.

**Impacto:** la UI no desborda y sigue siendo operable, pero no cumple de forma
consistente la regla interna de 44/48 px para controles táctiles.

**Acción:** aumentar `min-height`/padding de controles independientes y medir el
rectángulo interactivo del `<summary>`, no sólo el del `<span>` hijo.

#### QA-008 — Favicon solicitado pero ausente

**Evidencia:** `/favicon.ico` responde 404 y genera el único error de consola
observado.

**Acción:** producir el favicon desde el isotype oficial cuando Diseño confirme
el uso mínimo. No reconstruir ni recolorear el logo.

#### QA-009 — SEO social y structured data incompletos

**Pasa:** todas las páginas comerciales tienen title y description únicos,
canonical absoluto correcto, Open Graph básico y exactamente un H1. No hay
saltos de heading, IDs duplicados ni imágenes sin `alt`.

**Pendiente:** no hay `og:image`, Twitter cards, JSON-LD, sitemap nuevo ni
redirects del export. `hreflang` está correctamente ausente mientras no exista
paridad española aprobada.

**Acción:** cerrar OG image y datos verificables antes de decidir schema. Crear
sitemap sólo con rutas completas e indexables; no incluir `/foundation/`.

### Baja — mantenibilidad y documentación

#### QA-010 — Código reservado pero actualmente sin uso

El grafo de imports desde rutas/layouts deja desconectados únicamente:

- `src/components/sections/variants/MetricOdometer.tsx`
- `src/components/sections/variants/MetricOdometer.module.css`

Los documentos dicen que se conservan para la futura página About. No se deben
eliminar como “dead code” sin decidir esa ruta. Si About no los usa, eliminarlos
en el mismo ticket.

Los supuestos falsos positivos `tokens.css`, `base.css` y `motion.css` sí se
usan mediante `@import` desde `globals.css`. Las 27 imágenes responsivas de
`public/images/sections/` sí se resuelven dinámicamente desde su manifiesto.

#### QA-011 — Documentación de arquitectura desactualizada

`docs/CURRENT_ARCHITECTURE.md` todavía declara que sólo `/` y `/foundation/`
están implementadas y que no hay otras páginas comerciales. El árbol actual ya
tiene 19 rutas adicionales.

**Acción:** actualizar arquitectura y worklog cuando Erick apruebe estas rutas,
sin convertir su existencia técnica en aprobación editorial.

#### QA-012 — Nombres y estado de navegación

- `HomeMotion` se usa ya en todas las plantillas comerciales; el nombre no
  refleja su alcance.
- El header no identifica la ruta actual con `aria-current="page"`; los
  breadcrumbs sí lo hacen.

Son mejoras de mantenibilidad y orientación, no bloqueadores del build.

## 5. Resultados por página

Todos los renglones siguientes pasaron: HTTP 200, 320/375/768/1024/1440 sin
overflow, 390 oscuro sin overflow, un H1, heading order válido, IDs únicos,
imágenes con `alt`, canonical/OG básico (salvo Foundation) y cero animaciones
activas con movimiento reducido.

| Ruta | HTML gzip | QA específica / riesgo pendiente |
| --- | ---: | --- |
| `/` | 45.5 KiB | 1,165 nodos; 231 KiB JS+CSS; carousels, billing y SAMI requieren regresión táctil; links a rutas aún ausentes |
| `/pre-sales/` | 41.2 KiB | Validar plan/precio y comportamiento offline; fotos dentro del presupuesto |
| `/direct-sales/` | 40.9 KiB | Validar hardware, DSD, impresión y disponibilidad por plan |
| `/inventory/` | 43.2 KiB | Validar lotes, multi-bin, truck loading y plan; uno de los HTML más grandes |
| `/delivery/` | 41.0 KiB | Validar route planner, firmas, pagos y plan |
| `/back-office/` | 41.8 KiB | Validar alcance de dashboards/reportes y CTA hacia SAMI |
| `/b2b-ecommerce/` | 44.6 KiB | Segundo HTML comercial más pesado; validar 40 logins/unlimited y pagos |
| `/forms/` | 34.9 KiB | Validar disponibilidad Enterprise 360 y tipos de pregunta |
| `/sami/` | 29.5 KiB | 231 KiB JS+CSS; validar precios, SAMI Credit, límites y movimiento de 90 s |
| `/custom-development/` | 31.8 KiB | Confirmar que el alcance se presenta como sujeto a análisis, no promesa fija |
| `/integrations/` | 30.4 KiB | Ruta nueva; confirmar cuándo entra a sitemap y convivencia con redirects históricos |
| `/quickbooks/` | 38.7 KiB | Validar certificación, Desktop/Online, reseña AH y todos los flujos de sync |
| `/sage/` | 29.3 KiB | Confirmar Sage 100, “real time” y reutilización de reseña |
| `/acumatica/` | 31.5 KiB | Validar dirección/frecuencia de cada flujo de sync |
| `/sap/` | 36.5 KiB | Confirmar producto SAP exacto, “real time” y transferencias hacia Listaso |
| `/netsuite/` | 29.6 KiB | Confirmar Oracle NetSuite y flujos documentados |
| `/zoho/` | 34.7 KiB | Resolver contradicción Books/Inventory frente a “Zoho CRM contacts” |
| `/acctivate/` | 29.6 KiB | Validar datos, dirección y frecuencia de sync |
| `/accountmate/` | 29.1 KiB | Validar claim “real-time” y tablas de sync |
| `/printers-and-scanners/` | 25.2 KiB | Validar los 13 modelos y requisitos iOS/Android vigentes en 2026 |
| `/foundation/` | 86.6 KiB | Página interna; no canonical/OG, correctamente `noindex`; no publicar en sitemap |

## 6. Proceso QA obligatorio por cada página

Este proceso se aplica a cada ruta nueva o modificada. La evidencia se adjunta
al ticket/handoff; una prueba omitida se marca `NO EJECUTADA`, nunca `PASS`.

### Fase A — contrato y contenido

1. Identificar route-map, contrato de contenido, fuente aprobada y owner.
2. Marcar cada claim, precio, métrica, integración, testimonio, modelo y fecha
   como aprobado, pendiente o rechazado.
3. Comparar H1, headings, cuerpo, CTA, destinos, alt text y metadata con la
   fuente aprobada; no traducir ni completar vacíos por inferencia.
4. Verificar si la página debe aparecer en `llms.txt`; actualizar la fecha y
   retirar contradicciones.
5. Para integrations/hardware, obtener sign-off de Development/Product.

**Gate:** cero claims sin owner o sin estado explícito.

### Fase B — build y estructura

1. `pnpm peers check`, `pnpm lint`, `pnpm typecheck` y build estático.
2. Confirmar `out/<ruta>/index.html` y respuesta 200.
3. Un H1, jerarquía sin saltos, landmarks, IDs únicos y controles con nombre.
4. Imágenes con dimensiones y alt; decoración con `alt=""`/`aria-hidden`.
5. Consola sin errores y sin requests 404.

**Gate:** CI en verde y cero error de consola propio de la ruta.

### Fase C — responsive y temas

Ejecutar en claro y oscuro:

- 320×844, 375×812, 390×844;
- 768×1024, 1024×768;
- 1440×900 y 1536×960;
- zoom/reflow a 200 % y una prueba a 400 % cuando aplique.

Comprobar: overflow global, recorte, lectura, sticky, tablas, `picture/srcset`,
footer, dropdowns, carruseles, orientación landscape y targets de 44/48 px.

**Gate:** cero overflow global, contenido/controles visibles y operables.

### Fase D — interacción, teclado y movimiento

1. Recorrer con Tab/Shift+Tab; foco siempre visible y orden lógico.
2. Header: Enter/Space, Escape, click fuera y retorno de foco.
3. Carruseles: swipe real, botones, flechas, límites y anuncio de posición.
4. Radios, `<details>`, FAQ, pausa/play, mailto/tel y enlaces externos.
5. Probar `prefers-reduced-motion`, `forced-colors` y transparencia reducida.
6. Inventariar toda animación mayor a 5 s y exigir pausa global o estado
   estático aprobado.
7. Medir scroll en un teléfono de gama media; revisar jank de blur/sticky y
   animaciones ligadas al scroll.

**Gate:** la página completa se opera sin ratón y no obliga a ver movimiento
continuo.

### Fase E — performance

1. Medir preview Cloudflare, no localhost, con tres corridas móviles y desktop.
2. Registrar LCP, CLS, INP/TBT de laboratorio, peso transferido, requests,
   HTML, JS, CSS, fuentes e imágenes.
3. Comparar con la línea base de la misma plantilla y explicar regresiones.
4. Verificar prioridad del hero, lazy loading bajo el fold, dimensiones,
   `sizes/srcset`, caché y ausencia de terceros en critical path.
5. Separar resultados de laboratorio, datos de campo y observaciones.

**Gate provisional:** sin regresión material frente a la línea base aprobada.
Los presupuestos numéricos finales se fijan después de medir el preview real.

### Fase F — SEO técnico

1. Title/description únicos, canonical con slash, Open Graph y social image.
2. `noindex`/robots según entorno; nunca aprobar producción por accidente.
3. `hreflang` sólo con pareja completa; schema sólo con hechos validados.
4. Links internos: cada destino 200 o un solo 301 equivalente; preservar UTM.
5. Sitemap sólo con rutas completas; excluir Foundation y páginas incompletas.
6. Crawl antes/después y baseline a 7, 14 y 30 días tras cutover.

**Gate:** cero 404 internos y estado de indexación intencional documentado.

### Fase G — `llms.txt`

1. La fecha de revisión coincide con el release.
2. Cada ruta canónica implementada y aprobada tiene entrada cuando aporta valor.
3. No enlaza páginas inexistentes sin describir la convivencia con WordPress.
4. No contradice decisiones de producto ni presenta productos descontinuados
   como vigentes.
5. Precios, soporte, ratings, apps e integraciones se marcan como temporales
   cuando corresponda y apuntan a fuente verificable.
6. Validar respuesta 200, `text/plain`, UTF-8 y coherencia con robots/sitemap.

**Gate:** cero contradicciones con el contenido aprobado del mismo release.

### Fase H — código y entrega

1. Ejecutar TypeScript con `noUnusedLocals`/`noUnusedParameters` como
   diagnóstico y construir un grafo de imports desde rutas/layouts.
2. Distinguir código muerto de componentes reservados por una decisión futura.
3. Revisar assets públicos contra manifiestos y referencias dinámicas.
4. Confirmar que no se añadió dependencia, Client Component o script externo
   sin necesidad documentada.
5. Actualizar worklog, arquitectura y handoff; registrar pruebas omitidas.

**Gate:** cero archivo huérfano sin justificación y documentación alineada.

## 7. Orden recomendado de corrección

1. Resolver ownership y routing de las 12 rutas enlazadas; preparar el crawl de
   las 89 URLs públicas.
2. Cerrar P1–P8 e I1–I9 con Marketing/Product/Development.
3. Actualizar `llms.txt` y su fecha de revisión.
4. Añadir favicon oficial y corregir targets táctiles compartidos.
5. Medir Cloudflare en móvil y separar iconos de Client Components si la línea
   base confirma el coste.
6. Unificar la pausa de movimiento en espacios SAMI.
7. Completar OG images, sitemap/schema aprobados y plan de activación SEO.
8. Actualizar `CURRENT_ARCHITECTURE.md` y cerrar la decisión sobre
   `MetricOdometer` al implementar About.

## 8. Pruebas no ejecutadas

- Lighthouse/WebPageTest sobre preview Cloudflare y datos de campo reales.
- Safari/iOS, Firefox y Android físico; swipe real y rendimiento GPU móvil.
- Screen reader real (VoiceOver/NVDA) y zoom 400 % manual completo.
- Validación en vivo de todos los destinos externos, App Store/Google Play,
  Calendly y QuickBooks App Store.
- Crawl integrado WordPress + export nuevo y comprobación de redirects en
  Cloudflare.
- Analytics/consentimiento, porque GA4/GTM/Clarity aún no están activados.
- Contraste píxel a píxel sobre fotografía/vidrio en cada recorte; los tokens y
  fallbacks pasan la revisión previa, pero no se repitió ese muestreo visual
  exhaustivo en esta auditoría.

Estas omisiones impiden declarar “listo para producción”, pero no invalidan los
resultados del build y del QA estructural/responsive aquí documentados.
