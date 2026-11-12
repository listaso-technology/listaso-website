# Estado de trabajo

## Vista previa lista — NetSuite y encabezados de integración (12 de noviembre de 2026)

- Responsable: Codex, `dev`. Copy indicado de NetSuite aplicado; Sales orders, Inventory y descripciones sin reemplazo conservados. Botones tenían etiquetas y enlaces solicitados. Cambios anteriores preservados; sin cambios de medios, enlaces, orden ni datos. Reservas liberadas.
- NetSuite usa diagrama y pestañas, no tabla y tarjetas: encabezados del diagrama pasan de 12 a 16 px y mantienen peso 700. Encabezados de las tablas de Acumatica y Printers and Scanners pasan de 12 a 14 px y mantienen peso 700; las demás vistas de sincronización no presentan encabezados de columna. Los rótulos auxiliares y celdas conservan tamaño.
- Validación: ESLint dirigido, typecheck, build webpack (44 rutas) y diff check pasan. Navegador: seis pestañas NetSuite comprobadas a 320 y 1440 px; encabezados NetSuite 16 px/700 y de las dos tablas 14 px/700 sin cortes ni overflow global a 320, 390, 768 y 1440 px. Pendiente revisión visual completa en ambos temas y dispositivo físico. Sin commit, push ni despliegue.

## Vista previa lista — contenido SAP (12 de noviembre de 2026)

- Responsable: Codex, `dev`. Se actualizaron descripción principal, nueve títulos y cuatro descripciones de tarjetas según el brief; CTAs ya tenían etiquetas y destinos pedidos. Sin cambiar orden, enlaces, medios ni descripciones no indicadas. Cambios Sage y Acumatica previos preservados. Archivos: bloque SAP de `src/content/integrations/systems.ts`, contrato Integrations y esta entrada; reservas liberadas mientras se espera respuesta.
- Erick confirmó reemplazar «stock» por «inventory» en el título principal; cambio aplicado. Reservas liberadas.
- Validación: ESLint dirigido, typecheck y build webpack (44 rutas) pasan. Vista en navegador confirma copy y CTAs; a 320, 390, 768 y 1440 px no se detectaron desbordamiento horizontal ni textos cortados o fuera de sus tarjetas. Título confirmado visualmente en 390 y 1440 px. Revisión visual completa en temas y dispositivo físico pendiente. Sin commit, push ni despliegue.

## Vista previa lista — contenido Acumatica y revisión de logo (12 de noviembre de 2026)

- Responsable: Codex, `dev`. Archivos: bloque Acumatica de `src/content/integrations/systems.ts`, contrato Integrations y esta entrada; reservas liberadas. Se preservaron los cambios Sage anteriores.
- Descripción y títulos actualizados según el brief; se modificaron únicamente las tres descripciones indicadas. Orden, estilos, medios, iconos, enlaces y resto del contenido conservados. Los CTA ya tenían los textos y destinos pedidos.
- Revisadas las referencias de marca en `src`: header/footer usan lockups activos y diagramas el símbolo activo según el manifiesto de marca; variantes de marca principal obsoletas sin referencias activas detectadas. Sin sustituciones de logo.
- Validación: ESLint dirigido, typecheck y build webpack (44 rutas) pasan. Vista en navegador confirma copy y enlaces; geometría a 320, 390, 768 y 1440 px sin desbordamiento horizontal de página ni texto cortado o fuera de las tarjetas. Pendiente revisión visual completa en ambos temas y dispositivo físico. Sin commit, push ni despliegue.

## Entrega — commits de seguridad y artefacto CI (12 de noviembre de 2026)

- Responsable: Codex en `dev`. Erick autoriza commits y push de seguridad/workflow/documentación; Sage queda fuera de estos commits.
- Alcance: Node 24.22.3, Next/eslint-config-next 16.4.6, Zod/minimatch dirigidos, CI qa y empaquetado por commit/SHA-256. Validaciones locales documentadas en las entradas siguientes.
- Siguiente paso: observar el run del SHA subido a dev, confirmar CI y descargar/verificar su artefacto. Esta entrada registra preparación de entrega, no éxito remoto anticipado. Sin CD, activación de servidor, cambios DNS/Cloudflare ni promoción a qa/main.

## Tarea cerrada — artefacto de export en CI (12 de noviembre de 2026)

- Responsable: Codex en `dev`. Autorizado: empaquetar out por commit/SHA-256, almacenar artefacto en Actions, documentar y validar; sin CD o deploy.
- Archivos: workflow CI, `scripts/package-static-export.mjs`, README, guías CI/publicación, arquitectura, DEC-027 y esta entrada. Reservas liberadas. Se preserva el trabajo previo, incluido el brief Sage concurrente.
- Implementado: después del build y verificación index/404, paquete tar del contenido de out + BUILD_INFO.json + SHA256SUMS; upload-artifact v6.0.0 fijado a b7c566a772e6b6bfb58ed0dc250532a479d7789f, verificado por git ls-remote oficial. Artefacto por SHA completo/run/intento, retención 14 días, error sin archivos y compresión ZIP 0. Permisos contents:read conservados; no credenciales de servidor o CD.
- Procedencia: SHA del checkout igual a GITHUB_SHA y árbol limpio en CI; Node/pnpm exactos. Manifest con hash de lockfile/tar y contexto del run. Resumen del job muestra SHA/hash. Documentado usar push qa exitoso, no merge sintético de PR; descargar/verificar en Mac sin recompilar.
- Validación: instalación congelada, peers, lint global, typecheck, build Turbopack (44 rutas), sintaxis JS, YAML de ramas/orden/SHA/permisos/retención y git diff --check pasan con Node 24.22.3/pnpm 12.10.1. Prueba real de empaquetado/extracción en /private/tmp: 487 archivos idénticos por SHA-256 y manifiesto válido; alteración de metadatos detectada. Negativas: SHA incorrecto, CI sucio, destino existente, export ausente, ocultos y symlinks rechazados.
- Ajuste de validación: out/fonts/.gitkeep bloqueó el primer ensayo; se reconocen sólo esos marcadores y se excluyen del tar sin modificar out. Paquete local de prueba registra workingTreeClean:false y event local-validation, no es una candidata publicable.
- Límites: subida/descarga reales de Actions y tar GNU del runner pendientes de la primera ejecución remota tras push autorizado; prueba local usó tar de macOS. No se ejecutó push, main, CD, servidor, DNS, Cloudflare o deploy. Siguiente paso: guardar cambios aprobados y promover dev -> qa; obtener el artefacto de push qa que pase CI.

## Vista previa lista — contenido Sage 100 (12 de noviembre de 2026)

- Responsable: Codex en `dev`. Alcance: textos solicitados de `/sage/` y verificación de CTAs existentes; sin modificar diseño, medios, enlaces ni otras rutas.
- Archivos: bloque Sage en `src/content/integrations/systems.ts`, contrato Integrations y esta entrada. Reservas liberadas. Descripción del hero y seis títulos exactos; nuevas descripciones sólo en Two-way Sync, Orders from the Field y GPS Tracking. Botones ya tenían Book a Demo y Pricing, con Calendly y `/plans/` respectivamente; no se cambiaron. Descripciones restantes, título, estructura, iconos, imágenes y tablas conservados.
- Validación: ESLint dirigido, typecheck, build webpack (44 rutas) y `git diff --check` pasan. Navegador confirma textos y destinos; a 320, 390, 768 y 1440 px no se detectó desbordamiento horizontal global ni desbordamiento de las seis tarjetas. Pendiente revisión visual en temas claro/oscuro y dispositivo físico. Sin dependencias, commit, push o despliegue.

## Tarea cerrada — parches Zod y minimatch de herramientas (12 de noviembre de 2026)

- Responsable: Codex en `dev`. Autorizado: corregir ambos avisos con versiones compatibles, validar y documentar sin deploy.
- Archivos: pnpm-workspace.yaml, pnpm-lock.yaml, registro de seguridad, guía de publicación y esta entrada. Reservas liberadas; cambios previos sin commit conservados.
- Cambio: override zod@4.6.5 → 4.6.7 (mismo major admitido por consumidores); override exclusivo typescript-estree@8.71.1 > minimatch → 11.0.8, conservando minimatch 3.1.5 de otros consumidores. No se añadieron dependencias directas ni se cambió código de aplicación.
- Justificación: GHSA-mrhx-c7xc-m3w5 corrige Zod desde 4.6.6; GHSA-g3hv-75wg-m249 corrige minimatch desde 11.0.1. Incluso estree 8.72.2 consultado declara ^10.2.2, por lo que el salto 11 queda como excepción local documentada, no soporte upstream. Node 24.22.3 cumple engines de minimatch 11.0.8.
- Validación con Node 24.22.3/pnpm 12.10.1: instalación congelada, peers, lint global, typecheck, build Turbopack (44 rutas), index/404 y git diff --check pasan. Auditorías completa y producción código 0 y 0 avisos conocidos. Pruebas de compatibilidad: require/export nombrado de minimatch, dot/globs positivos/negativos, parser.parseForESLint con projectService/allowDefaultProject, Zod válido/inválido y zod-validation-error pasan.
- Documentación: registro de seguridad conserva auditorías anteriores como histórico y añade cierre, alcance de overrides y criterio de retirada. CI remoto y QA visual no ejecutados; pendientes antes de promoción según guía. Sin deploy, commit, push, cambios de servidor, DNS, Cloudflare o main.

## Tarea cerrada — actualización de seguridad Next.js (12 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Autorizado: investigar el aviso de Next.js, actualizar a parche compatible, validar y documentar sin deploy.
- Archivos: package.json, pnpm-lock.yaml, arquitectura, guía de publicación, `docs/SECURITY_UPDATE_2026-11-12.md` y esta entrada. Reservas liberadas; cambios previos de Node/CI/documentación sin commit preservados.
- Investigación: audit inicial identifica tres avisos Next 16.4.0 (GHSA-2464-fhr4-w9xw y GHSA-673q-mjm6-r5xr críticos; GHSA-p3m5-59mp-jv5r alto), corregidos desde 16.4.1. Se contrastaron advisories, release oficial 16.4.5 y parche estable 16.4.6. Configuración estática sin optimizador/Server Actions/use cache reduce exposición en el origen previsto; no se usa como sustituto de parchear.
- Cambio: next y eslint-config-next 16.4.0 → 16.4.6 exactos, paquetes @next relacionados y lockfile. React 19.3.0 y otras dependencias directas conservadas; sin código de aplicación o overrides nuevos.
- Validación con Node 24.22.3/pnpm 12.10.1: install congelado, peers, lint, typecheck, build Turbopack (44 rutas, sin aviso de seguridad anterior), index/404, 42 HTML con noindex y src/poster locales existentes, git diff --check pasan. Build con permisos ampliados para evitar restricción local. Verificación auxiliar inicial de versión falló por exports de eslint-config-next/package.json; se corrigió leyendo el archivo instalado directamente.
- Auditoría: producción código 0, sin avisos conocidos. Completa código 1: persisten zod 4.6.5 (alto) y minimatch 10.2.6 (moderado), ambos vía herramientas ESLint; documentados sin forzar actualización mayor de transitivas fuera del alcance. No se afirma auditoría completa limpia.
- Siguiente paso: revisión separada de avisos de herramientas de desarrollo y CI remoto/QA de candidata antes de publicación. Sin deploy, commit, push, cambio de servidor, DNS, Cloudflare ni promoción de ramas. QA visual no ejecutado para este parche.

## Tarea cerrada — Node 24.22.3, CI qa y guía Listaso.net (12 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Autorizado: fijar Node 24.22.3, incluir `qa` en CI y documentar publicación por artefactos en Nginx. Sin deploy.
- Archivos: `.node-version`, `.github/workflows/ci.yml`, README, master, decisiones, arquitectura, guías CI/Claude y nueva `docs/DEPLOY_LISTASO_NET.md`. Reservas liberadas. Árbol limpio al inicio.
- Estado: Node 24.22.3 fijado; CI incluye `qa` tanto en push como PR y conserva permisos de lectura/acciones fijadas. DEC-005 actualizada y DEC-027 registra build externo, releases y reversión; Pages independiente. Sin runtime Node en origen ni automatización SSH añadida.
- Validación: binario oficial Node 24.22.3 temporal en `/private/tmp`, SHA-256 verificado contra publicación oficial; pnpm 12.10.1. Install congelado, peers, lint, typecheck, YAML (dev/qa/main y referencia .node-version), build Turbopack (44 rutas), existencia de index/404 y git diff --check pasan. Primera instalación offline sin caché suficiente; instalación con permisos ampliados reutilizó 354 paquetes, sin cambiar lockfile. Build restringido se detuvo sin progreso; ejecución con permisos ampliados compiló pero primero salió 1 por aviso de seguridad; la repetición terminó 0 manteniendo el aviso.
- Riesgo abierto: Next.js 16.4.0 informa vulnerabilidad conocida; el build exitoso no equivale a aprobación de seguridad. Revisar y actualizar Next.js en alcance separado antes de publicar. CI remoto todavía no ejecutado; HTTPS `.net`, continuidad de assets antiguos y QA de infraestructura siguen pendientes.
- Entrega: no se cambió Node global, dependencias del proyecto, servidor, DNS, Cloudflare ni `main`. Sin commit, push o deploy. Siguiente paso: resolver aviso Next.js y promover candidata mediante PR antes de empaquetar/publicar.

## Vista previa lista — QuickBooks: brief editorial (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Archivos: bloque QuickBooks y `quickBooksCertified` en `src/content/integrations/systems.ts`, contrato Integrations y esta entrada. Reservas liberadas.
- Aplicado: encabezado QuickBooks in every part of your operation, nueve nombres capitalizados, nuevas descripciones exactas de Product History/Mobile Printing/GPS Tracking y párrafo certified integration sin 5.0 ni App Store dentro de él. El texto mantiene compatible Bluetooth printers y during working hours. Desktop y Online quedan identificados en el hero y enlaces contiguos al párrafo.
- Preservado: descripciones no indicadas, datos/direcciones de sincronización, compatibilidad/disponibilidad, CTAs y destinos, imágenes, orden, insignias, rating y reseña independientes. Comparación con HEAD confirma tablas de QuickBooks, otros siete sistemas y listings/rating/quote sin alteraciones. Sin componentes o estilos nuevos, dependencias, commits, push ni despliegue.
- Validación: lint global, typecheck, build webpack (44 rutas) y git diff --check pasan. HTML exportado confirma todos los textos completos y ausencia del titular anterior/párrafo con rating. Navegador oscuro a 320/375/768/1440 px sin overflow global; párrafo certificado y descripciones sin cortes. Los títulos largos de funcionalidades caben con saltos naturales; la copia TextRoll oculta se conserva. Confirmados el contexto Desktop/Online y rating independiente 5.0. Revisión visual móvil de funcionalidades.
- Pendiente: QA visual en tema claro y dispositivo físico antes de promoción. Preview local: http://127.0.0.1:3012/quickbooks/.

## Vista previa lista — Integrations: cuatro ajustes editoriales (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Archivos: `src/content/integrations/hub.ts`, contrato Integrations y esta entrada. Reservas liberadas.
- Alcance: sólo cuatro cadenas del hub `/integrations/`: descripción contable exacta sin la afirmación de transferencia automática, aclaración de que datos/direcciones varían por sistema, MORE OPTIONS y Printers and Scanners. Diseño, imágenes, orden, enlaces, compatibilidades, metadata y otras páginas conservados.
- Validación: lint global, typecheck, build webpack (44 rutas) y `git diff --check` pasan. HTML exportado confirma cada reemplazo una sola vez y ausencia de los párrafos antiguos. Navegador oscuro: 320/375/768/1440 px sin desbordamiento horizontal ni cortes en textos modificados; bloque hardware revisado visualmente a 320 px. Pendiente QA visual de tema claro/dispositivo físico antes de promoción.
- Preview local: `http://127.0.0.1:3012/integrations/`. Sin commits, push, despliegue ni dependencias nuevas.

