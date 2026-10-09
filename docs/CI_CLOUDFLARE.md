# CI con GitHub Actions y deployment temporal con Cloudflare Pages

**Fecha:** 8 de octubre de 2026  
**Estado:** CI implementado localmente; Cloudflare preparado y pendiente del
checkpoint remoto. No autoriza DNS, dominio personalizado ni cutover.

## Responsabilidades

```text
GitHub Actions = validar calidad
Cloudflare Pages = construir y publicar previews / sitio temporal
```

No se añade un deployment paralelo desde GitHub Actions. La conexión nativa de
Cloudflare con GitHub administra los deployments.

## GitHub Actions

Workflow: `.github/workflows/ci.yml`

- Eventos: push y Pull Request hacia `dev` o `main`, más ejecución manual.
- Runner: `ubuntu-24.04`.
- Runtime: Node `24.21.0`, leído desde `.node-version`.
- Package manager: pnpm `12.10.1`.
- Instalación: `pnpm install --frozen-lockfile`.
- Validaciones: peers, lint, typecheck, production build y presencia de
  `out/index.html`.
- Permisos: sólo lectura de contenidos.
- Concurrencia: cancela una ejecución anterior de la misma referencia.
- No usa secretos, tokens ni acciones de deployment.

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
- Preview automático: `dev`, `feat/*`, `ux/*`, `fix/*`, `chore/*` y `docs/*`.
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
