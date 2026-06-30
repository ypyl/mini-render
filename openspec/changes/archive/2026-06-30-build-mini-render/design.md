## Context

`@json-render/react` renders AI-streamed JSON specs into React trees. Investigation (see explore-mode notes) found that editing a single cell in a repeated structure cascades re-renders across the entire element tree. Root cause: three React contexts (`StateContext`, `VisibilityContext`, `ActionContext`) all subscribe to the full state via `useStateStore()`, so any state mutation flips all three context values and forces every `ElementRenderer` to re-render — `React.memo` on `ElementRenderer` cannot help because `useContext` re-renders bypass memo. Upstream issues #53 ("Infinite Re-renders") and #54 ("Will result in multiple renderings") remain unanswered after ~6 months; the maintainers' only related fix (PR #139) added an external `StateStore` adapter, which solves the *control plane* (where state lives) but not the *rendering plane* (how mutations cascade).

This change builds a minimal standalone library — `mini-render` — targeting only dynamic UI rendering from a JSON-like spec. It drops AI streaming, Zod catalogs, directives, visibility, watch, multi-framework output, and devtools. The architecture is redesigned so granular subscriptions exist at the leaf, not globally.

Reference code already studied: `@json-render/react` `renderer.tsx`, `react-state/src/index.tsx`, `core/src/state-store.ts`, and the `json-render-check-custom/test/src` demo (which already works around the problem by reading via Zustand selectors and writing via `stateStore.set()`).

## Goals / Non-Goals

**Goals:**
- Render a declarative spec tree (keyed elements + registry) into a React tree with Mantine (or any) presentational components.
- Granular re-renders: editing one bound path re-renders ONLY components subscribed to that path. Setting one cell in a 1000-row table does not re-render the other 999 rows.
- Stable action dispatch: emitting a handler re-renders only what the handler's writes affect, never "all Elements because an action fired."
- Reusable components: a thin binding layer reads paths from `element.props`; presentational components stay pure and portable (no path knowledge).
- Tiny, dependency-free core (~230 LOC), React 19 + TypeScript only.

**Non-Goals:**
- AI streaming / JSONL patch application / incremental spec building.
- Zod catalog validation or AI prompt generation.
- `visible` conditions, `watch` cascades, `$computed` functions, custom directives.
- `$state` / `$bindState` runtime resolution inside the renderer (paths are declared as plain strings in component props instead).
- Vue / Svelte / Solid / React-Native / Ink renderers — React only.
- Devtools panel.
- Drop-in compatibility with `@json-render/react` specs. (Accepted BREAKING divergence.)
- Optimizing for spec-mutation frequency (specs are assumed stable during user interaction).

## Decisions

### Decision 1: Path-based store with per-path `useSyncExternalStore`
The store is an external object (not React state, not React context for the *value*). Each leaf component calls `useValue(path)` / `useBound(path)`, which calls `useSyncExternalStore(subscribeFor(path), getFor(path))`. Only the selected path's snapshot is compared; React bails out when unchanged.

**Rationale:** This is the root fix. json-render's single-context pattern made every consumer subscribe to the whole tree. `useSyncExternalStore` with a per-path selector is React's official, concurrent-safe escape hatch for exactly this problem and is what Zustand `useStore(store, selector)` uses.

**Alternative considered:** Keep a React context but split it into one-context-per-path (atom style, Jotai-like). Rejected — adds a context-per-atom explosion and a second abstraction layer. `useSyncExternalStore` is simpler and battle-tested.

**Alternative considered:** Use Zustand directly as the only store. Rejected as a *default* — we want zero runtime deps in the core. Zustand can be plugged in later via an adapter, mirroring json-render's `StateStore` pattern, but the built-in store must ship first.

### Decision 2: One stable StoreContext holds the store object, never the state
A single `StoreContext` provides the store reference to all `useValue`/`useBound` hooks. The context's `value` is the stable store object; it never changes on mutation. Therefore `useContext(StoreContext)` does NOT trigger re-renders — components only re-render via their own `useSyncExternalStore` per-path subscription.

**Rationale:** Exactly inverts json-render's bug, where the context value WAS the state object and so flipped on every mutation.