## Checkpoint local — commits por alcance (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Erick autorizó crear commits para todos los cambios del listado adjunto. Reservas liberadas; sin push ni promoción a `qa`/`main`.
- Commits de implementación: `588dec1` (demo legal bilingüe y fuentes), `adf6f4c` (medios Home), `e283854` (briefs Products, medios editoriales y Forms), `8fa8324` (retirar acento decorativo del CTA). El commit de cierre agrupa retiro del legacy del checkout, referencias operativas actualizadas y este registro de trabajo.
- Estado real del archivo: Erick movió `_legacy_archive/` a `/Users/Erick/Downloads/_legacy_archive/`. Se verificaron nuevamente los 120 archivos por SHA-256; no se modificó ni eliminó el respaldo externo. Las bajas Git de `start-version/` y `wordpress-widget/` registran su retiro del checkout; sus versiones anteriores siguen en el historial. `.playwright-cli/` y `.DS_Store` permanecen en la raíz.
- README, AGENTS/CLAUDE, master, mapa y arquitectura explican que la referencia es externa y no requerida para ejecutar/compilar. Se conservan exclusiones de `_legacy_archive/` si se reintroduce localmente; comentarios y documentos históricos mantienen sus nombres de procedencia.
- Validación del checkpoint completo: `pnpm lint`, `pnpm typecheck`, `pnpm build --webpack` (44 páginas), `git diff --check` y revisión de cada grupo preparado pasan. Sin conflictos de Git. Los pendientes editoriales/legales, medios premium, QA claro/reducido y dispositivo físico documentados en cada tarea siguen abiertos; crear estos commits no equivale a aprobación productiva.
- Siguiente paso: entregar identificadores de los cinco commits locales. Sin dependencias nuevas, cambios de producción, DNS, Cloudflare ni credenciales. No se ejecuta push como parte de esta solicitud.

## Vista previa lista — Forms and Surveys y numeración redundante (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance: brief de Forms, carrusel accesible de doce tipos y revisión global de indicadores pequeños duplicados. Reservas liberadas.
- Archivos: contenido/ruta Forms, `FormsSections`, nuevo `QuestionTypesCarousel`, etiqueta local `FormsProductLabel` en header/footer y configuración local de NextPage; `StickyStory` y eliminación de su opción ya innecesaria en Custom Development, contrato Products y esta entrada. Cambios locales anteriores preservados.
- Copy: nombre Forms and Surveys sólo en esta ruta y sus referencias de navegación; hero y disponibilidad Enterprise 360 package, dos descripciones del proceso, encabezado 12 question types for every kind of visit, USE CASES y Put forms to work at every visit, descripción de Shelf checks según brief. Titular, fotos, CTA, los doce nombres y otros casos conservados.
- Carrusel: lista única sin copias anunciadas, scroll horizontal nativo táctil, flechas anterior/siguiente y pausa/reanudación; teclado con flechas y Home/End. Avance lineal 24 px/s con reversa en extremos; se detiene por hover/foco y pausa persistente tras navegación manual. Sin autoplay con prefers-reduced-motion; escucha cambios de preferencia. No trabaja fuera de vista, limita el delta tras inactividad y limpia observer/RAF. Tailwind y Button/Icon existentes, sin tokens, estilos globales o dependencias nuevos.
- Auditoría global: se retiran únicamente current/total de StickyStory (Forms, Pre-sales y Custom Development), conservando números principales, textos, orden, captions y observador. Se revisan los demás patrones fraccionarios: se conservan contadores únicos de FeatureStack/FeatureTabs, selección de FeatureExplorer/HomeCapabilities, NextPage, testimonios y encuestas por informar posición/navegación; datos y cantidades intactos.
- Validación: lint global, typecheck, build webpack (44 rutas) y git diff --check pasan. HTML exportado confirma copy y principales pasos, doce tipos y ausencia de indicadores redundantes en los tres consumidores. Navegador oscuro: 320/375/768/1440 px sin overflow global ni nombres cortados en sus tarjetas; avance comprobado (scrollLeft 95→213), pausa estable en 214, botón siguiente a 1008, End llega al extremo 1455/1455 con Signature, Home regresa al inicio. Controles expuestos en accesibilidad y doce elementos sin duplicación.
- Pendiente: QA visual en tema claro, preferencia reducida aplicada a nivel de navegador/sistema y gesto táctil en dispositivo físico. La rama reducida está implementada y revisada en código; no se reporta como probada en dispositivo. Preview local: http://127.0.0.1:3012/forms/. Sin commits, push ni despliegue.

## Tarea cerrada — excluir registros y metadatos del archivo (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Por instrucción de Erick, `.playwright-cli/` (8 archivos originales) y `.DS_Store` vuelven a la raíz, fuera de `_legacy_archive/`, para su traslado manual posterior. Reservas liberadas.
- Finder había regenerado `.DS_Store` en la raíz. Se conserva esa copia nueva en `.playwright-cli/finder-metadata/.DS_Store`, sin sobrescribir ni eliminar archivos, y se restaura el archivado en la raíz. Finder actualizó los metadatos del `.DS_Store` archivado desde la verificación anterior: su hash ya difiere del inventario inicial; no afecta código ni recursos del sitio.
- Manifiesto, README del archivo y arquitectura actualizados. El archivo aislado conserva únicamente `start-version/` y `wordpress-widget/`: 120 archivos originales. La entrada anterior conserva el registro histórico del primer movimiento; este ajuste la sustituye respecto a los dos elementos excluidos.
- Verificación: SHA-256 de los ocho registros devueltos y de los 120 archivos restantes correcto; existencia de ambos elementos en la raíz y `git diff --check` comprobados. Build no repetido porque sólo se trasladaron registros/metadatos y se actualizaron documentos. Sin cambios de código, configuración, commit, push ni despliegue.

## Tarea cerrada — aislamiento de referencias y recursos externos (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Autorizado por Erick: limpiar la raíz sin eliminar archivos, incluyendo revisión de recursos de IA y referencias. Reservas liberadas.
- Resultado: `_legacy_archive/` conserva 129 archivos sin alterar contenido: `start-version/` (113), `wordpress-widget/` (7), `.playwright-cli/` (8) y `.DS_Store` de raíz (1). Se preserva toda la estructura interna; inventario con tamaño, ruta original, destino y SHA-256 en `_legacy_archive/manifest.json`. Integridad comprobada antes/después y al cierre: 3,561,677 bytes.
- Se conservan `src/`, `public/`, README raíz, dependencias, lockfile, entorno y demás configuración, junto con todos los cambios locales anteriores. Las únicas modificaciones de configuración son exclusiones de `_legacy_archive/` en ESLint/TypeScript. Se actualizan rutas de referencia operativas en AGENTS/CLAUDE, master, arquitectura y mapa de rutas; no se altera contenido del sitio anterior.
- Permanecen activos `docs/` (reglas, contratos, decisiones y handoffs pendientes), `assets/icons/`, `scripts/`, `.agents/`, `.claude/` y `.github/`. `docs/legal-review/` contiene las tres fuentes reales del build legal. Los medios de IA/SAMI y marcas de proveedores de IA en `public/`, con consumidores y registros en `src/`, se mantienen en su ubicación; no se hizo una purga dentro del código o medios protegidos.
- Validación: `pnpm lint`, `pnpm typecheck`, `pnpm build --webpack` (44 páginas) y `git diff --check` pasan. Lista efectiva de TypeScript sin archivos archivados; ningún directorio archivado aparece en `out/`; todos los recursos locales `src`, `srcset` y `poster` del HTML exportado existen. QA visual omitido al no cambiar código, estilos ni contenido público.
- Alertas: README raíz, comentarios y registros históricos mantienen nombres de rutas originales, resueltos agregando `_legacy_archive/` según el índice del archivo. El generador externo de WordPress requiere restaurar `wordpress-widget/` a la raíz antes de ejecutarlo porque calcula rutas relativas a su ubicación original; no fue ejecutado ni modificado. Logs y `.DS_Store` ignorados por Git siguen conservados físicamente; el manifiesto registra sus hashes.
- Entrega y restauración: `_legacy_archive/README.md`. Sin archivos eliminados por esta tarea, dependencias nuevas, commits, push, despliegue ni cambios en producción, DNS, Cloudflare o `main`. Los borrados que ya existían al inicio en otros alcances se preservan. Siguiente paso: revisión del archivo aislado por Erick; no eliminarlo automáticamente.

## Tarea cerrada — etiquetas globales de CTA (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance: Book a free demo → Book a Demo y See Pricing → Pricing en toda la aplicación. `Book a Demo` ya estaba normalizado; se actualizó la etiqueta de precios compartida en `src/content/products/shared.ts`. Reservas liberadas.
- Enlaces, analytics, CTA específicos como Explore Features y prueba gratuita de SAMI y demás copy conservados. `start-version/` e historial documental se mantienen como referencia. Sin dependencias, commits, push ni despliegue.
- Validación: lint global, typecheck, build webpack (44 rutas) y `git diff --check` pasan. Inspección de todos los enlaces y botones del HTML exportado: sin las dos etiquetas anteriores. QA visual omitido por ser un cambio de etiqueta a texto más corto sin modificar estilos ni estructura.

## Vista previa lista — Custom Development: brief editorial (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance exclusivo de `/custom-development/`: breadcrumb y etiqueta Custom Development, nuevo lead del hero, Pricing hacia `/plans/`, eliminación del resumen duplicado, capitalización de las tres funcionalidades, descripción de Custom Reports e introducción del proceso.
- Archivos: contenido y ruta Custom Development, `CustomDevSections.tsx`, eliminación de sus estilos de minisección sin consumidores, extensión mínima de `HeroCaseStudy` para recibir el CTA secundario existente y opción `showStepCount` de `StickyStory` (true por defecto; false sólo aquí), contrato Products y esta entrada. Reservas liberadas. Se preservan los cambios locales previos de medios y otros alcances.
- Estado: titular e imagen del hero conservados. SpecSheet y sus componentes locales sin uso retirados junto con su espacio. What we build y How it works principales presentes, tres funcionalidades y cuatro pasos con el mismo orden y comportamiento. Se retiran sólo los indicadores pequeños del proceso, conservando números principales y captions de imágenes. Relacionados, integraciones, siguiente producto, CTA final y footer sin cambios.
- Validación: lint global, typecheck, build webpack (44 rutas) y `git diff --check` pasan. HTML exportado confirma copy exacto, headings principales, cuatro pasos, ausencia de minisección e indicadores pequeños y noindex. Navegador oscuro: 320/375/768/1440 px sin overflow horizontal; hero y tarjetas revisados visualmente, proceso móvil con números principales y contenido preservados; sin hueco estructural entre hero y Features. Los títulos móviles completos caben en 320 px (la copia decorativa TextRoll oculta se conserva). Reutiliza tokens y componentes existentes, sin nuevos estilos, dependencias, commits, push ni despliegue.
- Pendiente: revisión visual en tema claro y dispositivo físico antes de promoción. Preview local: `http://127.0.0.1:3012/custom-development/`.

## Vista previa lista — BackOffice: ajustes del brief (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance exclusivo de `/back-office/`: nombre BackOffice, hero y descripción aprobados, CTA Book a Demo / Pricing, ocho títulos, descripción de clientes/productos/precios, condiciones Professional Package y Enterprise 360, reportes con SAMI y siguiente producto B2B eCommerce.
- Archivos: `src/content/products/back-office.ts`, configuración local de `NextPage` en la ruta y extensión opcional del componente, etiqueta aislada `BackOfficeFooterLabel` en el footer; contrato Products y esta entrada. Reservas liberadas. Se preservan los cambios locales anteriores de medios y otras páginas.
- Estado: nueve funcionalidades, orden, numeración, fotos, checks, relacionados, integraciones, CTA final, destinos y atributos de analytics conservados. El nombre del footer sólo cambia en BackOffice; comprobado que Inventory conserva Back Office. Los dos nombres del siguiente producto se configuran sólo en esta ruta. Sin cambios de navegación global, dependencias, commits, push ni despliegue.
- Validación: lint global, typecheck, build webpack (44 rutas) y `git diff --check` pasan. HTML exportado verifica copy, disponibilidad sin duplicados, ausencia de Back Office, dos etiquetas B2B eCommerce, destinos y analytics del hero, y noindex. Navegador: revisión visual de hero en 375/768/1440 px y tarjetas en móvil; 320/375/768/1440 px sin overflow horizontal, textos de tarjetas sin cortes en 320/375 px. Se reutilizan tokens y Signature/BentoFeatures sin nuevos estilos ni tokens.
- Pendiente: revisión visual de tema claro y dispositivo físico antes de promoción. QA ejecutado con preferencia oscura. Preview estático disponible en `http://127.0.0.1:3012/back-office/`.

## Home premium — selección iniciada, descarga pendiente (11 de noviembre de 2026)

- Responsable: Codex (Terra). Alcance: Home fuera del hero, cuatro fotos y cuatro videos, conforme al handoff premium. No se modificó la página ni se presentan portadas como videos.
- Envato está conectado en Chrome y se localizó el video “Warehouse Worker Scanning Packages in Bright Facility”, Wavebreakmedia, ID `938276b1-dc4a-4f1f-8600-db35df960b9d`, candidato para H02. La interfaz mostró “Automatically licensed” después de pulsar descarga; el navegador no entregó un archivo local utilizable y la recuperación del evento de descarga falló. No hay evidencia de que el archivo se haya guardado. Evitar registrar repetidamente el recurso sin revisar sus licencias.
- Pendiente: resolver acceso a los archivos descargados, completar selección y validación de los ocho medios, implementar y probar reproducción. La Home sigue con siete fotos y un video fuera del hero, no cumple aún el reparto 50/50. Sin cambios de aplicación, commits ni despliegue.

## Plan listo — medios premium para Terra high (11 de noviembre de 2026)

- Responsable del plan: Codex. Ejecutor previsto por Erick: Terra con razonamiento high; no se inició otro agente ni se cambió el modelo de esta sesión. Alcance actual: análisis y plan, sin sustituciones adicionales ni descargas premium.
- Entrega: `docs/handoffs/2026-11-11-premium-media-plan.md`. Inventario de 42 espacios lógicos fuera de heroes, objetivo 21 fotografías / 21 videos; incluye la foto de anaquel del ejemplo interno de Forms, cuyo consumidor debe separarse del hero. Se documentan los medios no renderizados de Delivery y las asignaciones compartidas con heroes.
- Evidencia: código de consumidores, copy, catálogos locales y consulta pública de Envato/Magnific. Candidatos marcados por nivel de validación; el acceso premium y recortes finales siguen sin verificarse. Se detectan asignaciones de stock incongruentes que deben reemplazarse.
- Estado: plan preparado, reservas de código liberadas. La tarea anterior de activar los 21 clips se reemplaza por esta selección 50/50. Siguiente paso: ejecutar el handoff con Terra high, cerrar candidatos, descargar por vías autorizadas y verificar reproducción real por contexto. No commits, push, despliegue ni checks de aplicación en esta tarea documental; se valida conteo y diff documental.

## Antecedente reemplazado por plan premium — reproducción de Magnific (11 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance: corregir la integración de los recursos seleccionados para que sus clips de video se reproduzcan en las secciones internas que ya usan sus portadas, sin tocar heroes, copy, estructura, rutas ni analítica.
- Archivos reservados: `src/content/media/magnific.ts`, nuevo reproductor reutilizable de medios editoriales y sus consumidores directos; `public/videos/magnific/`; esta entrada. Riesgos: peso de 21 clips, compatibilidad de export estático, reproducción reducida y términos de uso de la fuente. Siguiente paso: obtener las versiones de preview autorizadas, reducir duración/peso y conectar la reproducción diferida.

## Tarea cerrada — recursos editoriales estáticos de Magnific (10 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance: sustituir medios de secciones internas con los 21 recursos de Magnific proporcionados por Marketing, manteniendo heroes, copy, jerarquía, enlaces, analítica y estructura. Los clips y motion graphics quedan fuera de esta pasada.
- Archivos: catálogo `src/content/media/magnific.ts`, 21 portadas locales en `public/images/magnific/` y los consumidores no-hero de Pre-sales, Direct Sales, Inventory, Delivery, Back Office, B2B e-Commerce, Forms y Custom Development. `AnyPhoto` acepta el nuevo tipo de foto estática; no modifica el comportamiento de los heroes.
- Asignación: cada portada se consume una sola vez. Las escenas se distribuyen por intención —pedido/e-commerce, operación de almacén, uso de tablet, picking/escaneo, preparación, entrega, coordinación administrativa, formularios y desarrollo— y no se presentan como clientes, empleados o pantallas reales de Listaso. La portada sustituye al video en esta fase; no hay autoplay ni nueva animación. El video interno de la visita de Pre-sales deja de renderizarse hasta que se prepare su implementación de movimiento.
- Validación: 21 referencias únicas verificadas en código; ESLint dirigido, typecheck, build webpack (44 rutas) y `git diff --check` pasan. Preview estático confirma carga correcta de las portadas visibles de Pre-sales, Inventory, Delivery, Back Office, B2B y Forms. Pendiente QA visual de todos los encuadres en escritorio/móvil y verificación legal/editorial de las condiciones de uso de Magnific antes de producción.
- Riesgo y siguiente paso: las portadas son JPEG de 740×416 px procedentes de las fichas de video seleccionadas; son adecuadas para preview pero se debe obtener el master o una exportación de mayor resolución para publicación final. La fuente y título original de cada recurso quedan registrados en el catálogo. Sin dependencias, commits, push ni despliegue.

