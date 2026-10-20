# Handoff: Company y Pricing (EN)

```text
Tarea: /about/, /industries/, /support/, /listaso-impact/, /join-us/, /contact-us/ y /plans/
Objetivo: copy de start-version, secciones personalizadas (ddark.dev) y, en Pricing,
  el patrón del footer animado (claro y oscuro) con selector de facturación SAMI
Estado: complete (pendiente de revisión de Erick; selector SAMI pendiente del CodePen)
Agente implementador: Claude, en paralelo con Codex
Branch: feat/homepage
Working tree: cambios sin commit; commit, push y PR no autorizados
Archivos reservados: ninguno (liberados)
```

## Archivos

**Nuevos**
- Rutas: `src/app/(site)/{about,industries,support,listaso-impact,join-us,contact-us,plans}/page.tsx`.
- Contenido: `src/content/company/{about,industries,support,impact,careers,contact}.ts`,
  `src/content/pricing/plans.ts`.
- Secciones: `src/components/sections/company/{About,Support,Impact,Careers,Contact}Sections.tsx`,
  `src/components/sections/pricing/{GridPattern,PlanBoard,CompareTable}` (+ módulos CSS).
- Variantes: `HeroDossier`, `DossierHeader`, `DossierBox`, `DossierPhoto`,
  `Chronology`, `KineticWords`, `ChannelList`, `IndexPreview`, `FaqList`,
  `NoteGrid`, `LinkRows`, `dossier.module.css` en `src/components/sections/variants/`.
- Fotos: 8 slots nuevos (6 industrias, 2 oficinas) × 3 anchos en
  `public/images/sections/`, registrados en `src/content/media/sections.ts`.
- Docs: `docs/COMPANY_PRICING_CONTENT_CONTRACT.md`, este handoff.

**Modificados (archivos propios de Claude)**
- `NextPage.tsx`: grupo "Company" con lista de rutas de la app (omite
  `/rating/` y `/blog/`).
- `MetricOdometer.tsx`: en laptops (1024 px) la retícula pasa a 3 + 2 tarjetas;
  en 5 columnas "$1.8B+" desbordaba su tarjeta. Una fila de 5 desde `xl`.
- `docs/DECISIONS.md` (DEC-017), `docs/SECTION_VARIANTS.md`, `docs/WORKLOG.md`.

**Codex: sin cambios.** Se importan tal cual `FinalCta`, `HomeMotion`,
`Stars`, `Button`, `Container`, `Signature`, `Breadcrumbs`. `SiteFooter` no se
tocó: el patrón se reconstruyó en `GridPattern` con tokens.

## Validaciones ejecutadas

- `pnpm lint` (0 warnings), `pnpm typecheck` y `pnpm build`: OK, 31 rutas
  estáticas.
- Export estático en `:4173`:
  - Sin desbordamiento horizontal en 7 páginas × 6 anchos (320, 375, 768,
    1024, 1280, 1440).
  - Sin texto que se salga de su caja.
  - Estructura: un H1 por página, sin saltos de nivel, sin IDs duplicados,
    sin `aria-labelledby` roto.
  - Contraste AA: 0 fallos reales en claro y oscuro. Los únicos avisos son
    falsos positivos del script en componentes de Codex (enlaces ocultos del
    menú, banda `FinalCta` con degradado).
  - Consola sin errores. Imágenes visibles cargadas.
- Selector de facturación probado con clic en el riel:
  - la perilla SAMI se desplaza y gira;
  - el riel cambia de color;
  - los precios ruedan a los anuales;
  - aparece "Billed yearly at $…";
  - los precios `sr-only` cambian a $48.33 / $56.66 / $64.99.

## Decisiones tomadas

- DEC-017 (variantes dossier, patrón del footer animado, selector SAMI,
  NextPage Company).
- En About se descartó la foto `storeCounter` (personas que podían leerse
  como el equipo) y se usa `warehouseAerial`.
- `ChannelList` usa container queries para funcionar dentro del aside del hero
  de Support.
- La tabla comparativa usa `min-w-[34rem]` en móvil para que se vea parte de
  la siguiente columna (indica que se desplaza).

## Desconocidos y validación

Preguntas C1–C9 en `docs/COMPANY_PRICING_CONTENT_CONTRACT.md`: tabla
comparativa, FAQ de precios, formulario de Zoho (REQUIERE VALIDACIÓN DEV),
aliados y publicaciones de Impact, `info@listaso.com`, direcciones, beneficios
y el CodePen del selector.

## Riesgos

- Fotos temporales: las de oficina son contexto de ciudad y deben
  reemplazarse por fotos reales aprobadas.
- `KineticWords` y `GridPattern` usan scroll-driven animations; en
  navegadores sin soporte quedan estáticos, sin pérdida de contenido.

## Siguiente acción recomendada

1. Erick comparte el enlace de CodePen y se ajusta la perilla SAMI.
2. Revisión visual de Erick en ambos temas.
3. Ventas / Development responden C1–C3 antes del cutover.

## Seguimiento (14 de octubre de 2026)

- **Error en dev "Cannot use 'in' operator to search for 'base' in undefined"**
  en `/industries/`, `/listaso-impact/` y `/contact-us/`: el `next dev` del
  puerto 3000 llevaba corriendo desde el 12 de octubre y conservaba en memoria
  la versión anterior de `src/content/media/sections.ts`, sin los 8 slots
  nuevos. El código era correcto (el build ya generaba esas páginas). Con
  permiso de Erick se reinició el servidor; las 27 rutas responden 200, sin
  overlay de errores ni errores de servidor. Si vuelve a ocurrir tras agregar
  fotos, reiniciar `pnpm dev`.
- **Aviso de `next/image` en dev** ("fill" con padre `position: static`):
  `ResponsivePhoto` ahora posiciona el `<picture>` (`absolute inset-0`) cuando
  usa `fill`. Misma geometría (verificada en Industries, About, Contact,
  Integrations y Delivery) y sin avisos.
- `.claude/launch.json` incluye la configuración `dev` (puerto 3000) además de
  `static-export`.
