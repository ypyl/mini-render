## Why

Coverage is at 100% lines and functions but only 91.6% branches. Five defensive/edge-case branches remain uncovered across store.ts, hooks.ts, contexts.tsx, and renderer.tsx. Covering them pushes branch coverage to ~95%+ and eliminates the last untested code paths in the library.

## What Changes

- Add test: `immutableSetByPath` with null/primitive root (coercion to `{}`)
- Add test: subscribing two listeners to the same store path (existing Set branch)
- Add test: ActionProvider without `builtins` prop (undefined default branch)
- Add test: `useEmit` dispatching "setState" when it's not in handlers (skips warning)
- Add test: `RepeatChildren` with missing `key` field on items (falls back to index)
- Raise coverage thresholds: branches 80→90

## Capabilities

### New Capabilities

None. All tests extend existing coverage.

### Modified Capabilities

- `test-coverage`: Raise branches threshold from 80 to 90

## Impact

- `src/store.test.ts` — +2 tests
- `src/hooks.test.tsx` — +1 test
- `src/renderer.test.tsx` — +1 test
- `src/test-utils.tsx` — optional builtins support in wrapper
- `vitest.config.ts` — branches threshold 80→90
