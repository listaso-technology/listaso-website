# Guía de continuidad por chats para Claude

**Actualizada:** 8 de octubre de 2026

Esta guía divide el trabajo en alcances pequeños para conservar contexto,
trazabilidad y validaciones. Cada chat debe cerrar una sola etapa. No conviene
pegar todos los prompts a la vez.

## Reglas para todos los chats

1. Trabajar en `/Users/Erick/listaso-website`.
2. Leer `CLAUDE.md` y los documentos indicados allí antes de editar.
3. Leer el handoff más reciente en `docs/handoffs/`.
4. Confirmar branch, estado de Git y archivos reservados antes de tocar archivos.
5. Tratar `start-version/` como referencia read-only.
6. No hacer commit, push, merge, deployment, cambios de DNS o cambios en `main`
   salvo autorización explícita de Erick para esa acción.
7. No instalar una dependencia sin justificarla y obtener aprobación cuando
   amplíe la arquitectura acordada.
8. Cerrar cada chat con validaciones, actualización de `docs/WORKLOG.md` y un
   handoff nuevo si el trabajo continuará en otro chat.

## Chat 1 — recepción y revisión del checkpoint

Objetivo: que Claude comprenda y audite la foundation existente antes de tomar
control del desarrollo. Este chat es obligatorio y no implementa páginas.

```text
Trabajaremos en /Users/Erick/listaso-website sobre la branch dev.

Lee primero CLAUDE.md y, en el orden definido allí, PROJECT_MASTER, DECISIONS,
CURRENT_ARCHITECTURE, WORKLOG, SITE_ROUTE_MAP, la documentación de Skills,
README y docs/handoffs/2026-10-08-foundation-skills-to-claude.md.

Haz una revisión read-only del estado real de Git y del diff sin commit. Verifica
que la foundation respete las decisiones aprobadas, que start-version permanezca
aislada y que no haya secretos ni archivos accidentales. Repite pnpm install
--frozen-lockfile, pnpm peers check, pnpm lint, pnpm typecheck, pnpm build y git
diff --check con Node 24.21.0 si está disponible.

No crees páginas, no migres copy, no cambies dependencias, no hagas commit ni
push. Entrégame: hallazgos por prioridad, resultado de cada validación, diferencias
causadas por la versión de Node y una recomendación clara sobre si el checkpoint
está listo para commit.
```

Si Claude aprueba el checkpoint, Erick decide después si autoriza el commit y el
push. Esa autorización debe darse en un mensaje separado y explícito.

## Chat 2 — matriz definitiva de rutas y contenido

Objetivo: cerrar qué debe existir antes de diseñar o desarrollar páginas.

```text
Continúa desde el handoff más reciente del repositorio Listaso Website. Trabaja
solo en documentación. Compara docs/SITE_ROUTE_MAP.md, el mapeo aprobado por
Erick y start-version como evidencia read-only. Construye o completa una matriz
por ruta con: URL canónica, idioma, fuente de copy, assets disponibles, SEO
heredado, analytics conocido, estado de migración, destino previsto y dudas.

Preserva las 89 URLs y los 56 slugs hasta que exista una decisión documentada.
No inventes redirects, copy, traducciones, claims ni páginas. Marca explícitamente
lo confirmado, lo inferido y lo desconocido. No implementes componentes. Actualiza
WORKLOG y deja un handoff con las decisiones que Erick todavía debe cerrar.
```

Salida necesaria: matriz aprobable y lista de dudas de negocio, sin código UI.

## Chat 3 — integración continua en GitHub Actions

Objetivo: convertir las validaciones locales en controles repetibles.

```text
Implementa únicamente CI para Listaso Website conforme a DEC-003 y DEC-005.
Usa Node 24.21.0 y pnpm 12.10.1. El workflow debe ejecutar instalación con
lockfile congelado, revisión de peer dependencies, lint, typecheck y production
build. Fija las GitHub Actions de terceros a SHA completo y documenta sus nombres
de checks para las futuras rulesets.

No configures deployment, Cloudflare, secretos, environments ni cambios de
branches. No modifiques páginas. Valida el workflow en la medida posible, reporta
lo que sólo pueda comprobar GitHub, actualiza WORKLOG y deja handoff.
```

