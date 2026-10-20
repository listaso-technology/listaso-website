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

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
