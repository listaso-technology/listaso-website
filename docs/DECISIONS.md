# Decisiones técnicas

## DEC-001 Estrategia híbrida de estilos

**Estado:** Aprobada — 7 de octubre de 2026

Tailwind es la herramienta principal. CSS Modules se limita a estilos complejos
y aislados, terceros o animaciones con clases estables. Global CSS contiene
tokens, base y accesibilidad compartida. No usar `@apply` como abstracción general.

## DEC-002 GitHub Actions y Vercel

**Estado:** Reemplazada por DEC-003

Se conserva sólo como historial. Vercel Hobby no gobierna la prueba corporativa.

## DEC-003 CI con GitHub Actions y deployment temporal con Cloudflare

**Estado:** Aprobada — 8 de octubre de 2026

GitHub Actions ejecutará validaciones. Cloudflare publicará temporalmente el
export estático y ofrecerá previews o deployments por branch. La Etapa 1 evita
dependencias de servidor en runtime. SAMI y Zoho se preservan como embeds hasta
que exista otra decisión.

## DEC-004 Modelo interno de branches

**Estado:** Aprobada — 8 de octubre de 2026

El flujo actual es `feat/*`, `ux/*`, `fix/*`, `chore/*` o `docs/*` -> `dev`
-> `main`. `dev` integra el trabajo activo y `main` conserva la propuesta estable
que Erick presenta y valida en persona con developers y stakeholders. No se
hacen pushes directos a `main`: la promoción requiere Pull Request, checks y
autorización de Erick.

La rama `qa` no forma parte de la etapa actual porque el proyecto tiene un solo
responsable operativo y sigue siendo una propuesta. Se incorporará una etapa o
entorno formal de QA mediante una nueva decisión cuando el equipo y la cercanía
del lanzamiento lo justifiquen. Llegar a `main` no autoriza conectar
`listaso.com`, cambiar DNS ni sustituir producción; esas acciones requieren una
autorización posterior y explícita.

Aclaración del 8 de octubre de 2026: Erick confirmó `feat/*` como prefijo
oficial, igual que `docs/PROJECT_MASTER.md`; `feature/*` no se utiliza.

## DEC-005 Runtime y package manager

**Estado:** Aprobada para la foundation — 8 de octubre de 2026

Node.js `24.21.0` LTS y pnpm `12.10.1` quedan fijados para desarrollo y CI. El
lockfile es obligatorio. La máquina tiene Node 26 Current, que puede comprobar
la base pero no será la referencia de CI.

## DEC-006 Export estático e indexación inicial

**Estado:** Aprobada para la foundation — 8 de octubre de 2026

Next.js genera `out/` con `trailingSlash`. Imágenes se exportan sin el optimizador
de servidor. La foundation utiliza `noindex` y robots bloqueado hasta que rutas,
copy, metadata y despliegue tengan aprobación.

## DEC-007 Marca, accesibilidad y temas

**Estado:** Aprobada por Erick — 8 de octubre de 2026

**Prioridad de marca.**
- La guía de marca (`docs/BRAND_ANALYSIS.md`) es la referencia principal.
- Cuando la guía se contradice o un valor no pasa WCAG 2.x AA, se resuelve con
  buenas prácticas: gana la accesibilidad y la consistencia, con el ajuste
  mínimo de color.
- Cada ajuste queda documentado en las referencias de `listaso-design-system`.
- Marketing hará después una auditoría de marca; sus resultados reemplazan los
  ajustes provisionales.

**Tono.** Profesional, cálido y cercano. Listaso se posiciona como un
competidor a la vanguardia de las necesidades de clientes actuales y nuevos, en
un sector muy competido.

**Temas.** El sitio queda preparado para modo oscuro desde el inicio
(actualizado el 8 de octubre de 2026 por decisión de Erick):

- El modo claro es el diseño prioritario.
- Desde el Chat 5, los tokens semánticos tienen valores claros y oscuros.
- El sitio publicado sigue la preferencia del sistema del visitante
  (`prefers-color-scheme`). Si el sistema no declara preferencia, se muestra en
  claro.
