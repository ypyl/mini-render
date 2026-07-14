## Why

The library has no coverage instrumentation. As the codebase grows beyond its current ~600 lines, there's no automated check to prevent untested code from landing. Adding a coverage gate now establishes a quality baseline while the code is still small and easy to bring under test.

## What Changes

- Replace `node:test` + `node:assert` with **Vitest** as the test runner
- Add `@vitest/coverage-v8` for code coverage instrumentation
- De-inline tests: `store.test.ts` and `actions.test.ts` import from source instead of inlining store code
- Re-export `resolveParams` from the library barrel (was made private in a ponytail cleanup; needed for testability and legitimately useful for advanced action-handler authors)
- Add `npm run coverage` script; `npm test` now runs `vitest run`
- Set coverage thresholds: lines 35%, functions 50%, branches 60%
- Remove `tsconfig.test.json` and `src-test/` references (no longer needed)

## Capabilities

### New Capabilities

- `test-coverage`: Automated code coverage with quality gate thresholds

### Modified Capabilities

None.

## Impact

- `package.json` — new devDependencies (`vitest`, `@vitest/coverage-v8`), updated test script
- `src/store.test.ts` — imports from `../src/store` instead of inlining
- `src/actions.test.ts` — imports from source instead of inlining
- `src/hooks.ts` — `resolveParams` re-exported
- `src/index.ts` — `resolveParams` added back to barrel
- `tsconfig.test.json` — removed (Vitest doesn't need a separate tsc step)
- New: `vitest.config.ts` at project root
- All 20 existing tests continue to pass with identical assertions
