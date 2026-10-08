# Análisis de marca y fuentes visuales

**Fecha:** 8 de octubre de 2026
**Autor:** Claude (análisis read-only)
**Estado:** Evidencia para Codex y Claude. Las reglas operativas viven en
`docs/DECISIONS.md` (DEC-007 a DEC-010) y en las referencias de las Skills
`listaso-*`; este documento explica de dónde salen.

Etiquetas: `CONFIRMADO` (impreso en la fuente), `OBSERVACIÓN` (visto, no
especificado), `CONFLICTO`, `DESCONOCIDO`.

## Fuentes y autoridad

| Fuente | Ruta | Uso |
| --- | --- | --- |
| Guía de marca | `~/Documents/Proyect reference LISTASO WEBSITE/Guide Sami Listaso AI/BrandGUIDElastConceptJ13.pdf` (34 p., Illustrator, 2026-07-21) | Fuente principal de marca. Es un concepto con errores; Marketing la auditará. |
| Sitio heredado | `start-version/` | Base de diseño y estructura. Read-only. |
| Guide Sami Listaso AI | `~/Documents/Proyect reference LISTASO WEBSITE/Guide Sami Listaso AI/project/` | Referencia estética para SAMI e IA. Su código no se integra. |

Ninguna de las tres carpetas se modificó.

## 1. Guía de marca

**Esencia (CONFIRMADO).**
- Misión y visión en español (p. 3). La misión es simplificar la complejidad
  operativa de la cadena comercial. La visión es ser referencia de tecnología
  B2B comercial y logística en Latinoamérica y Norteamérica.
- Concepto: "Flexibility + Brand recognition + Growth" (p. 4).
- Valores: profesionalismo, claridad, confianza e innovación (p. 21).
- CTA mostrado: "BOOK A DEMO" (p. 33).
- No hay sección de tono ni taglines oficiales. Las frases de la p. 33 son
  ejemplos de piezas, no taglines aprobados.

**Paleta (CONFIRMADO, p. 17, sólo HEX):**

| Color | HEX |
| --- | --- |
| Navy | `#00375B` |
| Ink | `#151726` |
| Blue | `#0960FF` |
| Aqua | `#00BDA9` |
| Green | `#03EA78` |
| Yellow | `#FFC801` |
| Magenta | `#FF3A6A` |
| Red | `#DA415D` |
| Neutral | `#DFDFDF` y `#DFDFDF` al 30 % |

- Significados (p. 16): navy = confiabilidad, blue = innovación, aqua =
  crecimiento, magenta = acento para CTAs.
- Regla 60-30-10 citada sin asignar colores.
- Prohibiciones (p. 18-19): el rojo no domina, no se usa rojo en degradados y no
  se usan colores fuera de la paleta.

**Tipografía (CONFIRMADO).**
- Montserrat (p. 21-22).
- La escala de la p. 23 (títulos de 64-80px, cuerpo de 28-30px) es para piezas
  sociales y de impresión, no para web.
- OBSERVACIÓN, en todas las páginas: la primera palabra va en Bold Italic y el
  resto en Regular.

**Logo (CONFIRMADO, p. 5-13).**
- Versiones: horizontal "**Listaso** Technology" (principal), vertical e
  isotipo de tres barras sobre un cuadrado blanco redondeado.
- Variantes monocromas e inversas.
- Uso: horizontal si hay espacio, vertical en espacios estrechos, isotipo en
  tamaños pequeños o digitales.
- Prohibiciones (p. 13): cambiar colores, deformar, rotar, cambiar la
  tipografía del wordmark, sacar el ícono del cuadrado blanco, ni íconos todo
  rojo o todo verde.
- Espacio libre "0.3"/"X" sin unidad definida.
- Sin tamaño mínimo.

**Productos (CONFIRMADO, p. 14-15 y 25-29).**
- Hay íconos propios para Sales, DSD, Inventory, Inventory Advanced, Delivery,
  eCommerce App y Web, Sales Advanced y Back Office.
- El efecto vidrio se reserva para el ícono de la app y para "AI containers and
  widgets".
- SAMI no aparece en la guía.

**Errores de la guía (CONFLICTO).**
- La muestra de color del archivo tiene `#FF0080` donde la página imprime
  `#FF3A6A`.
- Prohíbe el logo sobre bloques de color, pero lo muestra sobre degradados.
- Prohíbe degradados rojos, pero la portada usa un mesh magenta.
- Fichas de producto copiadas mal (p. 14-15 y 27-29), erratas y nombres de
  producto inconsistentes.
- Aparecen marcas de terceros (Zebra) y testimonios con nombre, que requieren
  aprobación antes de usarse.

## 2. `start-version/`

Los tokens de `source/site_src/assets/site.css:3-13` usan exactamente la paleta
de la guía.

- Superficies claras: bg `#F5F8FB`, surface `#FFF`, text `#151726`, muted
  `#4A5569`, line `#DCE3EC`, heading `#00375B`, soft `#E9F3F6`, aqua-text
  `#007F72`.
- Ya tiene modo oscuro.
- Montserrat se carga desde Google Fonts, con 8 archivos.
- El encabezado usa `<em>` italic 800 seguido de regular.

**Colores del logo (CONFLICTO).** El SVG (`listaso-mark.svg`) usa `#00BCA8`,
`#003F69` y `#FF1975`, que no coinciden con la paleta. El wordmark es texto
HTML "Listaso", no el wordmark oficial.

