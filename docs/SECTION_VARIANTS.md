# Variaciones de sección — Products, Integrations, Company y Pricing

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
| `HeroCaseStudy` | Hero | Eyebrow + título a la izquierda, lead y CTAs a la derecha tras un filete, sobre retícula tenue; foto ancha con parallax CSS y sombreado inferior; se acompaña de `SpecSheet` (rediseñado el 21 de octubre de 2026) |
| `HeroDisplay` | Hero | Lienzo SAMI; esfera de puntos con rotación lenta (sólo `transform`, se detiene con movimiento reducido) |
| `ProductHero` (existente) | Hero | Se mantiene en Inventory y B2B como variante dividida |
| ~~`MetricOdometer`~~ | Cifras | **Retirado el 20 de octubre de 2026:** About us usa el mismo `ProofStrip` (bento interactivo) que la Homepage, para que las cifras se mantengan iguales en ambas páginas. Sigue la regla: **sólo Homepage y About us** (decisión de Erick del 13 de octubre de 2026) |
| `StickyStory` + `StoryObserver` | Proceso | Único componente cliente nuevo (`IntersectionObserver`, menos de 1 KB). Sin JS todo es visible. El paso activo se marca con color de título y marcador, nunca con opacidad sobre el texto |
| `BentoFeatures` | Funciones | Bento con disposición según número de items (3, 4, 6, 8, 9) y fotos en las celdas grandes. Reimaginado el 20 de octubre de 2026 (mismo nombre y API): cada celda tiene tono propio (`proofTones`), inclinación 3D sutil, luz y brillo de borde que siguen al puntero (`ProofGrid`), marca de agua del icono con paralaje y zoom/paralaje de foto. Sólo con mouse; estático con touch, teclado o movimiento reducido |
| `FeatureIndex` / `LinkIndex` | Funciones / enlaces | Filas numeradas grandes; en `LinkIndex` cada fila es un enlace con etiquetas de dirección derivadas de la tabla de sync. Desde el 21 de octubre de 2026, con 4 funciones o menos `FeatureIndex` muestra tarjetas ilustradas (`FeatureArt`: ilustraciones sin texto según el icono, que se arman al revelarse) en lugar del explorador |
| `Marquee` | Etiquetas | Ligada al scroll, sin autoplay (no requiere control de pausa, WCAG 2.2.2). Sin soporte o con movimiento reducido: lista estática. Copias `aria-hidden` |
| `SpecSheet` | Ficha | Tarjeta elevada que solapa la foto de `HeroCaseStudy`: intro a la izquierda y `<dl>` en columnas con filetes; `wide` da más ancho a un dato; valores enriquecidos (listas) permitidos; `overlap={false}` en integraciones (el hero ya fija su panel ahí) |
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
| QuickBooks | Dividido (banda) + panel de sync y rating | Certificado (listados + reseña) · Órbita two-way + selector Desktop/Online · Explorador de funciones con foto · Otros sistemas · Next |
| Sage 100 | Statement + panel de sync | Tablero de carriles horizontales entre pilares · Pila de tarjetas sticky de funciones · Reseña · Otros sistemas · Next |
| Acumatica | Caso de estudio + panel de sync | Ficha técnica · Bento con foto · Tabla de sync con carriles · Otros sistemas · Next |
| SAP | Dossier + caja con toda la sync | Rejilla dossier 3×3 que se invierte + foto halftone · Otros sistemas · Next |
| NetSuite | Centrado + foto ancha con ambos sistemas | Puente de sync entre pilares · Funciones en pestañas con ilustración · Otros sistemas · Next |
| Zoho | Mosaico (superficie de página) | Sync con filtro por dirección · Mosaico de funciones · Otros sistemas · Next |
| Acctivate | Inmersivo a sangre + panel | Ruta de sync con camión (scroll) · Funciones en un teléfono · Otros sistemas · Next |
| AccountMate | Espejo (foto en arco) + marquesina de la sync | Dial de sync por dirección · Línea de tiempo de funciones · Otros sistemas · Next |
| Printers and scanners | Statement sin CTAs | Bento de opciones · Tabla de modelos · Dispositivos · Next |

**Cifras de marca.** La sección "Since 2015 · 400+ · 2,000+ · 2M+ · $1.8B+" se
muestra sólo en la Homepage y, cuando exista, en About us (decisión de Erick,
13 de octubre de 2026). Se retiró de las 19 páginas de Products e
Integrations.

