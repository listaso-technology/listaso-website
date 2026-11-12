# Listaso Website

Next.js, TypeScript and Tailwind foundation for the new Listaso website. The
legacy implementation and WordPress widget are archived outside this repository
as read-only references. See `docs/CURRENT_ARCHITECTURE.md` for their location
and the cleanup record.

## Requirements

- Node.js `24.22.3` LTS (exact version in `.node-version`)
- pnpm `12.10.1`

## Commands

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

The build is a static export written to `out/`. CI validates pushes and pull
requests to `dev`, `qa` and `main`, then stores a commit-identified static export
artifact with build metadata and SHA-256 checksums (14 days). It does not deploy.
The first server test targets `listaso.net`, using a build produced outside the
server and versioned releases served by Nginx. See
[the publication runbook](docs/DEPLOY_LISTASO_NET.md) for packaging, checks and
rollback. Cloudflare Pages previews remain a separate existing workflow.
The site intentionally uses `noindex` until routes and content are approved.

Read `AGENTS.md` or `CLAUDE.md` and `docs/PROJECT_MASTER.md` before changing files.
