# npm-publish Specification

## Purpose
TBD - created by archiving change publish-to-npm. Update Purpose after archive.
## Requirements
### Requirement: Package compiles to ESM JavaScript with declarations
The project SHALL have a `tsconfig.build.json` that extends `tsconfig.json`, removes `noEmit`, and sets `outDir` to `dist` with `declaration: true`. Running `npm run build` SHALL invoke `tsc -p tsconfig.build.json` and produce `.js` and `.d.ts` files in `dist/` mirroring the `src/` structure.

#### Scenario: Build produces JavaScript output
- **WHEN** `npm run build` is executed
- **THEN** `dist/index.js` exists and contains valid ESM JavaScript
- **AND** `dist/index.d.ts` exists and contains type declarations
- **AND** all source modules (`hooks.js`, `store.js`, `renderer.js`, `contexts.js`) have corresponding `.js` and `.d.ts` files in `dist/`

#### Scenario: Build fails on type errors
- **WHEN** source code contains a TypeScript type error
- **THEN** `npm run build` exits with a non-zero code
- **AND** no `dist/` files are produced (or existing ones are cleaned)

### Requirement: package.json exposes compiled entry points
The `package.json` SHALL include `exports`, `main`, `module`, and `types` fields pointing into `dist/`. The `exports` field SHALL map `"."` to the ESM entry with a `types` condition for TypeScript. The `files` field SHALL be set to `["dist"]` to limit the published tarball.

#### Scenario: ESM import resolves to compiled output
- **WHEN** a consumer runs `import { createStore } from "thin-render"`
- **THEN** Node.js (or bundler) resolves to `dist/index.js`
- **AND** TypeScript resolves types from `dist/index.d.ts`

#### Scenario: Published tarball contains only dist
- **WHEN** `npm pack` is executed (dry-run of publish)
- **THEN** the generated `.tgz` contains only files under `dist/`
- **AND** does NOT contain `src/`, `demo/`, `openspec/`, test files, or config files

### Requirement: Tests run before publish
The `package.json` SHALL define a `prepublishOnly` script that runs `npm test`. The publish SHALL be blocked if tests fail or coverage drops below the configured thresholds.

#### Scenario: Publish blocked by failing tests
- **WHEN** `npm publish` is executed and tests fail
- **THEN** the publish is aborted before any package is uploaded to the registry

#### Scenario: Publish proceeds with passing tests
- **WHEN** `npm publish` is executed and all tests pass
- **THEN** the package is uploaded to the npm registry

### Requirement: GitHub Actions publishes on version tags
A workflow at `.github/workflows/publish.yml` SHALL trigger on tag pushes matching `v*`. It SHALL checkout the code, install dependencies, build, and publish to npm using the `NPM_TOKEN` secret.

#### Scenario: Tag push triggers publish
- **WHEN** a tag `v0.1.0` is pushed to the repository
- **THEN** the publish workflow runs
- **AND** `npm ci` installs dependencies
- **AND** `npm run build` compiles TypeScript
- **AND** `npm publish --access public` uploads to the npm registry

#### Scenario: Push without tag does not trigger publish
- **WHEN** a commit is pushed to `master` without a version tag
- **THEN** the publish workflow does NOT run

