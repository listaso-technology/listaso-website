# Publicación de prueba en Listaso.net

Actualizado: 12 de noviembre de 2026. DEC-027.
Estado: procedimiento preparado; no ejecutado por esta tarea.

## Alcance y responsables

Erick prepara la candidata y valida la aplicación. Edgar o Erick con acceso
individual autorizado administra Nginx, certificados y activación remota.
El sitio de prueba usa las rutas actuales del proyecto, sin migrar WordPress,
blog ni CMS. No cambiar `main`, DNS, Cloudflare o producción sin autorización.
No usar contraseñas compartidas ni añadir secretos al repositorio.

Flujo: `dev -> PR a qa -> push qa con CI / Quality aprobado -> artefacto CI
-> descarga/verificación en Mac -> incoming -> release -> current -> Nginx
-> Cloudflare (cuando se configure y autorice) -> visitantes`.

El workflow actual valida push/PR a `dev`, `qa` y `main`, más ejecución manual.
Compila y guarda el paquete descargable sólo tras las validaciones exitosas;
no ejecuta deploy. La Mac verifica y transfiere ese paquete sin recompilarlo.
Una futura automatización deberá usar identidad limitada de publicación y
aprobación del entorno; no se configura CD en esta fase.
Pages conserva su integración Git independiente; no confundir Pages hosting
con el proxy/CDN de Cloudflare delante del servidor Nginx.

## Puerta 1: servidor y recuperación

Evidencia aportada por Erick: Nginx comparte servidor con ListasoIQ; la versión
anterior de `.net` vive en `/var/www/html`, fuente en
`/home/webadmin/listaso.com`. Respaldos del 11 de noviembre en
`/home/webadmin/backups/listaso-net-predeploy-2026-11-11`: ambos tar legibles,
hashes OK y `nginx-default.conf` idéntico. Esto no sustituye una restauración
ensayada ni una copia externa protegida; conservar también respaldo fuera del
servidor antes de activar. Nunca publicar esos archivos como recursos web.

Directorios confirmados por Erick:

| Ruta | Dueño | Modo | Uso |
| --- | --- | --- | --- |
| `/srv/listaso` | root:root | 0755 | Raíz aislada |
| `/srv/listaso/incoming` | webadmin:webadmin | 0700 | Transferencia privada |
| `/srv/listaso/releases` | webadmin:webadmin | 0755 | Versiones completas |

`current` aún no se ha creado. No modificar `/var/www/listasoiq.com`, sus
certificados ni `/etc/nginx/sites-available/default`. Crear un archivo de sitio
exclusivo para `.net` en una tarea de infraestructura autorizada.
Registrar el estado HTTP/HTTPS de ListasoIQ antes y después de cada cambio.

Bloqueante conocido: HTTPS de `listaso.net` presenta un certificado de otro
dominio. Resolver un certificado válido para `.net`, su renovación y pruebas
IPv4/IPv6. Con proxy apagado se necesita certificado de confianza pública;
Cloudflare Origin CA sólo sirve para el tramo de origen detrás del proxy.
Si se habilita Cloudflare, validar Full (strict); no resolver errores con
Flexible ni con desactivación de verificación TLS. Revisar acceso y firewall
con Edgar; no reiniciar ni actualizar servicios compartidos como parte del build.

## Puerta 2: candidata y build en GitHub Actions

Promover mediante PR `dev -> qa`, aprobar CI y registrar el SHA completo de
la candidata de `qa`. Esperar también al workflow de **push a qa** posterior
al merge. Actions usa checkout limpio, Node `24.22.3` y pnpm `12.10.1`.
El artefacto del PR puede corresponder a un merge sintético; sirve para QA
del PR, no para publicar el commit final. Registrar SHA, run ID e intento.

