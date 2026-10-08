# Arquitectura actual

**Actualizado:** 8 de octubre de 2026

## Aplicación nueva

```text
src/
├── app/          routing, layout, metadata y globals
├── components/   ui, layout y motion cuando existan
├── features/     capacidades de negocio justificadas
├── content/      copy tipado y localizado aprobado
├── lib/          analytics, SEO y utilidades enfocadas
├── styles/       tokens, base y motion compartido
└── types/        tipos realmente compartidos

public/
├── images/
├── icons/
└── fonts/
```

- Next.js 16.4, React 19.3, TypeScript 5.9 y ESLint 9.
- Tailwind CSS 4.3 mediante PostCSS; la detección de clases se limita a `src/`.
- Static export a `out/`, `trailingSlash` e imágenes sin runtime de servidor.
- Foundation `noindex` y robots bloqueado.
- Aún no hay páginas migradas, analytics, SAMI, Zoho, GSAP ni tests.

## Referencia heredada

`start-version/` contiene el generador Python, HTML estático bilingüe, CSS, JS,
assets, metadata, redirects e integraciones heredadas. Es read-only, no participa
en lint, tipos o build, y no es source of truth automático para contenido.

## Deployment

GitHub Actions y Cloudflare todavía no están configurados. `main` será producción;
`dev` es integración y `qa` validación. El dominio productivo no se modifica en
esta etapa.
