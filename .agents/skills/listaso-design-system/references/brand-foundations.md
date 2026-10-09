# Listaso brand foundations

Source evidence: `docs/BRAND_ANALYSIS.md`. Decisions: DEC-007 to DEC-010 in `docs/DECISIONS.md`.
Labels: CONFIRMED (printed in the brand guide), ADJUSTED (changed for WCAG AA
per DEC-007), OBSERVED (seen in a source, not specified), APPROVED (approved by
Erick for the foundation in Chat 5, 9 October 2026), PROPOSED (convention still
awaiting approval or the Marketing audit), UNKNOWN.

Implementation: `src/styles/tokens.css` (semantic roles, light, dark, band and
SAMI contexts) and the primitives in `src/components/`. Approval does not erase
provenance: OBSERVED and ADJUSTED values keep their labels.

Rule of precedence: brand guide → AA accessibility and consistency → legacy
`start-version/` → Guide Sami (SAMI spaces only). When a brand value fails AA,
use the ADJUSTED value. Never introduce an off-palette hue.

## Palette (CONFIRMED, guide p17)

| Primitive | HEX | Meaning (p16) | Allowed use on light surfaces |
| --- | --- | --- | --- |
| navy | `#00375B` | reliability | headings, bands, footer, icons, text (12.37:1 with white) |
| ink | `#151726` | — | body text, dark bands (17.76:1) |
| blue | `#0960FF` | innovation | links, secondary actions, focus ring (5.09:1 on white) |
| aqua | `#00BDA9` | growth | fills/decoration only on light (2.37:1); text/icons on navy or ink |
| magenta | `#FF3A6A` | bold CTA accent | decoration, text on ink/dark (5.13:1), never white text on it |
| red | `#DA415D` | — | base of the CTA (ADJUSTED below); must never dominate |
| green | `#03EA78` | — | status fills with ink text only |
| yellow | `#FFC801` | — | status fills with ink text only |
| neutral | `#DFDFDF` (+30%) | — | dividers/decoration only (1.33:1) |

The file swatch says `#FF0080` and the logo SVG says `#FF1975`. Both are CONFLICTS
until Marketing confirms them. Do not use these values in UI.

Pure aqua `#00BDA9` is allowed for non-essential decorative shapes, fills,
highlights and glass accents. Its 2.37:1 ratio on white does not prohibit a
purely decorative mark, but it is insufficient when the shape conveys state,
interaction, a control boundary or information needed to understand the page.
In those functional cases, use `text.accent` (`#007267`) or `icon.accent`
(`#008476`).

## Semantic roles — light theme (default)

All values below are APPROVED for the foundation (Chat 5) and implemented. The
Status column keeps their provenance.

| Token (proposed name) | Value | Status | Contrast |
| --- | --- | --- | --- |
| surface.page | `#FFFFFF` | OBSERVED (legacy) | — |
| surface.alt | `#F5F8FB` | OBSERVED (legacy) | — |
| surface.soft | `#E9F3F6` | OBSERVED (legacy) | — |
| surface.band | `#00375B` / `#151726` | CONFIRMED | white text 12.37 / 17.76 |
| text.default | `#151726` | CONFIRMED | 17.76 on white |
| text.muted | `#4A5569` | OBSERVED (legacy) | 7.51 white, 6.66 soft |
| text.heading | `#00375B` | CONFIRMED | 12.37 |
| text.on-band-muted | `#B9CBE0` | OBSERVED (legacy) | 7.47 on navy |
| text.accent | `#007267` | ADJUSTED from aqua | 5.83 white, 5.47 alt |
| icon.accent | `#008476` | ADJUSTED from aqua | 4.60 white |
| link | `#0960FF` | CONFIRMED | 5.09 white, 4.77 alt, 4.51 soft |
| link.hover | `#0050E6` | ADJUSTED | — |
| link.on-band | `#5FE6D6` | OBSERVED (legacy) | 8.12 navy, 11.65 ink |
| action.primary.bg | `#D83553` | ADJUSTED from `#DA415D` | white text 4.61 |
| action.primary.hover | `#BF2A47` | ADJUSTED | white text 5.77 |
| action.primary.on-dark (alt) | `#FF3A6A` bg + `#151726` text | CONFIRMED hue | 5.13 |
| border.subtle | `#DCE3EC` | OBSERVED (legacy) | decorative only |
| border.control | `#7A889B` | APPROVED | 3.61 white, 3.38 alt (≥3:1 non-text) |
| focus.ring (light) | `#0960FF`, 2px + 2px offset | APPROVED | 5.09 |
| focus.ring (bands/SAMI) | `#70D4FF` or `#5FE6D6` | OBSERVED | ≥8:1 |
| status.success / warning | `#03EA78` / `#FFC801` fill + ink text | CONFIRMED hues | 11.03 / 11.43 |
| status.error text | `#B8243F` + icon + message | APPROVED | 6.25 white |
| text.on-error | `#FFFFFF` on `#B8243F` | APPROVED (Chat 5) | 6.25 |