Hallazgo resuelto localmente el 12 de noviembre: Next.js 16.4.0 emitía un
aviso de vulnerabilidad conocida. Next.js y eslint-config-next se actualizaron
a 16.4.6; el build generó 44 rutas sin ese aviso y la auditoría de producción
no reportó avisos conocidos. Los dos avisos adicionales de herramientas de
desarrollo también se corrigieron con resoluciones dirigidas de Zod 4.6.7 y
minimatch 11.0.8; auditoría completa sin avisos conocidos. Ver
`SECURITY_UPDATE_2026-11-12.md`. La candidata deberá incluir estos parches,
pasar CI remoto y completar las demás puertas antes de publicar.

El job realiza instalación congelada, peers, lint, typecheck, build y verifica
index/404 antes de empaquetar. Para diagnóstico local pueden repetirse estos
comandos, pero ese resultado no reemplaza el artefacto de la candidata:

```sh
git status --short
git rev-parse HEAD
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm peers check
pnpm lint
pnpm typecheck
pnpm build
test -f out/index.html
test -f out/404.html
```

`git status --short` debe estar vacío. Verificar el SHA contra GitHub y el
resultado CI. Si Turbopack falla por restricciones locales, documentar la
causa y usar `pnpm build --webpack` como comprobación adicional; no reportarlo
como validación del comando CI por defecto. No copiar código, `.git`, `.env`,
`node_modules`, `.next` ni referencias archivadas al directorio público.

Revisar `out/`: `noindex`, robots, recursos y rutas de la candidata. Mantener
canonicals finales aprobados sin reemplazar globalmente `.com` por `.net`.
No asumir que robots bloqueado garantiza confidencialidad ni desindexación:
un crawler bloqueado puede no leer `noindex`. Validar protección de acceso
si se requiere restringir la prueba y X-Robots-Tag en el servidor.

## Puerta 3: descargar, verificar y transferir desde la Mac

1. Abrir repositorio → Actions → CI; seleccionar la ejecución exitosa de push
   de `qa`, comprobando el SHA completo aprobado, evento, run ID e intento.
2. En Artifacts descargar `listaso-static-<sha>-<run-id>-<intento>`.
3. Descomprimir el ZIP en una carpeta nueva de la Mac. Dentro deben estar
   el tar `listaso-<sha>.tgz`, `BUILD_INFO.json` y `SHA256SUMS`.
4. Desde Terminal entrar en esa carpeta y comprobar:

```sh
shasum -a 256 -c SHA256SUMS
cat BUILD_INFO.json
```

Ambas líneas deben decir OK. Contrastar commit y archiveSha256 del JSON con
el resumen del job; workingTreeClean debe ser true, event push y ref
refs/heads/qa. Confirmar Node/pnpm, repositorio y run ID/intento; no basta que
un archivo se llame como la candidata. Listar el tar identificado por el JSON
con `tar -tzf <nombre-exacto-del-tar>` antes de transferir (sustituir el marcador).
Guardar enlace de ejecución/PR y copia protegida de los tres archivos fuera de
carpetas temporales; el artefacto caduca a los 14 días. No editar ni recompilar
el paquete. Si expiró o falta, generar nueva ejecución sobre el commit aprobado
y validar su procedencia antes de usarla.

El tar contiene el contenido de `out/`, no una carpeta `out` adicional.
Transferir tar, BUILD_INFO.json y hashes por SCP/SFTP autenticado con llave
individual, verificando la huella del servidor con Edgar. Usar un subdirectorio
nuevo de `incoming` por intento. No pasar contraseñas por argumentos.

## Puerta 4: preparar release en servidor (requiere autorización posterior)

1. Comprobar SHA-256 de los archivos recibidos y SHA contra la candidata aprobada.
2. Listar el tar antes de extraer: rechazar rutas absolutas, `..`, enlaces y
   contenido distinto al export esperado. Un hash no autentica un paquete por sí solo.
3. Crear `/srv/listaso/releases/<fecha>-<sha>-<intento>/` con nombre nuevo.
4. Extraer como usuario de publicación, sin root ni permisos del propietario
   del archivo original. Directorios 0755 y archivos 0644; Nginx sólo lectura.
