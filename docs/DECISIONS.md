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

**Estado:** Sistema de 8 puntos aprobado por Erick; valores visuales exactos
propuestos para aprobación en el Chat 5 — 8 de octubre de 2026

**Espaciado.**
- Sistema de 8 puntos, con 4px como medio paso para ajustes finos.
- Los espacios y alineaciones se eligen según la necesidad dentro de esa escala.

**Radios, sombras y vidrio.** Las escalas documentadas permanecen como
`PROPUESTAS`: buscan una imagen consistente y de buena calidad, pero no se
aplican a la aplicación antes de que Erick las apruebe en el Chat 5. El efecto
vidrio queda permitido como recurso decorativo propuesto, con límites explícitos
para no abusar de él. La especificación vive en
`.agents/skills/listaso-design-system/references/layout-and-surfaces.md`.

**Color aqua.** Su uso decorativo queda permitido. Cuando el color comunique
estado, interacción, límite de control, texto o iconografía esencial, deberá
cumplir el contraste correspondiente; la excepción decorativa no convierte un
elemento funcional en decoración. Los colores ajustados para accesibilidad
siguen `PROPUESTOS` hasta el Chat 5.

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

## DEC-010 Íconos de Google Material Symbols

**Estado:** Aprobada por Erick — 8 de octubre de 2026

**Biblioteca.**
- La iconografía de interfaz viene de Google Material Symbols (licencia
  Apache-2.0), para tener una biblioteca única y reemplazable.
- Los íconos de producto y los logos son activos de marca, no Material Symbols.

**Pendiente.** El formato (SVG por ícono o fuente) y cualquier paquete
requieren aprobación de dependencia al implementarse. La recomendación vive en
`.agents/skills/listaso-design-system/references/imagery-and-icons.md`.

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
