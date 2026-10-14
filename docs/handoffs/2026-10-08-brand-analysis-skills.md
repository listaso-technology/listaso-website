# Handoff: análisis de marca y contexto de Skills

```text
Tarea: analizar la guía de marca, start-version y Guide Sami; convertir el
  resultado y las decisiones de Erick en contexto de Skills.
Objetivo: definir las métricas y convenciones visuales para las siguientes
  fases sin construir páginas.
Estado: complete
Agente implementador: Claude
Branch: dev (sin commit; commit y push no autorizados)
Archivos reservados: ninguno (liberados).
```

## Archivos modificados

**Nuevos:**
- `docs/BRAND_ANALYSIS.md`: evidencia de las tres fuentes y contraste calculado.
- `.agents/skills/listaso-design-system/references/brand-foundations.md`
- `.agents/skills/listaso-design-system/references/layout-and-surfaces.md`
- `.agents/skills/listaso-design-system/references/imagery-and-icons.md`
- `.agents/skills/listaso-gsap-motion/references/motion-patterns.md`
- `.agents/skills/listaso-content-seo/references/voice-and-tone.md`

**Editados:**
- `docs/DECISIONS.md`: DEC-007 a DEC-010.
- `.agents/skills/listaso-design-system/SKILL.md` (reescrito con las
  referencias).
- `SKILL.md` de `listaso-gsap-motion`, `listaso-content-seo`,
  `listaso-accessibility-qa`, `listaso-onboarding-cro`,
  `listaso-web-performance` y `listaso-migration-parity`: una sección
  añadida al final.
- `docs/SKILLS_CATALOG.md` y `docs/WORKLOG.md`.

Las carpetas de referencia (`start-version/`, Guide Sami y el PDF) no se
modificaron.

## Decisiones de Erick registradas

- **DEC-007.** Gana la accesibilidad AA y la consistencia, y Marketing
  auditará la marca después. Tono profesional, cálido y cercano. El sitio va
  preparado para oscuro desde el inicio: tokens claros y oscuros, cada
  componente probado en ambos temas. El tema publicado sigue la preferencia
  del sistema y, si no la hay, queda en claro; el selector manual se decide
  aparte (actualizado tras la decisión de Erick). SAMI complementa la
  marca y su paleta se usa completa sólo en espacios SAMI.
- **DEC-008.** Sistema de 8 puntos. Los radios, la elevación y el vidrio (con
  límites de uso) son propuesta de Claude.
- **DEC-009.** Fotografía temporal de Unsplash, alojada en el sitio, registrada
  por espacio para pedirla después a Diseño.
- **DEC-010.** Material Symbols como biblioteca de íconos de interfaz. El
  formato y el paquete se aprueban al implementar.

## Validaciones

- Los contrastes se calcularon con la fórmula WCAG 2.x (script local; los
  resultados están en `docs/BRAND_ANALYSIS.md` §4).
- No se cambió código de la app. Se repitieron `pnpm lint`, `pnpm typecheck`,
  `pnpm build` y `git diff --check` con Node 24.21.0, y todos terminaron sin
  errores.

## Requiere decisión o validación

- **Requiere aprobación de Erick.** Los valores propuestos (escala tipográfica
  web, radios, sombras, vidrio, tamaño mínimo del logo, CTA `#D83553`) se
  aplican como convención provisional hasta la auditoría de Marketing.
- **Faltan activos de Marketing y Diseño:** logo oficial, íconos de producto y
  logo de SAMI en vector, y el trato tú o usted en español.
- **Dependencias.** Material Symbols (paquete SVG) y la carga de Montserrat
  necesitan aprobación de dependencia en el Chat 5.

## Siguiente acción recomendada

1. Erick revisa DEC-007 a DEC-010 y las referencias de las Skills.
2. Chat 2: matriz de rutas y contenido.
3. Chat 5: aplicar los tokens de `brand-foundations.md` y
   `layout-and-surfaces.md` en `src/styles/`, reemplazando los colores sin
   fuente.
4. Opcional, después del Chat 2: generar un grafo de conocimiento (Graphify)
   como índice de sólo lectura. No debe ser fuente de verdad.