## Tarea cerrada — Delivery: copy, CTA y nombres (10 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance: aplicar el brief de `/delivery/` en hero, CTA secundario, cuatro títulos de funcionalidades, lead de Why it matters y nombre BackOffice del siguiente producto. Contenido comercial, medios, ejemplos, relacionados, integraciones y CTA final sin cambios.
- Archivos: `src/content/products/delivery.ts`, `HeroEditorial.tsx`, `src/content/site/navigation.ts` y esta entrada. El CTA secundario reutiliza el patrón configurable ya introducido en heroes; Delivery lo define como “Explore Features” hacia `#features-title`. La etiqueta compartida BackOffice se actualizó en navegación para sincronizar sus apariciones derivadas. Reservas liberadas.
- Validación: ESLint dirigido, typecheck, build webpack (44 rutas) y `git diff --check` pasan. Pendiente QA visual en escritorio/tablet/móvil y tema oscuro antes de promoción. Sin dependencias, commits, push ni despliegue.

## Tarea cerrada — Inventory: copy, paquetes y CTA secundario (10 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance: aplicar el brief exclusivo de `/inventory/`: hero, nota de paquetes, CTA secundario, título y capitalización de funcionalidades, y sección Fresh products. Sin cambios a relacionados, integraciones, NextPage, CTA final o footer.
- Archivos: `src/content/products/inventory.ts`, `ProductHero.tsx` y esta entrada. La mejora técnica compartida permite a cada hero de producto definir su CTA secundario; solo Inventory la usa en este alcance, con ancla `#features-title`. Reservas liberadas.
- Estado: “Book a Demo” conserva Calendly; “Explore features” ya no apunta a Pricing. Se conservan orden, nueve funcionalidades, imágenes, datos de lotes, planes y estructura de Inventory. No se propagó el texto específico de Inventory a otras rutas.
- Validación: ESLint dirigido, typecheck, build webpack (44 rutas) y `git diff --check` pasan. Pendiente QA visual de escritorio/tablet/móvil y tema oscuro antes de promoción. Sin dependencias, commits, push ni despliegue.

## Tarea cerrada — Direct Sales / DSD: contenido y organización (10 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance: aplicar el brief editorial exclusivo de `/direct-sales/`: lead y CTA secundario del hero, nueve funcionalidades en tres categorías desplegables, bloque de conductores, hardware y soluciones conectadas. Sin cambios de rutas, metadata, CTAs de demo, analytics globales ni otras páginas.
- Archivos: contenido `direct-sales.ts`, ruta Direct Sales, componentes locales `FeatureCategories`, `DriversSection`, `HardwareSection`, `ConnectedSolutions`, y extensión mínima del CTA compartido para aceptar la acción secundaria ya definida por la página. Reservas liberadas.
- Estado: “Explore Features” enlaza a `#features-title`; “Book a Demo” conserva Calendly. Las categorías usan `<details>` nativo: teclado, estado abierto/cerrado y contenido disponible sin JavaScript. Route Planner queda en Truck Inventory Under Control. Printers and Scanners conserva destino `/printers-and-scanners/` y el alcance “compatible printer and scanner models”. Las tarjetas de soluciones conservan rutas de Inventory, Delivery y Pre-sales; sus eventos existentes `product_card_click` se preservan.
- Validación: ESLint dirigido, typecheck, build webpack (44 rutas) y `git diff --check` pasan. El export local expone los tres acordeones como controles expanded/collapsed y las nueve tarjetas bajo H4; conserva los destinos de demo, ancla de funcionalidades, hardware y soluciones. Quedan pendientes QA visual de tema oscuro, teclado manual en navegador físico y tablet antes de promoción. No se añadieron dependencias, animaciones, enlaces inventados, commits, push ni despliegue.
- Pendiente editorial: el comentario “Pendiente de explorar opciones de visualización” queda resuelto únicamente por la estructura explícita de tres categorías del brief; no se identificó otro elemento visual independiente en el código actual.

## Tarea cerrada — recursos gráficos de Pre-Sales (10 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance autorizado: sustituir únicamente los recursos de `/pre-sales/` por material de Pexels que represente la visita comercial, el catálogo, el cobro y el flujo hacia oficina/bodega. Copy, estructura, enlaces, analytics y rutas no cambian. Reservas liberadas.
- Archivos: ruta `/pre-sales/`, `StoreVisit`, `StoreVisitVideo`, `HeroParts`, `StickyStory`, manifiesto `src/content/media/pre-sales.ts`, cinco WebP locales y esta entrada. Los registros existentes de Products/Sections y los medios de Home se preservan.
- Estado: hero con catálogo en tablet dentro de una visita en tienda; las tarjetas ilustradas muestran captura de exhibición y confirmación digital; el recorrido cambia por cliente, pedido, confirmación y revisión de oficina. El clip de bodega de Pexels 4292299 (Tiger Lily), ya autohospedado, sólo carga en el último paso activo y visible; se pausa al cambiar de paso o salir de pantalla, y queda la foto de oficina con movimiento reducido o error. Las cinco fotos son Pexels, de Tom Tillhub, cottonbro studio, Kampus Production y Sora Shimazaki; se registran con fuente, licencia y fecha. Ninguna escena se presenta como cliente, empleado o pantalla de Listaso.
- Rendimiento y validación: hero WebP 65 KB; tarjetas y pasos WebP entre 35–47 KB. ESLint dirigido, typecheck, build webpack de 44 rutas y `git diff --check` pasan. Navegador: todas las imágenes cargan, sin overflow en escritorio ni 390 px; video con `readyState 4` avanza en el paso 4 y se pausa en el paso 2. QA visual en claro y móvil; tema oscuro, preferencia de movimiento reducido aplicada en dispositivo y hardware físico pendientes.
- Riesgo y siguiente paso: las escenas son aproximaciones de stock con pantallas de dispositivo no Listaso. El brief editorial de Pre-Sales sigue pendiente de implementación separada; no se modificó el copy ni la expresión “in seconds” existente fuera de este alcance.

## Tarea cerrada — CTA pre-footer: línea y propuestas de copy (10 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance: retirar el acento lineal aqua/magenta sobre el título del CTA compartido y proponer copy diferenciado para Products, Integrations, Pricing y Company en una tabla de revisión.
- Archivos: `FinalCta.tsx`, `FinalCta.module.css` y esta entrada. Reservas liberadas. Se retiró el span decorativo sobre el título y su regla `.accent`; se conservan las separaciones de la tarjeta de contacto, contenido, enlaces y analytics.
- Copy: cuatro propuestas en inglés presentadas en el chat para Products, Integrations, Pricing y Company, basadas en el flujo operativo, costes de setup y misión existentes. No se aplicaron a contenido público ni se cambiaron los destinos del CTA. Sin promesas numéricas de ROI, empleos u ofertas inventados.
- Validación: ESLint dirigido, build webpack con TypeScript (44 páginas) y `git diff --check` pasan. Revisión visual de navegador omitida por ser la eliminación de un elemento decorativo y su regla aislada. Sin dependencias nuevas, commit, push o despliegue.
- Siguiente paso: revisión editorial de las propuestas antes de implementar variantes por familia de página; Company requiere una acción de contacto coherente con su texto, conservando los destinos aprobados hasta esa implementación.

## Vista previa lista — medios restantes de Home (10 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Autorizado: continuar sustituyendo recursos de Home, alternando foto/video según pertinencia, sin cambiar copy ni estructura. Hero aprobado como base.
- Archivos: `HowItWorks.tsx`, `HomeCapabilities.tsx`, `HomePhoto.tsx`, `WorkflowVideo.tsx`, manifiesto `src/content/media/home.ts`, medios locales y contrato Home. Reservas liberadas. Registros compartidos de Products/Sections intactos.
- Estado: ocho espacios sustituidos con siete fotos de Pexels y un video de almacén (4292299, Tiger Lily), además del hero aprobado. Ventas: revisión en tablet; entrega: firma digital; oficina: revisión documental. Capacidades: pedido digital de alimentos, captura de exhibición, contabilidad y productos en cajas. Sin compras ni activos Premium. Las pantallas de stock no se presentan como Listaso.
- Medios: 24 WebP responsivos (640/960/1440) de hasta 80 KiB cada uno; clip nuevo de siete segundos, 960×540, 3,873,244 bytes, carga sólo al seleccionar el paso visible, pausa fuera de vista/pestaña oculta y respeta movimiento reducido. Poster estático y control de 48 px. Se descartó el primer clip 4293550 porque su caja ocupaba casi todo el encuadre; no queda en public.
- Validaciones: lint, typecheck, build webpack (44 páginas) y `git diff --check` pasan. Copy `src/content/home/en.ts` sin diff. Navegador: video readyState 4 y tiempo avanzando, pausa/reanudación manual y pausa al salir del paso; inicialmente no carga el video inactivo. Fotos cargadas sin errores, sin overflow global en 390/1100/1440 px. Carrusel de capacidades conserva selección y recortes en móvil. QA visual oscuro; tema claro, preferencia de movimiento reducido a nivel de sistema y dispositivo físico pendientes.
- Preview compilado en `http://127.0.0.1:3001/`; capturas de workflow y capacidades fuera del repo. Cambios legales concurrentes preservados; sin commit, push ni despliegue.
- Siguiente paso: Erick revisa la relación de imágenes y copy y los encuadres. Las escenas son aproximaciones de stock, especialmente venta de mostrador, pedido de alimentos y mercado; no son casos de uso documentados de clientes. Optimización adicional de video/red móvil y QA claro/reducido antes de publicación.

## Vista previa lista — hero con video Pexels (9 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Autorizado: mostrar el video Pexels 4292903 en el espacio actual del hero, conservando copy, estructura y tarjetas.
- Archivos: `HomeHero.tsx`, `HeroVideo.tsx`, registro `src/content/media/placeholders.ts`, clip y poster locales. Reservas liberadas.
- Estado: clip 4292903 de Tiger Lily autohospedado a 1280×720 (5,461,027 bytes; original 4K fuera del repo), poster WebP de 45,392 bytes y marco 4:5 existente. Copy, tarjetas, CTA y geometría conservados. Control superpuesto de reproducción/pausa de 48 px; pausa fuera de vista y pestaña oculta, poster sin carga automática del video con movimiento reducido. Sin dependencias nuevas.
- Validación: lint, `tsc --noEmit`, build webpack (44 páginas) y `git diff --check` pasan. Navegador: reproducción real verificada (readyState 4 y currentTime avanzando), muted, pausa y reanudación por teclado; sin overflow a 1440 y 390 px. Captura de escritorio fuera del repo. QA visual en tema oscuro; tema claro, movimiento reducido a nivel de sistema y dispositivo físico quedan pendientes.
- Preview compilado disponible en `http://127.0.0.1:3000/`, servido desde `out/`. Sin commit, push ni despliegue. Se preservaron los cambios legales concurrentes. El servidor de desarrollo mostró el aviso conocido de actualización de Next.js 16.4.0; no se cambiaron dependencias.
- Riesgo y siguiente paso: Erick evalúa encuadre y pertinencia del clip. El formato vertical prioriza scanner/manos y deja fuera el rostro en gran parte de la secuencia; el movimiento del clip desplaza el scanner durante la reproducción. El video sigue en calidad de preview; comprobar peso/red móvil antes de publicación. Sin cambios en otras secciones, producción o ramas.

## Tarea cerrada — demo de páginas legales (9 de noviembre de 2026)

- Responsable: Codex, rama `dev`. Alcance: integrar los tres borradores bilingües de `docs/legal-review/` en `/privacy-policy/`, `/terms-and-conditions/` y `/subscription-agreement/` como demo accesible.
- Archivos: rutas legales en `src/app/(site)/`, `src/components/sections/legal/LegalPage.tsx`, `src/lib/legal-documents.tsx` y esta entrada. Reservas liberadas.
- Estado: las tres URL históricas muestran el contenido completo inglés y español de `docs/legal-review/`, con navegación entre documentos, índices por idioma, tablas accesibles y advertencia visible de borrador. El pie existente ya enlaza las tres páginas. Las referencias a anexos internos se muestran sin destino público nuevo.
- Validación: `pnpm lint`, `pnpm typecheck`, `pnpm build --webpack` y `git diff --check` pasan. La exportación estática contiene las tres rutas, canonical correctos y `noindex, nofollow`; los 75 párrafos de origen y 42 apartados EN/ES aparecen completos. No se pudo abrir un servidor local para QA visual en navegador por restricción de socket del entorno.
- Riesgo y siguiente paso: Legal debe confirmar entidad, vigencia, contactos, proveedores, obligaciones y equivalencia bilingüe antes de publicación. Conservar `noindex` hasta aprobación y completar QA visual en preview. Los borradores de `docs/legal-review/` son dependencia de compilación y deben incluirse junto con estas rutas al guardar el cambio.

**Actualizado:** 9 de noviembre de 2026

## Análisis — recursos gráficos de Home (9 de noviembre de 2026)

- Responsable: Codex. Alcance solicitado: propuesta por sección, sin cambiar copy, estructura ni recursos publicados. Sin archivos de implementación reservados.
- Revisados: orden real en `src/app/(site)/page.tsx`, copy en `src/content/home/en.ts`, componentes Home y registros `placeholders.ts`, `products.ts` y `sections.ts`.
- OBSERVACIÓN: nueve espacios fotográficos actuales (hero, cuatro pasos del workflow y cuatro capacidades). Cifras, SAMI, soporte, clientes, precios y CTA final conservan sus recursos actuales en la propuesta.
- RECOMENDACIÓN: hero con operación humana y tecnología; workflow con venta en tienda, escaneo, recepción con firma y revisión administrativa; capacidades con pedido digital, fotografía de exhibición, conciliación y alimentos en distribución. Conservar marcos y superposiciones existentes.
- Preselección externa: Pexels 4292903 (video de escaneo), 4483942 (foto de escaneo), 5668879 (revisión de documentos), 6115031 (fotografía de exhibición), 4391227 (tablet junto a vehículo); Magnific 6683934 (video de inventario, Premium), 278573414 (tablet en supermercado, Premium), 3869749 (video de almacén refrigerado, Premium); Pixabay 819327 (vegetales en cajas, alternativa).
- DESCONOCIDO: encuadres finales, marcas visibles y ajuste al recorte real; preselección basada en fichas públicas, sin validar reproducción completa ni descargar originales. B2B e-Commerce sigue sin candidato suficientemente específico; venta y entrega son aproximaciones, no representaciones exactas del flujo.
- Mixkit 23011 descartado como opción gratuita comercial: su ficha limita la descarga gratuita a uso personal. Coverr Logistics y Pixabay Logistics quedan como colecciones de reserva, sin clip finalista.
- Siguiente paso: revisión visual de candidatos y selección final por espacio antes de implementar. No se descargaron ni sustituyeron medios. Sin cambios en copy, rutas, dependencias, producción o ramas. No aplican lint/build a este análisis; se revisó el diff documental de esta entrada.

## Ampliación — inventario estándar y cambios remunerados (3 de noviembre de 2026)

- Erick aportó la imagen «Features (1).webp» y confirmó que las funciones visibles integran la versión estándar; los cambios solicitados por un cliente se gestionan aparte y tienen pago adicional.
- Se añadió `docs/legal-review/STANDARD_FEATURE_INVENTORY_2026-11-03.md`, con copia de la imagen en `docs/legal-review/evidence/`, y se ajustaron índice, privacidad, términos del sitio, acuerdo de suscripción y anexo bilingüe para distinguir funcionalidad estándar, configuración y cambios cotizados.
- Requieren validación técnica: datos y permisos por módulo, procesamiento de pagos, GPS y hojas de tiempo, funciones Beta/New, y el papel de Alere, leadCommerce y Route4me.
- La imagen se usó como evidencia de nombres y alcance informado, no como prueba de que cada función esté activa o trate todos los datos posibles en cada cuenta. No se modificaron rutas ni producción.

## Tarea cerrada — paquete legal bilingüe para revisión jurídica (3 de noviembre de 2026)

