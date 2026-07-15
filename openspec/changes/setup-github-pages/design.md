## Context

The mini-render repository has no remote and no public demo. The demo is a Vite + React + wouter SPA at `demo/`. Publishing to GitHub Pages (`https://<user>.github.io/mini-render/`) requires solving three alignment problems: Vite asset paths must work under the `/mini-render/` prefix, wouter client-side routing must handle the prefix, and GitHub Pages must serve the SPA for unknown routes (SPA fallback).

## Goals / Non-Goals

**Goals:**
- Demo builds and deploys automatically to GitHub Pages on push to master
- Clean URLs work: `/mini-render/large`, `/mini-render/switch`, etc.
- Home page routes work: `/mini-render/` shows the landing page
- Repo settings show the Pages URL in the sidebar
- Local dev (`vite dev`) continues to work unchanged

**Non-Goals:**
- Custom domain configuration
- Library package publishing to npm
- Multi-branch deploy (only master)
- SEO optimization (it's a demo)

## Decisions

### Decision 1: Clean URLs with 404.html fallback over hash routing

**Chosen**: Vite `base: '/mini-render/'` + `404.html` trick + wouter `base` prop.

**Why**: Clean URLs look professional. The 404.html trick is the standard Vite + GitHub Pages pattern — copy `dist/index.html` to `dist/404.html`, and GitHub serves it for any unknown path. Since Vite outputs absolute asset paths with `base`, assets load correctly regardless of which URL the browser thinks it's at. wouter's `<Router base="/mini-render">` strips the prefix so routing logic is unchanged.

**Alternative considered**: Hash routing (`useHashLocation`) — simpler but produces `/#/large` URLs permanently.

### Decision 2: GitHub Actions official Pages deployment over gh-pages branch

**Chosen**: `actions/configure-pages` + `actions/upload-pages-artifact` + `actions/deploy-pages`.

**Why**: This is GitHub's recommended approach. No `gh-pages` branch pollution. The repo sidebar automatically shows the Pages URL when the source is set to "GitHub Actions". The `id-token: write` permission enables OIDC-based deployment without a PAT or deploy key.

### Decision 3: wouter base path hardcoded to `/mini-render`

**Chosen**: `<Router base="/mini-render">` directly in `App.tsx`.

**Why**: The repository name is known and won't change. Avoiding environment variable complexity keeps the code simple. If the repo is renamed, only two files need updating (vite.config.ts and App.tsx).

## Risks / Trade-offs

- **GitHub Pages serves 404 status for SPA routes**: Browser DevTools shows 404 for `/mini-render/large` before the SPA boots. This is cosmetic — the page renders correctly. No real-world impact for a demo site.
- **Vite base breaks local dev if set unconditionally**: Mitigated by using a conditional: `base: process.env.NODE_ENV === 'production' ? '/mini-render/' : '/'` — or by relying on the fact that Vite dev server ignores `base` (it serves from root regardless). Vite's dev server does ignore `base` — confirmed.

## Open Questions

<!-- None -->
