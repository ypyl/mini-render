## Why

mini-render is a working library with 100% test coverage and a live demo, but it can't be consumed as an npm dependency — `main` points to uncompiled TypeScript source, there's no build step, and there's no publish workflow. Setting up the build pipeline and npm publishing lets other projects `npm install mini-render` and get compiled ESM with type definitions.

## What Changes

- Add TypeScript compilation (`tsc`) to produce `dist/` with `.js` + `.d.ts` output
- Update `package.json`: point `main`/`module`/`types`/`exports` to `dist/`, add `files` to limit published content, add `build` and `prepublishOnly` scripts
- Add `.npmignore` to exclude source, tests, demo, and OpenSpec artifacts from the published tarball
- Add GitHub Actions workflow (`.github/workflows/publish.yml`) triggered on version tags that runs build + `npm publish`
- Remove `"noEmit": true` from `tsconfig.json` (or create a separate `tsconfig.build.json`)

## Capabilities

### New Capabilities

- `npm-publish`: The package compiles to ESM JavaScript with declaration files, exposes a defined public API via the `exports` field, and publishes to the npm registry through a tag-triggered GitHub Actions workflow.

### Modified Capabilities

None.

## Impact

- **Build config**: `tsconfig.json` — enable emit or create separate build config
- **Package config**: `package.json` — new fields (`exports`, `files`, `module`, `types`, `scripts.build`, `scripts.prepublishOnly`)
- **New files**: `.npmignore`, `.github/workflows/publish.yml`
- **CI/CD**: New GitHub Actions workflow, reuses existing `NPM_TOKEN` secret from DoubleClickEditable
- **Breaking**: None — consumer API is unchanged; only the distribution format changes