- Responsable: Codex, rama `dev`.
- Alcance: borradores internos en `docs/legal-review/` de privacidad, términos del sitio, suscripción y anexo de tratamiento y desarrollos a medida, en inglés y español.
- Archivos reservados: `docs/legal-review/` y esta entrada de `docs/WORKLOG.md`.
- Estado: cuatro documentos bilingües y un índice de decisiones en `docs/legal-review/`; sin cambios en rutas, copy público, proveedores ni producción. Reservas liberadas.
- Validación: enlaces internos existentes, secciones EN/ES correspondientes y ausencia de espacios finales revisados; no se ejecutaron checks de código por ser documentación.
- Riesgo y siguiente paso: Legal, Development y Producto deben confirmar las prácticas y términos señalados en la matriz antes de usar los textos para publicación o firma.

## Tarea cerrada — SAMI: frase de precio (29 de octubre de 2026)

- Responsable: Codex, rama `dev`.
- Alcance autorizado: cambiar únicamente el chip del hero de `/sami/` de
  “From $59 a month per team” a “From $59 a month”.
- Archivos modificados: `src/content/products/sami.ts`,
  `docs/PRODUCT_CONTENT_CONTRACT.md` y `docs/WORKLOG.md`. Reservas liberadas.
- Estado: implementado; Erick autorizó commit y push a `dev` el 29 de octubre.
- Validaciones: lint global, TypeScript (`tsc --noEmit`) y `git diff --check`
  pasan. Respuesta HTML de `localhost:3000/sami/` confirmada con el texto nuevo
  y `$59` en negrita. Build y QA visual omitidos por tratarse de la eliminación
  de dos palabras, sin cambios de markup.
- Siguiente paso: subir a `dev` y verificar la recepción remota; CI y preview
  de rama se ejecutan tras el push. Sin promoción a `qa` ni `main`.

## Entrega a dev — 28 de octubre de 2026

Erick autorizó guardar y subir todos los cambios locales a `dev`. El checkpoint
incluye el hub Products, enlaces con Integrations y navegación, sincronización
del widget SAMI y el brief interno de privacidad con su handoff.

Validaciones de esta entrega: `pnpm lint`, `pnpm typecheck`,
`pnpm build --webpack` (41 rutas) y `git diff --check` pasan. La primera
compilación terminó con un aviso de vulnerabilidad conocida en Next.js 16.4.0;
la repetición finalizó correctamente y conserva el aviso. Queda pendiente
actualizar la dependencia y repetir las validaciones en un alcance separado.
Los pendientes editoriales y de QA previamente documentados siguen vigentes.

## Tarea cerrada

### Hubs Products e Integrations (Codex, `dev`, sin commit, 27 de octubre de 2026)

Creado `/products/` como índice de nueve productos con hero vectorial SVG,
selector accesible, panel lateral en escritorio y detalle bajo la selección en
móvil. El marco 8:5 de cada producto queda definido para Diseño. Se enlazaron
las apps oficiales pertinentes en App Store y Google Play; Listaso Advanced
aparece por separado y Customer Order Catalog queda fuera por DEC-012. El menú,
footer y páginas de error enlazan al nuevo hub. `/integrations/` añade regreso
a Products. La navegación final entre productos conserva sus nueve pasos.

Validaciones: lint, typecheck, build webpack y `git diff --check` pasan. El
export contiene 41 rutas, incluida `/products/`, con canonical y `noindex`.
Revisión local: 390 px claro, 1440 px oscuro, selección de Inventory y sin
overflow a 320/768 px; cero errores de consola. Pendientes: aprobación editorial
del copy y asociaciones app-producto, reemplazo de medios por Diseño y QA en
dispositivo real con movimiento reducido. Ver
`docs/PRODUCTS_HUB_CONTENT_CONTRACT.md`. Archivos reservados: ninguno
(liberados).

### SAMI: widget de WordPress sincronizado con la página (Claude, `dev`, sin commit, 27 de octubre de 2026)

Regenerado desde `/sami/`: nuevas insignias del hero ("Your Listaso AI Assistant",
"Customer Only", "+30 languages", "+100 prompts"), datos de ejemplo del chat
(Customer 1/2/3), onboarding $299 y hero sin la espiral. Portado `data-intro` de
SamiLogoMark (el texto del hero espera al video de entrada, con respaldo de 6 s;
sin `SAMI_VIDEO_URL` no se oculta nada). Alturas idénticas a la página a 1440 px.
Sin cambios en `src/`.

### SAMI: corrección visual del chip de precio y lead del hero (Codex, `dev`, sin commit, 26 de octubre de 2026)

La captura de Erick mostró el chip casi invisible: `bg-white` y
`border-white` no existen en el Tailwind del proyecto porque la paleta por
defecto está desactivada. El chip ahora tiene CSS aislado con fondo blanco y
texto navy `#00375b`, independientemente del contexto oscuro SAMI. El lead
mantiene el copy aprobado, deja de alinearse a la derecha y usa un ancho más
contenido y `text-wrap: balance` para que las líneas queden parejas. El H1,
CTA, precio y resto del hero no cambian.

Validaciones: lint, TypeScript y `git diff --check` pasan. Pendiente revisar
el resultado visual en una sesión nueva; no se ejecutó build para no mezclar
artefactos con el servidor Turbopack que el usuario pueda tener abierto.

### SAMI: jerarquía del hero y copy de idiomas (Codex, `dev`, sin commit, 26 de octubre de 2026)

El chip “From $59 a month per team” usa fondo blanco y texto navy. El H1
separa sus dos frases: “Ask your business anything.” queda más pequeña y
“SAMI has the answers” gana tamaño; la marca conserva su tipografía. El lead
usa el texto exacto aprobado por Erick con “Available in +30 languages”. La
fila inferior da al párrafo anchura para formar aproximadamente dos líneas en
escritorio; en móvil conserva saltos naturales para no reducir la letra.
Se actualizó el contrato de contenido. No se modificaron precio, oferta,
destinos de CTA ni metadata.

Validaciones: lint, TypeScript y `git diff --check` pasan. No se ejecutó
`next build` mientras la sesión Turbopack del usuario puede estar activa en
`.next`; pendiente revisión visual en móvil y escritorio.

### NextPage: advertencias de hidratación en desarrollo (Codex, `dev`, sin commit, 26 de octubre de 2026)

El error compartido por Erick muestra bundles de dos revisiones en la misma
hidratación: el servidor renderizó el `useId()` y el estado seleccionado nuevos,
mientras el cliente aún enviaba `selectedIndex` al `<ol>` y usaba el ID fijo
anterior. Se eliminó el wrapper `NextPageSteps` y su prop de presentación;
el scroll del carril vive ahora en `NextPageNavigator`, que renderiza el `<ol>`
directamente. El estado inicial es determinista y los cálculos de tamaño se
ejecutan solo en `useEffect`, después de hidratar. Ya no hay ningún
`selectedIndex` ni ID fijo pasado al DOM desde el código fuente.

Validaciones: `pnpm lint`, `pnpm exec tsc --noEmit` y `git diff --check` pasan.
No se ejecutó otro build en el directorio `.next` mientras el servidor
Turbopack del usuario pudiera seguir abierto; la sesión del navegador necesita
recarga completa o reinicio de `next dev` para descartar el bundle cliente
antiguo. Pendiente: confirmar en la consola de una sesión fresca que no
reaparecen ambas advertencias.

### Navegación final: selección previa de páginas (Codex, `dev`, sin commit, 26 de octubre de 2026)

La captura móvil de `/sami/` mostró el índice de Products comenzando por 01
mientras la tarjeta presentaba Custom development (09/09). `NextPage` conserva
los datos filtrados en servidor y pasa la interacción a `NextPageNavigator`:
cada número/etiqueta es ahora un botón que cambia título, descripción, posición
y destino de la vista previa; sólo el enlace grande de esa vista navega. El
número seleccionado se destaca y el carril horizontal lo centra al iniciar,
al cambiar la selección y al cambiar el ancho. Los botones usan `aria-pressed`,
la ruta actual conserva `aria-current` y el preview anuncia su contenido al
cambiar. El enlace mantiene `next_page_click` con la etiqueta de la ruta
efectivamente seleccionada. El patrón se aplica a las páginas que comparten
`NextPage`; sin JavaScript queda disponible el enlace inicial a la siguiente
página.

Validaciones: lint, typecheck, build webpack y `git diff --check` pasan. El
HTML exportado de `/sami/` muestra nueve botones, una selección inicial y el
enlace a `/custom-development/`. Pendiente: QA táctil/teclado y visual en
navegador real; el control automático local sigue sin créditos.

### SAMI: ajuste responsive de la página (Codex, `dev`, sin commit, 26 de octubre de 2026)

Se auditó el CSS y la estructura de reflow de `/sami/` desde 320 px en hero, ejemplos/chat, Features,
Pricing, contacto Zoho, FAQ, navegación final, CTA final y header. Los CTA del
hero ocupan el ancho del contenedor en móvil y pueden partir su texto; el chat
permite partir etiquetas largas y el texto del campo ilustrativo sin empujar
el importe ni el botón de envío. Las tarjetas de Pricing y el panel del
formulario usan menos padding por debajo de 640 px; las columnas de Sales y
FAQ usan `minmax(0, …)` para admitir contenido flexible. En la tarjeta
compartida de navegación final, el título animado puede partirse y la flecha
se sitúa debajo del texto en pantallas estrechas. No se alteraron copy,
destinos ni lógica del embed.

Validaciones: `pnpm lint`, `pnpm typecheck`, `pnpm build --webpack` y
`git diff --check` pasan; el CSS compilado contiene las columnas `minmax`.
Pendiente: QA visual y táctil en 320/375/390/768/1024 px y en el dominio
permitido por Zoho. El control automático del navegador local rechazó el
acceso en esta sesión por falta de créditos; no se intentó un acceso alterno.

### Páginas de error y advertencia (Claude, `dev`, sin commit, 26 de octubre de 2026)

Nuevas páginas de estado con el shell del sitio y `noindex`: `not-found.tsx` (404.html con
destinos sugeridos), rutas `/401/`, `/403/`, `/429/`, `/500/` y `/503/`, el límite de error
`(site)/error.tsx` (con reintento) y `global-error.tsx` (sin header/footer). Componente
`StatePage`, copy genérico en `src/content/site/error-pages.ts` y `SiteShell` extraído del
layout de `(site)`. Lint y typecheck pasan; el export genera `out/404.html` y las rutas.
Pendiente: mapear en Cloudflare los códigos 401/403/429/500/503 a estas rutas y revisión
visual en navegador. El copy es interfaz genérica; Erick debe aprobarlo.


### SAMI: widget de WordPress sincronizado de nuevo (Claude, `dev`, sin commit, 26 de octubre de 2026)

Regenerado desde `/sami/` con el copy actual, la marca animada (SamiLogoMark: poster
embebido a 560 px y JS de rotación portado; el WebM de 1.2 MB queda opcional vía
`SAMI_VIDEO_URL`) y la etiqueta bajo el chat del selector. Alturas idénticas a la página
a 1440 px salvo el hero (breadcrumb omitido). Sin cambios en `src/`.

### SAMI: aviso bajo el chat de ejemplos (Codex, `dev`, sin commit, 26 de octubre de 2026)

El aviso “Illustrative data” salió de la cabecera del chat interactivo en
`/sami/`. Ahora aparece una sola vez debajo del panel, fuera de la transición
entre preguntas, con el copy exacto “Illustrative purposes only”. El chat de
Home conserva su etiqueta propia. Lint, typecheck, build webpack y
`git diff --check` pasan; el HTML exportado contiene el aviso fuera del panel
y no contiene el texto anterior. El widget temporal de WordPress requiere
regeneración separada para reflejarlo.

### SAMI: animación de entrada del logo (Codex, `dev`, sin commit, 26 de octubre de 2026)

Se revisó el paquete entregado por Diseño en `~/Downloads/sami animacion html/`.
El WebM VP9 con transparencia (1.1 MB, 2 s) permite controlar reproducción y
final; el WebP animado (7.5 MB, loop infinito) no permite detener y repetir el
bucle de forma fiable. `SamiLogoMark` usa el WebM sobre el PNG del último
fotograma: reproduce una vez al entrar en pantalla y otra vez al entrar con
puntero fino en la sección de SAMI del hero o Home. Tras la corrección de
Erick, ambas capas comparten una caja fija y recortada para que el video no
aparezca debajo del póster ni invada el titular. Al terminar la entrada, el
póster gira una vuelta tras cada entrada; en escritorio continúa mientras
la sección tenga hover y en móvil mientras esté visible. Al salir del hover
vuelve suavemente a su orientación inicial. El resplandor azul y aqua que
acompaña la entrada permanece visible durante todo el giro y se desvanece
al detenerse.
Pausa fuera de pantalla o con pestaña oculta. Con movimiento reducido queda
el PNG sin giro; sin VP9 o ante error de reproducción se usa el PNG con giro. El logo
mantiene su tamaño aparente al compensar el margen transparente de los medios.
Los archivos copiados a `public/brand/sami/` conservan sus bytes originales.
Lint, typecheck, build webpack y `git diff --check` pasan. Pendiente: revisar
la transición y el canal alpha en Safari, Chrome y móvil reales. La revisión
visual local en navegador sigue bloqueada por el control automático sin
créditos; el widget temporal de WordPress necesita regeneración para reflejar
esta interacción.

### SAMI: ajustes de copy y espacio superior de Pricing (Codex, `dev`, sin commit, 26 de octubre de 2026)

Por instrucción de Erick, el hero conserva el precio desde $59 por equipo/mes
sin repetir la promoción junto al precio y presenta a “SAMI, your Listaso AI
Assistant”. La sección de ejemplos ya no lleva el lead redundante. Features,
FAQ y el chip SAMI de Home nombran Claude antes que ChatGPT. Pricing muestra
el nuevo texto de conexión y la frase de prueba de 14 días; se añadieron 24 px
de espacio **encima** de Pricing, de 64 a 88 px en móvil y de 96 a 120 px en
escritorio. Sales usa el título, descripción, audiencia y nombre de formulario
solicitados. El enlace alternativo del embed ahora habla de completar el
formulario. Se actualizó el contrato de contenido; el widget temporal de
WordPress requiere regeneración separada para reflejar estos cambios. El
generador depende de un servidor local que este sandbox no permite iniciar;
al probar la exportación estática, Lightning CSS rechazó su CSS compilado.
Validaciones: lint, typecheck, build webpack y `git diff --check` pasan; el
HTML exportado contiene el nuevo copy y la hoja CSS generada sitúa el nuevo
padding superior después del padding base. No se pudo hacer la revisión visual
en el navegador: el control automático de aprobación del navegador rechazó
abrir localhost porque el workspace no tiene créditos para esa revisión.

### CTA oficial en degradado (Codex, `dev`, sin commit, 23 de octubre de 2026)

La variante primaria de `Button` usa el degradado aprobado `#DBE9FE` →
`#41F9FF`, texto navy, borde blanco y forma de píldora. Se aplica a SAMI,
Home, productos, planes y otros CTA principales que consumen el componente
compartido. Las variantes secundaria/terciaria y otros acentos no se cambiaron.
El CTA final ya no añade una sombra roja. Contraste de texto navy: 10.07:1 en
el inicio y 9.55:1 en el final del degradado. Lint, typecheck, build webpack
y `git diff --check` pasaron. La vista previa en navegador quedó pendiente por
la misma limitación de aprobación automática descrita arriba.

### SAMI: widget de WordPress actualizado a la página actual (Claude, `dev`, sin commit, 23 de octubre de 2026)

`wordpress-widget/sami/` regenerado desde `/sami/` con el hero nuevo (fondo y espiral
en base64, logo actualizado, nuevo titular), pricing actual, sección de contacto de
ventas (iframe Zoho con su listener de altura) y FAQ. El generador ahora elige las
secciones por `aria-labelledby`. Alturas idénticas a la página a 1440 y 375 px salvo el
hero (breadcrumb omitido). Sin cambios en `src/`.

### SAMI: promoción de 14 días y formulario Zoho (Codex, `dev`, sin commit, 23 de octubre de 2026)

