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

(Reemplazado por DEC-021 el 20 de octubre de 2026.) La rama `qa` no formaba parte de la etapa inicial porque el proyecto tiene un solo
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

## DEC-017 Company y Pricing: variantes "dossier" y patrón del footer animado

**Estado:** Instrucción de Erick — 14 de octubre de 2026 (referencia
ddark.dev, sólo secciones). Implementación técnica de Claude, pendiente de
revisión.

**Decisión.** `/about/`, `/industries/`, `/support/`, `/listaso-impact/`,
`/join-us/`, `/contact-us/` y `/plans/` usan el copy de `start-version` y una
familia de variantes "dossier" (etiquetas entre corchetes, titulares display
en mayúsculas, cajas enmarcadas, cronologías, palabras cinéticas, canales e
índice con vista previa). El catálogo está en `docs/SECTION_VARIANTS.md` y el
contenido en `docs/COMPANY_PRICING_CONTENT_CONTRACT.md`.

**Pricing.**
- El patrón del footer (retícula de 72 px con brillos aqua y magenta) se
  reconstruye con tokens semánticos (`GridPattern`), así funciona en claro y
  en oscuro. No se modifica `SiteFooter` (Codex).
- Movimiento: aparición única al cargar y deriva ligada al scroll (sólo
  `translate`/`scale`). Sin bucles infinitos (QA-006); estático con
  movimiento reducido o sin soporte de scroll-driven animations.
- Selector mensual/anual sin JavaScript: radios nativos `#plans-monthly` y
  `#plans-yearly` (distintos de `#billing-*` de la Homepage). El logo de SAMI
  es la perilla y "rueda" (desplazamiento + una vuelta) hacia la opción
  elegida; el riel es decorativo y también alterna con un clic.
