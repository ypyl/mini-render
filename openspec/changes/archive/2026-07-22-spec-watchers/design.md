## Context

mini-render already has all the pieces for reactive derivations: `store.subscribe` fires on mutation without React re-renders, the action system dispatches handlers, and `resolveParams` passes current state values. The missing piece is a declarative way to wire store changes to actions — currently you must do this imperatively in a component (`useEffect` + `useValue` → handler call). json-render's `watch` field shows the pattern: declare watchers in the spec, reuse the action system.

## Goals / Non-Goals

**Goals:**
- Add `watch` field to `UIElement` type — `Record<string, ActionBinding[]>` — mapping store paths to action arrays
- Handle `watch` in `ElementRenderer` via `store.subscribe` — no re-render, just action dispatch
- Auto-cleanup watchers on unmount via `useEffect`
- Reuse existing handler resolution, param resolution, and built-in `setState` action

**Non-Goals:**
- Watcher-specific handler API (handlers get the same `{ getState, setState }`)
- Debounce/throttle — if needed, handlers implement it themselves
- Cascade guards beyond what `set` already provides (no infinite-loop prevention — responsibility of the handler author)

## Decisions

**Decision 1: `watch` field mirrors `on` structure**
Both are `Record<string, ActionBinding | ActionBinding[]>`. `on` is keyed by event name (`"click"`); `watch` is keyed by store path (`"/form/name"`). This symmetry makes the spec format predictable. Alternative considered: a single `{ action, params }` per path (no array) — less flexible than `on` which already supports arrays.

**Decision 2: `store.subscribe` not `useValue`**
Watchers use `store.subscribe(path, callback)` which fires synchronously on `set` without involving React. `useValue` would trigger re-renders, defeating the purpose. The callback resolves params (via `resolveParams`) and invokes the handler. Alternative considered: `useValue` + `useEffect` — causes re-renders on every watched path change, breaking the no-re-render guarantee.

**Decision 3: Watcher cleanup via `useEffect`**
The `ElementRenderer` sets up subscriptions in a `useEffect` and returns a cleanup function that unsubscribes. When the element unmounts (e.g., conditional rendering via `Switch`), watchers die with it. This matches React's resource lifecycle. Alternative considered: store-level watchers — harder to scope to element lifetime.

**Decision 4: No cascade guard in the renderer**
If a watcher's handler calls `setState` which triggers another watcher, the renderer does not prevent infinite loops. This matches the action system's philosophy (handlers are responsible for their own logic). A handler can check `getState()` before writing to avoid loops. Alternative considered: depth-limited cascade — adds complexity for an edge case.

**Decision 5: Watch params resolve at dispatch time**
Same as `on` bindings — `{ $state: "/path" }` references are resolved against the current store state at the moment the watch fires. Since `store.subscribe` fires synchronously after `set`, the store already has the new value. Alternative considered: passing the changed value directly — less flexible than `$state` which can reference any path.

## Risks / Trade-offs

- **Handler calling setState for the watched path**: If a watcher on `/name` calls `setState("/name", ...)`, this triggers another subscription fire. Mitigation: handler author responsibility. The renderer could add a same-tick guard, but this adds complexity.
- **Many watchers on one path**: If 100 elements watch `/items`, all 100 handlers fire on every mutation. Mitigation: this is inherent to the pattern; use `watch` sparingly (it's for validation/computed values, not for every element).

## Open Questions

None.
