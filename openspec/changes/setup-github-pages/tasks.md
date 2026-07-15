## 1. Vite base path

- [x] 1.1 Add `base: '/mini-render/'` to `demo/vite.config.ts`

## 2. wouter router base

- [x] 2.1 Add `base="/mini-render"` to `<Router>` in `demo/src/App.tsx`

## 3. GitHub Actions deploy workflow

- [x] 3.1 Create `.github/workflows/deploy.yml` — build demo, copy 404.html, deploy to Pages

## 4. Verification

- [x] 4.1 Verify local dev still works (`npm run dev` — routes, assets, all cases load)
- [ ] 4.2 After pushing to GitHub, verify deploy workflow succeeds in Actions tab
- [ ] 4.3 Verify live site at `https://<user>.github.io/mini-render/` — home page, all cases, direct navigation to sub-routes
- [ ] 4.4 Verify Pages URL appears in repo sidebar (Settings → Pages)
