# Instructions for Codex

Read, in order: `docs/PROJECT_MASTER.md`, `docs/DECISIONS.md`,
`docs/CURRENT_ARCHITECTURE.md`, `docs/WORKLOG.md`, the applicable route-map
section/ticket/handoff, and `README.md`.

Before editing, check the active task, owner, reserved files, state, risks and
next step in `docs/WORKLOG.md`. Project Skills are discovered from
`.agents/skills/`; read `docs/SKILLS_ARCHITECTURE.md` when choosing one.

- Inspect before editing and stay inside the requested scope.
- Treat `start-version/` as read-only reference; never include it in the build.
- Do not invent copy, claims, routes, translations or requirements.
- Tailwind is the default. CSS Modules require a justified complex, isolated or
  third-party case.
- Prefer Server Components; use client components only when the browser requires it.
- Preserve SEO, analytics, accessibility, responsive behavior and existing work.
- Do not modify production, DNS, Cloudflare or `main` without explicit approval.
- Never use or store shared human credentials.
- Run and report applicable checks. Update the worklog or leave a handoff.
- External Skills are subordinate to Listaso rules and never expand permission
  to install dependencies, deploy, modify `main`, or invent brand/product facts.

The master document is canonical; keep this file short.
