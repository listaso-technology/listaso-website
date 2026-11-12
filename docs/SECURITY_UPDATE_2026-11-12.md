# Actualización de seguridad Next.js — 12 de noviembre de 2026

## Cierre adicional: Zod y minimatch

Erick autorizó también corregir los dos avisos de herramientas de desarrollo.
Este cierre sustituye el estado pendiente descrito más abajo, que conserva
los resultados históricos de la actualización inicial de Next.js.

Se fijaron overrides dirigidos en `pnpm-workspace.yaml`, reproducidos en el
lockfile, sin añadir dependencias directas ni modificar la aplicación:

| Resolución | Antes | Después | Motivo |
| --- | --- | --- | --- |
| zod@4.6.5 | 4.6.5 | 4.6.7 | Parche de la misma línea; admitido por react-hooks y zod-validation-error |
| @typescript-eslint/typescript-estree@8.71.1 > minimatch | 10.2.6 | 11.0.8 | El aviso requiere >=11.0.1; alcance limitado al parser |

La metadata npm del parser más reciente consultado (8.72.2) aún declara
minimatch ^10.2.2. Se mantiene el parser existente y se aplica la excepción
local explícita a su dependencia, fuera de ese rango declarado. No se afirma
soporte upstream de esa combinación. La compatibilidad se comprobó localmente
con la API consumida por typescript-estree (`minimatch` nombrado por require,
opción dot), globs positivos/negativos y una ejecución real de
`parser.parseForESLint` con projectService/allowDefaultProject. Minimatch 11.0.8
admite Node 20 o >=22, incluyendo Node 24.22.3 del proyecto.

No se sustituyó minimatch 3.1.5 que usan ESLint y otros plugins: ese paquete
no está en el rango >=7 <11.0.1 del aviso. No se usó un override global de
minimatch ni se migró ESLint a otra versión mayor. El lockfile incorpora las
dependencias necesarias de minimatch 11.0.8 (brace-expansion 5 y el matcher
no recursivo), conservando el resto del árbol salvo esas resoluciones.

Se probó también validación correcta/incorrecta de Zod y conversión del error
con zod-validation-error, además de lint global, tipos y build del proyecto.
Auditorías completa y de producción posteriores: **0 avisos conocidos,
código de salida 0**. Esto no es una garantía de ausencia de vulnerabilidades.

Mantenimiento: revisar la excepción del parser al actualizar typescript-eslint;
retirar el override sólo cuando su rango upstream acepte una versión corregida
y audit/lint/compatibilidad sigan pasando. La resolución de Zod puede retirarse
cuando una resolución ordinaria del lockfile ya seleccione >=4.6.6 de la misma
línea y ambas auditorías estén limpias. Revalidar con instalación congelada.
No publicar como parte de este cierre ni cambiar el sistema Node global.

Fuentes: advisories enlazados en la tabla residual histórica y metadata npm
de zod 4.6.7, minimatch 11.0.8 y typescript-estree 8.72.2, consultados el
12 de noviembre de 2026.

Alcance autorizado por Erick: investigar el aviso de Next.js, actualizar a un
parche compatible, validar y documentar. Sin deploy, commit, push, cambio de
DNS, Cloudflare, servidor o promoción de ramas. Los cambios previos de Node
24.22.3, CI qa y guía de publicación se conservaron.

## Evidencia antes del cambio

`pnpm audit --json` encontró tres avisos en `next@16.4.0`:

| Aviso | Severidad npm | Versión corregida según advisory |
| --- | --- | --- |
| [GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw): ejecución remota en optimización de imágenes SVG | Crítica | 16.4.1 |
| [GHSA-p3m5-59mp-jv5r](https://github.com/advisories/GHSA-p3m5-59mp-jv5r): denegación de servicio en Server Actions | Alta | 16.4.1 |
| [GHSA-673q-mjm6-r5xr](https://github.com/advisories/GHSA-673q-mjm6-r5xr): ejecución remota en use cache con typed arrays | Crítica | 16.4.1 |

El build previo también emitía un aviso de vulnerabilidad conocida, sin
identificar un único GHSA. No se atribuye ese mensaje a uno solo de los tres.

El proyecto usa `output: export`, `images.unoptimized: true`, no contiene
`use server`, `use cache`, `cacheComponents` ni configuración Edge en `src/`
y `next.config.ts`. El destino previsto es Nginx sirviendo archivos, sin
`next start`. Por ello esos mecanismos de servidor no se exponen en la
publicación estática prevista. Es una evaluación de alcance, no prueba de
ausencia de vulnerabilidades ni permiso para conservar paquetes afectados.

## Selección y cambio

- `next`: 16.4.0 → **16.4.6**, versión exacta.
- `eslint-config-next`: 16.4.0 → **16.4.6**, alineado con el framework.
- Lockfile regenerado con pnpm 12.10.1; cambian los paquetes correspondientes
  `@next/env`, SWC y plugin ESLint. Sin overrides ni audit fix masivo.
- React/React DOM, TypeScript y las demás dependencias directas se conservan.
- Sin cambios en `src/`, `public/`, rutas, copy, next.config.ts o estilos.

Se eligió el parche estable 16.4.6 de la misma línea, evitando migración mayor
o canary. El registro npm declara Node >=20.9 y React/React DOM ^19.0.0
(entre sus peers), compatibles con Node 24.22.3 y React 19.3.0 del proyecto.

Fuentes primarias consultadas:

- [Release 16.4.5](https://github.com/vercel/next.js/releases/tag/v16.4.5):
  correcciones de siete avisos adicionales de caché, respuestas, cookies e imágenes.
- [Release 16.4.6](https://github.com/vercel/next.js/releases/tag/v16.4.6):
  parche estable posterior del 9 de noviembre con correcciones adicionales.
- Registro npm: metadata de `next@16.4.6`, `eslint-config-next@16.4.6` y
  endpoint de advisories consultado por pnpm audit.
- Guía de actualización y export estático incluida en la instalación de Next.

## Validación local

Ejecutada con Node **24.22.3** temporal (sin modificar Node global) y pnpm
**12.10.1**. El build se ejecutó con permisos ampliados para evitar el bloqueo
local de Turbopack, sin publicar nada.

| Comprobación | Resultado |
| --- | --- |
| pnpm install --frozen-lockfile | Pasa |
| pnpm peers check | Sin conflictos |
| pnpm lint | Pasa |
| pnpm typecheck | Pasa |
| pnpm build (Turbopack) | Pasa: 44 rutas, sin el aviso de Next vulnerable |
| Export index/404, noindex y src/poster locales | Pasa: 42 HTML; referencias locales presentes |
| git diff --check | Pasa |
| pnpm audit --prod --json | 0 avisos conocidos; código 0 |
| pnpm audit --json (incluye desarrollo) | 2 avisos pendientes; código 1 |

No se ejecutó CI en GitHub ni QA visual en navegador para este parche. Las
validaciones comprueban compatibilidad de compilación y export; el QA del
entorno de prueba y las integraciones sigue requerido antes de promoción.

## Avisos residuales de herramientas de desarrollo

La auditoría completa ya no reporta Next.js, pero sí:

| Paquete y cadena | Aviso | Resultado |
| --- | --- | --- |
| zod 4.6.5 vía eslint-config-next → eslint-plugin-react-hooks | [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5), alta | Corregido desde 4.6.6; pendiente |
| minimatch 10.2.6 vía eslint-config-next → typescript-eslint/parser y resolvers | [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), moderada | Corregido desde 11.0.1; pendiente |

Ambos se clasifican como dependencias de desarrollo en el audit. No se
distribuyen como herramientas ejecutables en `out/`, pero sí merecen revisión
en desarrollo/CI. Se conservan sin imponer una actualización mayor de
minimatch o cambios ajenos al parche del framework. No afirmar que la auditoría
completa está limpia ni que el sitio está certificado como seguro.

Siguiente paso: resolver estos avisos en un alcance de herramientas de
desarrollo, ejecutar CI remoto para la candidata aprobada y continuar las
puertas de `DEPLOY_LISTASO_NET.md`. La actualización no autoriza publicación.
