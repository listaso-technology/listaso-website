---
name: listaso-web-performance
description: Review significant Listaso pages or dependency changes for Core Web Vitals, mobile performance, images, fonts, bundles, rendering boundaries, hydration, caching, third-party scripts and animation cost.
---

# Listaso Web Performance

Measure before prescribing budgets; report environment, device, route and tooling.

- Prioritize LCP, CLS, INP and mobile constraints.
- Prefer Server Components, small client boundaries, explicit image dimensions, deliberate fonts, code splitting and lazy loading.
- Measure bundle impact before accepting a dependency.
- Isolate GTM, Clarity, Zoho, SAMI and animation from the critical path.
- Separate lab results, field data, observations and causes.

Define numeric budgets only after a functional baseline. Do not promise gains or remove required functionality solely to chase a score.

Project conventions that affect budgets:

- Montserrat is self-hosted or loaded at build time, limited to 400, 600, 700 and 700 italic.
- Icons are individual Material Symbols SVGs, not the icon font.
- Placeholder photos are self-hosted, pre-optimized and sized: hero ≤ 200 KB, card ≤ 80 KB.
- Glass blur is limited in area and never animated.

See `../listaso-design-system/references/`.