- Como los visitantes con sistema oscuro verán el oscuro desde la primera
  publicación, ninguna página se publica sin pasar la revisión en ambos temas.
  Esa revisión es parte de su "terminado".
- El selector manual de tema queda oculto. Se decide aparte; el sitio heredado
  tiene uno, así que es un punto de paridad.

**SAMI.**
- Es un proyecto nuevo de IA. Su línea gráfica complementa la de Listaso, no la
  reemplaza.
- Su paleta oscura sirve de referencia general y se aplica por completo sólo en
  los espacios de SAMI e IA.

## DEC-008 Espaciado, radios, elevación y vidrio

**Estado:** Aprobada por Erick para la foundation en el Chat 5 — 9 de octubre
de 2026. El sistema de 8 puntos ya estaba aprobado desde el 8 de octubre.

**Espaciado.**
- Sistema de 8 puntos, con 4px como medio paso para ajustes finos.
- Los espacios y alineaciones se eligen según la necesidad dentro de esa escala.

**Valores aprobados.** Pasan de `PROPUESTOS` a aprobados los valores definidos
en las referencias de `listaso-design-system`:
- radios, sombras y superficies;
- vidrio, con uso moderado;
- tipografía;
- temas claro y oscuro;
- movimiento;
- uso decorativo moderado del aqua.

Se implementan en `src/styles/` y `src/components/ui/`. La especificación vive
en `.agents/skills/listaso-design-system/references/layout-and-surfaces.md` y
`brand-foundations.md`; conserva la procedencia (`OBSERVED`, `ADJUSTED`) y las
notas de contraste.

**Vidrio.** Recurso decorativo moderado, con estos límites:
- máximo dos superficies por viewport;
- sin anidar;
- nunca en formularios, tablas ni texto largo;
- sin animar `backdrop-filter`;
- con alternativas sólidas para `@supports`, `prefers-reduced-transparency` y
  `forced-colors`.

Neumorfismo, glassmorphism y parallax son recursos opcionales, no el estilo
predeterminado. El rendimiento tiene prioridad sobre los efectos visuales.

**Color aqua.** Su uso decorativo moderado queda permitido. Cuando el color
comunique estado, interacción, límite de control, texto o iconografía esencial,
deberá cumplir el contraste correspondiente (`text.accent` `#007267`,
`icon.accent` `#008476`). La excepción decorativa no convierte un elemento
funcional en decoración.

**Siguen pendientes.** El mapeo 60-30-10 (auditoría de Marketing) y el tamaño
mínimo y el espacio libre del logo continúan como `PROPUESTOS`.

## DEC-009 Fotografía temporal desde Unsplash

**Estado:** Aprobada por Erick — 8 de octubre de 2026

**Fase actual.**
- Se usan fotografías de Unsplash (sólo de licencia gratuita, no Unsplash+)
  como medida temporal.
- Cada imagen ocupa un espacio con proporción definida.
- Cada imagen se registra con su fuente, autor y destino, para pedir después a
  Diseño una fotografía personalizada.

**Reglas.**
- Las imágenes se alojan en el propio sitio, nunca enlazadas a Unsplash.
- Una foto de archivo nunca representa a un cliente, empleado o testimonio
  real.
- No se usan fotos con marcas de terceros visibles.

## DEC-010 Iconografía: Listaso primero, Material Symbols como fallback

**Estado:** Aprobada por Erick — 8 de octubre de 2026; actualizada en el Chat 5,
9 de octubre de 2026.

1. La fuente preferente para iconos propios de Listaso es `listaso-icons.json`
   (IcoMoon, 153 iconos de Listaso App), conservado sin cambios en
   `assets/icons/`.
2. Google Material Symbols (Apache-2.0) se usa como fallback sólo cuando no
   exista un icono adecuado de Listaso. Cada icono se añade como un SVG
   individual, estilo Rounded. Nunca se usa la fuente completa.
3. Los logos y los iconos de producto siguen siendo activos de marca
   (`public/brand/`), no iconos de interfaz.
