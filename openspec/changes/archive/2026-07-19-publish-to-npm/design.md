## Context

mini-render currently has `"main": "src/index.ts"` pointing to TypeScript source and `"noEmit": true` in tsconfig — it's not consumable as an npm dependency. The DoubleClickEditable repo already uses a proven pattern: tag-triggered GitHub Actions → `npm ci` → `npm run build` → `npm publish`. The same `NPM_TOKEN` secret exists at the GitHub account level. The library has 100% test coverage and a working demo — it's ready to publish.

## Goals / Non-Goals

**Goals:**
- Compile TypeScript to ESM JavaScript with `.d.ts` declarations in a `dist/` directory
- Configure `package.json` for npm distribution (entry points, exports, files)
- Add GitHub Actions publish workflow triggered by version tags
- Run tests as a prepublish safety gate

**Non-Goals:**
- CJS dual output — ESM only (React 19+ ecosystem doesn't need CJS)
- Bundling/minification — consumers bundle themselves; ship clean tsc output
- Automated version bumping — manual `npm version` + `git push --tags` is sufficient
- Semantic release / changelog generation

## Decisions

**Decision 1: `tsc` only, no bundler**
`tsc` with `declaration: true` and `outDir: "dist"` produces clean ESM JS + `.d.ts` files. No bundler needed — the library is small (5 source modules), ESM is the native format, and consumers handle their own bundling. Alternative considered: `tsup` — adds a dependency for marginal benefit.

**Decision 2: Separate `tsconfig.build.json`**
The main `tsconfig.json` keeps `"noEmit": true` for IDE/editor use (fast type-checking). A separate `tsconfig.build.json` extends it, removes `noEmit`, adds `outDir` and `declaration`. This avoids breaking the dev workflow where `noEmit` is preferred. Alternative considered: modifying the single tsconfig — simpler but loses the IDE-optimized dev config.

**Decision 3: ESM-only, no CJS**
Package stays `"type": "module"`. The `exports` field maps `"."` to `./dist/index.js` with `types` condition for `.d.ts`. React 19 requires ESM-capable bundlers, and the npm ecosystem has shifted. No CJS shim needed. Alternative considered: dual CJS/ESM via `tsup` — unnecessary complexity.

**Decision 4: `files` over `.npmignore`**
The `files` field in `package.json` is an allowlist — simpler and less error-prone than a `.npmignore` blocklist. Set `"files": ["dist"]` to publish only the compiled output. Alternative considered: `.npmignore` with exclusions — more lines, easier to accidentally publish source.

**Decision 5: `prepublishOnly` runs tests**
The `prepublishOnly` script hook runs `npm test` before `npm publish`. If tests fail (or coverage drops below 100%), the publish is blocked. This is a zero-effort safety net since vitest with coverage thresholds is already configured. Alternative considered: separate CI test job before publish — redundant; `prepublishOnly` runs in the same workflow.

**Decision 6: Workflow mirrors DoubleClickEditable**
Exact same structure: `on.push.tags: ['v*']` → `actions/checkout@v4` → `actions/setup-node@v4` → `npm ci` → `npm run build` → `npm publish --access public`. Uses the existing `NPM_TOKEN` secret.

## Risks / Trade-offs

- **`--access public` on scoped package**: If the package name becomes `@ypyl/mini-render`, `--access public` is required. Mitigation: included in the workflow; works for both scoped and unscoped.
- **First publish is irreversible**: npm doesn't allow deleting a published version after 72 hours. Mitigation: `prepublishOnly` gate ensures tests pass; manual tag push gives full control over when publish happens.
- **`dist/` in gitignore?**: The `dist/` directory should not be committed — it's generated. Mitigation: add `dist/` to `.gitignore`; CI builds it fresh.

## Open Questions

None — all decisions are settled based on the proven DoubleClickEditable pattern.