- **Pendiente:** el enlace de CodePen que Erick mencionó no llegó en el
  mensaje. El selector es una interpretación ("en vez del oso, el logo de
  SAMI") y se ajustará cuando se comparta el enlace.

**Navegación.** `NextPage` acepta el grupo "Company" con una lista de rutas
de esta app. En esta etapa omitía `/rating/` y `/blog/`; DEC-019 incorpora
`/rating/` y mantiene únicamente el blog fuera de la aplicación nueva.

**Restricciones.** Sin dependencias nuevas ni componentes cliente nuevos;
Server Components por defecto; CSS Modules sólo para estados con `:has()`,
animaciones y el patrón.

## DEC-018 Skill externa de motion como referencia subordinada

**Estado:** Aceptada — 15 de octubre de 2026 (instrucción de Erick). Registrada
por Claude; revisión pendiente de Erick.

**Decisión.** Se incorpora `design-motion-principles` (MIT, Kyle Zantos) en
`.agents/skills/design-motion-principles/`, con `LICENSE.txt` y un bloque
"Uso en Listaso" al inicio de `SKILL.md`. Es referencia para audit y revisión
de motion; no es fuente de código ni de dependencias.

**Reglas que prevalecen sobre la Skill.**
- Sin dependencias nuevas: las recetas de Framer Motion / Motion no aplican.
  Stack: CSS y, si se aprueba, GSAP según `listaso-gsap-motion`.
- Audit no edita código automáticamente.
- `prefers-reduced-motion` obligatorio; sin scroll hijacking ni bucles
  decorativos (QA-006, DEC-017).
- Informes HTML generados fuera del repo.
- Hallazgos validados con `listaso-accessibility-qa` y
  `listaso-web-performance`.

**Descartadas en la misma revisión.** `taste-skill`, `image-to-code-skill`,
`awesome-design-md`, `design-md-chrome`, OmniRoute, Headroom,
`everything-claude-code`, Caveman y `awesome-claude-skills` (lista). Motivos en
`docs/handoffs/2026-10-15-motion-skill.md`. `web-design-guidelines` ya estaba
instalada y no se duplica.

**Restricciones.** Sin cambios en `src/`, `public/`, dependencias, build ni
producción; sin credenciales.

## DEC-019 `/rating/` en la aplicación nueva con Site Reviews como backend

**Estado:** Instrucción de Erick — 16 de octubre de 2026. Implementación de
Codex; pendiente de revisión visual de Erick y validación de Development.

**Decisión.** `/rating/` conserva su URL, metadata, copy, calificación agregada
y reseñas publicadas de la página vigente. La presentación se adapta a la
familia dossier ya aprobada para Company, con composición responsive y temas
claro/oscuro. La ruta entra en la secuencia `NextPage` de Company; `/blog/`
continúa fuera de la aplicación nueva.

**Formulario.** La interfaz nueva envía el mismo conjunto de datos público
(rating, review y name) al endpoint actual de WordPress Site Reviews. No se
creó una reseña de prueba porque eso publicaría contenido externo. Antes del
cutover, Development debe validar CORS, antispam, moderación, respuestas de
error y disponibilidad del endpoint desde el dominio final.

**Restricciones.** No se crea `/es/rating/`, no se migra el historial ni la
moderación, no se inventa copy y no se cambia WordPress, producción o DNS.

## DEC-020 Homepage editorial (19 de octubre de 2026) y logo core "Listaso"

**Estado:** Instrucción de Erick — 19 de octubre de 2026. Implementación de
Claude en `feat/homepage`, sin commit; pendiente de revisión visual de Erick.

**Copy.** El encargo del 19 de octubre reemplaza, sólo en la Homepage, el copy
aprobado en DEC-013 para hero, workflow, SAMI, Support y Customers. Se
normalizaron tres erratas del texto original sin cambiar su sentido: "from" →
"for Growing Businesses", "Platforn" → "Platform" y "team work" → "team
works". El detalle vive en `docs/HOME_CONTENT_CONTRACT.md`.

**Metadata.** Title y description se alinearon con la nueva propuesta de
valor usando sólo frases del copy aprobado (eyebrow y descripción del hero) y
la mención a integraciones que ya existía.

**Orden de la Homepage.** Hero, cifras, workflow de 4 pasos (`#solutions`),
SAMI, Support, capacidades (`HomeCapabilities`, nuevo), Customers, Pricing y
banda final.

**CTA.** "Book a Demo" en header, menú móvil y hero; los eventos y ubicaciones
de analytics no cambian. "Explore Our Solutions" deja `/join-us/` y apunta a
`#solutions`. Los CTA de demo de Pricing ("Book a demo") y de la banda final
("Book a free demo"), y los de otras páginas, no se tocaron: quedan registrados
como inconsistencia pendiente de decisión.

**Logo core.** Header, footer y lockups usan los SVG "Listaso" entregados por
Erick (`~/Downloads/1x`), copiados byte a byte como `listaso-logo-*` y
registrados en `src/content/brand/assets.ts`. Los lockups anteriores
"Listaso Technology" quedan como `legacy`. Nombre accesible: "Listaso home".
SAMI, productos, clientes y terceros no cambian.

**Tipografía.** Se añade `--text-h2-compact` (32 → 36 px) porque la escala no
tenía un paso de ~36 px. Lo usan el H2 de SAMI y el índice de Support; "First
response" usa `text-body` (16 px).

**Cifras.** `ProofStrip` y `MetricOdometer` (About) comparten
`ProofCards.module.css` y el orden de tonos de `proofTones.ts`: tintes de
roles semánticos (aqua, azul, navy, magenta), sin vidrio ni animación nueva.

**Pendientes registrados.**
- **SAMI:** Development/Producto confirman el destino de activación del
  trial (hoy el formulario de Zoho integrado en `/sami/`). La duración vigente
  quedó actualizada en DEC-025 a 14 días. El enrutamiento y la confirmación de
  los correos del formulario aún requieren validación en Zoho.
- **H2 de capacidades:** "More Listaso capabilities" es provisional y visualmente
  oculto; falta título editorial.
- **ES/EN:** el selector queda bloqueado por falta de paridad
  (`docs/I18N_SWITCH_PLAN.md`).
- **Logo:** el navy del wordmark difiere entre archivos (#00375B horizontal,
  #003F69 "stacked"); los archivos "stacked" muestran símbolo y wordmark en una
  línea. Confirmar con Marketing.

## DEC-021 Tres ramas permanentes: dev, qa y main

**Estado:** Aprobada por Erick — 20 de octubre de 2026. Reemplaza DEC-004.

Sólo existen tres ramas: `dev`, `qa` y `main`. El flujo es
`dev -> qa -> main`, siempre mediante Pull Request con el check `CI / Quality`.
No se crean ramas `feat/*`, `ux/*`, `fix/*`, `chore/*` ni `docs/*`; el trabajo
se integra en `dev`. Las ramas de trabajo existentes se eliminan una vez
integradas. `main` mantiene la ruleset "Protect main" (PR con una aprobación,
sin borrado ni force push) y no hay push directo. Llegar a `main` no autoriza
conectar `listaso.com`, cambiar DNS ni sustituir producción.

**Cloudflare.** Los previews automáticos se limitan a `dev` y `qa`; revisar en
Branch control que ya no dependan de los patrones `feat/*`, `ux/*`, etc.

## DEC-022 Carrusel infinito de logos en la Homepage

**Estado:** Instrucción del usuario (Henry) — 20 de octubre de 2026.
Implementación de Claude, sin commit; pendiente de revisión de Erick.

**Decisión.** El riel de logos de clientes de la Homepage (`CustomerProof`)
es un carrusel infinito que se mueve de forma continua aunque el visitante no
haga scroll. Es una excepción, sólo para este riel, a la restricción de
DEC-016 ("sin autoplay de contenido en movimiento").

**Condiciones (WCAG 2.2.2).** Se pausa con hover, con foco dentro del riel y
con el control nativo "Pause autoplay" (checkbox, funciona sin JavaScript).
Con `prefers-reduced-motion` no se mueve: cuadrícula estática de 2/4
columnas, sin copia decorativa ni control. La segunda mitad del riel es
decorativa (`aria-hidden`, imágenes con `alt=""`, sin enlaces). Logos, alts y
enlaces sin cambios.

**Ampliación (20 de octubre de 2026, instrucción del usuario).** La misma
excepción aplica al componente compartido `Marquee` (Direct sales, B2B
e-Commerce, Integrations y Forms), que deja de depender del scroll y se
mueve de forma continua; estático con `prefers-reduced-motion`; copias
decorativas `aria-hidden` y una sola lista accesible. Por instrucción
posterior del usuario, en `Marquee` se retiraron el control "Pause
autoplay" y la pausa por hover/foco: siempre se mueve. **Riesgo
registrado:** sin mecanismo de pausa, este riel no cumple WCAG 2.2.2 para
quien no active "reducir movimiento"; Erick debe confirmarlo o pedir que se
restituya el control. El riel de logos de la Homepage conserva su pausa.

**Ampliación (22 de octubre de 2026, instrucción del usuario).** Se retiran
todos los botones visibles de pausa/reproducción de animaciones del sitio por
estética: riel de logos de `CustomerProof` (checkbox "Pause autoplay"),
`CapabilityRail`, `TestimonialSpotlight`, `SamiConversation` (y su evento
hacia `SamiLogoMark`) y `SnapCarousel`. Se conservan las pausas automáticas
(hover, foco, fuera de pantalla, pestaña oculta) y el estado estático con
`prefers-reduced-motion`. **Riesgo registrado:** el riel de logos y la
conversación de SAMI se mueven sin un control visible de pausa, lo que no
cumple WCAG 2.2.2 para quien no active "reducir movimiento"; Erick debe
confirmarlo.

## DEC-023 Identidad propia por página de integración

**Estado:** Instrucción del usuario (Henry) — 21 de octubre de 2026.
Implementación de Claude, sin commit; pendiente de revisión de Erick.

**Decisión.** Las 8 páginas de sistemas contables (QuickBooks, Sage 100,
Acumatica, SAP, NetSuite, Zoho, Acctivate, AccountMate) dejan de compartir
una sola composición. `SystemPage` elige por slug una composición propia
(hero, vista de la sync y formato de funciones distintos en cada una) y
mantiene compartidos sólo los cierres: otros sistemas, siguiente página y
CTA final. Printers and scanners y el hub de Integrations no cambian.

**Reglas.** No se cambia ni se elimina información: cada página muestra el
hero (título, lead, línea de plan, CTAs), su foto, el panel de sync o su
equivalente ("No double entry"), el resumen, todas las filas de sync con su
dirección y todas las funciones; los extras de QuickBooks (certificado,
rating) y Sage (reseña) siguen en su página. Los componentes nuevos son
exclusivos de estas páginas; los compartidos se usan sin modificarlos.
Movimiento finito o ligado al scroll/hover (sin bucles autónomos salvo la
marquesina ya aprobada en DEC-022), con estado final en movimiento reducido.

## DEC-024 Precios globales de Listaso

**Estado:** Instrucción de Erick — 22 de octubre de 2026.

Los precios mensuales por usuario de los planes globales de Listaso pasan a
Growth $59, Professional $69 y Enterprise 360 $79. Al pagar el año completo,
los equivalentes mensuales son $49.17, $57.50 y $65.83, con totales anuales
de $590, $690 y $790 (diez meses pagados). Homepage, `/plans/` y referencias
de precios de productos deben coincidir.

Los planes SAMI se cobran por equipo y conservan importes separados; no se
recalculan con los precios globales de Listaso.

## DEC-025 Precios y onboarding de SAMI

**Estado:** Aclaración de Erick en imagen — 22 de octubre de 2026.

La página SAMI muestra Starter $59/mes (1 usuario; hasta 500 clientes y 250
artículos), Professional $129/mes (hasta 3 usuarios; 1,000 clientes y
artículos) y Business $299/mes (hasta 10 usuarios; 1,000+ clientes y
artículos). Los precios son por equipo, SAMI AI usage is included y conectar
ChatGPT o Claude no cuesta extra. Cada plan ofrece 14 días de prueba. Erick
confirmó esta duración el 23 de octubre de 2026, sustituyendo la indicación
anterior de 15 días.

Onboarding: Starter $199; Professional y Business $499, una sola vez. Se
ofrece gratis hasta el 31 de diciembre de 2026 o con pago anual. Incluye
conexión a QuickBooks, importación de historial, revisión de datos y
capacitación del equipo. Un crédito SAMI adicional cuesta $10; múltiples
archivos de empresa o limpieza de datos se cotizan por separado.

## DEC-026 CTA principal en degradado

**Estado:** Instrucción de Erick con referencia visual — 23 de octubre de 2026.

El CTA principal de SAMI y de las demás páginas usa el degradado horizontal
`#DBE9FE` → `#41F9FF`, texto navy `#00375B`, forma de píldora y borde blanco.
Se aplica en la variante primaria del componente compartido `Button`; las
acciones secundarias y terciarias conservan su jerarquía. Esta decisión
sustituye el fondo rojo de la variante primaria descrito en DEC-007 y en la
foundation visual, sin cambiar los acentos de otras partes de la interfaz.
La referencia visual menciona 15 días, pero DEC-025 mantiene vigente la
promoción de 14 días; sólo se toma de la imagen el estilo del botón.
