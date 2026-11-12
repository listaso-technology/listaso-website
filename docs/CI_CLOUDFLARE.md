# CI con GitHub Actions y deployment temporal con Cloudflare Pages

**Fecha:** 8 de octubre de 2026  
**Estado:** CI implementado localmente; Cloudflare preparado y pendiente del
checkpoint remoto. No autoriza DNS, dominio personalizado ni cutover.

## Responsabilidades

**Actualización — 12 de noviembre de 2026:** la primera prueba en servidor
Nginx usa artefactos compilados fuera del servidor para `listaso.net`.
Procedimiento vigente: `docs/DEPLOY_LISTASO_NET.md`. La configuración Pages
de este documento permanece como referencia del flujo existente; no se cambia
su integración ni su panel. Actions valida, compila y guarda artefactos
descargables; transferencia y activación en Nginx siguen siendo manuales.

```text
GitHub Actions = validar, compilar y guardar el paquete
Cloudflare Pages = construir y publicar previews / sitio temporal
```

No se añade un deployment paralelo desde GitHub Actions. La conexión nativa de
Cloudflare con GitHub administra los deployments.

## GitHub Actions

Workflow: `.github/workflows/ci.yml`

- Eventos: push y Pull Request hacia `dev`, `qa` o `main`, más ejecución manual.
- Runner: `ubuntu-24.04`.
- Runtime: Node `24.22.3`, leído desde `.node-version`.
- Package manager: pnpm `12.10.1`.
- Instalación: `pnpm install --frozen-lockfile`.
- Validaciones: peers, lint, typecheck, production build y presencia de
  `out/index.html`.
- Permisos: sólo lectura de contenidos.
- Concurrencia: cancela una ejecución anterior de la misma referencia.
- No usa secretos, tokens ni acciones de deployment.

### Artefacto de export estático

Sólo después de validaciones y build exitosos, el mismo job ejecuta
`node scripts/package-static-export.mjs "$RUNNER_TEMP/static-export"`.
Verifica index/404, `_next`, ausencia de enlaces/archivos ocultos, Node/pnpm
fijados y correspondencia entre checkout y GITHUB_SHA. En CI exige árbol limpio.
Los marcadores `.gitkeep` de public se permiten en el export pero se excluyen
del tar; cualquier otro archivo oculto provoca error.

`actions/upload-artifact` v6.0.0 (Node 24, runner >=2.327.1; ubuntu-24.04
alojado por GitHub) queda fijado al SHA verificado contra el tag oficial.
Nombre: `listaso-static-<sha-completo>-<run-id>-<intento>`. Retención: 14 días;
sin sobreescritura y sin compresión ZIP adicional del tar comprimido.

Contiene exclusivamente:

- `listaso-<sha-completo>.tgz`: contenido completo de out, sin carpeta out extra.
- `BUILD_INFO.json`: SHA, árbol limpio, hora UTC del empaquetado, Node/pnpm/Next,
  hash del lockfile, nombre/hash del tar, comando, repo, evento, ref y ejecución.
- `SHA256SUMS`: hashes del tar y del JSON, con nombres relativos portables.

La hora registrada es la de empaquetado posterior al build. El digest del ZIP
que entrega GitHub es distinto del SHA-256 del tar. Conservar el resumen del
job, que incluye commit y hash del tar, para contrastar tras la descarga.
Un hash detecta alteraciones, pero no autentica por sí solo el origen.

Para publicar la candidata usar el artefacto del **push a qa** cuyo SHA real
coincida con el commit aprobado y cuya ejecución completa termine en success.
PR usa por defecto el commit de merge sintético, no necesariamente la cabeza
de dev: sus artefactos son sólo de validación y no se promueven. workflow_dispatch
no sustituye aprobación de rama/commit. No recompilar en Mac tras descargar.
Instrucciones de descarga y verificación: `docs/DEPLOY_LISTASO_NET.md`.

Nombre del check para la futura ruleset:

```text
CI / Quality
```

El nombre debe confirmarse después de la primera ejecución real en GitHub antes
de marcarlo como required check.

### Actions fijadas

| Action | Tag verificado | Commit fijado |
| --- | --- | --- |
| `actions/checkout` | `v6` | `d23441a48e516b6c34aea4fa41551a30e30af803` |
| `actions/setup-node` | `v6` | `249970729cb0ef3589644e2896645e5dc5ba9c38` |
| `pnpm/action-setup` | `v4` | `f40ffcd9367d9f12939873eb1018b921a783ffaa` |
| `actions/upload-artifact` | `v6.0.0` | `b7c566a772e6b6bfb58ed0dc250532a479d7789f` |

Los SHAs se verificaron directamente contra los tags de sus repositorios
oficiales. Una actualización futura requiere revisar el nuevo tag y reemplazar
deliberadamente el SHA.

## Cloudflare Pages

### Estado comprobado

- Cuenta Cloudflare: creada.
- Aplicación de GitHub: conectada por Erick.
- Proyectos Workers & Pages: ninguno al 8 de octubre de 2026.
- El commit local de la foundation todavía no está en `origin/dev`; crear ahora
  el proyecto produciría un build con una versión remota incompleta. Por eso no
  se inició el primer deployment.

### Configuración aprobada para crear el proyecto

| Campo | Valor |
| --- | --- |
| Producto | Cloudflare Pages con integración Git |
| Repositorio | `listaso-technology/listaso-website` |
| Nombre de proyecto | `listaso-website` |
| Framework preset | Next.js (Static HTML Export) |
| Production branch | `main` |
| Root directory | `/` |
| Build command | `pnpm install --frozen-lockfile && pnpm build` |
| Build output directory | `out` |

Variables de build, tanto en Preview como Production:

| Variable | Valor | Secreta |
| --- | --- | --- |
| `PNPM_VERSION` | `12.10.1` | No |
| `SKIP_DEPENDENCY_INSTALL` | `1` | No |
| `NEXT_TELEMETRY_DISABLED` | `1` | No |

Node se fija mediante `.node-version`; no hace falta duplicar `NODE_VERSION` en
el panel. No se requieren secretos para la foundation actual.

### Branch control

- Producción temporal: `main` en `*.pages.dev`.
- Preview automático: `dev` y `qa` (DEC-021; ya no se usan ramas `feat/*`,
  `ux/*`, `fix/*`, `chore/*` ni `docs/*`).
- No conectar `listaso.com` ni agregar un custom domain.
- `main` continúa siendo una propuesta estable; el término “Production” de
  Cloudflare sólo identifica su branch principal dentro de Pages.

### Orden seguro de activación

1. Erick sube el checkpoint de la foundation y este workflow a `dev`.
2. Se observa la primera ejecución de `CI / Quality` y se corrige cualquier
   diferencia exclusiva del runner.
3. Se crea el proyecto Pages con la configuración anterior.
4. Se valida el preview `dev` en la URL temporal de Cloudflare.
5. Después de validar una ejecución real, se configura la ruleset de GitHub.
6. No se hace merge a `main`, no se conecta DNS y no se usa `listaso.com` sin
   una autorización posterior y explícita de Erick.

## Rollback y pausa

- Un preview defectuoso no afecta `main`; se corrige la branch o se usa un
  deployment previo desde el panel.
- Los builds automáticos pueden pausarse en Cloudflare mediante Branch control.
- La integración Git no debe reemplazarse por Direct Upload durante esta etapa.
- No borrar el proyecto ni desconectar GitHub para resolver un fallo de build;
  revisar primero logs, versiones y configuración.
