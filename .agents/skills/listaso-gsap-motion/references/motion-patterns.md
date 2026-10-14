# Listaso motion patterns

Sources: legacy `start-version/` has transitions only, plus a reduced-motion
kill switch. Guide Sami has the richer motion language below (OBSERVED). GSAP is
still not approved. Prefer CSS and small rAF code first, and adopt GSAP only
through an approved decision.

## Timing tokens (PROPOSED)

| Token | Value | Use |
| --- | --- | --- |
| duration.fast | 150ms | hover, press, color/opacity |
| duration.standard | 250ms | menus, popovers, tabs, accordions |
| duration.emphasis | 400ms | dialogs, lightbox, section reveals |
| duration.narrative | 600–1500ms | dashboard grow/draw, product demos |
| ease.standard | `cubic-bezier(0.2, 0, 0, 1)` | default (already in `src/styles/tokens.css`) |
| ease.enter | `cubic-bezier(0.2, 0.7, 0.2, 1)` | entrances (Guide Sami lightbox) |
| ease.exit | `cubic-bezier(0.4, 0, 1, 1)` | exits; shorter than entrances |

Animate only transform and opacity. Never animate layout properties,
`backdrop-filter` or large blurs.

## Reusable patterns

Every pattern lists what it does and what happens under reduced motion.

| Pattern | Origin | Behavior | Reduced-motion fallback |
| --- | --- | --- | --- |
| Ambient orbs | Guide Sami | 2–3 blurred radial gradients drifting over 32–39s, alternate, behind dark/SAMI bands only | static gradient |
| Reveal on enter | Guide Sami | 12px rise and fade, 400–800ms, once per element, IntersectionObserver | content visible immediately |
| Chat / prompt demo | Guide Sami | typewriter ~38ms/char, typing dots, staged messages, result chip; ~12s loop with pause | final conversation state, no loop |
| Dashboard grow/draw | Guide Sami | bars scale on X/Y over 1–1.1s; lines draw via `pathLength` over 1.5s; pause and replay controls | final chart state |
| Logo aura | Guide Sami | blue/teal glow pulse behind the SAMI logo; one per view | glow held at low opacity |
| Review marquee | Guide Sami | rAF infinite scroll, masked edges; pauses on hover and focus; drag support | becomes a static, scrollable list |
| Collapsible section | Guide Sami | `grid-template-rows` 0fr→1fr plus opacity; `inert` when closed | instant toggle |
| Carousel | legacy | CSS scroll-snap, arrow buttons, keyboard, "1 / n" counter | already motion-light; `scroll-behavior: auto` |

## Rules

- **Pause, stop, hide (WCAG 2.2.2).** Anything that moves for more than 5s and
  runs alongside content needs a visible pause control (marquee, demo loop,
  orbs inside content). Orbs that are purely decorative backgrounds behind static
  text may skip the control. They still stop under reduced motion.
- **Autoplay.** Product demos start only when in view, and stop when out of view
  or when the tab is hidden.
- **No scroll hijacking or scroll-jacked storytelling.** Content must work
  without JS.
- **Budget.** At most one narrative animation per viewport. Ambient motion only
  on dark bands and SAMI spaces. Light marketing sections stay calm, with
  hover/press feedback only.
- **Accessible content.** Animated text, such as typewriter output, is present
  in the DOM for screen readers from the start, or announced once. It must not be
  read character by character.