**Deuda visual:**
- 15 radios distintos, 5 sombras sueltas, 31 tamaños de texto y 14 breakpoints.
- No hay escala de espaciado.
- Los heros de las páginas internas son sólo texto.
- No hay fotografía.
- Secciones consecutivas con el mismo fondo.
- 30 `style=` en el home.
- Colores fuera de la paleta en los popups de chat (`#0a66c2`, `#111827`).

**Accesibilidad:**
- El CTA (blanco sobre `#DA415D`) tiene 4.29:1 y no pasa AA.
- El hover (blanco sobre `#FF3A6A`) tiene 3.46:1.
- El widget de SAMI se abre solo en escritorio.

**Que conservar:**
- Bandas navy/ink con mesh de degradado.
- Patrón *Bold Italic* en titulares.
- Tokens semánticos.
- Eyebrow, `sec-head` y `lead`.
- Mockups HTML del producto.
- FAQ con `<details>`.
- Carrusel con scroll-snap.
- Regla de reduced motion.

## 3. Guide Sami Listaso AI

App React/Vite del equipo de Marketing. Es sólo de tema oscuro y su CSS está
minificado en `app/globals.css`.

**Lenguaje visual reutilizable (OBSERVACIÓN):**
- Canvas `#02090d` con orbes radiales que se mueven lentamente (32-39 s).
- Tarjetas con degradado translúcido (`145deg, #0c2d40d9 → #071e2ce8`), borde
  frío de 1px y elevación al pasar el cursor.
- Titulares ligeros (400-500) con tracking negativo.
- Eyebrow teal en mayúsculas y pill "NEW" azul.
- Chat animado: texto escribiéndose a 38 ms por carácter, puntos de "escribiendo"
  y chip de archivo listo.
- Dashboards: barras que crecen y líneas que se dibujan.
- Carrusel continuo de reviews con bordes difuminados y pausa al pasar el cursor
  o enfocar.
- Halo azul y teal detrás del logo de SAMI.
- Lista de características separada por divisores.
- Áreas táctiles de 44px y alternativas para reduced motion en cada componente.

**Tokens observados de SAMI:**

| Rol | Valor |
| --- | --- |
| canvas | `#02090d` |
| card | `#092332` |
| popover | `#071b29` |
| secondary | `#0c2b3d` |
| accent | `#123b52` |
| border | `#224355` |
| input | `#193848` |
| muted | `#a4bdcb` |
| lead | `#9ebaca` |
| eyebrow | `#66dcd4` |
| focus | `#70d4ff` |
| primary | `#0960FF` |
| glow | `#0abaa9` |

**Riesgos:**
- Montserrat se declara pero nunca se carga.
- El hover `#347cff` tiene 3.84:1 y no pasa AA.
- `#0960FF` como texto sobre el canvas tiene 3.94:1 y no pasa AA.
- El logo de SAMI sólo existe en PNG brillante, sin vector.
- Los logos de Claude y ChatGPT son marcas de terceros.
- La copy incluye precios ("SAMI Credit $9.99").
- El idioma sólo cambia del lado del cliente, sin rutas.

**No reutilizable:** código, edición del owner, autenticación, D1/R2,
conectores ni el enrutado por hash.

## 4. Contraste calculado (WCAG 2.x)

| Par | Ratio | Resultado |
| --- | --- | --- |
| Blanco / `#00375B` | 12.37 | AA |
| Blanco / `#151726` | 17.76 | AA |
| Blanco / `#0960FF` | 5.09 | AA |
| Blanco / `#00BDA9` | 2.37 | Falla |
| Blanco / `#FF3A6A` | 3.46 | Falla |
| Blanco / `#DA415D` | 4.29 | Falla |
| Blanco / `#D83553` (ajuste de `#DA415D`) | 4.61 | AA |
| Blanco / `#BF2A47` (hover) | 5.77 | AA |
| `#151726` / `#FF3A6A` | 5.13 | AA |
| `#0960FF` / blanco | 5.09 | AA |
| `#0960FF` / `#F5F8FB` | 4.77 | AA |
| `#007267` / `#F5F8FB` | 5.47 | AA |
| `#00BDA9` / blanco | 2.37 | Falla también como no-texto |
| `#008476` / blanco | 4.60 | AA |
| `#5FE6D6` / `#00375B` | 8.12 | AA |
| `#00BDA9` / `#00375B` | 5.21 | AA |
| `#0960FF` / `#00375B` | 2.43 | Falla |
| `#7A889B` / blanco (borde de input) | 3.61 | ≥3:1 |
| `#03EA78` y `#FFC801` con `#151726` | 11.03 y 11.43 | AA, sólo como fondo |
| `#4D8DFF` / `#02090d` (azul como texto en SAMI) | 6.27 | AA |
| `#0050E6` con texto blanco (hover de SAMI) | 6.38 | AA |

## 5. Pendientes para Marketing y Diseño

- Logo oficial en vector: horizontal, vertical e isotipo. Debe definir los HEX
  reales del isotipo.
- Logo de SAMI en vector y versión para fondo claro.
- Íconos de producto en vector.
- Auditoría de marca: nombres de colores, mapeo 60-30-10, magenta definitivo y
  taglines.
- Fotografía propia que reemplace las imágenes temporales de Unsplash (DEC-009).
- Trato en español (tú o usted).
