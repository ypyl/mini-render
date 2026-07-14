## 1. Layer A: Quick wins (existing test files)

- [x] 1.1 Add test to `src/store.test.ts`: immutableSetByPath sets array index at terminal path
- [x] 1.2 Add test to `src/actions.test.ts`: resolveParams handles `$index: false`
- [x] 1.3 Add test to `src/hooks.test.tsx`: useEmit with action "setState" skips warning
- [x] 1.4 Add test to `src/actions.test.ts`: BUILTIN_SET_STATE with falsy path (undefined/"")

## 2. Layer B: Renderer tests

- [x] 2.1 Create `src/renderer.test.tsx` with spy-component test pattern
- [x] 2.2 Test: ElementRenderer renders a registered component with correct element + children props
- [x] 2.3 Test: missing element warns (loading=false) and returns null
- [x] 2.4 Test: missing element silent when loading=true
- [x] 2.5 Test: unknown component type warns and returns null
- [x] 2.6 Test: null spec returns null
- [x] 2.7 Test: missing root element returns null
- [x] 2.8 Test: RepeatChildren renders N items with correct repeat paths
- [x] 2.9 Test: RepeatChildren respects key field from repeat config
- [x] 2.10 Test: RepeatChildren handles empty array

## 3. Thresholds

- [x] 3.1 Update `vitest.config.ts` coverage thresholds to lines:85, functions:85, branches:80

## 4. Verify

- [x] 4.1 Run `npm test` — all new + existing tests pass
- [x] 4.2 Run `npm run coverage` — thresholds met
- [x] 4.3 Run `npx tsc --noEmit` — no type errors
