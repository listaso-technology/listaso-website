# Handoff: foundation y Skills hacia Claude

**Fecha:** 8 de octubre de 2026  
**Tarea:** pasos 1 a 6 de preparación del repositorio  
**Estado:** complete  
**Agente implementador:** Codex  
**Branch:** `dev`

## Objetivo cerrado

Dejar una base escalable y verificable de Next.js, la documentación operativa y
la fuente compartida de Skills preparadas, sin implementar todavía páginas ni
migrar copy desde `start-version/`.

## Estado del working tree

El trabajo de foundation está **sin commit** para que Erick o el siguiente
agente pueda revisar el diff antes de crear el primer checkpoint. `dev` continúa
apuntando a `origin/dev` en el commit `d362162`.

- `.DS_Store` fue eliminado y ahora está bloqueado por `.gitignore`.
- La foundation, documentación y Skills aparecen como archivos nuevos.
- `start-version/` no fue modificado.
- No hubo cambios en `main`, producción, DNS, Cloudflare ni GitHub.

## Resultado técnico

- Next.js 16.4 con App Router, React 19.3 y TypeScript 5.9.
- Tailwind CSS 4.3 como opción principal de estilos.
- Export estático y bloqueo temporal de indexación.
- Node `24.21.0` y pnpm `12.10.1` declarados como referencias del proyecto.
- 89 URLs históricas inventariadas; 56 slugs de artículos preservados.
- 28 Skills disponibles desde `.agents/skills/` y compartidas con Claude por
  medio de `.claude/skills`.

## Validaciones ejecutadas

Ejecutadas el 8 de octubre de 2026, sin errores:

```text
pnpm install --offline --frozen-lockfile
pnpm peers check
pnpm lint
pnpm typecheck
pnpm build
git diff --check
```

El build produjo únicamente `/`, `/_not-found` y `/robots.txt`, todos como
contenido estático. La comprobación adicional confirmó `noindex, nofollow`,
`Disallow: /`, los 56 slugs de artículos, los 28 adaptadores de Skills, ausencia
de secretos detectables y cero modificaciones dentro de `start-version/`.

## Warnings y límites conocidos

- Esta validación local se ejecutó con Node `26.11.1`. La primera ejecución en
  CI debe repetirla con Node `24.21.0` LTS, que es la versión canónica.
- Claude Code no estaba instalado en este equipo al preparar el repositorio; la
  detección real de Skills por Claude todavía debe comprobarse.
- Figma Desktop MCP no estaba disponible en el puerto local esperado.
- CI de GitHub Actions y deployment temporal de Cloudflare siguen pendientes.
- No se instalaron herramientas de testing de navegador ni GSAP.

## Decisiones que continúan vigentes

- Flujo: `feature/*`, `ux/*` o `fix/*` → `dev` → `qa` → `main`.
- `main` representa producción y no debe modificarse sin autorización expresa.
- GitHub Actions validará calidad; Cloudflare publicará el export estático.
- Tailwind es el valor por defecto. CSS Modules se reservan para casos complejos
  y aislados con justificación.
- `start-version/` es evidencia de contenido y comportamiento, no código para
  integrar al build nuevo.
- No se inventan copy, claims, rutas, traducciones, credenciales ni decisiones.

## Desconocidos que debe preservar Claude

- Destino de WordPress y sus 56 artículos.
- Resolución de `/rating/` y contenido aprobado para `/book-a-demo/`.
- Copy, traducciones, claims y assets aprobados por página.
- IDs y eventos vigentes de GA4/Clarity, y validez del GTM heredado.
- Cuenta, permisos y configuración de Cloudflare.

## Siguiente acción recomendada

Claude debe comenzar con una revisión read-only del diff y de los documentos,
usando el Chat 1 de `docs/CLAUDE_CHAT_GUIDE.md`. No debe implementar páginas en
ese primer chat. Si la revisión no detecta un bloqueo, Erick puede autorizar un
commit de checkpoint en `dev`; commit y push no están implícitamente autorizados.

