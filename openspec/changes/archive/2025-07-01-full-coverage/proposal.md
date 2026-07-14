## Why

Coverage is at 99.46% statements and 95.41% branches — one statement and six branches short of 100%. Closing these last gaps ensures every line and branch is exercised, giving full confidence that future changes won't silently break edge cases.

## What Changes

- Add targeted tests for the remaining uncovered branches in `store.ts` (immutableSetByPath root coercion, unsubscribe with remaining listeners)
- Add tests for uncovered branches in `contexts.tsx` and `renderer.tsx`
- Raise all coverage thresholds to 100

## Capabilities

### New Capabilities

None. Extending existing coverage.

### Modified Capabilities

- `test-coverage`: Raise all thresholds to 100

## Impact

- `src/store.test.ts` — +2-3 tests
- `src/contexts.test.tsx` — +1 test
- `src/renderer.test.tsx` — +1-2 tests
- `vitest.config.ts` — thresholds raised to 100/100/100/100
