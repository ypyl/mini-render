## Why

Analyze current json-render usage reveals a structural performance limitation: a single cell edit in a large repeated structure (e.g., 1000-row table) cascades re-renders across the entire element tree because `ElementRenderer`, `VisibilityProvider`, and `ActionProvider` all subscribe to the same React context, which changes value on every state mutation. Upstream issues #53 and #54 document this re-render cascade and remain unanswered after ~6 months.

We need a minimal spec-driven UI rendering library that fixes the rendering-plane problem at its root: **path-based granular subscriptions** instead of a single global context. This library targets the *dynamic UI rendering* use case only — no AI streaming, no Zod catalog, no directives, no devtools, no multi-framework output.

## What Changes

- Introduce a new standalone library `mini-render` (React + TypeScript) implementing spec-driven UI rendering with granular re-renders.
- **Spec schema**: a declarative tree of keyed elements (`{ type, props, children, on, repeat }`) — same conceptual shape as json-render, minus `$state`/`$computed`/`$bind` expressions and `visible`/`watch`.
- **Path-based store**: an external store with per-path `useSyncExternalStore` subscriptions. A component subscribing to `/items/0/name` re-renders ONLY when that path changes; setting one cell does not re-render the other N-1 cells.
- **Renderer**: a recursive walker that maps spec type names → components from a registry. The `ElementRenderer` itself subscribes to NOTHING — it neither reads nor subscribes to state — so it never re-renders on state mutation.
- **Handlers (actions)**: registered once at the top of the app. Component events dispatch handlers via `emit`. Handlers are pure `(params, storeApi) => void` functions that read on-demand and write to specific paths. The ActionContext value is stable (no state subscription), so emitting actions never triggers re-renders.
- **Binding / presentational split**: registry components are thin adapters that read paths from `element.props` (e.g. `bind`, `binds`, `values`, `actions`) and pass plain `value`/`onChange`/`onClick` to pure presentational components. Presentational components (Mantine wrappers, plain inputs) know nothing about paths or the spec, so they remain portable across specs and even outside mini-render.
- Target runtime: React 19 + TypeScript. Single package with zero runtime dependencies (uses only `useSyncExternalStore`). **BREAKING**: not a drop-in replacement for `@json-render/react`; different spec schema (no dynamic `$`-expressions), different contract (paths live in component props, not resolved by the renderer).

## Capabilities

### New Capabilities
- `spec-schema`: the declarative UI spec structure — keyed element map, root pointer, children references, `on` event bindings, and `repeat` configuration. Defines what valid specs look like (no runtime resolution — props are plain values + path strings).
- `path-based-store`: a state store with immutable structural-sharing updates and per-path subscriptions exposed via `useSyncExternalStore`. Granular: only subscribers whose watched path is affected re-render.
- `renderer`: the recursive spec walker that resolves element types to registry components, builds a stable `emit` function per element, and renders children. Subscribes to no state. `React.memo`-able per element.
- `action-system`: top-registered handler functions invoked by component events. Supports `$state` path references in action params (resolved on-demand, not subscribed). Built-in `setState` action. Handler context is write-oriented and stable.
- `binding-components`: the binding-layer contract — how registry components read paths/behaviors from `element.props` (`bind`, `binds`, `values`, `actions`), use `useBound`/`useValue`/`emit`, and forward plain props to reusable presentational components. Documents the universality contract: components declare contract in props, spec injects actual paths.

### Modified Capabilities
<!-- None — this is a new standalone library, separate from the json-render capabilities. -->

## Impact

- **New code**: a new package/directory (proposed location `test/mini-render/` or a sibling) containing the library source (~230 lines across spec types, store, hooks, action context, renderer, repeat).
- **New demo app**: a React + Vite consumer exercising the library with editable table and repeat scenarios to verify granular re-renders (the cell-edit scenario that motivated the change).
- **Dependencies**: zero runtime deps. Dev deps: React 19, TypeScript, Vite, Mantine (for the presentational layer in the demo).
- **No changes** to the existing `test/` app or `json-render/` source library — this is additive exploration in a separate location.
- **Risk**: divergent schema from json-render means specs are not interchangeable; this is intentional and accepted.