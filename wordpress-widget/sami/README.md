# Widget temporal de SAMI para Elementor Pro

Vista previa de `/sami/` para el sitio WordPress actual mientras llega el
lanzamiento completo. Generado a partir de la página real (`localhost:3000/sami/`).

## Qué incluye
Hero (con el fondo de seda y la espiral), ejemplos con chat animado, features, pricing,
formulario de ventas (Zoho embebido, con su autoajuste de altura) y FAQ. No incluye header,
footer, breadcrumb, "next page" ni el CTA final de Home (el sitio WordPress
tiene los suyos). Copy y precios salen de `src/content/products/sami.ts`.

## Cómo instalarlo
1. En Elementor, añade un widget **HTML** en un contenedor de **ancho completo**
   (sin padding ni overflow hidden, para que los fondos lleguen de borde a borde y
   el chat `sticky` funcione).
2. Pega el contenido de `sami-widget.html` (CSS, HTML y JS embebidos, todo-en-uno).
3. Fuente: hereda la del tema. SAMI usa Montserrat 800 itálica para la marca.

## Marca animada de SAMI (video opcional)
El hero rota el poster de SAMI (embebido a 560 px) y, al hover, repite el giro. El video
de entrada (`public/brand/sami/sami-animation.webm`, 1.2 MB) NO va embebido. Para activarlo:
sube el `.webm` a la Biblioteca de Medios de WordPress y regenera con
`SAMI_VIDEO_URL=<url> node wordpress-widget/sami/build/build-widget.mjs`, o añade
`data-video-src="<url>"` al `<div id="listaso-sami">`. Sin URL, el widget usa el mismo
comportamiento de respaldo que la página Next (un giro completo y luego hover).

## Aislamiento
Todo cuelga de `#listaso-sami` y las clases llevan prefijo `lsm-`, así que no
choca con el tema ni con Elementor. Solo tema claro (el hero es oscuro por diseño).
Sin imágenes externas: logo, fondo y espiral del hero van en base64 (el widget pesa ~530 KB, sobre todo imágenes). Sin dependencias.

## Archivos
- `sami-widget.html`: entregable todo-en-uno.
- `sami-widget.css` / `sami-widget.js`: las mismas partes por separado (referencia;
  el CSS puede ir al CSS personalizado de Elementor).
- `build/`: generador. Con `pnpm dev` activo: `node wordpress-widget/sami/build/build-widget.mjs`.

## Verificado
Última regeneración: 26 de octubre de 2026 (sobre la página con hero nuevo y formulario de ventas). Alturas de sección idénticas a la página original a 1440 y 375 px (salvo el
hero, 76 px menor por quitar el breadcrumb), sin scroll horizontal, probado dentro
de una página con CSS de tema hostil. Selector de ejemplos y FAQ funcionan; el chat
avanza y se pausa fuera de pantalla, en pestaña oculta, al pasar el cursor y con
`prefers-reduced-motion`.

## Pendiente de revisar
- Prueba real dentro de WordPress/Elementor (no se tuvo acceso).
- Los CTA apuntan al Calendly de `externalLinks.demo`; confirmar para el lanzamiento.
- Si el tema ya muestra un `h1`, convertir el del hero a `h2`.
- Regenerar si cambia el copy de SAMI (el working tree actual tiene cambios sin commit).
- Regenerar para incorporar la entrada en WebM del logo en `/sami/`; la versión
  actual del widget conserva el logo estático anterior.
