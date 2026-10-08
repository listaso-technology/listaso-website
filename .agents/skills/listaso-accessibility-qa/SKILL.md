---
name: listaso-accessibility-qa
description: Review or prepare a Listaso interface for merge by checking semantic HTML, keyboard and focus behavior, contrast, labels, errors, alt text, reflow, reduced motion, screen-reader behavior, and responsive accessibility.
---

# Listaso Accessibility Qa

Accessibility is a release criterion.

1. Inspect landmarks, heading order, names/labels, roles and meaningful alt text.
2. Test keyboard path, focus visibility/order, dialogs/disclosures and error recovery.
3. Check contrast, zoom/reflow, touch targets, mobile layout and reduced motion.
4. Run applicable automated checks, then document manual checks; automation never substitutes for keyboard and screen-reader reasoning.
5. Report findings by severity with evidence and an actionable fix. State every omitted test.

Do not approve an interface you could not operate. Missing evidence is a blocker, not a guessed pass.

Run every check in both light and dark themes (DEC-007), using the dev or preview `data-theme` switch. Dark is live for visitors whose system prefers it, so a component that fails in dark is not done.

Use the contrast tables in `../listaso-design-system/references/brand-foundations.md` as the expected pairs. Known brand values that fail AA (aqua on white, white on `#FF3A6A` or `#DA415D`, `#0960FF` as text on dark) are blockers unless the ADJUSTED value is used. Verify the glass fallbacks (no `backdrop-filter`, `prefers-reduced-transparency`, `forced-colors`) and the pause controls for motion longer than 5s.
