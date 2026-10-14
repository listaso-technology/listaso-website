# Validación de Skills

**Fecha:** 8 de octubre de 2026

## Estructura

Las 28 Skills contienen `SKILL.md`. El validador oficial de `skill-creator` pasó
después de adaptar dos campos de frontmatter externos. PyYAML se instaló sólo en
un entorno temporal, no como dependencia del proyecto.

## Pruebas de activación de Skills Listaso

| Skill | Directa | Indirecta | No activa | Falta información / debe detenerse |
| --- | --- | --- | --- | --- |
| design-system | “crea un componente Listaso” | “ajusta responsive” | editar CI | Figma contradice tokens aprobados |
| accessibility-qa | “audita accesibilidad” | “prepáralo para merge” | redactar copy | no puede probar teclado/lector |
| onboarding-cro | “mejora el hero y CTA” | “el visitante no entiende Listaso” | corregir tipos | solicita métricas/testimonios inexistentes |
| gsap-motion | “anima con GSAP” | “scroll storytelling” | metadata SEO | dependencia no aprobada o sin fallback |
| content-seo | “escribe title EN/ES” | “migra el copy del producto” | configurar Cloudflare | claim sin fuente aprobada |
| technical-seo-migration | “crea redirects” | “preserva URLs al publicar” | color de botón | destino 301 no responde 200 |
| migration-parity | “compara ambos sitios” | “qué falta por migrar” | crear UI nueva | source of truth contradictorio |
| web-performance | “audita CWV” | “agreguemos esta dependencia” | redactar legal | no existe línea base para presupuesto |
| analytics-continuity | “preserva GTM” | “cambiamos CTA y rutas” | tipografía | IDs/eventos no confirmados |

## Resultado y bloqueos

- Codex: estructura local en ruta oficial y manifiestos válidos.
- Claude: comprobado el 8 de octubre de 2026 desde Claude Code (app de
  escritorio). Las 28 Skills aparecen disponibles por medio de `.claude/skills`,
  incluidas las 9 `listaso-*`.
- Figma MCP para Claude: no configurado; `127.0.0.1:3845` siguió sin responder
  el 8 de octubre de 2026.
- Se retiró `ui-styling/scripts/.coverage`, una base SQLite de cobertura que
  venía con la fuente externa y no forma parte de la Skill. `.gitignore` bloquea
  ahora `.coverage`, `__pycache__/` y `*.pyc`.
- No se ejecutaron scripts de Skills externas ni se crearon credenciales.
- No se modificaron producción, DNS, Cloudflare ni `main`.
