# Estado de trabajo

**Actualizado:** 19 de octubre de 2026

## Tarea activa

No hay una tarea activa reservando archivos.

Últimas tareas cerradas:

- Imágenes por paso y composición del workflow Home (Codex, `feat/homepage`,
  19 de octubre de 2026): se asignaron fotografías autohospedadas distintas a
  pedido, preparación de almacén, entrega y oficina, sólo dentro del panel
  visual lateral. En móvil el panel aparece antes de la secuencia de texto; en
  escritorio permanece sticky y cambia con el paso activo. Los capítulos de
  texto no contienen imágenes. Se amplió de 12 a 24 px la separación entre
  la etiqueta y el título de la imagen. Copy, enlaces y comportamiento de
  fallback/reduced motion se
  conservaron. El contrato de Home y este log registran el mapeo. `pnpm lint`,
  `pnpm typecheck`, `pnpm exec next build --webpack` y `git diff --check`
  pasan.

- Alineación del trial de SAMI AI (Claude, `feat/homepage`, sin commit, 19 de
  octubre de 2026): "first month free" y "Start My Free Month" pasan a "15-day
  free trial" / "Start Your 15-Day Free Trial" en `sami.ts`, `home/en.ts` y
  `pricing/plans.ts`. Destinos sin cambio. Pendiente Development/Producto: los
  CTA de `/sami/` aún abren Calendly (evento `cta_demo_click`) y no una
  activación real del trial.

- Actualización global del lockup Listaso (Codex, `feat/homepage`, 19 de
  octubre de 2026): header, footer y muestras vigentes de `/foundation/` ahora
  usan las variantes navy/blanca de trazo grueso entregadas por Erick. Los dos
  archivos ya estaban en `public/brand/listaso/stacked/` y se verificaron como
  copias byte a byte de los SVG proporcionados. Se conservó el tamaño de
  presentación y el cambio por tema; los símbolos de producto y los archivos
  históricos no se alteraron, y estos lockups se retiraron de la muestra vigente.
  `pnpm lint`, `pnpm typecheck`,
  `pnpm exec next build --webpack` y `git diff --check` pasan.

- Auditoría de CTA y flujo entre pantallas (Claude, `feat/homepage`, sin
  commit, 19 de octubre de 2026). Se rastrearon las 28 rutas renderizadas
  (todos los `<a>`, incluidos header y footer): 0 `href="#"`, 0 anclas rotas
  (`#solutions`, `#compare`, `#sami-pricing` existen), 108 enlaces de demo con
  `data-analytics-event` y ubicación, enlaces externos con `noopener`, mismo
  Calendly y login en las 28 páginas. **Corregido:** `impact.ts`, "See the post
  on LinkedIn" → "See the Post on LinkedIn" (Title Case). **Abiertos:** `/blog/`,
  `/privacy-policy/`, `/subscription-agreement/` y `/terms-and-conditions/`
  siguen sin página en la app nueva (WordPress, DEC-011) y dan 404 en este
  entorno; Home enlaza "15-Day Free Trial" → `/sami/`, pero `/sami/` ofrece
  "Start My Free Month" → Calendly con evento `cta_demo_click`; Calendly abre en
  la misma pestaña. Sin cambios de destinos. Lint, typecheck y diff-check pasan.

- Actualización de logos Listaso en Figma (Codex, 19 de octubre de 2026): los
  archivos SVG navy y white proporcionados por el usuario coinciden byte a
  byte con `public/brand/listaso/stacked/listaso-logo-stacked-navy.svg` y
  `public/brand/listaso/stacked/listaso-logo-stacked-white.svg`. Se
  sustituyeron los 28 logos de header por vectores editables navy y los 28
  logos de footer por vectores editables blancos en los 28 frames estáticos de
  `Website` (56 ubicaciones). La verificación visual confirmó el wordmark y el
  isotipo completos sobre los fondos claros/oscuros correspondientes. No se
  modificó código ni la página de índice. Figma actualizado; siguiente paso:
  continuar con la sincronización de los diseños solicitada previamente.

