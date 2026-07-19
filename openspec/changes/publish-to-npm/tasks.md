## 1. Build configuration

- [x] 1.1 Create `tsconfig.build.json` extending `tsconfig.json` — remove `noEmit`, set `outDir: "dist"`, `declaration: true`, exclude test files
- [x] 1.2 Add `build` script to `package.json`: `"build": "tsc -p tsconfig.build.json"`
- [x] 1.3 Add `dist/` to `.gitignore`
- [x] 1.4 Run `npm run build` and verify `dist/` output (`.js` + `.d.ts` files for all modules)

## 2. Package metadata for npm

- [x] 2.1 Add `files` field to `package.json`: `"files": ["dist"]`
- [x] 2.2 Update `"main"` to `"./dist/index.js"` (was `"src/index.ts"`)
- [x] 2.3 Add `"module"`, `"types"`, and `"exports"` fields pointing into `dist/` with ESM and types conditions
- [x] 2.4 Add `prepublishOnly` script: `"prepublishOnly": "npm test"`
- [x] 2.5 Add `repository`, `keywords`, `license` fields for npm listing

## 3. GitHub Actions publish workflow

- [x] 3.1 Create `.github/workflows/publish.yml` — trigger on `v*` tags, checkout → npm ci → build → npm publish with `NPM_TOKEN`

## 4. Verification

- [x] 4.1 Run `npm run build && npm pack --dry-run` to verify published tarball contains only `dist/`
- [x] 4.2 Verify `prepublishOnly` runs tests (simulate with `npm publish --dry-run`)
