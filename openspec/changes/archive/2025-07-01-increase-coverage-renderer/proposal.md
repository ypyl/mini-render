## Why

Coverage sits at 79%. The renderer (`renderer.tsx`, 0%) is the last major untested module, and four small uncovered branches across `store.ts`, `contexts.tsx`, and `hooks.ts` are quick wins. Plugging these gaps pushes coverage past 95% and verifies the core rendering engine — the part that walks specs and builds component trees — actually works.

## What Changes

**Layer A — Quick wins (no new deps):**
- Add test for `immutableSetByPath` setting array index at terminal (`store.ts` line 75)
- Add test for `BUILTIN_SET_STATE` with falsy path (e.g., `undefined`, `""`)
- Add test for `resolveParams` with `$index: false` (falsy branch)
- Add test for `useEmit` with action `"setState"` (built-in handler path)

**Layer B — Renderer tests (no new deps, uses existing test infra):**
- Create `src/renderer.test.tsx` with full render tests
- Test `_ElementRenderer`: renders registered component, missing element (loading/not), unknown type
- Test `RepeatChildren`: renders items, uses key field, empty array
- Test `Renderer`: null spec, missing root, children nesting
- Raise coverage thresholds: lines 79→85, functions 80→85, branches 70→80

## Capabilities

### New Capabilities

- `renderer-tests`: Renderer component tests covering ElementRenderer, RepeatChildren, RepeatScope, and Renderer

### Modified Capabilities

- `test-coverage`: Raise thresholds to lines:85, functions:85, branches:80

## Impact

- `src/store.test.ts` — +1 test (array index set)
- `src/actions.test.ts` — +1 test (falsy $index)
- `src/hooks.test.tsx` — +2 tests (setState built-in, BUILTIN_SET_STATE falsy path)
- `src/renderer.test.tsx` — new file (~150 lines, 10 tests)
- `vitest.config.ts` — thresholds updated
- No new dependencies