Erick confirmó que la promoción vigente es de 14 días. Se actualizó el copy
visible de `/sami/`, Home y la FAQ de `/plans/`, junto con metadata, contratos,
DEC-025 y el widget HTML temporal de SAMI. Los CTA de la prueba dirigen a
`/sami/#sami-sales-contact` o al ancla local. El snippet compartido por Erick
es un iframe con mensajes de ajuste de altura, así que el componente usa la URL
`/formperma/` exacta y valida origen, ventana emisora e ID antes de redimensionar.
El slug de Zoho conserva `15Day` porque es parte de su identificador público.
Pendiente: QA real del embed en preview y los envíos de ambas rutas; no se
modificó la configuración de Zoho ni se enviaron respuestas de prueba.
En un preview estático local (`127.0.0.1:4173`), el CTA llevó al ancla y el
iframe se montó, pero Zoho mostró “refused to connect” dentro del frame. El
formulario sí abre de forma directa. La respuesta HTTP pública confirmó la
causa: Zoho envía `Content-Security-Policy: frame-ancestors www.listaso.com`
y `X-Frame-Options: ALLOW-FROM www.listaso.com`. El preview local y los
subdominios `*.listaso-website.pages.dev` quedan fuera de esa lista; la
página no puede cambiar esa política desde React. En Zoho, revisar `Share >
Embed > Embed Settings > Embed Location > Allowed Domains` y añadir los
dominios concretos donde se mostrará el formulario (máximo cinco según Zoho),
incluido el preview elegido; se añadió un enlace alternativo visible encima
del iframe. Después, verificar que los encabezados incluyan cada origen y
repetir la revisión visual del formulario cargado.

### Fondo Aurora reutilizable (Claude, `dev`, sin commit, 23 de octubre de 2026)

Componente `src/components/ui/AuroraBackdrop.tsx` + módulo CSS: fondo tipo aurora
boreal con tres cortinas SVG editables (cresta luminosa, cuerpo con estrías
verticales que se desvanece) sobre navy profundo, en aqua, azul, violeta y magenta de
Listaso. Props `side`, `intensity`, `animated`; colores por variables `--aurora-*`;
sólo anima transform y opacity; estático con movimiento reducido; oculto en
forced-colors. Muestra en `/foundation/#aurora`. Aún no se usa en páginas
(SamiHero y HeroDisplay están reservados por Codex). Lint y typecheck OK. La skill
`image-illustrator` (RogueRope/docs) no se instaló: genera rasters con la API de
OpenAI y está pensada para Hugo.

### SAMI: promoción de 15 días (Codex, `dev`, sin commit, 23 de octubre de 2026)

Erick corrigió la duración comercial: la prueba gratuita de SAMI es de
15 días. Se unificaron hero, CTA, nota de precios, FAQ y metadata de `/sami/`,
además de Home y la FAQ de `/plans/`. DEC-025 y los contratos de contenido
registran que esta instrucción sustituye los 14 días de la imagen del 22 de
octubre y las menciones históricas anteriores de este worklog. Se actualizó
el HTML del widget temporal de Elementor con las mismas frases. El destino de los
CTA continúa pendiente de Development/Producto; no se alteraron los precios
ni el onboarding. Validaciones: lint, typecheck, build webpack y
`git diff --check`.

### SAMI: widget HTML temporal para Elementor (Claude, `dev`, sin commit, 22 de octubre de 2026)

Carpeta nueva `wordpress-widget/sami/` con `sami-widget.html` (CSS, HTML y JS
embebidos, aislados bajo `#listaso-sami` con prefijo `lsm-`) para un widget HTML
de Elementor Pro en el WordPress actual. Incluye hero, ejemplos con chat, features,
pricing y FAQ; sin header, footer ni breadcrumb. Generado desde `/sami/` con
`build/build-widget.mjs`; no toca `src/`. Pendiente: prueba real en WordPress y
confirmar el enlace de los CTA. Ver `wordpress-widget/sami/README.md`.

### SAMI: escala del hero y puntos de fondo (Codex, `dev`, sin commit, 22 de octubre de 2026)

El título del hero de `/sami/` bajó de `clamp(2.75rem, 9vw, 8.5rem)` a
`clamp(2.5rem, 8.25vw, 7.5rem)`. El patrón de puntos usa opacidad 35% y
una máscara radial gradual hasta transparencia en el borde para integrarse
con el fondo. Alcance: `HeroDisplay.module.css`, exclusivo del hero SAMI.
Sin cambios de copy, estructura o movimiento. Validaciones: lint,
typecheck, build webpack y `git diff --check`.

### SAMI: espaciado de la marca en FAQ (Codex, `dev`, sin commit, 22 de octubre de 2026)

Se agrupó el texto de cada pregunta del FAQ en un solo elemento flex dentro
del botón. Antes, `SamiBrandText` devolvía texto y la marca como nodos
independientes que `justify-between` separaba por todo el ancho. El nuevo
contenedor mantiene el flujo natural de la frase y conserva Montserrat 800
italic para SAMI. Alcance: `SamiFaqAccordion.tsx`; sin cambios de copy o
comportamiento del acordeón. Validaciones: lint, typecheck, build webpack y
`git diff --check`.

### SAMI: secuencias de chat por pregunta (Codex, `dev`, sin commit, 22 de octubre de 2026)

Las seis preguntas de `/sami/` ahora muestran conversaciones distintas en
loop: pregunta, indicador de respuesta, resumen, tres datos que entran en
orden, solicitud de exportación y una tarjeta de muestra XLSX o PDF. Los
ejemplos de clientes inactivos, inventario, mejores clientes, ventas por
representante, facturas vencidas y backorders tienen datos y archivos
propios. Se identifican como datos ilustrativos y las tarjetas de archivo
aclaran que son vistas sin descarga. El panel reserva altura para evitar
saltos al aparecer el archivo. El loop se pausa fuera de pantalla, en
pestañas ocultas y al posar el cursor sobre el chat; con movimiento reducido
se muestra el estado final estático. La Homepage conserva su secuencia.
Reservas: `SamiConversation`, estilos del chat, datos de `/sami/` y contrato
de producto. Pendiente: revisión visual de Erick. Validaciones: lint,
typecheck, build webpack y `git diff --check`.

- Inventario de despliegue y operación (Codex, 20 de octubre de 2026): se
  amplió el Google Sheet nativo de recursos con cinco pestañas para Development:
  resumen de publicación, inventario DevOps de dominio/DNS/hosting/CI/SEO/
  observabilidad, comparación Cloudflare Pages vs. Vercel + Supabase vs.
  servidor propio, contexto técnico del repositorio y runbook ordenado de
  lanzamiento/rollback. La recomendación para la foundation actual es
  conservar el static export y publicar con Cloudflare Pages + GitHub; Supabase
  queda para un caso de datos/Auth/Storage/endpoints aprobado. No se cambió
  DNS, dominio, hosting ni producción. Entregable:
  https://docs.google.com/spreadsheets/d/1Sr86cTZOxr3Ggn423lbtqTxjInzPGV2mBdHcGq_BVIk/edit

### SAMI AI: aclaración de precios y mejoras de página (Codex, `dev`, sin commit, 22 de octubre de 2026)

Se actualizó `/sami/` con los términos de precios compartidos por Erick:
Starter $59, Professional $129 y Business $299 por equipo/mes; 14 días de
prueba; onboarding de $199/$499 (gratis hasta 31 dic 2026 o con pago anual);
SAMI usage incluido, conexión ChatGPT/Claude sin cargo extra, crédito SAMI
de $10 y cotización aparte para archivos múltiples/limpieza. Se conservaron
los límites, soporte e historial mostrados en la referencia. Homepage y FAQ
de `/plans/` se sincronizaron; contratos y DEC-025 registran la fuente.

La página `/sami/` también incorpora ejemplos interactivos, FAQ exclusivo con
rotación accesible, identidad tipográfica SAMI AI y copy revisado. Reservas:
contrato de producto/Homepage, DEC-025, datos de SAMI y componentes de SAMI;
sin cambios a `start-version/`, infraestructura ni ruta de activación. Riesgo
pendiente: el CTA de prueba todavía enlaza al Calendly de demo según DEC-020,
hasta que se confirme un destino de activación. Pruebas: `pnpm lint`,
`pnpm typecheck`, `pnpm exec next build --webpack` y `git diff --check`
pasaron. Navegador (dev): `/sami/` 1440 y 390 px; sin overflow, los precios,
CTA, trial y crédito aparecen, y la consola no registra errores (React
DevTools/HMR informativos). Montserrat no está autohospedada, así que SAMI AI
usa la fuente de respaldo si el sistema no tiene Montserrat.

### SAMI: marca, chat interactivo y tarjetas de precios (Codex, `dev`, sin commit, 22 de octubre de 2026)

Se normalizaron las referencias visibles a SAMI como nombre corto y a
"SAMI AI Assistant" en descripciones largas. `SamiBrandText` aplica Montserrat
800 italic sin márgenes ni padding laterales; se reutiliza en las superficies
que mencionan la marca. El chat de ejemplos usa el índice inicial 0 y muestra
pregunta/respuesta desde el primer render. El remount dejaba la tarjeta nueva
invisible porque `HomeMotion` sólo observa los nodos iniciales con
`data-reveal="media"`; el modo interactivo omite ese atributo y cruza el
ejemplo previo con el nuevo en 300 ms. La animación de la Homepage conserva el
modo anterior. Las tarjetas de precios reservan una fila uniforme para la
insignia, título, precio, límites y onboarding; el CTA queda al fondo. La
geometría a 1440 px confirmó alturas iguales (706 px) y filas/CTA alineados.

El CTA de los tres planes de SAMI dice exactamente "Start your 15-day free
trial" por instrucción posterior de Erick. La oferta y el hero conservan los
14 días de DEC-025; confirmar la duración comercial antes de publicar. Los CTA
siguen enlazando al Calendly de demo (DEC-020). Validaciones: `pnpm lint`,
`pnpm typecheck`, build webpack y `git diff --check` pasan. Navegador:
`/sami/` 1440 claro y 390 oscuro sin overflow; primer chat visible,
selección cambia respuesta/`aria-pressed`, botones con texto exacto, consola
sin errores; Homepage 390 sin overflow ni errores.

## Tarea activa

### SAMI: sección de contacto de ventas con Zoho Forms (Codex + subagentes, `dev`, en curso, 23 de octubre de 2026)

Alcance activo: crear una sección de contacto en `/sami/` con ruta cliente
actual → Alejandra (`alejandra@listaso.com`) y cliente nuevo → Enrique
(`ernesto.henriquez@listaso.com`); preservar el formulario de prueba gratuita.
Arquitectura static export: usar solo embed de Zoho aprobado; no crear API ni
backend. La sección está después de Pricing y antes de FAQ, con las dos
audiencias informativas y el iframe del formulario público compartido por Erick.
No simula envío ni éxito y no expone emails de representantes. La auditoría de
UI recomendó no solicitar una selección adicional antes de tener un control;
el copy se ajustó a informativo. Zoho está abierto en
Chrome con sesión de `jafeth.guardado@viasql.com`; por la regla de no usar
credenciales humanas compartidas no se modificó nada allí. El snippet público
del formulario ya llegó; faltan validación de copy legal, CRM y autorespuestas.

Actualización 23 de octubre: el código oficial compartido por Erick usa un
iframe con `zf_rszfm=1`, no el endpoint `/jsperma/` inferido previamente. La
sección utiliza la URL exacta `/formperma/` y maneja los mensajes de altura
únicamente del origen y ventana de ese iframe. La promoción es de 14 días en
el sitio por decisión actual de Erick; el título público de Zoho ya dice
“14-Day”, pero la descripción aún decía “15-day” en la lectura previa. La
casilla “I am currently a Listaso customer” sigue siendo opcional y hay un
campo obligatorio de fecha de demo. Al marcar la casilla aparece “# of Users
Needed”; no se envió ninguna respuesta. El servidor dev local no pudo abrir
el puerto 3000 por `EPERM` del sandbox. El preview estático sí abrió en
`127.0.0.1:4173`; el iframe montado recibió “refused to connect”, por lo que
su contenido sigue pendiente de revisión en un dominio permitido por Zoho.
La causa quedó confirmada en la respuesta pública de Zoho: HTTP 200 con
`Content-Security-Policy: frame-ancestors www.listaso.com` y
`X-Frame-Options: ALLOW-FROM www.listaso.com`. La página carga el iframe,
pero el navegador bloquea su contenido en localhost y previews de Pages.
Pendiente en Zoho: añadir los hosts concretos de preview y publicación a
`Allowed Domains`; después verificar los encabezados y el embed visible.

Revisión visual del formulario público (23 de octubre): Zoho ya muestra el
logo de Listaso, fondo oscuro degradado e inputs redondeados. El título dice
14 días, pero la descripción aún ofrece 15. Hay mucho espacio entre campos
y aparecen dos botones del mismo ancho (`Save` y `Send information`); el
primero proviene de Save & Resume. Recomendación de diseño para configurar en
`Themes > Customize Theme` de Zoho: formulario SAMI con fondo sólido
`#071B29`, contenedor `#092332`, inputs `#193848`, texto blanco, secundario
`#A4BDCB`, foco `#70D4FF`, borde `#7A8BA6` y CTA `#0960FF` con texto blanco;
Montserrat si está disponible. Usar layout Plain, ancho adaptable, scroll
externo y espacio entre campos de 24 px. El iframe impide que el CSS de la
página modifique los campos; el sitio sólo puede estilizar el marco exterior.
No se cambió el tema ni el contenido en Zoho.

Esfuerzo estimado: UI estática 4–7 h; configuración de Zoho 4–8 h; embed y
medición 2–4 h; QA de integración 2–4 h (dependientes del formulario y cuenta
administradora correcta). Archivos reservados para implementación: `src/app/(site)/sami/page.tsx`,
`src/components/sections/product/sami/SamiSalesContact.tsx`,
`src/components/sections/product/sami/SamiZohoEmbed.tsx` y
`src/content/products/sami.ts`. Responsable de esta edición: Codex; subagentes:
implementación UI (`gpt-6.1-sol`, esfuerzo alto), revisión independiente
(`gpt-6-astra`, esfuerzo alto), y auditorías de página y embed (solo lectura).
Lint, typecheck, export webpack y `git diff --check` pasan. Preview local visto
en escritorio/tema oscuro; faltan móvil, tema claro y recorrido real de teclado
con el formulario cargado.
Riesgo/next step: el snippet exacto reemplazó al script inferido y el formulario
se integró como iframe. Verificar en preview autorizado el tamaño del embed,
el texto visible y los dos ruteos. Revisar en Zoho la descripción pública,
que todavía mencionaba 15 días en la lectura previa, además de correos,
privacidad/CRM y la casilla opcional de cliente actual. No publicar como flujo
final hasta completar esas comprobaciones.

Últimas tareas cerradas:

- Printers and scanners: tabla de modelos con estilo y dispositivos
  interactivos (Claude, `dev`, sin commit, 22 de octubre de 2026; pendiente
  de revisión visual de Erick). A petición del usuario `ModelFinder` vuelve
  a ser una tabla de datos (sin tarjetas): filtro "Works with" con conteos,
  un `tbody` por marca con la marca en `rowspan` (inicial + nombre), píldoras
  de app con icono en posiciones fijas, filas atenuadas al filtrar y
  píldoras de la app elegida resaltadas, hover por grupo de marca; en móvil
  cabe sin scroll lateral (píldoras en línea, sin huecos). `SupportedDevices`
  usa el nuevo `DeviceSpecs` (cliente): selector Apple / Android (minimum)
  (ARIA tabs) junto a una ilustración de dispositivos que cambia (iPhone +
  iPad o teléfono) y requisitos como filas numeradas con filetes que entran
  en secuencia; sin cajas. Copy y datos sin cambios. Pruebas: lint,
  typecheck, build webpack y `git diff --check` pasan; navegador (dev)
  `/printers-and-scanners/` 1440 oscuro y 390 claro, sin overflow.
- Modelos compatibles como buscador (Claude, `dev`, sin commit, 22 de octubre
  de 2026; pendiente de revisión visual de Erick). `PrinterModels` (sólo
  `/printers-and-scanners/`) cambia la tabla por el nuevo `ModelFinder`
  (cliente): filtros "Works with" (Sales/Inventory/Delivery, `aria-pressed`,
  con el número de modelos), una tarjeta por marca en columnas equilibradas
  y, por modelo, una matriz de tres celdas con iconos (encendida si es
  compatible; "Works with: …" en `sr-only`). Al filtrar se atenúan los
  modelos y marcas que no aplican y brillan las celdas de la app elegida;
  leyenda de iconos debajo y la nota de iOS con icono. Móvil: una columna y
  barra de filtros en caja. Copy y datos sin cambios. Pruebas: lint,
  typecheck, build webpack y `git diff --check` pasan; navegador (dev) 1440
  oscuro (con y sin filtro) y 390 claro, sin overflow.