### Decision 3: ElementRenderer subscribes to NOTHING
The recursive `ElementRenderer` only reads the spec (stable, passed as props) and the registry (stable). It builds a stable `emit` closure from `element.on` + the stable `ActionContext`. It calls `useContext` only for the stable `StoreContext`/`ActionContext` references — neither of which changes on mutation. `React.memo` on `ElementRenderer` therefore behaves correctly: a stable spec + registry means elements skip re-render when state changes elsewhere.

**Rationale:** This is the second half of the fix. json-render's `ElementRenderer` called `useStateStore()` to resolve `$state` props and `watch` state; that subscription defeated memo. By moving path subscription into the *binding component* (via `useBound`/`useValue`), the renderer layer becomes render-once.

**Trade-off:** Spec props cannot contain `{ $state: "..." }` expressions. The renderer no longer resolves dynamic values. Paths are declared explicitly in component props (`bind`, `binds`, `values`) and resolved by binding components. Accepted — this is the universality mechanism.

### Decision 4: Stable ActionContext; handlers are write-oriented pure functions
`ActionContext` holds `{ handlers, getState, setState }`. Its reference is `useMemo`'d on `[handlers, store]`; both are stable across renders, so the context value is stable and `useContext(ActionContext)` never re-renders consumers. `emit(eventName)` looks up `element.on[eventName]`, resolves `$state` params by calling `getState()` (read-on-demand, not subscribe), and invokes the handler. Handlers receive `(params, { getState, setState })` and read/write exactly what they need.

**Rationale:** Dispatching an action is write-only from the component's view. The re-render effect comes from the handler's `setState` calls flowing through the path-based store — never from "an action fired."

**Built-in `setState` action:** One built-in, `setState`, covers the common "set this path to this value" case without writing a handler — identical to json-render's `setState`. Other built-ins (`pushState`, `removeState`) deferred to a later change if repetition in real usage demands them; the Repeat renderer uses the array directly so addition/removal usually lives in handlers.

### Decision 5: Binding / presentational split; contract lives in props
The registry maps spec type names → *binding* components. A binding component (e.g. `BoundField`) reads paths from `element.props` (`bind`, `binds`, `values`, `actions`) using `useBound`/`useValue`/`emit`, then forwards plain `value`/`onChange`/`onClick`/`label` to a pure *presentational* component (e.g. `TextInput`, `Button`). Presentational components have no knowledge of paths, stores, or specs — they are reusable across any spec and even outside mini-render.

**Rationale:** This is how a component stays "universal across different specs" — the contract is the *shape* of `element.props` (e.g. "`bind` is a path string"), and each spec injects the actual path. A spec author who follows the component's contract can reuse it in invoice, contact, and settings forms.

