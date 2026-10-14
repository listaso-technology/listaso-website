# Icon sources

These files are internal sources. They are not served publicly.

| File | Origin | Notes |
| --- | --- | --- |
| `listaso-icons.json` | Listaso App IcoMoon project, delivered by Erick on 9 October 2026 (`~/Downloads/listaso-icons.json`) | 153 icons, 1024-unit grid. SHA-256 `6966589a84ecd24a…`. Unmodified copy. Canonical glyph IDs are the `selection[].name` values; the internal `tags` repeat in 4 cases. |
| `material/open_in_new-rounded-24px.svg` | Google Material Symbols, Rounded, 24px (`google/material-design-icons`, commit `49d4db35df87`) | Apache-2.0. Fallback used only because the Listaso set has no external-link glyph. |
| `icon-map.json` | This project | Maps semantic names to a source glyph. |

## Rules (DEC-010)

1. A Listaso glyph is the preferred source.
2. A Material Symbols glyph is a fallback, used only when no suitable Listaso
   glyph exists. Add each one as an individual SVG file. Never add the icon
   font or an npm package.
3. Product logos and icons are brand assets in `public/brand/`, not glyphs.

## Adding or changing an icon

1. Add a semantic entry to `icon-map.json` (name by meaning, e.g. `delivery`,
   not by drawing, e.g. `truck`).
2. Run `pnpm icons`.
3. Commit the regenerated `src/components/icons/icon-data.ts`.

Only mapped icons are generated, so the app never ships all 153 glyphs.
