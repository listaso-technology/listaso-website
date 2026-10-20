---
name: listaso-gsap-motion
description: Propose, implement, or review GSAP motion in the Listaso Next.js application with React lifecycle safety, responsive and reduced-motion behavior, cleanup, and performance controls.
---

# Listaso Gsap Motion

Use motion only for hierarchy, explanation, feedback, state or continuity.

- Isolate GSAP in the smallest necessary Client Component.
- Prefer `@gsap/react` and scoped `useGSAP()`/`gsap.context()` when adopted; clean up timelines and ScrollTriggers.
- Use `gsap.matchMedia()` for breakpoints and reduced motion. Keep content usable without animation.
- Prefer transform and opacity; prevent layout shift, raw scroll listeners, scroll hijacking and competing transform owners.
- Test routing, resize, orientation, mobile, slow devices and reduced motion; assess LCP, CLS and INP.
- Do not add GSAP or another dependency without approval.

Report purpose, lifecycle, fallback, performance evidence and browser/device checks still required.

Load `references/motion-patterns.md` for timing tokens, the reusable patterns (orbs, reveal, chat demo, dashboard draw, marquee, collapsible) and their reduced-motion fallbacks. Ambient motion belongs on dark bands and SAMI spaces only; light sections stay calm.
