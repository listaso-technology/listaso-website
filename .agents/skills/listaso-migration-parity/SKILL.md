---
name: listaso-migration-parity
description: Compare Listaso's legacy/public website with the new implementation across routes, content, assets, navigation, metadata, forms, integrations, languages, redirects, analytics, SAMI and Zoho.
---

# Listaso Migration Parity

Read `docs/SITE_ROUTE_MAP.md`; treat `start-version/` as read-only evidence.

Build a matrix with item, source evidence, new implementation, status (`match`, `difference`, `pending`, `validated`), risk, owner and next validation. Cover all 89 public URLs plus approved new routes, EN/ES, status codes, sitemap, scripts, forms and integrations.

Distinguish approved evolution from regression. Do not repair while auditing unless asked. Legacy output is not automatic business truth; flag unsupported claims and unclear sources.

Visual evolution from the legacy site is expected (see `docs/BRAND_ANALYSIS.md` and DEC-007/008). Classify a token, radius, spacing or color change as approved evolution when it follows `../listaso-design-system/references/`. Content, route, metadata or integration changes still need explicit evidence.
