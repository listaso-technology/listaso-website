# Imagery and icons

Decisions: DEC-009 (temporary Unsplash photography) and DEC-010 (Google Material
Symbols).

## Temporary photography (Unsplash)

**Purpose.** Phase-one placeholders of good quality. Every photo occupies a
defined slot and will later be replaced by custom photography that Design
creates. Each slot doubles as the design request.

**Licensing.**
- Use only images under the free Unsplash License. Never Unsplash+ images.
- Attribution is not required, but always record it in the manifest.
- The license does not cover trademarks, logos, recognizable private property,
  or model releases. Reject photos with visible third-party brands, logos,
  readable signage or device trademarks.

**Hosting.**
- Download each photo, optimize it and self-host it.
- Never hotlink to `images.unsplash.com` from the site. Hotlinking requires API
  compliance and adds a third-party request to every page.
- Get explicit approval for each batch of downloads.

**Honesty.**
- A stock person never represents a named customer, testimonial author, employee
  or partner.
- Testimonials use initials, approved photos, or no photo.
- Do not caption stock photos as real deployments.

**Subject direction (OBSERVED in the brand guide).**
- Real field operations: delivery drivers, sales reps with tablets or phones,
  warehouses, distributors, small grocery and retail shops, food and beverage
  distribution.
- Warm natural light, diverse people, Latin American and North American
  contexts.
- Avoid clichés: handshakes, abstract "tech" blue glows, staged office meetings.

**Slot conventions.**
- Fixed aspect ratios: hero 16:9 or 4:3, card 4:3, portrait 4:5, square 1:1,
  OG 1200×630.
- Explicit `width`/`height` (no CLS).
- Meaningful `alt`, or `alt=""` when decorative.
- Weight budget: hero ≤ 200 KB, card ≤ 80 KB.
- Serve AVIF or WebP, plus a responsive `srcset` produced at build time. Static
  export has no runtime optimizer (DEC-006).

**Manifest.** The format will be defined at implementation. Planned location:
`src/content/media/placeholders.*`. One entry per slot:

```text
id, route, section, aspect, alt (EN/ES), unsplash_url, photographer,
photographer_url, downloaded_on, file_path, status (placeholder | requested | replaced),
design_brief (subject, mood, must-show, must-avoid)
```

The design request to the Design team is generated from the `requested` entries.

## Icons (Google Material Symbols)

**Scope.**
- Material Symbols (Apache-2.0) is the single library for UI icons:
  navigation, actions, features, status.
- Product icons, logos, partner/ERP logos and illustrations are brand assets. Do
  not substitute Material icons for them.

**Style (PROPOSED).**
- One style site-wide: **Rounded**, which matches the rounded isotype bars.
- Axes: weight 400 (300 for icons of 40px and up), fill 0, grade 0, optical size
  matched to the rendered size.
- Filled variants only for selected or active states.

**Sizes.** On the 8pt grid: 16, 20, 24 (default), 32, 40 and 48px. Use
`currentColor` so icons inherit text and state tokens.

**Format (RECOMMENDED, needs dependency approval).**
- Import individual SVGs as React components, or keep a curated local SVG set
  under version control.
- Avoid the variable icon font. It downloads the full set unless subset, shows
  ligature text while loading, and is harder to tree-shake.
- Any npm package needs approval first (`PROJECT_MASTER`, Skills rules).

**Accessibility.**
- Decorative icons get `aria-hidden="true"`.
- A standalone icon button needs an accessible name and a hit area of at least
  44px.
- Never convey meaning by icon color alone.
- Icons must reach 3:1 against their background (see the `icon.accent` value in
  `brand-foundations.md`).

**Replaceability.**
- Wrap icons behind a project `Icon` component, or a single icons module, keyed
  by semantic names (`delivery`, `inventory`, `sync`), not glyph names.
- A custom icon can then replace a Material glyph without touching consumers.
