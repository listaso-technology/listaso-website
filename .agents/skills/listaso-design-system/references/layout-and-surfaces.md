# Layout, radii, elevation and glass

Decision: DEC-008 (8pt system approved by Erick). The values below are PROPOSED
conventions. They replace the legacy sprawl of 15 radii, 5 shadows and 14
breakpoints.

Do not apply the proposed radii, shadows, glass recipes, typography or exact
visual values to the application before Erick approves them in Chat 5. Until
then, this file is a review candidate, not implementation authority.

## 8-point spacing

**Rule.** Every spacing value is a multiple of 8px. 4px is allowed as a
half-step for fine alignment: icon-to-label gaps, borders, tight chips.

| Tailwind (4px unit) | px |
| --- | --- |
| `1` | 4 |
| `2` | 8 |
| `3` | 12 |
| `4` | 16 |
| `6` | 24 |
| `8` | 32 |
| `10` | 40 |
| `12` | 48 |
| `16` | 64 |
| `20` | 80 |
| `24` | 96 |
| `32` | 128 |

`3` (12px) is allowed only inside components.

**Avoid.** Odd steps (`5`, `7`, `9`, `11`) and arbitrary values (`p-[18px]`).
Any exception must be justified in the PR.

**Section rhythm.**
- Vertical padding is 64px on mobile, 96px on desktop, and 128px only for a
  hero or a final CTA.
- The section heading sits 48px above its content.

**Alignment.** Choose spacing by need within the scale. Related items get less
space and separated groups get more (proximity).

**Line heights** are multiples of 4px (see `brand-foundations.md`). Component
heights snap to 8px; controls are at least 48px, or 40px for compact desktop
controls, always with a 44px hit area.

## Breakpoints and containers

**Breakpoints.** Use Tailwind defaults only: `sm` 640, `md` 768, `lg` 1024, `xl`
1280, `2xl` 1536. Mobile-first. Prefer container queries for components that
live in several layouts.

**Containers.**

| Container | Max width | Use |
| --- | --- | --- |
| content | 1200px | most sections |
| wide | 1440px | header, full-bleed bands |
| prose | 72ch | long-form text |

**Gutters.** 16px on mobile, 24px at `md`, 32px at `lg` and above.

## Radius scale

| Token | px | Use |
| --- | --- | --- |
| radius.xs | 4 | tags inside dense UI, checkboxes, table cells |
| radius.sm | 8 | inputs, selects, tooltips, small media thumbnails |
| radius.md | 16 | cards, dropdown menus, popovers, code/prompt blocks |
| radius.lg | 24 | feature panels, glass containers, large media, chat mocks |
| radius.xl | 32 | hero media and inset bands; at most one per view |
| radius.full | 9999 | buttons, pills, chips, avatars, icon buttons |

Rules:
- **Buttons and CTAs are pills** (`radius.full`). This is OBSERVED in the guide
  ("BOOK A DEMO" white pill) and in legacy.
- **Nested radii are concentric.** inner = outer − padding, with a minimum of
  4px. Example: a 24px panel with 8px padding holds 16px children.
- **One radius per component type** across the site. No one-off values.
- The isotype tile radius (about 20% of its width) belongs to the logo asset. It
  is not a UI token.

## Elevation (shadows)

Shadows are tinted navy, never pure black. Offsets and blurs follow the 8pt
system.

| Level | Value | Use |
| --- | --- | --- |
| e0 | none; separate with a 1px `border.subtle` | default for cards on light |
| e1 | `0 1px 2px rgb(0 55 91 / .06), 0 4px 8px rgb(0 55 91 / .06)` | resting raised items, card hover |
| e2 | `0 8px 24px rgb(0 55 91 / .12)` | dropdowns, popovers, sticky header after scroll, glass containers |
| e3 | `0 24px 64px rgb(0 55 91 / .20)` | dialogs, lightbox, a floating card over media |

**Rules.**
- Hover raises one level at most: a 4px lift for cards, 2px for buttons.
- No shadows on text-heavy containers or on tables.
- Never stack glass, e3 and glow on the same element.

**Dark bands and SAMI.**
- Shadows are nearly invisible on dark surfaces. Express depth with surface steps
  plus a 1px border (`rgb(255 255 255 / .08–.14)`).
- One decorative glow per view, on the focal element only:
  `drop-shadow(0 0 24px rgb(9 96 255 / .33))`.

## Glass effect

The brand guide reserves glass for "AI containers and widgets" (CONFIRMED,
p14–15). Erick permits broader decorative use as a PROPOSED direction, subject
to final approval in Chat 5 and the limits below. It is a deliberate accent,
not a default surface.

**Allowed.**
1. SAMI and AI containers and widgets: chat mocks, assistant panels, AI feature
   cards.
2. Layers floating over rich backdrops:
   - the sticky header over a hero
   - a stat or quote card over a photo or gradient
   - the mobile menu overlay
   - media captions

**Not allowed.**
- Over flat solid backgrounds, where glass adds nothing.
- Long-form text, forms and inputs, pricing tables, data tables.
- Nested glass.
- More than 2 glass surfaces visible in one viewport.
- Any glass area larger than about one third of the viewport.
- Animating `backdrop-filter`.

**Light recipe.**
- Background `rgb(255 255 255 / .72)`.
- `backdrop-filter: blur(16px) saturate(140%)`.
- Border `1px solid rgb(255 255 255 / .48)` plus an inner
  `0 0 0 1px rgb(0 55 91 / .08)`.
- `radius.lg` and `e2`.

**SAMI / dark recipe.**
- Background `linear-gradient(145deg, rgb(12 45 64 / .85), rgb(7 30 44 / .91))`.
- `blur(16–24px)`.
- Border `1px solid rgb(255 255 255 / .10)`.
- `radius.lg`.

**Contrast.** Text on glass must pass AA against the worst-case backdrop region:
the lightest one for white text, the darkest one for ink text. Use the alpha
floors above, or add a scrim.

**Fallbacks (required).**
- `@supports not (backdrop-filter: blur(1px))` → solid surface.
- `@media (prefers-reduced-transparency: reduce)` → solid surface.
- `@media (forced-colors: active)` → system colors with a visible border.

**Performance.** Test scrolling on a mid-range mobile device. Avoid glass on long
scrolling lists. Check INP after adding blur.
