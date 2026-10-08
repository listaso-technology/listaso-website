# Estado de trabajo

**Actualizado:** 8 de octubre de 2026

## Tarea activa

Ninguna. Antes de editar, cada agente registra aquí tarea, responsable, branch,
archivos reservados y lo que queda fuera de alcance.

Últimas tareas cerradas (Claude, `dev`, sin commit):

- Chat 1, auditoría del checkpoint:
  `docs/handoffs/2026-10-08-chat1-checkpoint-audit.md`.
- Análisis de marca y contexto de Skills:
  `docs/handoffs/2026-10-08-brand-analysis-skills.md`.

## Completado

- Repositorio clonado y referencia movida a `start-version/`.
- Inventario read-only de la implementación heredada.
- Mapa inicial de 89 URLs públicas y rutas estáticas preservado.
- `main` confirmado como producción; flujo `dev -> qa -> main`.
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
    defecto), SAMI como complemento, sistema de 8 puntos, fotos de Unsplash temporales y Material
    Symbols.
  - Referencias de marca añadidas a las Skills `listaso-*` (ver
    `docs/SKILLS_CATALOG.md`).

## Estado actual

- Rama de trabajo: `dev`.
- No hay páginas ni copy migrados.
- Foundation bloqueada para indexación.
- CI y Cloudflare pendientes.
- Claude Code funciona y detecta las Skills. Figma Desktop MCP sigue sin
  responder en `127.0.0.1:3845`.
- El working tree de la foundation continúa sin commit. Claude recomienda el
  checkpoint; commit y push requieren autorización explícita de Erick.

## Pendientes inmediatos

1. Erick decide si autoriza el commit de checkpoint en `dev` (y, por separado,
   el push).
2. Completar la matriz unificada de rutas y contenido (Chat 2).
3. Configurar CI en una tarea separada (Chat 3).
4. Preparar Cloudflare sin publicar producción ni modificar DNS (Chat 4).
5. Definir la foundation visual antes de implementar la primera ruta (Chat 5).

## Desconocidos o bloqueadores

- Destino operativo de WordPress y sus 56 artículos.
- Decisión final para `/rating/` y contenido de `/book-a-demo/`.
- Copy, claims, traducciones y assets aprobados por página.
- IDs/eventos vigentes de GA4 y Clarity; GTM heredado debe verificarse.
- Configuración y permisos de Cloudflare.
- `src/styles/tokens.css` usa colores sin fuente (`#0a426a`, `#00baa3`,
  `#ff1478`). El Chat 5 debe reemplazarlos por los roles de
  `.agents/skills/listaso-design-system/references/brand-foundations.md`.
- Logo oficial (horizontal, vertical, isotipo), íconos de producto y logo de
  SAMI en vector.
- Auditoría de marca de Marketing: magenta definitivo, 60-30-10, taglines y
  trato tú/usted en español.
