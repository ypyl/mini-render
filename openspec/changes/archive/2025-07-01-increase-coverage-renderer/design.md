## Context

Coverage is at 79.3% with four uncovered branches across `store.ts` (line 75, array index set), `hooks.ts` (lines 114 and 158, $index falsy and setState built-in), and `contexts.tsx` (line 36, falsy path). The renderer (`renderer.tsx`) is completely untested at 0%. The test infrastructure (Vitest, jsdom, `@testing-library/react`, `createWrapper`) is already in place.

## Goals / Non-Goals

**Goals:**
- Cover the four remaining uncovered branches in store/hooks/contexts
- Test the renderer: ElementRenderer, RepeatChildren, RepeatScope, Renderer
- Push overall line coverage from 79% to ~95%
- Raise thresholds to lines:85, functions:85, branches:80

**Non-Goals:**
- Testing renderer with real DOM assertions (snapshots, layout) — registry components just record what they receive
- Exhaustive branch coverage (immutableSetByPath root coercion paths)
- Testing the demo app

## Decisions

### Decision 1: Spy components for renderer tests

**Choice:** Registry components that record their props/children in a mutable array, then assert on what was recorded.

**Rationale:** The renderer's job is to build the right component tree with the right props. Rather than asserting on DOM output, we register "spy" components that push their `ComponentProps` into an array. After rendering, we assert the spy received the expected element, children, and emit function.

```tsx
const calls: ComponentProps[] = [];
const registry = {
  Test: (p) => { calls.push(p); return <div />; },
};
render(<Renderer spec={spec} registry={registry} store={store} />);
expect(calls[0].element.type).toBe("Test");
```

**Alternative:** Snapshot testing or DOM assertions. More fragile and tests implementation details (what the DOM looks like) rather than what the renderer actually does (pass correct props to correct components).

### Decision 2: Renderer tests use the existing `createWrapper` where possible

**Choice:** Some renderer tests use `<Renderer>` directly (testing the public API). Internal components (`_ElementRenderer`, `RepeatChildren`) are tested indirectly through `Renderer`, since they're not exported.

**Rationale:** The renderer's internal components are implementation details. Testing through `<Renderer>` with different specs exercises all code paths while keeping tests aligned with the public API. The only exception is the `loading` prop paths — these need specific `loading` flags passed to `Renderer`.

### Decision 3: Layer A tests go into existing files

**Choice:** New edge-case tests go into existing test files (`store.test.ts`, `actions.test.ts`, `hooks.test.tsx`).

**Rationale:** Each test naturally belongs with its module's existing test suite. No new files for Layer A.

## Risks / Trade-offs

- **Renderer tests are shallow** — we test that the right components are called with the right props, not that they render correctly. Mitigation: that's the renderer's responsibility; component rendering is the consumer's job.
- **Spy-based tests can be fragile** — if the rendering order changes, test assertions break. Mitigation: minimal tests, assert on presence not order where possible.