**Alternative considered:** Resolve paths in `ElementRenderer` and pass already-resolved values to components (json-render's approach). Rejected — it's exactly the design that forces the renderer to subscribe to the whole tree.

### Decision 6: Repeat subscribes only to the repeated array path
A `repeat` element renders each child once per item in a state array. The `RepeatChildren` component calls `useValue(path)` on the array path only. It re-renders when the array identity changes (length, item replaced). Individual row binding components inside subscribe to their own `${path}/${index}/${field}` paths — editing one cell does not re-render the array subscription or other rows.

**Rationale:** Array operations (add/remove/reorder) change array identity and re-render the list (desirable). Field edits change only leaf paths (desirable). This keeps large tables cheap for the dominant interaction (cell editing).

**Trade-off:** Structural sharing on a deep leaf set (e.g. `/items/0/name`) clones every container along the path, so the `/items` array reference DOES change and `RepeatChildren` (subscribed to `/items`) re-runs its `.map`. This re-map is cheap: it re-creates React element descriptors but does not re-render row components, because each row is wrapped in a memoized `ElementRenderer` (stable `element`/`spec`/`registry` props) and gated by a per-cell `useValue` subscription. Only the edited cell's component re-renders (its `useSyncExternalStore` snapshot changed); the other 999 rows skip. Achieves the user-visible goal — one cell edit re-renders one cell — even though an intermediate container re-runs its map.

### Decision 7: Package layout & location
Ship as a single small package in the repo (folder `mini-render/` at repo root, or under `test/` as a sibling) with these modules:
- `spec.ts` — types (`Spec`, `UIElement`, `ActionBinding`, `RepeatConfig`).
- `store.ts` — `createStore(initial)`, `immutableSetByPath`, `getByPath`, `Store` type.
- `contexts.ts` — `StoreContext`, `ActionContext`, providers.
- `hooks.ts` — `useValue`, `useSetValue`, `useBound`, `useActions` (returns stable `emit`).
- `renderer.tsx` — `ElementRenderer`, `RepeatChildren`, `Renderer`, `CreateRenderer`/`defineRegistry` helpers.
- `index.ts` — public exports.

**Rationale:** Small enough to keep in a handful of files, large enough to be readable. Co-located demo app (`mini-render/demo/`) verifies the editable-table scenario.

## Risks / Trade-offs

- **[Specs are not interchangeable with json-render]** → Documented as BREAKING in the proposal. No conversion layer is planned; if a future need arises, a transformer can be added separately.
- **[Binding components must be authored per presentational component]** → Acceptable cost: bindings are ~10-line wrappers;they unlock the granular re-render the whole design exists for. Provide a small starter set (`BoundField`, `ActionButton`) in the demo.
- **[No `visible` / `watch` / `$computed`]** → Defer to later changes. Conditional rendering in the spec can be done by handlers writing a flag and a binding component rendering `null` based on `useValue(flagPath)`. Watch-style cascades can be implemented in handlers.
- **[Path string syntax is JSON-Pointer-like (`/items/0/name`)]** → Keep it simple and consistent with json-render's convention. No JSON Pointer edge cases (`~1` escaping) in v1; document the subset.
- **[Repeat key stability]** → If `repeat.key` is not provided, fall back to array index. Index keys are fine for append-only lists but break on reorder. Document the trade-off; recommend `key` on stable id fields.
- **[Async handlers]** → Handlers may be async; `emit` returns a Promise. State may mutate after await. Re-renders are driven solely by `setState` calls, so late writes still flow correctly. No special handling required; document.
- **[Per-path notification matching]** → On `set(path, value)`, the store must notify subscribers whose `watchedPath` equals `path` OR is an ancestor/descendant of `path`. Getting this wrong (over- or under-notifying) breaks the granular guarantee. Cover with explicit tests (set leaf, set subtree, set array).
- **[Stable ActionContext / StoreContext identity]** → If a consumer swaps the `store` prop or the `handlers` prop mid-session, the contexts re-create and everything re-renders. Acceptable; document that store/handlers should be created once (module-level or `useRef`).
- **[React 19 `useSyncExternalStore` getServerSnapshot]** → Provide a `getServerSnapshot` returning the initial state so SSR doesn't throw. Keep default = current snapshot for simplicity in CSR-only demos.

## Migration Plan

New library, no migration from existing data. Steps:
1. Add `mini-render/` source modules per Decision 7.
2. Add `mini-render/demo/` Vite + React + Mantine app with: a basic static spec, an editable form (BoundField), an action button (ActionButton), and a 1000-row editable table (RepeatChildren with per-cell `useBound`).
3. Verify granular re-renders via React DevTools Profiler (or React Scan): editing one cell must show exactly one component re-render.
4. `npx tsc --noEmit` must pass; demo build must succeed.

Rollback: delete the `mini-render/` directory. No impact on existing `test/` or `json-render/` since the change is additive and isolated.

## Open Questions

- Should `useBound` return `[value, setValue]` (json-render's `useStateBinding` shape) or a single object? Lean toward the tuple for familiarity. Decide at implementation.
- Do we want a `defineRegistry(catalog, components)` helper, or is a plain `Record<string, Component>` enough? Lean toward plain Record for v1; add a typed helper later.
- Should the built-in `setState` action support setting multiple paths in one dispatch (batch update) to avoid intermediate re-renders? Defer — a handler can call multiple `setState` and React batches them within the same tick already.
- Naming: keep `mini-render` or pick something less generic? Finalize package name at implementation; the design assumes `mini-render`.