5. Comprobar `index.html`, `404.html`, `_next`, medios y rutas; paquete y
   metadatos permanecen en incoming, fuera de la raíz pública.
6. Prevalidar por un mecanismo local de prueba acordado, sin activar todavía
   el hostname público. No instalar Node/pnpm en el servidor para servir el export.

Nginx debe tener `server_name listaso.net` y raíz `/srv/listaso/current`,
índice `index.html`, rutas compatibles con `trailingSlash: true`, 404 real
(sin fallback universal a Home), protección de archivos ocultos y encabezado
`X-Robots-Tag: noindex, nofollow`. Caché revalidada para HTML y payloads de
navegación; larga sólo para recursos con hash. Revisar CSP con los embeds reales
antes de aplicarla. Probar vídeos y solicitudes Range. La configuración HTTPS
y el bloque exacto se preparan después de revisar la configuración completa.

## Puerta 5: activar y validar (no ejecutada por esta documentación)

Registrar el destino previo de current. En la primera publicación no habrá
enlace anterior: la recuperación es retirar sólo el nuevo sitio `.net` y
volver al default intacto que sirve `/var/www/html`.

Con autorización, crear un enlace temporal en `/srv/listaso` y renombrarlo
atómicamente a `current` (sin intervalo de borrado). Ese cambio requiere sudo
porque el padre es root. Comprobar `nginx -t` antes de recargar si se cambia
configuración; cambiar sólo el enlace no requiere normalmente una recarga.
No reiniciar el servicio. No añadir comandos remotos automáticos a CI todavía.

Validar HTTPS sin excepciones, `/`, todas las rutas del export, refresh en
rutas profundas, navegación cliente, recursos, 404 con estado 404, móviles,
temas claro/oscuro, teclado, movimiento reducido, vídeo y logs sin nuevos 5xx.
Comprobar también que ListasoIQ sigue funcionando.

Zoho u otros embeds restringidos por dominio pueden quedar pendientes en `.net`:
registrar cuál prueba está bloqueada, sin reportarla como aprobada ni enviar
leads/reseñas reales sin autorización. Analytics de producción no debe recibir
pruebas sin control. Revisar antes de `.com` todas las integraciones e IDs.

Si se autoriza activar proxy Cloudflare, validar otra vez TLS, caché, recursos
y logs después. No asumir que todo vídeo es cacheable. Conservar assets de la
release anterior accesibles para sesiones abiertas mediante una estrategia
validada o caché de transición; conservar carpetas por sí solo no evita 404
de chunks antiguos bajo la nueva raíz. Purgar HTML específico si procede,
sin purga global de otros proyectos.

## Reversión y cierre

Ante fallo crítico, detener promociones y volver atómicamente al destino previo
de current. Si se cambió configuración, restaurar sólo la de `.net`, comprobar
`nginx -t` y recargar; nunca sobrescribir el default compartido. En primera
publicación volver al default como se indicó arriba. Revalidar ambos dominios
y caché; la reversión DNS no es instantánea y es un procedimiento separado.

Registrar versión, checksum, responsable, fecha, destino anterior, pruebas y
limitaciones en WORKLOG/ticket. Conservar versiones aprobadas y espacio libre;
la limpieza requiere revisar qué está activo, cuál es rollback y qué assets
siguen siendo usados. No borrar releases automáticamente en esta fase.

El paso a `.com` requiere aprobación separada: preservar las 89 URLs según
`SITE_ROUTE_MAP.md`, resolver blog/artículos/categorías/autor y medios, validar
formularios/reseñas/Zoho, legales, GA4/GTM/Clarity, UTM, sitemap, robots y
canonicals. Tener una copia descargada de WordPress no mantiene sus URLs vivas.
No apagar GoDaddy ni cambiar DNS hasta probar continuidad y recuperación.
