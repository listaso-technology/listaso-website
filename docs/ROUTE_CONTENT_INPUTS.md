# Entradas para la matriz de rutas y contenido

**Fecha:** 8 de octubre de 2026  
**Alcance:** Inventario documental de rutas existentes y previstas. No crea
páginas, redirects, deployments ni cambios en WordPress, Analytics o Search
Console.

## Seguridad y manejo de datos

- No compartir usuario, contraseña, código 2FA, cookie, token ni llave de API.
- Exportar los reportes desde cada producto y adjuntar los archivos al chat.
- No guardar exports crudos de Analytics o Search Console en Git; pueden incluir
  términos de búsqueda, campañas u otros datos operativos.
- La información consolidada que sí entre al repositorio será sólo la necesaria
  para decidir rutas, preservación SEO y medición.

## Paquete mínimo para comenzar

1. **WordPress — contenido completo.** En `Herramientas > Exportar`, elegir
   `Todo el contenido` y descargar el archivo WXR/XML. Debe incluir páginas,
   entradas, categorías, etiquetas, autores, campos y tipos de contenido que
   WordPress permita exportar.
2. **WordPress — SEO y redirects.** Indicar el plugin SEO activo y el plugin o
   lugar donde se administran redirects. Exportar su lista si ofrece esa opción;
   si no, enviar capturas o una lista. Compartir también la URL de cada sitemap.
3. **Search Console — páginas.** Para la propiedad correcta y el intervalo más
   amplio realmente disponible, exportar Rendimiento con la dimensión
   `Páginas`: clics, impresiones, CTR y posición media.
4. **GA4 — landing pages.** Para el mismo intervalo, exportar el informe
   `Página de destino`. Incluir, cuando esté disponible: sesiones, usuarios
   activos, usuarios nuevos, tiempo medio de interacción por sesión y eventos
   clave.

Con esos cuatro insumos se puede empezar a cruzar las 89 URLs, los 56 artículos,
`start-version/` y las rutas nuevas sin crear páginas.

Para este proyecto, Erick confirmó que el historial disponible comienza el 1 de
agosto de 2026, fecha en que conectó las herramientas. No se esperan datos
anteriores y ese intervalo se usa como baseline oficial.

## Paquete recomendado para cerrar la matriz

### Search Console

- Rendimiento por `Consultas`, para reconocer intención y términos que no deben
  perderse.
- Indexación de páginas, para distinguir indexadas, excluidas, redirigidas y 404.
- Lista de sitemaps enviados y su estado.
- Si existen varias propiedades (`https`, dominio, subdominio de blog), indicar
  cuáles son las vigentes y exportar cada una por separado.

### GA4

- `Páginas y pantallas`, usando ruta de página como dimensión y vistas/usuarios
  como métricas.
- Si el informe lo permite, añadir fuente/medio de sesión a landing pages; si no,
  exportarlo como informe separado.
- Lista de eventos y eventos clave vinculados a formularios, demo, contacto,
  SAMI, Zoho, descarga o navegación relevante. En esta fase basta el nombre y
  una descripción; no hacen falta IDs secretos.

### WordPress y sitio anterior

- Tipos de contenido personalizados, si existen.
- Menús actuales y páginas marcadas como borrador, privadas o noindex que tengan
  un destino futuro previsto.
- Redirects configurados fuera de WordPress, por ejemplo en hosting, CDN, Apache
  o Nginx.
- Confirmación del destino deseado del blog y de las rutas `/rating/` y
  `/book-a-demo/`; si aún no hay decisión, quedarán marcadas como pendientes.

## No es necesario todavía

- Acceso administrativo compartido a WordPress, GA4 o Search Console.
- Backup de base de datos, biblioteca completa de medios o descarga del tema.
- Credenciales de API, Google Tag Manager, Clarity o Cloudflare.
- Assets finales, traducciones finales o implementación de componentes.

Esos elementos se solicitarán sólo cuando una etapa posterior los necesite y se
pueda definir el acceso mínimo correspondiente.

## Convención al entregar archivos

Nombrar cada export con fuente, propiedad e intervalo, por ejemplo:

```text
wordpress-listaso-all-content-2026-10-08.xml
gsc-listaso-com-pages-2025-06-08--2026-10-08.csv
gsc-listaso-com-queries-2025-06-08--2026-10-08.csv
ga4-listaso-landing-pages-2025-06-08--2026-10-08.csv
```

Si el blog usa otra propiedad o instalación, mantener sus archivos separados.
