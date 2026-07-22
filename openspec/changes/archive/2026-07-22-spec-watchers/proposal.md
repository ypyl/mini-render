## Why

Currently, deriving one store value from another requires either wiring `onChange` in every BoundField (imperative, repetitive) or using `useEffect` in a component (subscription loops, cursor jumps). The library has all the pieces for a clean solution — `store.subscribe` fires without rendering, and the action system already dispatches handlers on events. Adding a `watch` field to the spec lets elements declare store-change-triggered actions declaratively, reusing the same handler system as `on.click`.

## What Changes

- Add optional `watch` field to `UIElement` type — a map of store paths to arrays of `ActionBinding`, mirroring the structure of `on` (event → actions) but keyed by store path instead of event name
- Handle `watch` in `ElementRenderer` — on mount, subscribe to each watched path via `store.subscribe`; on change, dispatch the configured actions using the existing handler resolution and param resolution
- Watchers auto-unsubscribe when the element unmounts (standard React `useEffect` cleanup)
- No new hooks, no new store API, no component changes required

## Capabilities

### New Capabilities

None — all changes are modifications to existing specs.

### Modified Capabilities

- `spec-schema`: `UIElement` gains an optional `watch` field of type `Record<string, ActionBinding[]>` — a map of store paths to arrays of action bindings dispatched when the path's value changes
- `renderer`: `ElementRenderer` subscribes to watched paths on mount and dispatches actions on change, reusing the existing action/handler pipeline
- `action-system`: Actions can now be triggered by store changes (via `watch`) in addition to user gestures (via `emit`). The handler API (`{ getState, setState }`) is unchanged.

## Impact

- **Types**: `src/spec.ts` — new `watch` field on `UIElement`
- **Renderer**: `src/renderer.tsx` — `ElementRenderer` adds `useEffect` for watch subscriptions
- **Store**: No changes — uses existing `store.subscribe` which is already part of the public API
- **Demo**: A validation demo case can be added to showcase the `watch` pattern (out of scope for this change, can be a follow-up)
