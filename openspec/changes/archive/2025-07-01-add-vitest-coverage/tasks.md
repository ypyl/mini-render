## 1. Add Vitest dependencies

- [x] 1.1 Install `vitest` and `@vitest/coverage-v8` as devDependencies
- [x] 1.2 Create `vitest.config.ts` with test file pattern, coverage provider (`v8`), and thresholds (lines: 35, functions: 50, branches: 60)

## 2. Update package.json scripts

- [x] 2.1 Change `test` script to `vitest run`
- [x] 2.2 Add `coverage` script: `vitest run --coverage`
- [x] 2.3 Remove `tsconfig.test.json` (no longer referenced)

## 3. Re-export resolveParams

- [x] 3.1 Add `export` back to `resolveParams` function in `src/hooks.ts`
- [x] 3.2 Add `resolveParams` to barrel exports in `src/index.ts`

## 4. De-inline tests to import from source

- [x] 4.1 Rewrite `src/store.test.ts` to import `createStore`, `getByPath`, `immutableSetByPath`, `pathsOverlap` from `./store` instead of inlining
- [x] 4.2 Rewrite `src/actions.test.ts` to import `getByPath`, `createStore` from `./store` and `resolveParams` from `./hooks` instead of inlining
- [x] 4.3 Keep `BUILTIN_SET_STATE` inlined in `actions.test.ts` (it's a one-liner defined in `contexts.tsx`, not worth a React import)

## 5. Verify

- [x] 5.1 Run `npm test` — all 20 tests pass
- [x] 5.2 Run `npm run coverage` — report generated, thresholds met
- [x] 5.3 Run `npx tsc --noEmit` — no type errors
- [x] 5.4 Run `npm run dev` in demo — demo still builds and works
