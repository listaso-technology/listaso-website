# Catálogo de Skills

**Inventario:** 8 de octubre de 2026

## Externas aprobadas

| Skill | Fuente | Commit | Licencia | Límite Listaso |
| --- | --- | --- | --- | --- |
| impeccable | `pbakaus/impeccable` | `778c8a7` | Apache-2.0 | No redefine marca; launcher no se ejecuta automáticamente |
| brandkit | `leonxlnx/taste-skill` | `b482f7a` | MIT | Sólo recursos reales; no inventa identidad |
| prototype | `mattpocock/skills` | `b0618bc` | MIT | Resultado descartable, no producción |
| animate | `emilkowalski/skills` | `e8a175d` | MIT | Obedece `listaso-gsap-motion` |
| review-animations | `emilkowalski/skills` | `e8a175d` | MIT | Auditoría de movimiento; no amplía alcance |
| find-animation-opportunities | `emilkowalski/skills` | `e8a175d` | MIT | Read-only y movimiento con propósito |
| ui-ux-pro-max | `nextlevelbuilder/ui-ux-pro-max-skill` | `1a2c459` | MIT | No elige estética del catálogo |
| ui-styling | mismo repositorio | `1a2c459` | MIT en manifiesto; LICENSE incluido Apache-2.0 | No instala shadcn ni dependencias |
| web-design-guidelines | `vercel-labs/agent-skills` | `063bee9` | MIT | Auditoría, no dirección visual |
| web-artifacts-builder | `anthropics/skills` | `683bc88` | Apache-2.0 | Sólo artefactos aislados, no arquitectura Next.js |
| frontend-ui-engineering | `addyosmani/agent-skills` | `1401c8b` | MIT | Decisiones Listaso prevalecen |

Se retiraron dos campos de frontmatter específicos de Claude
(`disable-model-invocation` y `argument-hint`) porque el validador Agent Skills de
Codex no los admite. El contenido funcional permanece intacto.

## Operativas oficiales

Fuente: `openai/skills`, commit `49f948f`, licencia Apache-2.0.

- `playwright`
- `playwright-interactive`
- `screenshot`
- `gh-fix-ci`
- `gh-address-comments`
- `cloudflare-deploy`
- `security-best-practices`
- `security-threat-model`

## Capacidades Figma ya activas

No duplicadas: implementación design-to-code, reglas/librería de diseño, Code
Connect, motion y escritura/lectura programática de Figma.

## Skills propias

- `listaso-design-system`: tokens, componentes, Tailwind/CSS Modules y Figma.
- `listaso-accessibility-qa`: accesibilidad automática y manual antes de merge.
- `listaso-onboarding-cro`: claridad, narrativa, CTA y hipótesis medibles.
- `listaso-gsap-motion`: lifecycle, cleanup, responsive, reduced motion y CWV.
- `listaso-content-seo`: copy/metadata EN-ES sin inventar hechos.
- `listaso-technical-seo-migration`: rutas, redirects, indexación y WordPress.
- `listaso-migration-parity`: matriz de paridad para las 89 URLs e integraciones.
- `listaso-web-performance`: CWV, mobile, bundles y terceros.
- `listaso-analytics-continuity`: GA4/GTM/Clarity, eventos y UTM.

## Referencias de marca (8 de octubre de 2026)

Las Skills propias cargan contexto de marca desde `references/`. Hay una sola
fuente por tema, y las demás Skills la enlazan en lugar de copiarla.

| Archivo | Contenido |
| --- | --- |
| `listaso-design-system/references/brand-foundations.md` | Paleta, roles AA, tema SAMI, tipografía, logo, íconos de producto, conflictos |
| `listaso-design-system/references/layout-and-surfaces.md` | 8 puntos, breakpoints, contenedores, radios, elevación, vidrio |
| `listaso-design-system/references/imagery-and-icons.md` | Fotos temporales de Unsplash, manifiesto, Material Symbols |
| `listaso-gsap-motion/references/motion-patterns.md` | Tiempos, patrones de Guide Sami y alternativas sin movimiento |
| `listaso-content-seo/references/voice-and-tone.md` | Posicionamiento, tono, convenciones de copy |

Evidencia: `docs/BRAND_ANALYSIS.md`. Decisiones: DEC-007 a DEC-010.
