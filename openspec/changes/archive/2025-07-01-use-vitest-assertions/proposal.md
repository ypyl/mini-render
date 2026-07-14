## Why

The test suite uses two assertion styles: `node:assert` in `store.test.ts` and `actions.test.ts`, and Vitest `expect` in the React test files. Converting the remaining `node:assert` tests to `expect` unifies the codebase on a single assertion style, gives better error messages (diff output on mismatch), and removes the last `node:` import from tests.

## What Changes

- Convert `src/store.test.ts`: replace `node:assert/strict` with Vitest `expect`, wrap tests in `describe`/`it`
- Convert `src/actions.test.ts`: same conversion
- All 22 existing assertions produce identical results
- No new tests, no coverage changes

## Capabilities

### New Capabilities

None. Pure refactor.

### Modified Capabilities

None.

## Impact

- `src/store.test.ts` — import change, assertion syntax change
- `src/actions.test.ts` — import change, assertion syntax change
- No dependency changes, no coverage impact
