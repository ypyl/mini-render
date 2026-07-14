## Context

The library has 20 pure-logic tests covering `store.ts` (96%) and `resolveParams`/`BUILTIN_SET_STATE` (pulling `hooks.ts` to 26% and `contexts.tsx` to 30%). The React hooks (`useValue`, `useBound`, `useEmit`, etc.) and context providers (`StoreProvider`, `ActionProvider`) have no tests.

These hooks are the library's public API surface — they're what consumers import and use. Testing them requires `@testing-library/react`'s `renderHook`, which mounts hooks inside a minimal React tree with controlled context providers.

## Goals / Non-Goals

**Goals:**
- Test all 8 exported hooks via `renderHook`
- Test StoreProvider and ActionProvider via `render`
- Push overall line coverage from 47% to ~65%
- Raise coverage thresholds to match the new baseline
- Use Vitest `expect` assertions for new tests (coexist with `node:assert` in old tests)

**Non-Goals:**
- Testing the renderer (`renderer.tsx`) — separate change
- Converting existing `node:assert` tests to `expect`
- Testing React component lifecycle or DOM output
- Achieving 100% branch coverage on useEmit (some branches require full renderer integration)

## Decisions

### Decision 1: `renderHook` over mounting real components

**Choice:** Use `renderHook` from `@testing-library/react` to test hooks in isolation.

**Rationale:** `renderHook` wraps hooks in a minimal React fiber without needing DOM assertions. We provide a `wrapper` component that supplies StoreContext and ActionContext — the same way the real Renderer does. Hooks that need repeat scope (useEmit, useItemPath) get additional RepeatPathContext in their wrapper.

**Alternative:** Mount a full `<Renderer>` with a spec and test hooks indirectly through rendered output. More realistic but couples hook tests to renderer behavior, making failures ambiguous.

### Decision 2: Shared test wrapper in `src/test-utils.tsx`

**Choice:** Extract wrapper providers into a shared utility.

**Rationale:** Every hook test needs StoreProvider + ActionProvider. A single `createWrapper(store, handlers?)` factory avoids duplicating provider setup across 20+ test cases. The wrapper accepts optional repeat path/index for hooks that need repeat scope.

### Decision 3: `jsdom` environment for all Vitest tests

**Choice:** Set `environment: "jsdom"` in vitest.config.ts globally.

**Rationale:** `@testing-library/react` needs a DOM environment (`document`, `HTMLElement`, etc.). The existing pure-logic tests (`store.test.ts`, `actions.test.ts`) don't use DOM APIs and run fine in jsdom — no need for per-file environment overrides.

### Decision 4: `expect` for new tests, `assert` stays for old

**Choice:** Use Vitest's `expect` (`describe`/`it`/`expect`) for new hook/context tests. Leave existing `node:assert` tests alone.

**Rationale:** `expect` is the standard Vitest assertion style and reads more naturally with `renderHook` (`expect(result.current).toBe(42)`). Converting old tests is scope creep — the two styles coexist without issues since Vitest supports both.

### Decision 5: Coverage threshold uplift

**Choice:** Raise thresholds to lines: 55%, functions: 50%, branches: 50%.

**Rationale:** After hook and context tests, estimated coverage is ~65% lines, ~55% functions, ~55% branches. Setting thresholds 5-10% below actual gives headroom for minor fluctuations while preventing regression.

## Risks / Trade-offs

- **jsdom makes pure-logic tests slightly slower** — jsdom initialization adds ~50ms to test startup. Mitigation: negligible for 20 tests; Vitest's watch mode makes it irrelevant in development.
- **`@testing-library/react` adds dependency weight** — ~15 packages transitive. Mitigation: dev-only, not shipped. Already standard in React projects.
- **useEmit tests may be fragile** — it depends on ActionContext, which wraps handler merging and store accessors. Mitigation: test through the hook, not the internals; use a real store and handler in the wrapper.