**Integraciones con identidad propia (21 de octubre de 2026, DEC-023).**
Cada sistema tiene su composición en
`src/components/sections/integrations/pages/<Sistema>Layout.tsx`; los
componentes nuevos viven en `integrations/` (por sistema y en `parts/`) y no
se usan fuera de esas 8 páginas. Todas muestran lo mismo: copy y foto del
hero, panel de sync, resumen, cada fila de sync con su dirección y cada
función.

**Copy.** No se añadió copy nuevo. Las etiquetas de la ficha técnica y las
etiquetas del índice salen del copy existente: los títulos "From X to
Listaso" y "Both ways" de la sección de sync, el eyebrow de cada página y las
descripciones del menú.

## Variantes "dossier" — Company y Pricing (14 de octubre de 2026)

Referencia: [ddark.dev](https://ddark.dev/) (sólo secciones: Dossier,
Record, Arsenal, Chronology, Core pillars, Selected work, Channels). Se
adaptó el patrón; su branding y textos no se copiaron. Decisión: DEC-017.

| Variante | Tipo | Notas técnicas |
| --- | --- | --- |
| `HeroDossier` | Hero | Superficie de página; eyebrow entre corchetes (los corchetes son contenido CSS con texto alternativo vacío); H1 display en mayúsculas; aside opcional |
| `DossierHeader` | Encabezado | H2 display (`large` o `small`) con firma Listaso |
| `DossierBox` | Ficha | Caja enmarcada con estado entre corchetes, filas con etiqueta o check, `<dl>` opcional y barra de acento que se llena una vez |
| `DossierPhoto` | Imagen | Marco grueso, medios tonos en escala de grises que recupera el color al hover |
| `Chronology` | Lista | Entradas con regla y línea de acento; enlace externo opcional con aviso de pestaña nueva |
| `KineticWords` | Pilares | Palabra sólida estática (la que leen los lectores de pantalla) y dos copias con contorno `aria-hidden` que derivan con el scroll, sólo en pantallas anchas |
| `ChannelList` | Contacto | Etiqueta y valor grande con `TextRoll`; container query: la etiqueta pasa arriba cuando la lista es angosta (sirve en un aside) |
| `IndexPreview` | Índice | Filas grandes; en desktop una vista previa sticky muestra la foto de la fila con hover (`:has()`, sin JS); en móvil la foto va en línea. Encabezado visible u `h2` `sr-only` |
| `FaqList` | FAQ | Encabezado sticky y `<details>` nativos |
| `NoteGrid` | Notas / citas | Retícula con reglas; modo `quotes` con `blockquote` y `figcaption` |
| `LinkRows` | Navegación | Enlaces internos grandes numerados |
| `GridPattern` (`pricing/`) | Fondo | Patrón del footer en tokens, animado (ver DEC-017) |
| `PlanBoard` (`pricing/`) | Precios | Hero de Pricing, selector con perilla SAMI, precios que ruedan, tres planes en un marco con reglas, notas y add-on de Sami |
| `CompareTable` (`pricing/`) | Tabla | Encabezado sticky bajo el header en desktop; en móvil, desplazamiento horizontal con la columna de funciones fija y región enfocable |

### Asignación por página

| Página | Secciones |
| --- | --- |
| `/about/` | `HeroDossier` + `DossierPhoto` · `ProofStrip` · historia con Misión y Visión en `DossierBox` · valores en `KineticWords` · `LinkRows` · `FinalCta` |
| `/industries/` | `HeroDossier` + `DossierBox` de la especialidad · `IndexPreview` de 7 industrias · `RelatedRail` · `NextPage` · `FinalCta` |
| `/support/` | `HeroDossier` + `ChannelList` · tabla de tiempos de respuesta y horario · `Chronology` de urgencias · calificaciones y `NoteGrid` de citas · `NextPage` · `FinalCta` |
| `/listaso-impact/` | `HeroDossier` + `DossierPhoto` · `KineticWords` de áreas · `Chronology` de publicaciones · retícula tipográfica de aliados · `NextPage` |
| `/join-us/` | `HeroDossier` · cultura y crecimiento en dos columnas · beneficios en `DossierBox` · vacantes · `NextPage` |
| `/contact-us/` | `HeroDossier` con CTAs · canales en tres columnas · oficinas con `DossierPhoto` · `NextPage` · `FinalCta` |
| `/plans/` | `PlanBoard` sobre `GridPattern` · `CompareTable` · `FaqList` · `FinalCta` |

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
