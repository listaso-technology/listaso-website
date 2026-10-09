---
name: listaso-design-system
description: Build or revise Listaso pages, sections, components, tokens, responsive styles, or Figma-to-code mappings while enforcing the approved design system and Tailwind/CSS Modules boundary.
---

# Listaso Design System

Read `docs/PROJECT_MASTER.md` and `docs/DECISIONS.md` (DEC-001, DEC-007 to DEC-010). Use approved Figma evidence when it is supplied.

Load the reference that matches the task:

- `references/brand-foundations.md`: palette, semantic color roles with AA ratios, SAMI theme, typography scale, logo and product-icon rules, provisional conflict resolutions.
- `references/layout-and-surfaces.md`: 8-point spacing, breakpoints, containers, radius scale, elevation, glass-effect rules.
- `references/imagery-and-icons.md`: temporary Unsplash photography slots and manifest, Material Symbols usage.

Rules:

- Reuse approved primitive, semantic and component tokens for color, type, spacing, radii, shadows, breakpoints, states, duration and easing. Values labelled PROPOSED are candidates, not implementation authority: do not apply them to the app until Erick approves them in Chat 5. Components consume semantic tokens only, so the later dark theme is a token swap.
- The site is dark-ready from day one (DEC-007). Light is the priority design. The published site follows the visitor's `prefers-color-scheme` and falls back to light, so dark is live from the first release. Define both values for every semantic token, and verify each component in light and dark before calling it done. The SAMI theme applies in full only inside SAMI/AI spaces.
- Accessibility wins over literal brand values. The documented ADJUSTED colors remain PROPOSED until Chat 5; after approval, use them where the literal brand value fails WCAG AA and never invent a new hue. Pure aqua may be decorative, but essential text, icons, controls and state boundaries must meet their applicable contrast requirement.
- Use Tailwind for layout, responsive behavior, spacing, typography, color and common states. Use a colocated CSS Module only for justified complex selectors, third-party overrides or stable GSAP classes.
- Reuse or compose components before adding a new abstraction. Keep content separate when it improves review or localization.
- Verify mobile-first behavior, keyboard states, focus, contrast and visual consistency.
- Do not choose a catalog aesthetic, add a UI or icon library without approval, or invent brand values. When Figma, the brand guide and repository rules conflict, report the conflict. Stop before materially changing direction, unless DEC-007 already resolves it.

Report the tokens and components reused, any new token proposed with its status label, the responsive states checked, and any unresolved design evidence.
