---
name: listaso-technical-seo-migration
description: Handle Listaso route migration, redirects, canonical, hreflang, sitemap, robots, HTTP states, schema, WordPress coordination, UTM preservation, and pre/post-cutover verification.
---

# Listaso Technical Seo Migration

Always read `docs/SITE_ROUTE_MAP.md`, `docs/PROJECT_MASTER.md` and applicable decisions.

- Preserve approved pathnames and trailing-slash policy.
- Use one permanent redirect only for a real change; preserve query/UTM parameters and prevent chains, loops or blanket redirects to Home.
- Create canonical and hreflang only for complete pages; keep incomplete routes out of sitemap/indexation.
- Coordinate Next.js and WordPress; every public URL must end in an equivalent 200 response.
- Verify status, metadata, schema, robots and sitemap before and after cutover.

This skill never authorizes DNS, production, Search Console or redirect publication. Stop when destinations or equivalence are unconfirmed.