- Validación de HOME y ajustes globales (Claude, `feat/homepage`, sin commit,
  19 de octubre de 2026). Aprobada con dos correcciones. **Corregido:**
  (1) `ProofStrip.module.css`: `white-space: nowrap` en `.value` hacía que
  `Since 2015` (223 px) desbordara su tarjeta (171 px de contenido) a 768, 1024
  y 1440 px; ahora ajusta en el espacio. (2) `ProofCounter.tsx`: el primer
  frame de rAF podía llegar antes de `start` y mostrar cifras negativas
  (`-57`, `$-0.1B+`); se limita el progreso a ≥ 0. **Verificado:** cifras sin
  recorte a 320/390/640/720/768/1024/1280/1440 px; sin overflow horizontal a
  320–1440 px en claro y oscuro; un H1; `B2B e-Commerce`, `SAMI AI`,
  `Learn More` y `Book a Demo` en las 28 rutas (texto, metadata y alt;
  `/sami/` conserva además "Start My Free Month"); autoplay de Capabilities
  (una tarjeta, ciclo continuo, Pause/Play, pausa por hover, foco y fuera de
  viewport, altura estable de 320 px, sin autoplay en móvil); Enter/Space; hover
  y carrusel de Pricing; `/plans/` íntegro. **Limitaciones:** el navegador
  integrado sólo renderiza frames al capturar pantalla (los IO no disparan
  sin ellos) y no emula reduced motion, reduced transparency, forced colors,
  pestaña oculta ni zoom real; `Pausa por visibilidad de pestaña` y reduced
  motion se validaron por lectura de `CapabilityDisclosures.tsx`; `focusin`
  se simuló con eventos porque la ventana no tenía foco. Sin lector de
  pantalla ni tap en hardware. **Pendientes:** el badge `NEW` de SAMI AI ya no
  se renderiza (`sami.badge.tag` eliminado); a 1024 px el panel abierto de la
  primera tarjeta pierde ~17 px de padding inferior (sin recorte de texto);
  el recorrido sticky del workflow es de ~300 px (la imagen sale durante el
  paso 4); `ai-assistants.ts` conserva "B2B eCommerce" en un prompt interno;
  "first month free" sigue en Pricing, `/plans/` y `/sami/` frente a
  "15-Day Free Trial". Lint, typecheck, build webpack y `git diff --check`
  pasan; `start-version/` sin cambios. Archivos liberados.

- Ajustes finales HOME y copy global (Codex, `feat/homepage`, sin commit, 19 de
  octubre de 2026). Se corrigió el ajuste de cifras en Proof; el storytelling
  deja más recorrido al bloque sticky, centra/cubre la imagen y separa caption
  y rail; Capabilities rota automáticamente en desktop con pausa visible,
  pausa por interacción/visibilidad y respeto a reduced motion. Los CTA de la
  sección son `Learn More`. Se unificó la nomenclatura visible a `B2B
  e-Commerce` y `SAMI AI`, además de Title Case en CTA compartidos. El lockup
  de SAMI reserva área para que su glow no se recorte y la HOME muestra `Meet
  SAMI AI,` / `Your Listaso Assistant`. Pricing en HOME quedó como resumen de
  tres niveles con hover y enlace a `/plans/`; la página dedicada conserva la
  comparación completa. Archivos liberados. Pruebas: `npm run lint`, `npm run
  typecheck`, `pnpm exec next build --webpack` y `git diff --check` pasan. La
  revisión visual automatizada no se ejecutó porque el sandbox rechazó abrir
  `localhost:3000` (`listen EPERM`); el build Turbopack se detuvo después de no
  producir progreso, y el build webpack completó correctamente.

