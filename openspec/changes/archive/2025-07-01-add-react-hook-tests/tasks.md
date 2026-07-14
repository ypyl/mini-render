## 1. Setup

- [x] 1.1 Install `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` as devDependencies
- [x] 1.2 Update `vitest.config.ts`: set `environment: "jsdom"`, add `setupFiles` for `@testing-library/jest-dom`, update thresholds to lines:55, functions:50, branches:50
- [x] 1.3 Update `tsconfig.json` to include `.test.tsx` files (add `"jsx": "react-jsx"` is already present, verify `.tsx` test files typecheck)

## 2. Test infrastructure

- [x] 2.1 Create `src/test-utils.tsx` with shared wrapper component providing StoreProvider + ActionProvider + optional RepeatPathContext
- [x] 2.2 Create `src/contexts.test.tsx` with tests for StoreProvider and ActionProvider

## 3. Hook tests

- [x] 3.1 Create `src/hooks.test.tsx` with tests for useStore, useValue, useSetValue, useBound, useRepeatPath, useRepeatIndex
- [x] 3.2 Add tests for useEmit (dispatch, handler invocation, param resolution, missing handler warning)
- [x] 3.3 Add tests for useItemPath ($item resolution, passthrough, outside repeat)

## 4. Verify

- [x] 4.1 Run `npm test` — all existing + new tests pass
- [x] 4.2 Run `npm run coverage` — thresholds met at lines ≥ 55%, functions ≥ 50%, branches ≥ 50%
- [x] 4.3 Run `npx tsc --noEmit` — no type errors
