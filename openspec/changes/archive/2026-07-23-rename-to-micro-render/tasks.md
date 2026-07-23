## 1. Package rename

- [x] 1.1 Update `"name"` in root `package.json` from `@ypyl/mini-render` to `micro-render`
- [x] 1.2 Find-replace all `"mini-render"` → `"micro-render"` in `demo/package.json` and demo source imports
- [x] 1.3 Find-replace "mini-render" → "micro-render" in `README.md` and `demo/README.md`
- [x] 1.4 Update `openspec/config.yaml` context to say "micro-render"

## 2. Verification

- [x] 2.1 Run `npm install` in demo/ to update node_modules symlink
- [x] 2.2 Run `npx tsc --noEmit -p demo/tsconfig.json` to verify TypeScript compiles
- [x] 2.3 Run `npm test && npm run coverage` to verify library still passes