60-30-10 (PROPOSED, pending Marketing audit):
- 60%: neutral surfaces.
- 30%: navy/ink (text, headings, bands, footer).
- 10%: accents (magenta CTA, blue links, aqua highlights).

Only one primary CTA style per view. Red and magenta never carry meaning by color
alone. Errors always include an icon and text.

## Dark theme — dark-ready from day one (DEC-007)

Light is the priority design. Every semantic token defines both a light and a
dark value.

The published site follows the visitor's system preference through
`prefers-color-scheme`, and falls back to light when no preference is set.
Implement this in CSS (`@media (prefers-color-scheme: dark)` plus
`color-scheme: light dark`). No JS is needed and there is no theme flash.

Because dark-system visitors see dark from the first release, no page ships
without passing review in both themes. Use a dev or preview `data-theme`
override to test either theme on any machine.

The manual theme toggle stays hidden and needs a separate decision (the legacy
site has one, so it is a parity item). If it is added later, `data-theme` on
`<html>` overrides the media query.

Never hard-code primitives in components.

Dark values are based on the legacy dark theme (OBSERVED in
`start-version/site.css:10-13`), with AA ratios measured on page, raised and
soft surfaces:

| Token | Dark value | Contrast |
| --- | --- | --- |
| surface.page | `#0D1222` | — |
| surface.alt / raised | `#151B2E` | — |
| surface.soft | `#14243A` | — |
| surface.band | `#00375B` (navy stays) | white 12.37 |
| text.default | `#E7ECF4` | 15.71 / 14.41 / 13.18 |
| text.muted | `#A4AFC3` | 8.43 / 7.73 / 7.07 |
| text.heading | `#FFFFFF` | ≥15.6 |
| text.accent | `#3FD9C6` | ≥8.9 |
| link | `#5C93FF` (APPROVED; `#0960FF` fails on dark) | 6.28 / 5.76 / 5.27 |
| link.hover | `#8DB3FF` (derived in Chat 5) | 8.90 / 8.16 / 7.46 |
| icon.accent | `#3FD9C6` (derived in Chat 5) | ≥8.9 |
| action.primary | same `#D83553` / `#BF2A47` with white text | 4.61 / 5.77 |
| border.subtle | `#283149` | decorative only |
| border.control | `#6B7894` (APPROVED) | 4.21 / 3.86 / 3.53 |
| focus.ring | `#70D4FF` | ≥9.3 |
| status.error text | `#FF8095` (APPROVED) + icon | ≥6.5 |
| text.on-error | `#151726` on `#FF8095` (derived in Chat 5) | 7.42 |
| status fills | green/yellow + ink text | unchanged |

Contrast columns are page / raised / soft.

**Contexts (implemented in Chat 5).**
- `[data-surface="band"]` uses white text, `link.on-band`, and focus `#70D4FF`,
  because `#0960FF` fails on navy (2.43:1).
- `[data-surface="sami"]` applies the SAMI theme.
- Inside light glass, muted text uses the default color, because `#4A5569` over
  a navy backdrop drops to 4.34:1.
- Theme-specific logos use `ThemedLogo` or the `.theme-light-only` /
  `.theme-dark-only` helpers. Never use Tailwind's `dark:` variant: it ignores
  `[data-theme]` overrides.

**Dark-specific rules:**
- Shadows turn into surface steps plus a 1px border (see
  `layout-and-surfaces.md`).
- Use the dark glass recipe.
- Every logo and image slot declares how it behaves in dark: an inverse logo, a
  dark variant of a customer logo, or a neutral plate behind logos that have no
  variant.
- Photos keep their colors; add a scrim only when text overlays them.
- The SAMI theme is separate. SAMI spaces keep their own palette in both site
  themes.

## SAMI theme (dark, SAMI/AI spaces only — OBSERVED in Guide Sami)

| Role | Value | Notes |
| --- | --- | --- |
| canvas | `#02090D` | white text 20.05 |
| card | `#092332` | muted `#A4BDCB` 8.26 |
| popover | `#071B29` | |
| secondary | `#0C2B3D` | |
| accent | `#123B52` | |
| border | `#224355` | |
| input | `#193848` | |
| text.lead | `#9EBACA` | 9.86 on canvas |
| eyebrow | `#66DCD4` | 12.18 |
| focus | `#70D4FF` | 11.98 |
| action.bg | `#0960FF`, hover `#0050E6` | Guide Sami's lighter hover `#347CFF` fails (3.84); do not use |
| blue as text | `#4D8DFF` | `#0960FF` as text fails on canvas (3.94) |
| glow | `#0960FF` / `#00BDA9` | decorative, one focal element per view |

