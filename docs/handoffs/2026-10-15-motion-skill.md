# Handoff — Skill `design-motion-principles` (vendored)

**Fecha:** 15 de octubre de 2026
**Rama:** `feat/homepage` (sin commit)
**Estado:** Instalada en `.agents/skills/design-motion-principles/`. Sólo
documentación; sin cambios en `src/`, `public/`, dependencias ni build.

## Qué se instaló

- Fuente: `kylezantos/design-motion-principles` (MIT, © 2026 Kyle Zantos),
  copiada desde la rama por defecto a la fecha. Incluye `LICENSE.txt`.
- Se añadió al inicio de `SKILL.md` un bloque "Uso en Listaso" con las reglas
  que prevalecen: sin dependencias nuevas (Framer Motion/Motion no aplican), sin
  cambios automáticos, movimiento reducido, sin scroll hijacking ni bucles,
  informes fuera del repo y validación con las skills de accesibilidad y
  performance.
- Acceso de Claude vía `.claude/skills` (enlace existente); no hay copia
  independiente.

## Por qué esta y no las demás

- `web-design-guidelines` (vercel-labs) ya está instalada en
  `.agents/skills/web-design-guidelines`. No se reinstala para no duplicar.
- Descartadas: `taste-skill`, `image-to-code-skill`, `awesome-design-md`,
  `design-md-chrome`, `OmniRoute`, `headroom`, `everything-claude-code`,
  `caveman`, y `awesome-claude-skills` (lista, no skill). Motivos en el chat
  del 15 de octubre.

## Uso recomendado

- Audit de motion: `review-animations` + esta skill como segunda opinión.
- Creación: preferir `listaso-gsap-motion` y CSS; esta skill aporta criterio de
  frecuencia y duración, no código nuevo.

## Pendiente (requiere a Erick o al owner de WORKLOG)

1. Registrar **DEC-018** en `docs/DECISIONS.md`:
   "Skill externa `design-motion-principles` aceptada como referencia
   subordinada; no amplía dependencias, animación de runtime ni permisos."
2. Añadir la entrada en `docs/WORKLOG.md` (archivo reservado por la tarea
   activa de Codex; no se editó en esta sesión para evitar conflicto).
3. Actualizar `docs/SKILLS_ARCHITECTURE.md` si existe, con la fila de la skill
   y su origen.

## Validación

- Lectura completa de `SKILL.md`, `workflows/` y `references/` (sin scripts ni
  instaladores; sólo Markdown y HTML de ejemplo).
- Enlaces externos del upstream: Google Fonts (sólo en plantilla de informes) y
  una herramienta de easing de terceros (`linear-easing-generator`), que no se
  carga en el sitio.
- Pendiente de verificar en esta sesión: que Claude la liste como skill. Se
  comprobará al iniciar la siguiente sesión.
