# Listaso Website

Next.js, TypeScript and Tailwind foundation for the new Listaso website. The
legacy implementation and WordPress widget are archived outside this repository
as read-only references. See `docs/CURRENT_ARCHITECTURE.md` for their location
and the cleanup record.

## Requirements

- Node.js `24.21.0` LTS
- pnpm `12.10.1`

## Commands

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

The initial build is a static export written to `out/` for temporary Cloudflare
deployment. It intentionally uses `noindex` until routes and content are approved.

Read `AGENTS.md` or `CLAUDE.md` and `docs/PROJECT_MASTER.md` before changing files.