- Funciones de Sage 100 como pila de tarjetas (Claude, `dev`, sin commit, 22
  de octubre de 2026; pendiente de revisión visual de Erick). El riel
  horizontal (`FeatureRail`) parecía no funcionar con ratón (scroll lateral
  poco evidente) y se eliminó; lo sustituye `sage/FeatureStack`: cabecera
  fija a la izquierda y cada tarjeta (número, icono, título, texto y
  `FeatureArt`) se queda pegada 1.25rem más abajo que la anterior, de modo
  que se apilan con el scroll vertical (sólo CSS `sticky`). Móvil: lista
  simple. Copy sin cambios. Pruebas: lint, typecheck, build webpack y `git
  diff --check` pasan; navegador (dev) `/sage/` 1440 oscuro (tarjetas fijadas
  a 112/132/152/172 px) y 390 claro, sin overflow.
- Sync de Sage 100 como tablero de carriles horizontales (Claude, `dev`, sin
  commit, 22 de octubre de 2026; pendiente de revisión visual de Erick).
  `SyncLanes` (sólo `/sage/`) dejaba huecos porque las tres columnas tenían
  3, 1 y 2 filas. Ahora Sage 100 y Listaso son dos pilares y entre ellos hay
  un carril horizontal por dirección (etiqueta, conteo y las filas como
  chips sobre un riel punteado). Los chips se ubican del lado de donde
  vienen los datos (izquierda, centro o derecha) y un pulso recorre el riel
  en el sentido de los datos dos veces al revelarse y en bucle sólo durante
  el hover; el hover de un carril ilumina el pilar de origen y atenúa los
  demás. Móvil: pilares arriba y abajo, carriles apilados, sin riel. Copy
  sin cambios. Pruebas: lint, typecheck, build webpack y `git diff --check`
  pasan; navegador (dev) `/sage/` 1440 oscuro y 390 claro, sin overflow.
- Títulos con `TextRoll` ya no se recortan (Claude, `dev`, sin commit, 22 de
  octubre de 2026). `.roll` (effects.module.css, compartido por los 7 usos
  de `TextRoll`, p. ej. el título grande de `NextPage`) recortaba con
  `overflow: hidden` justo a la altura de línea, y en tipografía display
  (line-height 1.1) cortaba la parte baja de las letras ("Sage 100"). Ahora
  el recorte tiene `padding-block: 0.15em` compensado con `margin-block:
  -0.15em`: las letras caben y el layout no cambia; la copia del efecto
  sigue oculta en reposo. Pruebas: lint, typecheck, build webpack y `git
  diff --check` pasan; navegador (dev) `/quickbooks/` 1440 (reposo y hover)
  y `/accountmate/` 390 ("Printers and scanners" en dos líneas).
- FAQ de SAMI con apertura y cierre suaves (Claude, `dev`, sin commit, 22 de
  octubre de 2026). Nuevo `ui/SmoothDisclosures` (cliente): envuelve
  `<details>` nativos y anima la altura al abrir y cerrar (Web Animations
  API, 380 ms) con un fundido de la respuesta; durante el cierre marca
  `data-closing` para que el icono vuelva de "×" a "+" al instante. Sin JS o
  con movimiento reducido funcionan como antes. Aplicado sólo a `SamiFaq`.
  Pruebas: lint, typecheck, build webpack y `git diff --check` pasan;
  navegador (dev) `/sami/`: abrir y cerrar con clic real, estado final
  correcto (altura, `open`, icono, sin estilos residuales).
- Ejemplos de SAMI más pulidos (Claude, `dev`, sin commit, 22 de octubre de
  2026; pendiente de revisión visual de Erick). `SamiExamples` (sólo
  `/sami/`) con módulo CSS: atmósfera SAMI (brillos y retícula de puntos),
  halo detrás de la conversación (`SamiConversation` sin cambios, también
  la usa la Homepage) y las seis preguntas como tarjetas de prompt; con
  hover el borde se vuelve degradado SAMI, parpadea un cursor tras la
  pregunta y la chispa pasa a flecha de enviar (bucle sólo durante el
  hover). Texto más compacto en móvil. Copy sin cambios. Pruebas: lint,
  typecheck, build webpack y `git diff --check` pasan; navegador (dev)
  `/sami/` 1440 y 390, sin overflow.
- Explorador de funciones más calmado (Claude, `dev`, sin commit, 22 de
  octubre de 2026; pendiente de revisión visual de Erick). `FeatureExplorer`
  / `FeatureIndex` (compartido: Direct Sales y Delivery): la fila activa
  cambia sólo cuando una fila se asienta 220 ms en la franja central (antes,
  cada fila que cruzaba el centro disparaba un cambio animado, y al hacer
  scroll todo cambiaba muy rápido); franja de detección más estrecha; en
  desktop las filas son más altas (más scroll por función) y las inactivas
  bajan a 45 % de opacidad (vuelven al 100 % con hover); entrada del texto
  del spotlight más suave; el resaltado se vuelve a medir con
  `ResizeObserver` (carga de fuentes, cambios de tamaño). Móvil sin cambios
  de diseño. Copy sin cambios. Pruebas: lint, typecheck, build webpack y
  `git diff --check` pasan; navegador (dev) `/direct-sales/` y `/delivery/`
  1440 oscuro (fila activa y spotlight correctos y alineados).
- Ideas de Forms rediseñadas (Claude, `dev`, sin commit, 22 de octubre de
  2026; pendiente de revisión visual de Erick). `FormsIdeas` (sólo
  `/forms/`) usa el nuevo `IdeasShowcase` (cliente): la foto del estante es
  un escenario con una tarjeta de formulario clara y sin texto
  (`aria-hidden`) que muestra los campos de la idea elegida (fotos +
  contador, estrellas que se llenan + campos, checks + foto + firma que se
  dibuja); a la derecha la cabecera y las tres ideas como opciones
  (`aria-pressed`; hover, foco o clic), con su título y texto siempre
  visibles. Móvil: cabecera y opciones primero, luego el escenario. Copy sin
  cambios (`git diff -- src/content` vacío). Pruebas: lint, typecheck,
  build webpack y `git diff --check` pasan; navegador (dev) `/forms/` 1440
  oscuro (las tres ideas) y 390 claro, sin overflow.
- Sin botones de pausa en animaciones (Claude, `dev`, sin commit, 22 de
  octubre de 2026; pendiente de revisión de Erick; ampliación de DEC-022).
  Se retiraron los controles visibles de pausa/reproducción de
  `CustomerProof` (riel de logos), `CapabilityRail`, `TestimonialSpotlight`,
  `SamiConversation` (y el evento `listaso:sami-motion` que escuchaba
  `SamiLogoMark`) y `SnapCarousel`, con su estado y su CSS. Siguen las pausas
  automáticas (hover, foco, fuera de pantalla, pestaña oculta) y el estado
  estático con movimiento reducido. Riesgo WCAG 2.2.2 registrado en
  DEC-022. Pruebas: lint, typecheck, build webpack y `git diff --check`
  pasan; ningún HTML del export contiene "Pause/Play autoplay/animation";
  navegador (dev) Homepage 1440 sin controles y con el autoplay corriendo,
  sin errores de consola.
- Menús del header legibles y menú móvil a pantalla completa (Claude, `dev`,
  sin commit, 22 de octubre de 2026; pendiente de revisión visual de Erick).
  `SiteHeader`: los paneles desplegables (desktop) y el menú móvil pasan a
  superficie sólida (`surface-raised` / `surface-page`); antes eran
  translúcidos y, como el `backdrop-filter` del header no alcanza a un panel
  anidado, el contenido de la página se veía a través de los enlaces. Los
  enlaces del panel suman filete de acento y flecha al hover/foco. Móvil: la
  hoja ocupa exactamente el alto restante (`calc(100dvh - 4.5rem)`), la
  lista hace scroll dentro, "Log in" y "Book a Demo" quedan fijos abajo (con
  safe-area), los submenús llevan una guía lateral de acento y la página no
  hace scroll detrás (`html:has(details[data-mobile-menu][open])` en
  `src/styles/base.css`, sólo
  bajo `xl`). Mismas opciones y enlaces. Pruebas: lint, typecheck, build
  webpack y `git diff --check` pasan; navegador (dev) 1440 oscuro y claro
  con Products abierto, 390 oscuro y claro con el menú abierto (hoja de 72 a
  844 px, `html` sin scroll).
- Identidad propia para las 8 integraciones (Claude, `dev`, sin commit, 21 de
  octubre de 2026; pendiente de revisión visual de Erick; DEC-023).
  `SystemPage` pasa a enrutar por slug a `integrations/pages/*Layout.tsx`;
  los cierres (otros sistemas, Next, CTA) siguen compartidos. QuickBooks:
  `ProductHero` + panel y rating, certificado, órbita two-way con selector
  Desktop/Online (ARIA tabs; el detalle de Inventory se separa por edición
  con las mismas palabras) y `FeatureIndex` con foto. Sage: `HeroStatement`,
  tablero de tres carriles (`SyncLanes`), riel de funciones (`FeatureRail`),
  reseña. Acumatica: composición anterior (caso de estudio, ficha, bento,
  tabla). SAP: `HeroDossier` con `DossierBox` que lleva toda la sync, rejilla
  dossier 3×3 que se invierte + `DossierPhoto`. NetSuite: `HeroCentered`
  nuevo, puente de sync entre pilares (`SyncBridge`), funciones en pestañas
  (`FeatureTabs` + `FeatureArt`). Zoho: `HeroMosaic` nuevo, sync con filtro
  por dirección (`SyncFilter`, botones `aria-pressed`), mosaico de funciones.
  Acctivate: `HeroImmersive` nuevo, ruta de sync con camión ligado al scroll
  (`SyncRoute`), funciones en un teléfono (`PhoneFeatures`). AccountMate:
  `HeroMirror` nuevo con `Marquee` (tono `alt`; el tono `band` de `Marquee`
  pinta texto blanco sobre píldoras blancas en tema claro, no se usa en
  ningún otro lado y no se tocó), dial por dirección (`SyncDial`) y línea de
  tiempo de funciones. Helper `syncData.ts` (grupos y etiquetas de
  dirección). Ningún componente compartido se modificó; ninguna otra página
  cambia. Copy sin cambios (`git diff -- src/content` vacío); un script
  comprobó en el export que cada título, lead, fila de sync y función de los
  8 sistemas está en su página (los `summary` de QuickBooks y Zoho no se
  muestran, igual que antes, porque esas páginas usan su línea de plan).
  Pruebas: lint, typecheck, build webpack y `git diff --check` pasan;
  navegador (dev) las 8 páginas a 1440 oscuro y a 390 claro sin overflow
  horizontal; interacciones probadas (pestañas, filtro, teléfono, hover).
- Detalle de sincronización de integraciones + favicon (Claude, `dev`, sin
  commit, 21 de octubre de 2026; pendiente de revisión visual de Erick).
  `SyncTable` (las 8 integraciones) sigue siendo una tabla de datos real
  (DEC-008), ahora con columna lateral fija en desktop: cabecera y leyenda
  (sistema ⇄ Listaso y cuántas filas hay por dirección, decorativa). En la
  tabla, cada fila numerada separa el detalle entre paréntesis en una segunda
  línea (`splitSyncItem`, compartido con `SyncFacts`, mismas palabras) y la
  celda de dirección dibuja un carril decorativo (izquierda = sistema,
  derecha = Listaso, rotulados en la cabecera) cuyo pulso recorre el sentido
  de los datos dos veces al revelarse (escalonado) y en bucle sólo durante el
  hover; debajo sigue `Direction` como texto. En móvil caben ambas columnas
  sin scroll lateral. Favicon (QA-008): se copian sin modificar los assets
  oficiales de producción de `start-version/website/assets/`
  (`listaso-mark.svg` → `src/app/icon.svg`, `apple-touch-icon.png` →
  `src/app/apple-icon.png`); Next genera los `<link rel="icon">` y
  `apple-touch-icon` en todas las páginas del export. Copy sin cambios
  (`git diff -- src/content` vacío). Pruebas: lint, typecheck, build webpack
  y `git diff --check` pasan; navegador (dev) `/quickbooks/` y `/sage/` 1440
  oscuro, `/sage/` 390 claro, iconos 200.
- Ficha de sincronización de las páginas de integraciones (Claude, `dev`,
  sin commit, 21 de octubre de 2026; pendiente de revisión visual de Erick).
  Corrige una regresión mía: al rediseñar `SpecSheet` para Custom Development
  sólo revisé usos en `src/app`, pero `SystemPage` (las 8 integraciones) también
  lo usa; la tarjeta se montaba sobre el panel del hero y, sin intro, metía la
  lista en una columna estrecha. Ahora `SpecSheet` tiene `overlap` (por
  defecto `true`; `SystemPage` pasa `false`) y sólo usa la rejilla de dos
  columnas cuando hay intro. `SystemPage` pasa como intro `SyncSummary`
  (nuevo `integrations/SyncFacts`): enlace Listaso ⇄ sistema como en el panel
  del hero (decorativo; nombre en texto, sin logo de terceros), eyebrow del
  hero y `hero.plan`/`summary`. Cada dirección es una `SyncList`: filas con
  icono (flecha o sync), detalle entre paréntesis como segunda línea atenuada
  (mismas palabras) y dos columnas si hay más de 5; entran en secuencia al
  revelarse. Copy sin cambios (`git diff -- src/content` vacío). Pruebas:
  lint, typecheck, build webpack y `git diff --check` pasan; navegador (dev)
  `/quickbooks/` 1440 oscuro y 390 claro, `/sage/` 1440 y
  `/custom-development/` 1440, sin overflow.
- Página de planes más dinámica (Claude, `dev`, sin commit, 21 de octubre
  de 2026; pendiente de revisión visual de Erick). Misma estructura y copy
  (`git diff -- src/content` vacío). `PlanBoard`: Professional sobre la banda
  navy y elevado sobre el marco en desktop; cada plan muestra sus 5 apps
  (grupos de la tabla de comparación: encendidas si alguna fila es "y",
  tachadas y con "Not included" para lectores de pantalla si no) y un medidor
  decorativo de cobertura; con facturación anual el precio mensual aparece
  tachado y "2 months free" hace un pop; apps, medidor y beneficios entran en
  secuencia al revelarse; hover dibuja la barra de acento y llena los checks.
  Notas como tarjetas con icono decorativo. El add-on de SAMI usa
  `data-surface="sami"` y separa visualmente sus tres niveles (mismo texto;
  la frase completa sigue en `sr-only`). `CompareTable`: columna del plan
  destacado teñida, hover resalta fila y columna del plan, y cada grupo de
  app muestra un medidor por plan (cuota de filas incluidas) que se llena
  con scroll (`animation-timeline: view()`, completo sin soporte). `FaqList`
  (sólo `/plans/`): preguntas numeradas, apertura animada con
  `::details-content` donde existe, filete de acento y toggle relleno al
  abrir. Pruebas: lint, typecheck, build webpack y `git diff --check` pasan;
  navegador (dev) `/plans/` 1440 oscuro (mensual/anual, hover de tabla, FAQ)
  y 390 claro, sin overflow. Riesgo para Erick: los medidores y las apps por
  plan derivan de la tabla de comparación, que sigue pendiente de
  confirmación (`docs/COMPANY_PRICING_CONTENT_CONTRACT.md`).
- "What we build" de Custom Development reinventado (Claude, `dev`, sin
  commit, 21 de octubre de 2026; pendiente de revisión visual de Erick).
  `FeatureIndex` (compartido) gana un modo compacto para 4 funciones o menos
  (hoy sólo `/custom-development/`, 3): cabecera arriba y una fila de
  tarjetas con número, icono, título (`TextRoll`) y texto, cada una con una
  ilustración sin texto de `FeatureArt` (nuevo, `variants/`) elegida por el
  icono: report = tres fuentes (pedidos, almacén, reparto) que alimentan un
  gráfico de barras; sync = hub conectado a cuatro sistemas; new = flujo de
  tres pasos con interruptor que se enciende; resto = icono en anillos. Las
  piezas se arman una vez al revelarse (`data-revealed`, sólo CSS) y se
  elevan con hover; estado final con reduced motion o sin JS. Delivery (6) y
  Direct Sales (9) mantienen el explorador sin cambios. Copy sin cambios
  (`git diff -- src/content` vacío). Pruebas: lint, typecheck, build webpack
  y `git diff --check` pasan; navegador (dev) `/custom-development/` 1440
  oscuro y 390 claro, sin overflow.
