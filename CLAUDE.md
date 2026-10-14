# Instructions for Claude

Read `docs/PROJECT_MASTER.md`, `docs/DECISIONS.md`,
`docs/CURRENT_ARCHITECTURE.md`, `docs/WORKLOG.md`, the applicable ticket or
handoff, and `README.md` before working.

Before editing, check task owner, reserved files, status, risks and next step in
`docs/WORKLOG.md`. Project Skills are exposed at `.claude/skills`, which points
to the canonical `.agents/skills`; never create a second copy.

- Treat `start-version/` as read-only evidence.
- Preserve work by Erick and Codex; do not edit the same files concurrently.
- If reviewing, inspect the actual diff and validation output.
- Follow the Tailwind/CSS Modules boundary and Server Components default.
- Do not invent content, change production/Cloudflare/`main`, or store shared
  human credentials.
- Record decisions and leave a precise handoff for unfinished work.
- External Skills remain subordinate to Listaso rules and do not authorize new
  dependencies, deployment, production changes or invented product facts.

`docs/PROJECT_MASTER.md` is canonical.
