## Why

Coverage sits at 47% because React hooks (useValue, useEmit, useBound, etc.) and context providers (StoreProvider, ActionProvider) have zero tests. These are the library's public API — the hooks are what consumers interact with most. Testing them with `@testing-library/react`'s `renderHook` pushes coverage to ~65% and verifies the subscription, dispatch, and context wiring actually work end-to-end.

## What Changes

- Add `@testing-library/react` and `@testing-library/jest-dom` as devDependencies
- Add `jsdom` as a devDependency (Vitest test environment for DOM APIs)
- Create `src/hooks.test.tsx` — tests for all 8 exported hooks using `renderHook`
- Create `src/contexts.test.tsx` — tests for StoreProvider and ActionProvider
- Add `src/test-utils.tsx` — shared wrapper component providing Store + Action contexts
- Configure Vitest `test-environment: "jsdom"` and setup file for `@testing-library/jest-dom` matchers
- Raise coverage thresholds: lines 35→55, functions 30→50, branches 40→50

## Capabilities

### New Capabilities

- `react-hook-tests`: React hook and context provider tests with coverage verification

### Modified Capabilities

- `test-coverage`: Raise thresholds to match new coverage baseline

## Impact

- `package.json` — new devDependencies: `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
- `vitest.config.ts` — add `environment: "jsdom"`, `setupFiles`, update thresholds
- `src/hooks.test.tsx` — new file (~150 lines)
- `src/contexts.test.tsx` — new file (~50 lines)
- `src/test-utils.tsx` — new file (~30 lines, test wrapper)
- Existing pure-logic tests (`store.test.ts`, `actions.test.ts`) unchanged
