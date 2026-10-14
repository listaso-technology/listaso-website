# Variaciones de sección — Products e Integrations

**Fecha:** 13 de octubre de 2026
**Agente:** Claude, `feat/homepage` (sin tocar archivos reservados por Codex)
**Estado:** Implementado en las 19 páginas de Products e Integrations,
pendiente de revisión de Erick.

## Instrucción

Erick pidió que las páginas no copien la Homepage sino que tengan variaciones
propias en cada sección, inspiradas en cuatro referencias. Pidió también
mantener el copy de `start-version`, aplicar buenas prácticas y rendimiento, y
usar fotos de Unsplash como referencia temporal.

## Análisis de referencias

Se adaptó el **patrón** de cada referencia; su branding, tipografía, colores y
textos no se copiaron.

| Referencia | Qué se tomó | Variante Listaso |
| --- | --- | --- |
| [good-fella.com](https://good-fella.com/) | Titular enorme con cursor de escritura y fila de prueba al pie; cifras con dígitos tipo odómetro; proceso numerado con imagen sticky que cambia; índice de casos con etiquetas entre corchetes; títulos que "ruedan" al hover; FAQ en dos columnas | `HeroEditorial`, `MetricOdometer`, `StickyStory`, `LinkIndex` y `FeatureIndex`, `TextRoll` |
| [symboolic.com/en/bright-factory](https://symboolic.com/en/bright-factory) | Statement centrado con imagen full-bleed debajo; ilustración sticky con tarjetas de pasos que se activan; tarjetas grandes de cifras; transición pixelada entre secciones; imágenes a sangre entre bloques de texto | `HeroStatement` (la imagen crece con el scroll), `StickyStory`, `MetricOdometer`, `PixelDivider`, `ImageBand` |
| [thomasthorstensson.com/project/three-mobile](https://thomasthorstensson.com/project/three-mobile) | Caso de estudio: título y subtítulo, imagen ancha, ficha técnica enmarcada (Client, Date, Scope…), bandas de color a todo el ancho con piezas en pareja, "Explore archive" | `HeroCaseStudy`, `SpecSheet`, `ColorBand`, `NextPage` |
| [stavrossymeonidis.dev](https://www.stavrossymeonidis.dev/) | Titular display gigante en mayúsculas sobre esfera generativa con fila de estado; bento grid de tarjetas; marquesina de etiquetas; carrusel horizontal de servicios | `HeroDisplay` (sólo SAMI), `BentoFeatures`, `Marquee`, `ScrollRail` |

## Catálogo (`src/components/sections/variants/`)

| Variante | Tipo | Notas técnicas |
| --- | --- | --- |
| `HeroStatement` | Hero | Superficie de página (sigue claro y oscuro). La foto crece de tarjeta a full-bleed con CSS scroll-driven (`scale` y `opacity`). Panel de ejemplo encima en desktop y debajo en móvil |
| `HeroEditorial` | Hero | Banda navy con retícula; titular grande con cursor (parpadea 6 veces y se queda); foto 4:5 con trama de medios tonos; fila de calificaciones aprobadas |
| `HeroCaseStudy` | Hero | Título y lead divididos; foto ancha con parallax CSS; se acompaña de `SpecSheet` |
| `HeroDisplay` | Hero | Lienzo SAMI; esfera de puntos con rotación lenta (sólo `transform`, se detiene con movimiento reducido) |
| `ProductHero` (existente) | Hero | Se mantiene en Inventory y B2B como variante dividida |
| `MetricOdometer` | Cifras | Mismos datos aprobados que `ProofStrip` (DEC-013). Valor correcto por defecto; los dígitos ruedan una sola vez al revelarse. Lector de pantalla: valor completo en `sr-only`. **Sólo Homepage y About us** (decisión de Erick del 13 de octubre de 2026); no se usa en Products ni en Integrations, se conserva para About us |
| `StickyStory` + `StoryObserver` | Proceso | Único componente cliente nuevo (`IntersectionObserver`, menos de 1 KB). Sin JS todo es visible. El paso activo se marca con color de título y marcador, nunca con opacidad sobre el texto |
| `BentoFeatures` | Funciones | Disposición según número de items (3, 4, 6, 8, 9) para que todas las filas queden llenas. Celdas con foto y degradado navy sólido bajo el texto |
| `FeatureIndex` / `LinkIndex` | Funciones / enlaces | Filas numeradas grandes; en `LinkIndex` cada fila es un enlace con etiquetas de dirección derivadas de la tabla de sync |
| `Marquee` | Etiquetas | Ligada al scroll, sin autoplay (no requiere control de pausa, WCAG 2.2.2). Sin soporte o con movimiento reducido: lista estática. Copias `aria-hidden` |
| `SpecSheet` | Ficha | `<dl>` enmarcada; las columnas siguen el número de datos |
| `ColorBand` | Showcase | Banda de marca (mesh de la Homepage) con dos piezas en pareja |
| `ScrollRail` | Relacionados | Scroll-snap nativo; región enfocable con nombre |
| `NextPage` | Navegación | Siguiente página del mismo grupo del menú, con etiqueta y descripción de `navigation.ts` |
| `PixelDivider` | Decorativo | SVG estático en tokens de superficie |
| `ImageBand` | Imagen | Foto a sangre con parallax CSS |
| `TextRoll` | Micro | Copia `aria-hidden`; sin efecto con movimiento reducido |

Soporte: `src/components/media/ResponsivePhoto.tsx` (`<picture>` con `srcset`
de 768/1280/1920 y `next/image` de respaldo; `loading="eager"` y
`fetchPriority="high"` sin preload, para no descargar dos veces) y
`HeroParts.tsx` (CTA, eyebrow, línea de plan y `FillPhoto`).

## Asignación por página

| Página | Hero | Secciones |
| --- | --- | --- |
| Pre-sales | Editorial + pedido | Bento (2 fotos) · Store visit sticky (4 fotos) · Rail · Integraciones · Next |
| Direct store delivery | Statement + stock del camión | Marquesina doble · Índice de funciones · Banda para choferes (foto + factura) · Relacionados · Next |
| Inventory | Dividido (existente) + picking | Bento (2 fotos) · Divisor pixelado · Fresh product · Rail · Next |
| Delivery | Editorial + parada firmada | Índice · Imagen aérea a sangre · Banda "Why it matters" (foto + ruta) · Relacionados · Next |
| Back Office | Statement + dashboard | Bento (2 fotos) · Better decisions · Rail · Next |
| B2B online store | Dividido + tienda | Marquesina doble · Funciones destacadas · Imagen a sangre · Relacionados · Next |
| Forms and surveys | Statement + encuesta | How it works sticky (foto, foto, encuesta, resultados) · 12 tipos en marquesina display · Ideas · Next |
| Sami AI | Display (SAMI) | Ejemplos con la conversación sticky · Bento incluido · Precios · FAQ · Next |
| Custom development | Caso de estudio + plan | Ficha técnica · Índice · Proceso sticky (4 fotos) · Rail · Next |
| Integrations (hub) | Statement | Divisor pixelado · Sync en banda con diagrama · Marquesina de sistemas · Índice de sistemas · Hardware y custom |
| 8 sistemas | Caso de estudio + panel de sync | Ficha técnica (datos de la tabla) · Bento con foto · Tabla de sync · Prueba (QuickBooks/Sage) · Otros sistemas · Next |
| Printers and scanners | Statement sin CTAs | Bento de opciones · Tabla de modelos · Dispositivos · Next |

**Cifras de marca.** La sección "Since 2015 · 400+ · 2,000+ · 2M+ · $1.8B+" se
muestra sólo en la Homepage y, cuando exista, en About us (decisión de Erick,
13 de octubre de 2026). Se retiró de las 19 páginas de Products e
Integrations.

**Copy.** No se añadió copy nuevo. Las etiquetas de la ficha técnica y las
etiquetas del índice salen del copy existente: los títulos "From X to
Listaso" y "Both ways" de la sección de sync, el eyebrow de cada página y las
descripciones del menú.

## Fotografía nueva (DEC-009)

Nueve fotos en `public/images/sections/`, tres anchos cada una (2.7 MB en
total en disco; el navegador descarga sólo el ancho que necesita). Manifiesto
con autor, URL y brief en `src/content/media/sections.ts`. Se descartaron por
marcas visibles: furgoneta con logo de Renault, supermercado con empaques
reconocibles, terminales con logo de Square, SpotOn y Cova, y escáner Zebra.

## Rendimiento y accesibilidad

- 1 componente cliente nuevo (`StoryObserver`); el resto es CSS. Sin
  dependencias ni GSAP.
- Animaciones ligadas al scroll con `animation-timeline: view()` dentro de
  `@supports`, sólo con `transform`, `scale`, `translate` u `opacity`.
  Movimiento reducido o falta de soporte: estado final estático.
- HTML exportado entre 24 y 46 KB gzip por página. Se quitaron los iconos de
  las marquesinas porque duplicaban SVG.
- Imágenes con dimensiones explícitas (sin layout shift) y `sizes` por
  ubicación.
- Validado:
  - 0 overflow horizontal a 320, 375, 768, 1024 y 1440 px en las 19 páginas.
  - Contraste AA en 4,085 textos sobre fondo sólido, en claro y en oscuro: 0
    fallos reales; sólo los numerales decorativos `aria-hidden` de B2B quedan
    bajos.
  - Un `h1` por página, sin saltos de heading y sin IDs duplicados.
  - Sin errores de consola.

## Pendientes

- Las fotos son placeholders; Diseño puede usar los briefs del manifiesto.
- `HomeMotion` (de Codex) ya revela estas páginas. Conviene renombrarlo a algo
  genérico cuando Codex libere el archivo.
- Medir en un dispositivo móvil real el costo de las animaciones ligadas al
  scroll (INP/CLS); Safari reciente las soporta y el resto cae al estado
  estático.