- Hero de Custom Development reordenado (Claude, `dev`, sin commit, 21 de
  octubre de 2026; pendiente de revisión visual de Erick). `HeroCaseStudy` y
  `SpecSheet` (sólo usados en `/custom-development/`) se rediseñan en su
  sitio con módulos CSS: eyebrow + título a la izquierda, lead y CTAs a la
  derecha tras un filete vertical, retícula tenue con tokens de borde, foto
  con sombreado navy. `SpecSheet` pasa a tarjeta elevada que solapa la parte
  inferior de la foto: intro (`process.lead` con icono de teléfono), "What we
  build" como lista con los iconos de `features.items`, y "How it works"
  como stepper real (`<ol>`, títulos + textos de `process.steps`) cuya línea
  se dibuja y cuyos marcadores se llenan en secuencia al revelarse (sólo CSS
  vía `data-revealed`; estado final con reduced motion o sin JS). Se retira
  el panel decorativo `PlanProgressPanel` sobre la foto (sustituido por
  `ProcessIntro`, `BuildList` y `ProcessSteps` en `CustomDevSections`). Nueva
  prop opcional `wide` en `SpecItem`. Copy sin cambios (`git diff --
  src/content` vacío). Pruebas: lint, typecheck, build webpack y `git diff
  --check` pasan; navegador (dev) `/custom-development/` 1440 oscuro y 390
  claro, sin overflow.
- Características de B2B e-Commerce + foto fusionadas (Claude, `dev`, sin
  commit, 21 de octubre de 2026; pendiente de revisión visual de Erick).
  `StoreFeatures` (sólo `/b2b-ecommerce/`) gana módulo CSS y un componente
  cliente nuevo, `StoreShowcase`: la foto `storeCounter` (antes un
  `ImageBand` suelto bajo la sección, ahora retirado de la página) en un
  panel navy (`data-surface="band"`, ambos temas) junto a las 3 destacadas
  (`spotlightTitles`) como acordeón editorial accesible (`h3` + botón con
  `aria-expanded`, flechas/Home/End, contador 0X/03). La línea superior del
  ítem activo es su barra de progreso de 6 s; avanza solo y se pausa con
  hover, foco, fuera de pantalla o pestaña oculta; sin autoplay con reduced
  motion. La foto hace un paneo suave por característica y lleva un mock
  claro decorativo (`aria-hidden`) que cambia con la activa, usando sólo
  datos de `storefrontExample` y del pedido de ejemplo de la Homepage:
  precios del cliente, "Repeat last order" con cantidades y carrito $230.27,
  y tarjeta + total $230.27 con barra que se paga en parte y luego completa.
  Las otras 6 quedan debajo como rejilla de especificaciones con divisores
  finos, índice 04–09 e hilo de acento al hover (3/2/1 columnas).
  `ImageBand` sigue en uso en Custom Development, Forms y Pre-sales. Copy sin
  cambios (`git diff -- src/content` vacío). Pruebas: lint, typecheck, build
  webpack y `git diff --check` pasan; navegador (dev) `/b2b-ecommerce/` 1440
  oscuro y 390 claro, autoplay verificado, sin overflow.
- Hero de B2B e-Commerce animado (Claude, `dev`, sin commit, 21 de octubre
  de 2026; pendiente de revisión visual de Erick). `StorefrontExample`
  (sólo `/b2b-ecommerce/`) pasa a componente cliente + módulo CSS: al entrar
  en pantalla, una vez, "Repeat last order" se activa, cada producto recibe
  su cantidad y subtotal en secuencia, el carrito cuenta hasta $230.27 y un
  teléfono muestra "Order placed online · Mercado La Esperanza". Cantidades y
  subtotales salen del mismo pedido de ejemplo de la Homepage
  (`hero.example.order.lines`; la suma da exactamente $230.27); no se tocó
  `src/content` (`git diff` vacío). Clic en "Repeat last order" la repite
  (sólo puntero; la composición sigue siendo un `role="img"`). Reduced
  motion / sin JS: estado final. El teléfono sustituye al `GlassPanel`; en
  desktop queda en el hueco junto al navegador y en móvil bajo él.
  `ProductHero` (compartido con Inventory) suma la retícula de 72 px
  (`backdrops.heroGrid`), como los demás heros. Pruebas: lint, typecheck,
  build webpack y `git diff --check` pasan; navegador (dev) `/b2b-ecommerce/`
  1440 y 390 px, `/inventory/` 1440, sin overflow.

- Back Office "Better decisions" rehecho (Claude, `dev`, sin commit, 21 de
  octubre de 2026; pendiente de revisión visual de Erick). Sólo lo usa
  `/back-office/`. Copy, CTA "Meet SAMI AI" (`sami_cta_click`) y datos de
  ejemplo sin cambios (`git diff` de `src/content` vacío); sólo se reutilizan
  `dashboardExample` (ya usado en el hero) y `pipelineExample`. Nuevo
  `BackOfficeConsole.tsx` (cliente) + `BetterDecisions.module.css`: ventana
  ilustrativa del Back Office (UI clara en ambos temas) con barra lateral de
  iconos, "Sales dashboard · This week" con barras por día y el flujo de
  pedidos hasta el camión. Al entrar en pantalla, una vez: crecen las
  barras, las tarjetas caen en su columna en secuencia, un pulso recorre las
  flechas y el camión se ilumina. Hover en un check resalta la zona que
  describe (ventas → gráfico, pedidos → flujo, stock → icono inventario,
  facturas → icono facturas; mapeo de presentación en `BetterDecisions.tsx`).
  Reduced motion: estado final. Pruebas: lint, typecheck, build webpack y
  `git diff --check` pasan; navegador (dev) 1440 oscuro (secuencia y hover) y
  390 claro sin overflow.

- Delivery "Why it matters" rehecho (Claude, `dev`, sin commit, 21 de
  octubre de 2026; pendiente de revisión visual de Erick). Sólo lo usa
  `/delivery/`; ya no usa `ColorBand` (que sigue en `DriversSection` de
  Direct sales, sin cambios). Copy, foto y ruta de ejemplo sin cambios
  (`git diff` de `src/content` vacío). Nuevo `RouteStory.tsx` (cliente) +
  `WhyItMatters.module.css`: banda de marca con retícula; header y
  beneficios a la izquierda; foto del conductor en un marco con la tarjeta
  "Today's route" anclada sobre su esquina. Al entrar en pantalla, una vez:
  un camión recorre la línea, cada parada se marca al llegar, la línea se
  llena hasta "Next stop" y el beneficio que ilustra cada parada se
  enciende (firmado → prueba de entrega, devolución → devoluciones, pagado
  → pagos, siguiente parada → rutas; mapeo de presentación en
  `WhyItMatters.tsx`). Hover en un beneficio resalta su parada. Reduced
  motion: estado final. Bug corregido: el observador estaba en un wrapper
  `display: contents` (sin caja) y la ruta no arrancaba en desktop.
  Pruebas: lint, typecheck, build webpack y `git diff --check` pasan;
  navegador (dev) 1440 oscuro (secuencia y hover) y 390 claro sin overflow.

- Delivery: funciones + foto fusionadas (Claude, `dev`, sin commit, 21 de
  octubre de 2026; pendiente de revisión visual de Erick). `FeatureIndex`
  acepta un `photo` opcional (sólo lo pasa `/delivery/`; Direct sales y
  Custom development no cambian): la foto aérea de autopista
  (`sectionMedia.highwayAerial`, ya autohospedada) llena la tarjeta destacada
  (más alta, degradado navy sólido abajo) y se desplaza horizontalmente con
  el mismo progreso de scroll de la lista; la tira de iconos y el texto van
  en la franja oscura inferior. En móvil la foto queda como encabezado
  visual antes de la lista. Se quitó de `/delivery/` el `ImageBand` suelto
  que quedaba fuera de lugar tras la lista. Copy sin cambios (`git diff` de
  `src/content` vacío). Pruebas: lint, typecheck, build webpack y
  `git diff --check` pasan; navegador (dev) `/delivery/` 1440 oscuro
  (desplazamiento verificado) y 390 px sin overflow.

- `FeatureIndex` convertido en explorador en el mismo componente (Claude,
  `dev`, sin commit, 20 de octubre de 2026; pendiente de revisión visual de
  Erick). Aplica a Direct sales, Delivery y Custom development; copy sin
  cambios (`git diff` de `src/content` vacío). `FeatureExplorer.tsx` (nuevo,
  cliente): en desktop, columna sticky con el header y una tarjeta navy de
  la función activa (icono, número 0X / 0N, título, texto, barra de
  progreso; `aria-hidden`, la lista es el contenido accesible). La función
  activa sigue a la fila que cruza el centro del viewport (scroll-spy con
  IntersectionObserver) o a la fila bajo el mouse. Segunda iteración (el
  usuario lo veía simple): un solo resaltado que se desliza entre filas;
  en la tarjeta, tira de iconos que desliza el activo al centro (anillo),
  número tipo odómetro, entrada del texto según la dirección (abajo al
  avanzar, arriba al retroceder) y barra de progreso ligada al scroll de
  forma continua. Móvil: sin tarjeta, con el resaltado deslizante. Nuevo `FeatureIndex.module.css`; `LinkIndex` no
  cambia. Pruebas: lint, typecheck, build webpack y `git diff --check`
  pasan; navegador (dev) `/direct-sales/` 1440 oscuro (scroll y hover) y
  390 px, `/custom-development/` 1440 claro, sin overflow ni errores.

- `Marquee` convertido en marquesina continua en el mismo componente (Claude,
  `dev`, sin commit, 20 de octubre de 2026; pendiente de revisión de Erick).
  Antes sólo se desplazaba con el scroll y parecía un carrusel roto. Ahora:
  dos mitades idénticas por fila a -50% (ciclo sin salto), segunda fila en
  sentido contrario, relleno `aria-hidden` para que no haya huecos en
  pantallas muy anchas, duración proporcional para mantener la velocidad,
  bordes desvanecidos y lista estática con reduced motion. Por instrucción
  posterior del usuario se quitaron el botón "Pause autoplay" y la pausa por
  hover/foco (siempre se mueve; riesgo WCAG 2.2.2 registrado en DEC-022) y
  las filas se limitan a 100rem centradas, lo que corrige el final de fila
  visible al alejar el zoom (verificado a 4000 px de ancho). Pastillas con
  icono (Direct sales y B2B e-Commerce pasan ahora `icon` de sus features;
  copy sin cambios) y variante `display` con la segunda fila en contorno.
  CSS dentro de `@layer components` para que las utilidades del llamador
  (p. ej. `pb-0` en Forms) sigan aplicando. Bug corregido en el camino: el
  modificador `pill` chocaba con la clase de la pastilla y desbordaba la
  página. Pruebas: lint, typecheck, build webpack y `git diff --check`
  pasan; navegador (dev) `/direct-sales/` y `/integrations/` 1440 oscuro,
  `/forms/` 390 claro sin overflow.

- `HeroStatement` rediseñado en el mismo componente (Claude, `dev`, sin
  commit, 20 de octubre de 2026; pendiente de revisión visual de Erick).
  Aplica a Direct sales, Back Office, Forms, Integrations y Printers &
  scanners; cada página conserva copy, foto, panel de ejemplo, migas, CTAs y
  eventos (`git diff` de `src/content` vacío). Tras revisión del usuario
  (foto pixelada a sangre y panel "huérfano") queda como hero dividido en
  banda oscura (ambos temas): copy a la izquierda con retícula de 72 px y
  brillos, foto en un marco grande redondeado a la derecha (proporción 6:5,
  cercana a las fotos 3:2, y `sizes` 64vw para que cargue la versión de
  1280 px y se vea nítida; sin zoom) y el panel de ejemplo anclado sobre la
  esquina inferior izquierda del marco. Móvil: copy, luego el marco con el
  panel montado sobre su parte baja. `/integrations/`: se quitó el
  `PixelDivider` page→band que quedaba entre el hero (ahora banda) y la
  sección de sync. Nuevo `HeroStatement.module.css`; ya no usa
  `effects.expand` ni `backdrops.photoScrim`. Pruebas: lint, typecheck, build webpack y
  `git diff --check` pasan; navegador (dev) `/direct-sales/` 1440 y 390 px,
  `/integrations/`, `/printers-and-scanners/` y `/back-office/` sin overflow.

- `NextPage` rediseñado en el mismo componente (Claude, `dev`, sin commit, 20
  de octubre de 2026; pendiente de revisión visual de Erick). Aplica a las
  páginas de Products, Integrations (incluye `SystemPage`) y Company; labels
  y descripciones siguen saliendo de la navegación, `next_page_click`
  intacto (`git diff` de `src/content` vacío). Ahora es una tarjeta completa
  con grupo + posición, un índice del grupo y el enlace principal (título
  con `TextRoll` + flecha). Tras dos revisiones del usuario (las barras
  parecían pasos sin función y luego resultaban poco visibles) el índice es
  un stepper: cada página del grupo como punto numerado + nombre siempre
  visible, unidos por una línea (visitadas, actual con anillo y
  `aria-current="page"`, siguiente en aqua); cada paso es un enlace y al
  hover/foco su punto se rellena y crece. En pantallas angostas la fila se
  desliza y `NextPageSteps.tsx` (nuevo, cliente mínimo) la abre con el paso
  actual a la vista, sin mover la página. El enlace principal, separado (no
  se anidan enlaces), conserva `next_page_click`; su hover/foco hace el
  barrido de tinte, resalta el paso siguiente y activa la flecha. Los
  enlaces del índice no llevan evento de analytics nuevo. Nuevo `NextPage.module.css`. Ajuste
  compartido: `TextRoll` (`effects.module.css`) desplaza 125% en lugar de
  105% para que no asomen descendentes (g, y, p) durante el giro; aplica a
  sus 6 usos. Pruebas: lint, typecheck, build webpack y `git diff --check`
  pasan; navegador (dev) `/pre-sales/` 1280 oscuro con hover y
  `/contact-us/` 390 claro (caso de vuelta al inicio) sin overflow.

- `IntegrationsBand` rediseñado en el mismo componente (Claude, `dev`, sin
  commit, 20 de octubre de 2026; pendiente de revisión visual de Erick).
  Aplica a las 7 páginas de producto que lo usan y a las 8 de integración
  (`SystemPage`, que pasa su propio copy/CTA y excluye el sistema actual);
  copy, CTA y destinos sin cambios (`git diff` de `src/content` vacío). Desde
  768 px: diagrama hub con el símbolo oficial de Listaso (activo
  `listaso-symbol-multicolor`, sin alterar) al centro y los sistemas en una
  elipse, unidos por líneas punteadas con anillos guía; las líneas se dibujan
  una vez al revelar y, al hover/foco de un sistema, su línea se ilumina, un
  pulso viaja de Listaso al sistema mientras dura la interacción y el núcleo
  amplía su halo (sin bucles en reposo). Bajo 768 px: cuadrícula de 2
  columnas de pastillas (impar: la última ocupa la fila). Botón CTA con
  flecha. Nuevo `IntegrationsBand.module.css`. Pruebas: lint, typecheck,
  build webpack y `git diff --check` pasan; navegador (dev) `/pre-sales/`
  1280 oscuro con hover, `/quickbooks/` 1280 claro, 768 y 390 px sin
  overflow; sin errores de hidratación.

- `LinkCard` rediseñada en el mismo componente (Claude, `dev`, sin commit, 20
  de octubre de 2026; pendiente de revisión visual de Erick). Es la tarjeta
  de "Works together" (`RelatedRail`/`ScrollRail` y `RelatedProducts`, 9
  páginas de producto) y del hub de Integraciones (`AlsoSection`); cada lugar
  conserva copy, enlaces y eventos (`git diff` de `src/content` vacío;
  `product_card_click` intacto). Tras revisión del usuario (recorte al hover
  y aspecto "hecho con IA") se dejó una versión sobria: banda plana
  `surface-soft` con el icono, título, texto y "Learn More"; hover/foco sólo
  cambian borde, tinte de la banda y color del título, y desplazan icono y
  flecha. Sin elevación, luz de cursor, marca de agua ni tonos rotativos; se
  retiró `ProofGrid` de esas listas. Bug corregido: `ScrollRail` recortaba la
  tarjeta elevada (scroller con `overflow-x`); ahora tiene `pt-2` y la
  tarjeta no se mueve. Nuevo `LinkCard.module.css`; ya no usa `Card`.
  Pruebas: lint, typecheck, build webpack y `git diff --check` pasan;
  navegador (dev) `/pre-sales/` oscuro/claro con hover sin recorte.