4. No se incorpora un paquete npm de iconos.
5. Una capa `Icon` semántica (`src/components/icons/Icon.tsx`) permite sustituir
   la fuente sin cambiar a los consumidores. Sólo se generan los iconos
   mapeados en `assets/icons/icon-map.json` (`pnpm icons`).

## DEC-011 Continuidad de contenido, medición y contacto

**Estado:** Aprobada por Erick — 8 de octubre de 2026

**Medición.** El historial disponible desde el 1 de agosto de 2026 es la línea
base completa de GA4 y Search Console porque las herramientas se conectaron al
incorporarse Erick a la empresa. La ausencia de datos anteriores no bloquea la
matriz ni se tratará como una exportación incompleta.

**Blog.** `/blog/`, los 56 artículos, las cinco categorías y el autor conservan
sus URLs exactas. Permanecen operativos en el sistema actual hasta contar con un
entorno aprobado para publicar y administrar artículos. La migración futura no
podrá cambiar slugs ni perder metadata, imágenes, fechas, categorías, enlaces o
métricas. No se crean redirects generales del blog.

**Solicitar demo.** La integración de formularios con Zoho mediante API queda
para una etapa posterior. Mientras tanto, los CTA de demo usan el enlace ya
presente en `start-version/`:
`https://calendly.com/ernesto-henriquez-viasql/60min`. La URL pública
`/book-a-demo/` se preserva hasta definir su implementación definitiva.

**Empresa.** `/support/` será una página nueva. `/rating/` permanece como página
independiente y no redirige a soporte. Ambas se ubicarán en el dropdown de
Empresa de la nueva navegación. Esto no autoriza crear todavía `/es/rating/`;
su equivalente en español requiere una decisión explícita.

## DEC-012 Activos oficiales de marca y producto

**Estado:** Confirmada por Erick — 9 de octubre de 2026 (Chat 5)

**Confirmaciones de Erick:**
- `listaso-sales` corresponde a Sales Advanced.
- Sales Order & Catalog usa el mismo símbolo multicolor confirmado.
- `listaso-customer-order-catalog` se está descontinuando. El activo se
  conserva en el inventario histórico, pero no se presenta como producto vigente
  sin otra aprobación.
- Los logos de Back Office claro y oscuro son oficiales.
- El logo actualizado de Advanced Inventory es oficial.
- `SAMI.svg` y el activo de eCommerce pueden conservarse temporalmente como
  fueron entregados.
- No se recolorean, deforman ni reconstruyen logos.
- SAMI complementa a Listaso; no sustituye la marca principal.
- El color aqua y el efecto de vidrio están permitidos con moderación.
- Neuromorfismo, glassmorphism y parallax son recursos opcionales, no el estilo
  predeterminado.
- El rendimiento tiene prioridad sobre los efectos visuales.

**Registro.** El inventario vive en `src/content/brand/assets.ts`, con archivo,
variante, fondo permitido, estado, fuente original y hash. Los archivos en
`public/brand/` son copias byte a byte de lo entregado.

**Pendiente de confirmación.** No se entregó un archivo llamado `listaso-sales`.
`listaso-van-sales-1.svg` (icono tricolor con efecto vidrio) queda como
producto desconocido y no se publica hasta que Erick lo identifique.

## DEC-013 Fuente de contenido y navegación de la Homepage inglesa

**Estado:** Aprobada por Erick — 9 de octubre de 2026 (Etapa 6)

**Contenido.** La Homepage `/` usa el copy completo de `start-version/`. Erick
aprobó como fuente sus métricas, calificaciones, precios, tiempos de soporte,
testimonios y logos de clientes. Ese copy reemplaza al de la Homepage publicada
en WordPress.

**Matices de la decisión.**
- **CTA del hero:** "Book a free demo" (Calendly, DEC-011) es la acción
  principal; "Learn more about Listaso Technology" → `/join-us/` (WordPress) es
  la secundaria.
- **Medios:** composición con activos oficiales (gradiente de marca, logos e
  iconos), sin fotos ni vídeo. La imagen OG queda pendiente.
- **Testimonios:** los 6 testimonios publicados se aprueban con nombre y
  empresa.
