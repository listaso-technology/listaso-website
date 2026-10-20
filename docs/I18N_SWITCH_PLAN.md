# Selector de idioma ES/EN — auditoría y propuesta (bloqueado)

**Fecha:** 19 de octubre de 2026
**Autor:** Claude (`feat/homepage`), a partir del encargo editorial de la Homepage
**Estado:** `BLOQUEADO` hasta recibir copy español revisado y aprobar paridad.
No hay selector visible ni rutas `/es/` en esta tarea.

## Por qué está bloqueado

El encargo pide un selector ES/EN en todas las páginas con inglés por defecto.
Eso choca con reglas vigentes (`docs/PROJECT_MASTER.md`, DEC-007, DEC-013):

| Regla vigente | Consecuencia |
| --- | --- |
| Inglés en rutas raíz; español bajo `/es/` cuando esté completo | El selector necesita pares reales de rutas |
| Sin traducción automática en runtime | No se puede traducir al vuelo |
| Sin paridad de contenido aprobada | Hoy no existe ninguna página `/es/` |
| Trato tú/usted pendiente (auditoría de Marketing) | No se puede escribir el copy final |
| `hreflang` sólo para pares reales | No se publica `hreflang` todavía |
| Sin redirección por navegador o ubicación | El selector es la única vía de cambio |

## Estado actual (CONFIRMADO)

- `src/app/layout.tsx` fija `<html lang="en">`.
- `src/app/(site)/` contiene 28 rutas en inglés y ninguna bajo `/es/`.
- Todo el copy vive en módulos ingleses (`src/content/**`, p. ej.
  `src/content/home/en.ts`); sólo la Homepage usa ya el sufijo `en`.
- `src/lib/page-metadata.ts` documenta que no hay `hreflang`.
- `start-version/` contiene HTML bilingüe heredado: es evidencia, no copy
  aprobado.

## Propuesta de arquitectura

**Rutas.** Un segmento `src/app/(site)/es/` que replica sólo las rutas con par
aprobado. Inglés permanece en la raíz y es el idioma predeterminado. El static
export no admite middleware ni detección de idioma, lo cual es coherente con la
regla de no redirigir.

**Layout y `lang`.** Un layout raíz por idioma o un grupo `(es)` con
`<html lang="es">`; el layout actual mantiene `lang="en"`.

**Contrato de datos.** Un registro único de pares:

```ts
// src/content/i18n/routes.ts (propuesto)
type Locale = "en" | "es";
type RoutePair = { en: `/${string}`; es: `/es/${string}` | null; approved: boolean };
```

- `es: null` o `approved: false` significa que no hay par: el selector no
  enlaza a esa ruta y la página no emite `hreflang`.
- El contenido sigue en módulos por idioma (`home/en.ts`, `home/es.ts`, etc.),
  con los mismos tipos para detectar campos faltantes en `typecheck`.

**Componente.** `LanguageSwitch` como Server Component con dos enlaces
(`EN` / `ES`), `hreflang` y `lang` en cada enlace, `aria-current` en el idioma
activo y un nombre accesible ("Language" / "Idioma"). Se monta en
`SiteHeader` (desktop y menú móvil) y en `SiteFooter`. Si la ruta actual no
tiene par aprobado, el enlace de ES apunta a `/es/` sólo cuando la Homepage
española exista; en caso contrario el selector no se renderiza.

**Metadata.** `alternates.languages` en `buildPageMetadata` sólo para pares
`approved: true`, con `x-default` en inglés.

**Analytics.** Evento neutro `language_switch` con `data-analytics-location`
(header, mobile-menu, footer); requiere aprobación del plan de analytics.

## Qué falta para desbloquear

1. Decisión de trato en español (tú/usted).
2. Copy español revisado por Marketing para, como mínimo, la Homepage, header,
   footer y legales; después, cada página por bloques.
3. Lista de slugs españoles aprobados (¿`/es/soporte/` o `/es/support/`?) y su
   relación con las URLs heredadas de `start-version/` y WordPress.
4. Decisión SEO: `hreflang`, canonical por idioma y sitemap.
5. Una decisión nueva en `docs/DECISIONS.md` que apruebe la fase.