Use the SAMI theme in full only inside SAMI/AI sections. Elsewhere it is a mood
reference, not a palette.

## Typography

**Family.** Montserrat (CONFIRMED). Self-host it, or load it at build time.
Never load it from a runtime CDN. Ship only weights 400, 600, 700 and 700 italic
unless a need is documented. The fallback stack is `"Montserrat", "Avenir Next",
"Segoe UI", Arial, sans-serif` (APPROVED).

**Signature device (CONFIRMED in the guide, OBSERVED in legacy).** A heading may
open with one or two words in **700 italic** and continue in 400 regular. Use it
for H1/H2 only, at most once per heading. It must remain real text, not an image.

**Web scale (APPROVED, Chat 5).** It sits on an 8pt rhythm, and line heights are multiples
of 4px. The guide's p23 scale is for social and print, not web.

| Role | Size | Line height | Weight |
| --- | --- | --- | --- |
| display (home H1) | clamp(40px, 5vw + 1rem, 72px) | 1.1 | 400 + 700i |
| h1 inner | clamp(36px, 4vw + 1rem, 56px) | 1.15 | 400 + 700i |
| h2 | clamp(32px, 3vw + 1rem, 48px) | 1.2 | 400 + 700i |
| h3 | 24px | 32px | 600–700 |
| h4 | 20px | 28px | 600 |
| lead | 20px | 32px | 400 |
| body-lg | 18px | 28px | 400 |
| body | 16px | 24px | 400 |
| small | 14px | 20px | 400–600 |
| eyebrow | 14px uppercase, tracking .12em | 20px | 700 |
| caption/legal | 12px | 16px | 400 (non-essential text only) |

Body text is never smaller than 16px. Long-form measure is 60–75ch.

## Logo

**Versions and use (CONFIRMED).**
- Horizontal "**Listaso** Technology" is the primary logo. Use it when there is
  horizontal room.
- Vertical lockup for narrow spaces.
- Isotype (three bars on a white rounded tile) for small and digital sizes.
- Monochrome and inverse variants exist.

**Forbidden (CONFIRMED p13).**
- Recolor, stretch or rotate.
- Retype the wordmark.
- Remove the isotype from its white tile.
- Make it all-red or all-green.
- Use the glass-effect icon as the logo.

The legacy HTML text wordmark violates this rule. Use the official asset.

**Minimum size (PROPOSED, validate with vector files).**
- Horizontal logo: at least 160px wide on screen. Below that, use the isotype.
- Isotype: at least 24px. When the isotype is a link or tap target, its hit area
  must be at least 44px.
- Favicon: 16/32px from the isotype.

**Clear space (PROPOSED).** At least 30% of the isotype height on every side,
and never less than 16px. The guide's "0.3 / X" is ambiguous.

**Accessibility.** A logo that is a link gets an accessible name ("Listaso —
home"). A decorative repeat uses `alt=""`.

**Official files (delivered 9 October 2026).** See `src/content/brand/assets.ts`
and `public/brand/`. The vectors CONFIRM the isotype colors `#003F69`, `#00BDA9`
and `#FF1975`, and the navy wordmark `#00375B`. These belong to the logo asset
only; UI colors still come from the palette.

## Product icons and sub-brands

- Each product has its own brand icon: Sales, DSD, Inventory, Inventory
  Advanced, Delivery, eCommerce App and Web, Sales Advanced, Back Office (guide
  p14–15, p25–29).
- They are brand assets, not Material Symbols. They are good candidates for
  inner-page heroes, which are text-only in legacy.
- Delivered and classified in `src/content/brand/assets.ts`. Still pending:
  a Sales Advanced file, confirmation of `listaso-van-sales-1.svg`, and vector
  versions of eCommerce and SAMI (both temporary SVGs that embed PNG).
- Customer Order Catalog is discontinued: historical record only, never shown
  as a current product.
- SAMI complements the master brand and never replaces the Listaso logo or
  palette outside SAMI spaces.
- `SAMI.svg` embeds a raster (735 KB). Request a true vector version and a
  light-background version.

## Conflicts resolved provisionally (DEC-007)

| Conflict | Provisional resolution |
| --- | --- |
| CTA magenta `#FF3A6A` / `#DA415D` fail AA with white | `#D83553` / `#BF2A47` with white text, or `#FF3A6A` with ink text |
| Aqua fails on white | `#007267` for text and `#008476` for icons; pure aqua only as fill or on dark |
| Logo on color blocks (forbidden p13, shown p8/p12) | Allow the inverse logo on navy/ink bands and brand gradients; never on photos without a solid or scrim backdrop |
| Red gradients (forbidden p18, cover mesh is magenta) | Magenta may appear only as one soft radial in a navy mesh (legacy `.band`); never as a linear red gradient or a dominant area |
| Logo HEX ≠ palette | Use the official logo asset unchanged; UI uses the palette |