- **FIFOX:** se omite hasta confirmar qué es.

**Navegación.** Header y footer siguen `start-version/`, con dos ajustes por
DEC-011:
- Support y Rate Listaso van dentro del dropdown Company.
- El blog enlaza a `/blog/`, no a `blog.listaso.com`.

Las rutas nuevas (`/forms/`, `/sami/`, `/integrations/`, `/about/`,
`/industries/`, `/support/`) se enlazan como destinos aprobados todavía no
implementados. No hay selector de tema ni de idioma (DEC-007; `/es/` sin
paridad).

## DEC-014 Fuente de contenido de las páginas de producto en inglés

**Estado:** Instrucción de Erick — 12 de octubre de 2026. Los puntos abiertos
P1 a P8 de `docs/PRODUCT_CONTENT_CONTRACT.md` siguen pendientes de
confirmación.

**Contenido.** Las nueve páginas de Products (`/pre-sales/`,
`/direct-sales/`, `/inventory/`, `/delivery/`, `/back-office/`,
`/b2b-ecommerce/`, `/forms/`, `/sami/`, `/custom-development/`) usan como
referencia el copy en inglés de `start-version/`, igual que la Homepage
(DEC-013). No se añaden claims, cifras, precios ni integraciones fuera de esa
fuente.

**Medios.** Fotografías de Unsplash como relleno temporal (DEC-009), a
reemplazar con el equipo de Diseño. Registro en
`src/content/media/products.ts`.

**Temas.** Cada página se revisa en claro y oscuro antes de considerarse
terminada (DEC-007). Sami usa el contexto SAMI en su hero y ejemplos.

## DEC-015 Fuente de contenido de la sección Integrations en inglés

**Estado:** Instrucción de Erick — 13 de octubre de 2026. Las preguntas I1 a
I9 de `docs/INTEGRATIONS_CONTENT_CONTRACT.md` siguen abiertas.

**Contenido.** `/integrations/`, las ocho integraciones contables
(`/quickbooks/`, `/sage/`, `/acumatica/`, `/sap/`, `/netsuite/`, `/zoho/`,
`/acctivate/`, `/accountmate/`) y `/printers-and-scanners/` usan el copy en
inglés de `start-version/`. Las tablas de sincronización, la compatibilidad de
hardware y los requisitos de dispositivos requieren validación de Development
antes del cutover.

**Reutilización.** La calificación de QuickBooks se reutiliza de la Homepage
(DEC-013), sin nuevas métricas. Actualización del 13 de octubre de 2026: las
cifras de marca ya no se muestran en Integrations (ver DEC-016).

**Marcas de terceros.** Los sistemas y fabricantes se nombran sólo como texto.
Sus logos o badges requieren las guías y el permiso de cada marca.

## DEC-016 Variaciones de sección para Products e Integrations

**Estado:** Instrucción de Erick — 13 de octubre de 2026 (referencias Good
Fella, Symboolic, Thomas Thorstensson y Stavros Symeonidis). Implementación
técnica de Claude, pendiente de revisión.

**Decisión.** Las páginas de Products e Integrations usan variaciones propias
de hero y de secciones, no copias de la Homepage. El catálogo y su asignación
por página están en `docs/SECTION_VARIANTS.md`. El copy sigue siendo el de
`start-version` (DEC-014 y DEC-015).

**Restricciones técnicas.**
- Sin GSAP ni dependencias nuevas.
- El movimiento ligado al scroll usa CSS scroll-driven animations con mejora
  progresiva y respeta `prefers-reduced-motion`.
- Sin autoplay de contenido en movimiento: la marquesina sólo se mueve con
  el scroll.
- Un único componente cliente nuevo (`StoryObserver`).
- Imágenes responsivas autohospedadas con `srcset`, porque el export estático
  no tiene optimizador (DEC-006).

**Actualización (Erick, 13 de octubre de 2026).** La sección de cifras de marca
("Since 2015", 400+, 2,000+, 2M+, $1.8B+) se muestra sólo en la Homepage y en
About us. Se retiró de Products e Integrations. `MetricOdometer` se conserva
para About us.