- Homepage editorial, visual y responsive + logo core "Listaso" (Claude,
  `feat/homepage`, sin commit, 19 de octubre de 2026; DEC-020). Archivos
  liberados.
  - **Completado.** Logo "Listaso" en header y footer (4 SVG copiados byte a
    byte como `public/brand/listaso/*/listaso-logo-*.svg`, registrados con
    hash; lockups "Listaso Technology" pasan a `legacy`); "Listaso home" como
    nombre accesible. "Book a Demo" en header, menú móvil y hero. Copy nuevo de
    hero, workflow, SAMI, Support y Customers en `src/content/home/en.ts`;
    metadata alineada. "Explore Our Solutions" → `#solutions` con
    `scroll-mt-20`. `ProofStrip` como composición enmarcada con tintes por
    tono, compartida con `MetricOdometer` de About
    (`src/components/sections/ProofCards.module.css`, `proofTones.ts`).
    `HowItWorks` compacto (capítulos de 196 px en lugar de 34rem/68svh, rail
    conectado entre números, imagen sticky sólo desde 1024 px). Nuevo
    `HomeCapabilities` con `<details name>` nativos: fila expandible en
    desktop (20rem de alto), acordeón en móvil; `CapabilityDisclosures` sólo
    mantiene una tarjeta abierta en desktop. Token `--text-h2-compact` para el
    H2 de SAMI y el índice de Support (ahora horizontal); "First response" a
    16 px y apilado bajo 48rem para evitar recorte a 320 px.
    `src/content/company/support.ts` fija su línea de horario para que
    `/support/` no cambie. Alt de `/foundation/` actualizado a "Listaso".
  - **Bloqueado / pendiente.** Selector ES/EN: auditoría y propuesta en
    `docs/I18N_SWITCH_PLAN.md`, sin selector ni rutas `/es/`. Trial de SAMI:
    Development/Producto deben confirmar el destino de activación (hoy
    `/sami/`) y resolver "15-day free trial" vs. "first month free", que
    convive en la misma Homepage (add-on de Pricing) y en `/sami/` y
    `/plans/`. H2 provisional y oculto de capacidades ("More Listaso
    capabilities"). CTA de demo fuera de alcance con otra capitalización
    (Pricing, banda final, Products, Contact). Navy del wordmark distinto entre
    archivos (#00375B vs #003F69).
  - **Pruebas ejecutadas.** `pnpm lint`, `pnpm typecheck`,
    `pnpm exec next build --webpack` y `git diff --check` pasan. Navegador
    (dev): sin overflow horizontal a 320/390/768/1024/1280/1440 px en claro y
    a 320/1024/1440 px en oscuro; un solo H1 y H2/H3 lógicos; tarjetas con
    clic, Enter y Space y foco visible; anchor bajo el header sticky;
    `/about/` y `/support/` sin overflow y con su copy previo; consola sin
    errores; `start-version/` sin cambios.
  - **Omitido.** Emulación de `prefers-reduced-motion`,
    `prefers-reduced-transparency` y `forced-colors` (sin herramienta en el
    navegador integrado; verificado sólo por lectura de CSS/JS); medición de
    contraste automatizada; lector de pantalla real; tap en hardware; oscuro a
    390/768/1280 px.

- Página `/rating/` (Codex, `feat/homepage`, sin commit): la ruta nueva conserva
  URL, metadata, copy, resumen 5.0 y las dos reseñas públicas; adopta la familia
  dossier de Company con formulario accesible, responsive y compatible con
  temas claro/oscuro. El formulario apunta al endpoint público actual de
  WordPress Site Reviews, sin crear una reseña de prueba. La ruta se añadió a
  la secuencia `NextPage` de Company y se registró DEC-019/C10. QA: 1280, 390 y
  320 px sin overflow; navegación semántica; validación requerida nativa;
  reduced motion con 0 bloques ocultos; `pnpm lint`, `pnpm typecheck`,
  `git diff --check` y build webpack pasan. Pendiente Development: CORS,
  antispam, moderación y continuidad del endpoint desde el dominio final.
  Baseline Figma añadido como frame editable de 1280 px
  `WEB / 28 / /rating/ / Desktop / 1280 / Static` (`110:2`): 570 capas
  descendientes, 168 textos y 7 imágenes discretas. El índice `39:2` registra
  ahora 28 rutas; se eliminaron únicamente las dos capturas de prueba de
  `/rating/` y se retiró la instrumentación temporal de captura.

- Corrección de cuatro vistas estáticas en Figma (Codex, `feat/homepage`, sin
  commit): B2B eCommerce, Delivery, Forms y QuickBooks se recapturaron una por
  una con movimiento reducido y reemplazaron los frames sin diseño visible.
  Nodos finales: `75:2`, `76:2`, `77:2` y `78:2`; los cuatro nodos anteriores
  se eliminaron. Cada frame mide 1280 px, contiene entre 208 y 236 textos,
  entre 525 y 572 frames editables y entre 8 y 11 imágenes. Las cuatro vistas
  se verificaron visualmente mediante render de Figma; el inventario conserva
  27 rutas y 28 frames superiores incluyendo el índice. La instrumentación
  temporal se retiró de `src/app/layout.tsx`; sin cambios de producto, copy,
  rutas o comportamiento.

- Baseline estático Website → Figma (Codex, `feat/homepage`, sin commit): las
  27 rutas quedaron a 1280 px, identificadas con `/ Static` y ordenadas en la
  página `Website`. Se sustituyeron 23 vistas por capturas con movimiento
  reducido, transiciones, autoplay y parallax congelados; B2B eCommerce,
  Delivery, Forms y QuickBooks conservan sus capas editables previas, ya
  estáticas en Figma. Validación final: 27 frames de ruta, 5,574 textos y
  13,414 frames internos, con Montserrat y Menlo como familias detectadas.
  Índice actualizado en `39:2` y mapeo exacto en `docs/FIGMA_SYNC.md`. La
  instrumentación temporal se retiró de `src/app/layout.tsx`; sin cambios de
  producto, copy, rutas o comportamiento.

- Sincronización integral Website → Figma (Codex, `feat/homepage`, sin commit):
  las 27 rutas públicas implementadas se importaron en la página Figma
  `Website` con nombres trazables y cuadrícula de revisión. Se añadió el índice
  editable `WEB / 00 / INDEX & HANDOFF` (`39:2`) y se documentó el mapeo en
  `docs/FIGMA_SYNC.md`. Validación estructural: 27 frames de ruta, 2,772 capas
  de texto, 7,655 frames internos y 542 formas/vectoriales; no son capturas
  planas. El código sigue siendo canónico y las capas DOM importadas aún no son
  componentes de librería ni conservan motion, estados o reflow responsive.
  Fuera de alcance: mobile, rutas WordPress, legales no implementadas, ES,
  Code Connect, publicación y cambios de UI. El script temporal de captura se
  retiró de `src/app/layout.tsx` al finalizar.

- Skill de motion vendorizada (Claude, `feat/homepage`, sin commit):
  `design-motion-principles` (MIT) en `.agents/skills/`, con bloque de uso
  Listaso que subordina sus recomendaciones a las reglas del proyecto (DEC-018).
  Sin dependencias ni cambios en `src/` o `public/`. Lint y typecheck pasan.
  Handoff: `docs/handoffs/2026-10-15-motion-skill.md`. Pendiente: confirmar
  que Claude la lista como skill en la próxima sesión.

- Homepage — autoplay accesible y logos de clientes (Codex,
  `feat/homepage`, sin commit): Support y Customers avanzan en loop sólo
  cuando están visibles, se pausan por hover/foco/interacción o por control
  explícito y respetan `prefers-reduced-motion`; Support aumenta la presencia
  del índice lateral. Se integraron y optimizaron los logos entregados de
  Productos Bredy, Comercial Mexicana y Fabi Saa; los cinco destinos indicados
  usan `nofollow noopener noreferrer` y hover sólo para puntero preciso. QA:
  loop, pausa, 320/390 px sin overflow, enlaces/atributos, lint, typecheck,
  `git diff --check` y build webpack pasan. El único error de consola observado
  en desarrollo es el `favicon.ico` 404 preexistente.

- Company y Pricing en inglés (Claude, `feat/homepage`, sin commit):
  `/about/`, `/industries/`, `/support/`, `/listaso-impact/`, `/join-us/`,
  `/contact-us/` y `/plans/` con el copy de `start-version`, variantes
  "dossier" inspiradas en ddark.dev y, en Pricing, el patrón del footer
  animado en claro y oscuro con selector de facturación SAMI (DEC-017).
  `/rating/` y `/blog/` siguen en WordPress. Pendiente: enlace de CodePen
  para ajustar el selector; preguntas C1–C9 en
  `docs/COMPANY_PRICING_CONTENT_CONTRACT.md`. Handoff:
  `docs/handoffs/2026-10-14-company-pricing.md`.

- Variaciones de sección para Products e Integrations (Claude,
  `feat/homepage`, sin commit): heroes Statement, Editorial, Case study y
  Display; sticky story, bento, índices, marquesina ligada al scroll, ficha
  técnica, banda en pareja, carril, divisor pixelado y "siguiente página"
  (DEC-016, `docs/SECTION_VARIANTS.md`). Las cifras de marca quedaron sólo
  para Homepage y About us. Handoff:
  `docs/handoffs/2026-10-13-section-variants.md`.

- Integrations en inglés (Claude, `feat/homepage`, sin commit): hub, 8
  integraciones contables y Printers and scanners con el copy de
  `start-version` (DEC-015). Viabilidad y preguntas I1–I9 en
  `docs/INTEGRATIONS_CONTENT_CONTRACT.md`. Handoff:
  `docs/handoffs/2026-10-13-integrations.md`.

- Páginas de producto en inglés (Claude, `feat/homepage`, sin commit): 9
  rutas de Products con el copy de `start-version` (DEC-014), fotos Unsplash
  temporales y 28 iconos Listaso. Preguntas P1–P8 en
  `docs/PRODUCT_CONTENT_CONTRACT.md`. Handoff:
  `docs/handoffs/2026-10-13-product-pages.md`.

- Auditoría integral y proceso QA por página (Codex, `feat/homepage`, sin
  cambios de producto): 21 páginas verificadas en el export actual, excluyendo
  `start-version/`; peers, lint, typecheck y build pasan. Matriz responsive a
  320/375/768/1024/1440 px, oscuro a 390 px y movimiento reducido sin overflow
  ni animaciones activas. Se documentaron links a 12 rutas aún ausentes,
  bloqueo SEO intencional, desalineación de `llms.txt`, claims pendientes,
  payload cliente, movimiento continuo, targets táctiles, favicon, SEO social,
  código reservado sin uso y documentación desactualizada. Informe y proceso
  repetible: `docs/QA_SITE_AUDIT_2026-10-14.md`.

- Homepage, experiencia móvil de cifras, SAMI, soporte, clientes y pricing
  (Codex, `feat/homepage`, sin commit): componente común de carrusel con
  scroll-snap, swipe, teclado, controles de 48 px y posición; counters al
  entrar en viewport; Support convertido en tarjetas secuenciales; Customers y
  Pricing compactados en carruseles móviles; selector de billing con SAMI como
  indicador; logo SAMI en loop sólo visible en móvil y al hover de la sección
  en desktop, controlado por la pausa existente. Sin dependencias ni cambios de
  copy/claims. `pnpm lint`, `pnpm typecheck`, `git diff --check` y
  `pnpm exec next build --webpack` pasan. QA en navegador a 320, 390 y 1280 px:
  sin overflow global, controles 48×48, precios/mascota sincronizados y pausa de
  SAMI verificada; el swipe real queda para la comprobación final en hardware.

- Narrativa de scroll inspirada por Symboolic y Cip Harvin (Codex,
  `feat/homepage`, sin commit): flujo order-to-payment convertido en capítulos
  activos con fotografía sticky, caption y progreso sincronizados por el
  `IntersectionObserver` existente; banda de métricas editorial con
  scroll-snap táctil en móvil. Se mantuvo el copy aprobado y la paleta Listaso,
  sin copiar branding ni añadir GSAP/dependencias. En móvil el contenido
  conserva flujo vertical, sin sticky ni captions duplicados; sin JavaScript o
  con movimiento reducido, todo permanece visible. `pnpm lint`,
  `pnpm typecheck` y `pnpm exec next build --webpack` pasan. QA real en
  1280×720 y 390×844: capítulos y marcador se sincronizan, métricas desbordan
  sólo dentro de su carril horizontal y la página no tiene overflow global.
  Tema oscuro validado visualmente; tema claro conserva los tokens semánticos
  existentes y requiere la revisión visual final junto con los demás cambios
  sin commit.

- Footer editorial con accesos de IA (Codex, `feat/homepage`, sin commit):
  directorio principal ordenado en una superficie elevada, contacto, redes y
  legales; `/llms.txt` integrado en el export; consulta fuente-guiada abierta
  en ChatGPT, Gemini, Perplexity y Claude; marcas de proveedor autohospedadas y
  presentadas como destinos externos, no integraciones. Cierre con lockup
  oficial de Listaso y parallax CSS progresivo, sin JS ni dependencias, con
  fallback de movimiento reducido. Typecheck, build webpack y ESLint dirigido
  pasan. QA real en 1440 px y 390×844, claro y oscuro: sin overflow horizontal;
  el único error de consola es el `favicon.ico` ausente previo a esta tarea. El
  lint global queda bloqueado por `src/components/sections/product/Breadcrumbs.tsx`
  (enlace interno con `<a>`), archivo ajeno y no modificado en este alcance.

- Header Neon Glass y hover de SAMI (Codex, `feat/homepage`, sin commit): header
  translúcido, dropdowns y menú móvil con borde cromático Listaso, entrada
  corta, soporte claro/oscuro y fallbacks de transparencia/colores forzados.
  Logo de SAMI alineado con “NEW · AI ASSISTANT” y animación `NoticeLogo`
  reutilizada desde Guide Sami con giro inercial, aura, exclusión táctil y
  reducción de movimiento. Sin GSAP ni dependencias nuevas. `pnpm lint`,
  `pnpm typecheck` y `pnpm exec next build --webpack` pasan. QA real en 1280 px
  y 390×844: dropdown y menú móvil correctos, Escape devuelve el foco al
  toggle, sin overflow horizontal ni errores de consola. Tema oscuro validado
  visualmente; tema claro validado por su mapeo a tokens semánticos.

- Acentuación de movimiento y vidrio de Homepage (Codex, `feat/homepage`, sin
  commit): reveals tipográficos con desenfoque gaussiano transitorio; SAMI en
  loop fluido con pausa/reanudación, congelado fuera del viewport o al ocultar
  la pestaña; orbes cromáticos transform-only y borde luminoso estático
  concentrados en la sección de IA. `prefers-reduced-motion` entrega el estado
  final sin animación y `forced-colors` retira los adornos. Sin filtros SVG,
  dependencias ni cambios de copy comercial. `pnpm lint`, `pnpm typecheck` y
  `pnpm exec next build --webpack` pasan. QA real en 1280 px y 390×844: loop y
  pausa funcionales, sin overflow horizontal ni errores de consola.

- Animación conversacional de SAMI reutilizada desde Guide Sami (Codex,
  `feat/homepage`, sin commit): componente original extraído del ZIP y adaptado
  al contenido, iconos y tokens existentes. Es una secuencia explicativa al
  entrar en viewport, sin loop permanente; se detiene fuera de vista o con la
  pestaña oculta, y `prefers-reduced-motion` muestra el estado final. La UI
  completa tiene una sola descripción accesible y no anuncia cada carácter.
  Skill global `hyperframes` instalada desde `heygen-com/hyperframes` para
  próximos turnos. Sin dependencias nuevas en el proyecto. Lint, typecheck,
  build y QA visual documentados al cierre.

- Redirección creativa y narrativa de movimiento de la Homepage (Codex,
  `feat/homepage`, sin commit): hero fotográfico editorial, flujo numerado con
  fotografía sticky, máscaras de texto y reveals encadenados mediante mejora
  progresiva. Dos imágenes Unsplash autohospedadas y optimizadas, con manifiesto
  en `src/content/media/placeholders.ts`. Sin dependencias, GSAP, nuevo copy,
  claims, rutas ni cambios de paleta. `pnpm peers check`, `pnpm lint`,
  `pnpm typecheck` y `pnpm exec next build --webpack` pasan. QA en navegador a
  1280×720: hero, proceso y Sami sin overflow horizontal; el reveal de medios
  se corrigió para no depender de `clip-path` en el elemento observado.

- Revisión editorial integral de la Homepage inglesa (Codex,
  `feat/homepage`, sin commit): copy y metadata ajustados a los valores de
  marca, con lenguaje más claro, cálido y accesible. No cambió claims, cifras,
  precios, testimonios ni destinos aprobados. `pnpm lint`, `pnpm typecheck` y
  `pnpm exec next build --webpack` pasan; 320/1440 px en claro y oscuro sin
  overflow horizontal. Evidencia en `docs/HOME_CONTENT_CONTRACT.md`.

- Etapa 6, Homepage en inglés (Claude, `feat/homepage` desde `a06635d`, sin
  commit): `docs/handoffs/2026-10-09-homepage.md`. Pendiente de revisión de
  Erick.

- Chat 5, foundation visual (Claude): commit `dbe2837` y promoción a `dev` con
  el PR #2 (merge `a06635d`). `CI / Quality` y Cloudflare Pages pasaron.
  Handoff: `docs/handoffs/2026-10-09-visual-foundation.md`.
- Chats 3 y 4, CI y Cloudflare (Codex): `bf63e2e` está en `origin/dev`,
  `CI / Quality` pasó en GitHub y Cloudflare Pages publicó el preview de
  `ux/visual-foundation`.
- Chat 1, auditoría del checkpoint:
  `docs/handoffs/2026-10-08-chat1-checkpoint-audit.md`.
- Análisis de marca y contexto de Skills:
  `docs/handoffs/2026-10-08-brand-analysis-skills.md`.

## Completado

- Repositorio clonado y referencia movida a `start-version/`.
- Inventario read-only de la implementación heredada.
- Mapa inicial de 89 URLs públicas y rutas estáticas preservado.
- Flujo vigente simplificado a `dev -> main`; `main` contiene la propuesta
  estable, pero no autoriza DNS ni cutover productivo.
- Foundation Next.js/TypeScript/Tailwind creada para export estático.
- Documentos operativos para Codex y Claude creados.
- `.DS_Store` eliminado y bloqueado mediante `.gitignore`.
- `pnpm lint`, `pnpm typecheck` y `pnpm build` ejecutados correctamente.
- 28 Skills locales preparadas: 19 externas/operativas y 9 propias de Listaso.
- Fuente canónica `.agents/skills` enlazada para Claude desde `.claude/skills`.
- Auditoría de fuentes, commits, licencias y scripts registrada.
- Paso 6 cerrado: instalación congelada, peers, lint, typecheck, build estático y
  limpieza del diff validados sin errores.
- Handoff a Claude y guía de continuidad por chats creados.
- Chat 1 (Claude): auditoría del checkpoint completada.
  - Validaciones repetidas con Node `24.21.0` oficial (binario verificado con
    SHA-256, usado sólo desde el scratchpad, sin cambiar el Node del sistema) y
    con Node `26.11.1`: mismos resultados, sin errores.
  - Tailwind limitado a `src/` con `source("..")`; antes escaneaba
    `start-version/` y `.agents/` y generaba CSS sin uso (46.8 KB → 7.0 KB).
  - `next-env.d.ts` pasa a `.gitignore` porque `next typegen` lo regenera igual.
  - Retirado `.agents/skills/ui-styling/scripts/.coverage` (artefacto SQLite).
  - Prefijo de branch unificado como `feat/*` por decisión de Erick.
  - Detección de las 28 Skills por Claude Code comprobada.
- Análisis de marca (Claude, read-only sobre la guía PDF, `start-version/` y
  Guide Sami):
  - Evidencia en `docs/BRAND_ANALYSIS.md`.
  - Decisiones de Erick registradas como DEC-007 a DEC-010: tono, sitio
    preparado para oscuro desde el inicio (sigue el sistema; claro por
    defecto), SAMI como complemento, sistema de 8 puntos, fotos de Unsplash
    temporales y Material Symbols.
  - Referencias de marca añadidas a las Skills `listaso-*` (ver
    `docs/SKILLS_CATALOG.md`).
- Observaciones de marca cerradas documentalmente por Erick:
  - radios, sombras, vidrio, tipografía web y ajustes de color permanecen
    `PROPUESTOS` hasta su aprobación final en el Chat 5;
  - aqua y vidrio pueden proponerse como recursos decorativos dentro de los
    límites documentados;
  - hash de la guía y commit/versiones de SAMI quedaron registrados.
- Inputs necesarios para la matriz de rutas documentados en
  `docs/ROUTE_CONTENT_INPUTS.md`.
- Chat 2 iniciado con exports reales de WordPress, GA4 y Search Console:
  - matriz de 125 rutas en `docs/ROUTE_CONTENT_MATRIX.md`;
  - 89 URLs públicas de Yoast preservadas y 36 rutas nuevas de `start-version/`
    inventariadas;
  - un artículo de WordPress en borrador separado del inventario público;
  - rutas históricas y probable spam de GA4 separados para no crear páginas por
    error;
  - cobertura, periodo corto y ausencia de eventos clave registrados como
    limitaciones.
- Erick cerró decisiones principales de Chat 2:
  - el periodo corto de medición es todo el baseline disponible y no un faltante;
  - blog, 56 artículos, categorías y autor conservan sus URLs en el sistema
    actual hasta una futura plataforma editorial;
  - demo usa temporalmente el Calendly existente y Zoho API queda para después;
  - `/support/` será nueva, `/rating/` seguirá independiente y ambas irán en el
    dropdown Empresa.
- Chat 3 implementado localmente:
  - workflow `CI / Quality` con Node/pnpm fijados, lockfile congelado, peers,
    lint, typecheck, build y verificación de `out/index.html`;
  - Actions fijadas a SHA completo y permisos reducidos a `contents: read`.
  - `pnpm install --frozen-lockfile`, `pnpm peers check`, lint y typecheck pasan.
  - El export estático pasa con Node `24.21.0` y webpack. El build Turbopack
    predeterminado no pudo comprobarse dentro del sandbox de Codex porque éste
    bloquea el puerto local que usa su proceso CSS; la primera ejecución en
    GitHub verificará el mismo comando del workflow.
- Chat 4 preparado:
  - cuenta y conexión GitHub verificadas;
  - no existe aún un proyecto Workers & Pages;
  - configuración exacta, branches, variables no secretas y rollback definidos
    en `docs/CI_CLOUDFLARE.md`;
  - creación/primer deployment pospuestos hasta que el checkpoint esté en
    `origin/dev`, para evitar construir la versión remota incompleta.
- Checkpoint publicado: `95974b1` y `bf63e2e` están en `origin/dev`. El primer
  `CI / Quality` real pasó (Node 24.21.0, pnpm 12.10.1). Cloudflare Pages
  construyó `bf63e2e` (57 s) y publicó
  `https://ux-visual-foundation.listaso-website.pages.dev`. El deployment de
  `main` falló de forma esperada: `main` sólo tiene el commit inicial.
- Chat 5 (Claude, `ux/visual-foundation`): foundation visual implementada, sin
  commit.
  - 16 activos oficiales copiados byte a byte a `public/brand/`, con un
    manifiesto en `src/content/brand/assets.ts` (estado, fondo, fuente y hash).
  - Tokens primitivos y semánticos claros y oscuros, contextos `band` y `sami`,
    escalas de radios, sombras, contenedores y tipografía en
    `src/styles/tokens.css`. Movimiento en `src/styles/motion.css`.
  - Iconografía: `listaso-icons.json` como fuente preferente y un fallback de
    Material Symbols (`open_in_new`). Sólo se generan 33 iconos mapeados
    (`pnpm icons`).
  - Primitivas: Button, TextLink, Card, GlassPanel, FormField, StatusMessage,
    Icon, BrandAsset y ThemedLogo.
  - Muestra interna `/foundation/`, revisada en 320/375/768/1024/1440 px y en
    los dos temas. Sin scroll horizontal y 0 fallos de contraste AA en los 418
    textos revisados por tema.
  - DEC-008 aprobado, DEC-010 actualizado y DEC-012 registrado.

- Etapa 6 (Claude, `feat/homepage`): Homepage inglesa `/` implementada, sin
  commit.
  - Auditoría y contrato en `docs/HOME_CONTENT_CONTRACT.md`. Erick eligió
    `start-version` como fuente de copy y de navegación (DEC-013).
  - Shell `(site)` con SiteHeader, SiteFooter y skip link; 8 secciones en
    `src/components/sections/home/`; copy en `src/content/home/en.ts`.
  - Metadata con canonical `https://listaso.com/` y Open Graph básico. Siguen
    `noindex` y `Disallow: /`; sin hreflang ni scripts de analytics.
  - Validada en 320/375/768/1024/1440 px y en claro y oscuro: 274 textos sin
    fallos AA, incluido el peor caso sobre gradientes y vidrio. Teclado
    completo, sin scroll horizontal y sin errores de consola.

## Estado actual

- Rama de trabajo: `feat/homepage` (base `a06635d`, `dev` con la foundation
  fusionada), con la Homepage sin commit.
- No hay páginas comerciales ni copy migrados.
- Foundation bloqueada para indexación.
- CI y Cloudflare Pages activos para `dev` y las ramas de trabajo.
- Claude Code funciona y detecta las Skills. Figma Desktop MCP sigue sin
  responder en `127.0.0.1:3845`.

## Pendientes inmediatos

1. Erick revisa el diff y `/` y, si aprueba, autoriza el commit y el push de
   `feat/homepage`, y después el PR hacia `dev`.
2. Erick confirma qué producto es `listaso-van-sales-1.svg` y entrega el
   archivo de Sales Advanced.
3. Decidir cómo autohospedar Montserrat (requiere aprobación; ver handoff).
4. Erick responde las decisiones abiertas de `docs/ROUTE_CONTENT_MATRIX.md`.
5. OG image de la Homepage, FIFOX y JSON-LD (ver
   `docs/HOME_CONTENT_CONTRACT.md`).
6. Elegir el siguiente bloque de rutas.

## Desconocidos o bloqueadores

- Plataforma editorial futura y momento de migración; hasta entonces WordPress
  y las URLs de los 56 artículos se conservan.
- Implementación futura de Zoho API y posible equivalente `/es/rating/`.
- Copy, claims, traducciones y assets aprobados por página.
- IDs/eventos vigentes de GA4 y Clarity; GTM heredado debe verificarse.
- Configuración y permisos de Cloudflare.
- Montserrat no está autohospedada: no hay archivos en `start-version/`. La
  copia instalada en esta Mac son TTF variables de unos 750 KB cada uno, sin
  herramienta local para convertirlos a WOFF2.
- Producto de `listaso-van-sales-1.svg` y archivo de Sales Advanced.
- Versiones vectoriales de eCommerce y SAMI (las actuales incrustan PNG).
- Regla de uso del wordmark sin símbolo, tamaño mínimo y espacio libre del logo.
- Auditoría de marca de Marketing: magenta definitivo, 60-30-10, taglines y
  trato tú/usted en español.
