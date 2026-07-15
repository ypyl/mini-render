## Why

The mini-render project has no public presence — the demo showcasing the library's capabilities is only accessible locally. Publishing the repo to GitHub with a live GitHub Pages demo site makes the project discoverable and gives visitors an immediate, interactive experience of what mini-render does.

## What Changes

- **Vite base path**: `demo/vite.config.ts` configured with `base: '/mini-render/'` so built assets resolve correctly under the GitHub Pages URL prefix
- **wouter base path**: `demo/src/App.tsx` updated with `<Router base="/mini-render">` so client-side routes strip the repository name prefix
- **404.html SPA fallback**: Build step copies `dist/index.html` to `dist/404.html` so GitHub Pages serves the SPA for any unknown route
- **GitHub Actions deploy workflow**: New `.github/workflows/deploy.yml` builds the demo and deploys to GitHub Pages on push to master

## Capabilities

### New Capabilities
- `github-pages-deploy`: The demo site is automatically built and deployed to GitHub Pages via GitHub Actions on every push to master. Clean URLs work via the 404.html SPA fallback pattern.

### Modified Capabilities
<!-- None -->

## Impact

- **Modified**: `demo/vite.config.ts` — add `base` config
- **Modified**: `demo/src/App.tsx` — add `base` prop to Router
- **New**: `.github/workflows/deploy.yml` — CI/CD pipeline
- **External**: GitHub repository settings must enable Pages from GitHub Actions