Salida necesaria: CI de calidad, no CD. La activación de reglas de GitHub se hace
después de observar al menos una ejecución real y conocer los nombres de checks.

## Chat 4 — preparación de Cloudflare sin publicar producción

Objetivo: dejar documentada y preparada la ruta de preview estático.

```text
Revisa la foundation y diseña la integración temporal con Cloudflare para el
export estático de Next.js, conforme a DEC-003. Verifica qué configuración puede
vivir en el repositorio y qué datos requieren la cuenta de Erick. Mantén separados
Preview y Production. No uses listaso.com, no cambies DNS, no publiques producción
y no solicites ni guardes contraseñas humanas.

Antes de cualquier conexión externa o secreto, detente y presenta a Erick la
acción exacta y los datos mínimos requeridos. Documenta build command, output,
variables y rollback. Actualiza WORKLOG y deja handoff.
```

Salida necesaria: plan/configuración revisable. Cualquier vinculación de cuenta
o primer deployment requiere confirmación sensible en ese momento.

## Chat 5 — foundation visual y sistema de diseño

Objetivo: definir la base visual reutilizable antes de construir rutas completas.

```text
Usa las Skills locales apropiadas y las reglas de DEC-001. A partir únicamente
de assets, Figma y decisiones aprobadas, propón e implementa la foundation visual:
tokens CSS compartidos, tipografía, colores, spacing, contenedores, focus visible
y primitivas mínimas justificadas. Tailwind es el valor por defecto; CSS Modules
solo para casos complejos y aislados. No inventes valores de marca si la fuente
no está confirmada y no construyas todavía una página completa.

Incluye accesibilidad, responsive, reduced motion y presupuesto de rendimiento.
Ejecuta lint, typecheck y build, actualiza WORKLOG y deja handoff.
```

Este chat debe esperar hasta que Erick entregue o confirme las fuentes visuales.

## Chat 6 — primera ruta vertical

Objetivo: implementar una sola página aprobada de extremo a extremo.

```text
Implementa únicamente la ruta que Erick indique, desde una branch feat/* o
ux/* creada desde dev. Usa la matriz de rutas, copy y assets aprobados; consulta
start-version solo como evidencia. Mantén Server Components por defecto y añade
Client Components solo cuando el navegador lo exija. Conserva SEO, analytics,
accesibilidad, responsive y paridad de contenido aplicables.

No extiendas el alcance a otras rutas ni inventes contenido. Añade las pruebas
proporcionales al cambio, ejecuta todas las validaciones, actualiza WORKLOG y deja
un handoff listo para revisión y PR hacia dev. No hagas merge.
```

Repetir este patrón para cada bloque de rutas, no para todo el sitio en un único
chat.

## Chat 7 — revisión independiente y promoción

Objetivo: separar implementación, QA y decisiones de promoción.

```text
Actúa como reviewer del cambio indicado. Revisa el diff real y el handoff; no
reescribas la solución salvo que Erick lo pida después. Comprueba comportamiento,
responsive, teclado, accesibilidad, SEO, analytics, performance, export estático
y regresiones contra la matriz de rutas. Ejecuta las validaciones disponibles y
clasifica hallazgos por prioridad con archivo y evidencia.

Indica si está listo para PR o promoción a dev/main, pero no hagas commit, push,
merge ni deployment sin autorización explícita. Actualiza WORKLOG y deja handoff.
```

## Orden recomendado de ejecución

```text
Chat 1: auditoría del checkpoint
  → aprobación y checkpoint de Git por Erick
Chat 2: matriz definitiva de rutas/contenido
Chat 3: CI de GitHub Actions
Chat 4: preparación de Cloudflare
Chat 5: foundation visual
Chat 6: una ruta o bloque pequeño
Chat 7: review y validación independiente
  → repetir Chats 6 y 7
  → promoción dev → main sólo con autorización
```

## Cuándo debe detenerse Claude y preguntar

Claude debe detenerse cuando falte copy o una decisión de negocio, cuando una
fuente contradiga el documento maestro, cuando se necesiten credenciales o una
cuenta externa, cuando un cambio afecte producción/DNS/`main`, o cuando otra
persona/agente esté editando los mismos archivos. No debe convertir una
incertidumbre en una decisión silenciosa.