- `BentoFeatures` reimaginado en el mismo componente (Claude, `dev`, sin
  commit, 20 de octubre de 2026; pendiente de revisión visual de Erick). Tras
  la revisión del usuario se descartó el índice editorial y se volvió a la
  idea original de bento (mismas disposiciones por cantidad y celdas con
  foto), reimaginada: cada celda con tono propio (`proofTones`), inclinación
  3D sutil hacia el puntero, luz y brillo de borde que siguen al cursor,
  marca de agua grande del icono con paralaje y, en las fotos, zoom y
  paralaje. `ProofGrid` se generalizó (`cardSelector`, `--px/--py`) y lo
  comparten las cifras de Home y este bento. Aplica a Pre-sales, Inventory,
  Back Office, Printers & scanners, SAMI y las 8 integraciones; cada página
  conserva su copy y fotos (`git diff` de `src/content` vacío). Móvil: celdas
  compactas. Corregido: `preserve-3d` ocultaba las fotos detrás del fondo.
  Pruebas: lint, typecheck, build webpack y `git diff --check` pasan;
  navegador (dev) `/pre-sales/` 1280 claro/oscuro y 390 px, `/sami/` sin
  overflow; hover verificado.

- Consola de Support refinada (Claude, `dev`, sin commit, 20 de octubre de
  2026; pendiente de revisión visual de Erick). Pestañas en dos líneas (nivel
  sobre su tiempo + índice 01–05), así "Questions and requests" ya no se
  parte dentro de la altura fija; el tiempo activo queda en color de texto
  (AA) y el tono sólo en punto/medidor. El último nivel pasa del gris a
  `status-success` (verde de marca). Medidor tipo reloj: bisel de 37 marcas,
  arco más fino con halo difuminado estático, aguja + punto que giran hasta el
  tiempo actual (transform, 800 ms) y marcador de inicio para el rango
  24–48 h. Copy sin cambios (`git diff` de `src/content` vacío). Pruebas:
  lint, typecheck, build webpack y `git diff --check` pasan; navegador (dev)
  1280 claro/oscuro y 390 px sin overflow, sin errores de hidratación.

- Cifras de About unificadas con la Homepage (Claude, `dev`, sin commit, 20
  de octubre de 2026; a pedido del usuario). `/about/` usa ahora el mismo
  `ProofStrip` que la Homepage (mismos datos `proof`, DEC-013), así cualquier
  cambio futuro aplica en ambas. Se eliminaron `MetricOdometer.tsx`,
  `MetricOdometer.module.css` y `ProofCards.module.css`, sin otros usos.
  Actualizados `SECTION_VARIANTS.md` y `COMPANY_PRICING_CONTENT_CONTRACT.md`.
  Se mantiene la regla "sólo Homepage y About us". Pruebas: lint, typecheck,
  build webpack y `git diff --check` pasan; `/about/` a 1280 px oscuro y
  390 px claro sin overflow; `git diff` de `src/content` vacío.

- Banda final de demo (`FinalCta`) refinada en el mismo componente (Claude,
  `dev`, sin commit, 20 de octubre de 2026; pendiente de revisión visual de
  Erick). Aplica a las 18 páginas que la usan. Copy, enlaces y atributos de
  analytics sin cambios (`cta_demo_click`/`final`, `contact_click`
  phone/email; `git diff` de `src/content` vacío). Se añade
  `FinalCta.module.css`: retícula de 72 px sobre el `brandMesh`, acento
  aqua→magenta, título display, y la caja de vidrio claro pasa a una tarjeta
  oscura sólida (mantiene AA sobre el hotspot aqua) con botón principal con
  flecha y filas de teléfono/correo con icono. Ya no usa `GlassPanel` (sigue
  en uso en HomeHero, SamiConversation y `/foundation/`). Pruebas: lint,
  typecheck, build webpack y `git diff --check` pasan; navegador (dev) Home y
  `/delivery/` a 1280 px y 390 px sin overflow.

- Testimonios y logos de la Homepage rehechos (Claude, `dev`, sin commit, 20
  de octubre de 2026; pendiente de revisión visual de Erick). Copy, reseñas,
  autores, fuentes, logos, alts y enlaces sin cambios (`git diff` de
  `src/content` y `public` vacío; las seis reseñas siguen en `out/index.html`).
  `TestimonialSpotlight.tsx` (nuevo Client Component): reseña destacada en un
  escenario navy `band` en ambos temas (retícula de 72 px, brillos aqua/
  magenta, comilla decorativa, contador 01/06, avatar con iniciales
  decorativas) + selector de reseñas como pestañas ARIA (flechas, Home/End,
  clic, foco). Las seis reseñas se apilan en una sola celda (altura estable,
  sin saltos) y las inactivas quedan `visibility: hidden`. Autoplay de 8 s
  guiado por un anillo de progreso cónico en el avatar activo (`@property`),
  con pausa por hover/foco/botón/fuera de pantalla/pestaña oculta; sin
  autoplay con reduced motion. Móvil: selector como fila deslizable de chips
  que se desplaza sola al activo (sin mover la página). Logos (ajuste tras
  revisión del usuario: el panel blanco ancho se veía fuera de lugar): riel
  sobre el fondo de la sección con la etiqueta visible "Customer logos" (copy
  existente, antes sólo `aria-label`) y cada logo en su propia placa clara
  uniforme, desvanecida hacia el fondo en los bordes. Por instrucción del
  usuario es un carrusel infinito continuo (DEC-022, excepción a DEC-016):
  dos mitades idénticas a -50% (ciclo sin salto, 38 s), pausa con hover, foco
  o el checkbox nativo "Pause autoplay"; estático en cuadrícula 2/4 columnas
  con reduced motion. La variante `reviews` de `SnapCarousel` queda sin uso en Home.
  Pruebas: lint, typecheck, build webpack y `git diff --check` pasan;
  navegador (dev) 1280 claro/oscuro y 390 px sin overflow (se corrigió un
  desborde de la columna en móvil), cita más larga verificada, consola sin
  errores. Omitido: reduced motion/forced colors emulados y lector de
  pantalla.

- Support de la Homepage reordenado (Claude, `dev`, sin commit, 20 de
  octubre de 2026; pendiente de revisión visual de Erick). Copy sin cambios.
  El carrusel de niveles (mostraba 1 de 5) se reemplaza por una consola de
  triage (`SupportTriage.tsx`, nuevo Client Component): pestañas ARIA con los
  cinco niveles y su primer tiempo de respuesta siempre visibles (flechas,
  Home/End, clic, foco y hover con mouse), indicador que se desliza bajo la
  pestaña activa y panel con un medidor radial tipo cronómetro: arco de 270°
  en escala logarítmica 10 min–48 h derivado sólo de los tiempos publicados
  (el rango 24–48 h se resalta), marcas por nivel, lectura central del tiempo
  y detalle del nivel; "Typically resolved in X" se separa como chip cuando el
  copy lo publica. El tono de severidad (action, warning, link, accent,
  muted) guía arco, brillo e indicador. Coordenadas redondeadas para evitar
  hydration mismatch. Lectura: header → consola (8 col) → columna lateral
  (4 col) con calificaciones 4.7/5.0 + reseña en una tarjeta, horarios con
  iconos y CTA. La variante `support` de `SnapCarousel` queda sin uso.
  Pruebas: lint, typecheck, build webpack y `git diff --check` pasan;
  navegador (dev) 1280 claro/oscuro y 390 px sin overflow, consola sin
  errores. Omitido: reduced motion/forced colors emulados y lector de
  pantalla.

- Capabilities de la Homepage rehechas con fotos (Claude, `dev`, sin commit,
  20 de octubre de 2026; pendiente de revisión visual de Erick). Causa del
  aspecto "bugueado": `<details>` ocultaba/mostraba el copy de golpe mientras
  `flex-grow` animaba, y el texto se re-acomodaba durante el cambio de ancho;
  además el autoplay no mostraba progreso. Ahora `HomeCapabilities` renderiza
  tarjetas con foto (Unsplash ya autohospedadas, DEC-009: `storeCounter`,
  `tabletWarehouse`, `accountingDesk`, `industryWine`; decorativas) y scrim
  oscuro con roles `band` en ambos temas. Desktop (≥1024 px): fila expansible
  donde el copy abierto tiene ancho fijo calculado de la fila (container
  units), así no re-envuelve; crossfade escalonado (sale rápido, entra tras el
  resize), etiqueta vertical en las cerradas y zoom suave de la foto.
  `CapabilityRail.tsx` (nuevo, reemplaza `CapabilityDisclosures.tsx`): abre
  por movimiento real del mouse con bloqueo de 650 ms mientras la fila cambia
  (evita parpadeo), por foco o clic; autoplay de 6.5 s guiado por la
  animación de la barra de progreso (pausa en hover/foco/botón/fuera de
  pantalla/pestaña oculta y reanuda donde quedó); controles = 4 segmentos con
  título + botón pausa/play. Móvil/tablet: fila deslizable con scroll snap y
  todo el copy visible, sin autoplay. Copy y destinos sin cambio. El reveal se
  movió a un wrapper porque las reglas de `motion.css` reemplazaban la
  transición de `flex-grow`. Pruebas: lint, typecheck, build webpack y
  `git diff --check` pasan; navegador (dev) 1280 claro/oscuro, 1024 y 390 px
  sin overflow, hover, foco con teclado, autoplay y pausa verificados,
  consola sin errores. Omitido: reduced motion/forced colors emulados,
  lector de pantalla y tap en hardware.

- Cifras de la Homepage como bento interactivo (Claude, `dev`, sin commit, 20
  de octubre de 2026; pendiente de revisión visual de Erick). `ProofStrip` deja
  la fila enmarcada/carrusel y pasa a un bento de cinco tarjetas (3 + 2 en
  desktop, la última destacada; 2 columnas desde 640 px; una columna compacta
  en móvil). Cada cifra conserva su copy y su contador, y suma un micro-visual
  decorativo `aria-hidden` sin datos propios: regla de años 2015→año actual,
  campo de nodos, avatares de roles (rep/driver/oficina), columnas y curva
  ascendente. Los visuales se dibujan una vez al revelar (HomeMotion,
  `data-reveal="group"`) y, sólo con mouse, reaccionan al hover junto con
  elevación, spotlight y brillo de borde que siguen al puntero
  (`ProofGrid.tsx`, nuevo Client Component) y repetición del conteo
  (`ProofCounter`, `data-counter-host`). Prefijos/sufijos de las cifras toman
  el tono de la tarjeta. "Listaso in numbers" pasa de `aria-label` a H2
  visible tipo eyebrow. Sin bucles, sin dependencias; estado final con reduced
  motion, `forced-colors` y reduced transparency. (La divergencia con About se
  resolvió después: About usa este mismo `ProofStrip`.) La variante `stats` de `SnapCarousel` queda sin uso. Pruebas:
  `pnpm lint`, `pnpm typecheck`, `pnpm exec next build --webpack` y
  `git diff --check` pasan; navegador (dev) en 1280 px claro/oscuro, 800, 390
  y 320 px sin overflow horizontal, hover verificado (conteo repetido,
  avatares, borde), consola sin errores. Omitido: emulación de reduced
  motion/forced colors (verificado por lectura), lector de pantalla y tap en
  hardware.

- Inventario de recursos gráficos para Marketing (Codex, 19 de octubre de
  2026): Google Sheet nativo con 144 filas de recursos para las 28 páginas
  comerciales implementadas, la muestra interna `/foundation/`, rutas públicas
  aún en WordPress/no implementadas, los 56 artículos individuales, 5
  categorías y el autor. Incluye estado de página/recurso, descripción,
  clasificación IMAGEN/VIDEO/GIF/Motion Graphic/Asset UI, brief y fuente por
  fila; las propuestas inferidas de títulos de artículos quedan marcadas para
  validar con el contenido y medios actuales antes de producción. Se añadieron
  filtro de tabla y pestaña de criterios. Verificación de valores y pestañas
  mediante Google Sheets, 144 filas sin huecos y revisión visual en navegador.
  Entregable: https://docs.google.com/spreadsheets/d/1Sr86cTZOxr3Ggn423lbtqTxjInzPGV2mBdHcGq_BVIk/edit

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

- 2026-10-23 (Claude): nuevo logo de SAMI IA entregado por Erick en chat
  (espiral de tres cintas con destellos, fondo transparente). Reemplaza
  `public/brand/sami/sami-logo.webp` (384 px, 36 KB) y `sami.svg`; todos los
  usos en Home, /sami, Pricing y el widget WordPress lo toman de esos archivos.
  Registro en `src/content/brand/assets.ts` actualizado. Falta versión vectorial.
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

## Formulario nativo de prueba gratuita de SAMI (Claude, 2026-10-23, `dev`, sin commit)

- Reemplaza el iframe de Zoho por `SamiTrialForm.tsx` (componentes FormField, Button, StatusMessage), integrado en `SamiSalesContact.tsx`. Se eliminaron `SamiZohoEmbed.tsx` e `isZohoFormUrl.ts`.
- Envía por `fetch` `no-cors` a `htmlRecords/submit` con los nombres de campo del HTML de Zoho (`Name1_First`, `Email1`, `DateTime_*`, `Radio`, `TermsConditions`...). La respuesta es opaca: la validación se replica en el cliente.
- Verificado: typecheck, lint, validación de 7 campos obligatorios, 375 px sin scroll horizontal. NO se probó un envío real para no crear un lead.
- Pendientes de Erick: (1) confirmar que el `formperma` del zip (`_Q0lNE5g…`) es el vigente (el iframe usaba `Am_TolIi2…`; se conserva como enlace de respaldo); (2) enviar una prueba real y confirmar el registro en Zoho; (3) decidir 14 o 15 días (el copy de Zoho mezcla ambos); (4) definir si se quiere página de gracias (`zf_redirect_url`).

- Actualización (2026-10-23): el POST nativo a `htmlRecords/submit` fue rechazado por Zoho (redirect a `/showerror`) con los dos `formperma`, tanto con curl como desde el navegador; no se crearon registros. Se restauró el iframe (`SamiZohoEmbed.tsx`, `src/lib/zoho/isZohoFormUrl.ts`) con la URL original y se dejó sin uso `SamiTrialForm.tsx` y `src/app/sami-trial-received/` (página noindex que confirma la aceptación de Zoho). Pendiente de Erick: ajustar colores/fuentes en el Theme de Zoho Forms; si se quiere retomar el formulario nativo, revisar en Zoho por qué rechaza `htmlRecords` (¿endpoint habilitado?, ¿validación de teléfono o fecha/hora?). Las reglas de correo por `DecisionBox` solo se pueden probar con el iframe.

## Lockup del hero de SAMI (Claude, 2026-10-26, `dev`, sin commit)

- `/sami`: el lockup queda con el logo a la izquierda y, a su lado, MEET / SAMI /
  “Your Listaso AI Assistant” alineados a la izquierda (`SamiHero.tsx`,
  `SamiHero.module.css`).
- `SamiLogoMark.tsx` marca `data-intro="pending|complete"`; el texto aparece
  (fade + desplazamiento) cuando termina el video de entrada del logo, con
  respaldo a los 6 s y sin animación con `prefers-reduced-motion`. Reemplaza el
  `data-intro-state` que Codex dejó sin conectar.
- Verificado en el navegador (desktop); falta revisar móvil real.

- Ajuste de Codex (2026-10-27, `dev`, sin commit): subtítulo en la columna de
  “SAMI”, alineado con el inicio de la palabra y separado 4 px; margen negativo
  del logo eliminado para evitar contacto con la “S”. Se revirtió el cambio
  reciente de la lógica de reproducción y hover de `SamiLogoMark.tsx`, que el
  usuario reportó como una regresión. El logo del lockup escala con el texto en
  móvil. Pendiente: validación visual y de interacción en navegador y móvil real.
- Ajuste de Codex (2026-10-27, `dev`, sin commit): separación horizontal entre
  logo y “SAMI” reducida 2 px. El botón de cada pregunta frecuente ahora cierra
  su propia respuesta al pulsarlo de nuevo, incluida la X del estado abierto;
  la pausa de la rotación automática tras interacción manual se conserva.

## SAMI: hero, ejemplos y precio (Claude, 2026-10-26, `dev`, sin commit)

- Hero `/sami`: sin la imagen de ondas (`hero-swirl.webp`, ya sin uso en `src`), sin
  “MEET”, y nota “Customer Only” bajo “Start Your 14-Day Free Trial”.
- Ejemplos: clientes como Customer 1/2/3 en `src/content/products/sami.ts` y en
  el ejemplo de `src/content/home/en.ts`; clip y nota de voz junto al envío en
  `SamiConversation`; mensaje “+100 prompts available to use” bajo la lista.
- Precio: onboarding del plan Professional de $499 a $299 (`sami.ts`).
- Pendiente de Erick: `Mercado La Esperanza` sigue en `en.ts` (pedido del mock de
  teléfono) y `docs/PRODUCT_CONTENT_CONTRACT.md` aún lista los nombres anteriores.
