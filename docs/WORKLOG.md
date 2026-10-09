# Estado de trabajo

**Actualizado:** 9 de octubre de 2026

## Tarea activa

Ninguna. Antes de editar, cada agente registra aquí tarea, responsable, branch,
archivos reservados y lo que queda fuera de alcance.

Últimas tareas cerradas:

- Chat 5, foundation visual (Claude, `ux/visual-foundation`, sin commit):
  `docs/handoffs/2026-10-09-visual-foundation.md`. Pendiente de revisión de
  Erick.
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

## Estado actual

- Rama de trabajo: `ux/visual-foundation` (base `bf63e2e`), con la foundation
  visual sin commit.
- No hay páginas comerciales ni copy migrados.
- Foundation bloqueada para indexación.
- CI y Cloudflare Pages activos para `dev` y las ramas de trabajo.
- Claude Code funciona y detecta las Skills. Figma Desktop MCP sigue sin
  responder en `127.0.0.1:3845`.

## Pendientes inmediatos

1. Erick revisa el diff y `/foundation/` y, si aprueba, autoriza el commit y el
   push de `ux/visual-foundation`.
2. Erick confirma qué producto es `listaso-van-sales-1.svg` y entrega el
   archivo de Sales Advanced.
3. Decidir cómo autohospedar Montserrat (requiere aprobación; ver handoff).
4. Erick responde las decisiones abiertas de `docs/ROUTE_CONTENT_MATRIX.md`.
5. Definir la primera ruta del Chat 6.

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
