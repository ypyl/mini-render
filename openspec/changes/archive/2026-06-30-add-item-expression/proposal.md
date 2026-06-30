## Why

Inside a `repeat`, action bindings cannot reference the current item's path. A delete button on row 5 of a table has no way to tell its handler "operate on `/items/5`" — the handler receives static params only. json-render solves this with `$item` expressions in action params (e.g., `{ $item: "" }` → `/items/5`). Adding the same capability to mini-render enables per-row action dispatch without workarounds.

## What Changes

- **`resolveParams`** gains `$item` resolution. When an action param value is `{ $item: "<field>" }`, it resolves to the absolute state path `${repeatBasePath}/${field}` at dispatch time. `{ $item: "" }` resolves to the base path itself (e.g., `/items/5`).
- **`resolveParams`** also gains `$index` resolution. `{ $index: true }` resolves to the numeric repeat index.
- **`useEmit`** calls `useRepeatPath()` (and a new `useRepeatIndex()`) to capture the repeat scope at the element's position. The scope is static per element (a fixed index in the repeat), so the `useMemo` dependency remains stable — no re-render cascade.
- **`RepeatScope`** exposes both `path` and `index` via context (currently only `path`).
- **New hook `useItemPath(expr)`**: a convenience helper for components that need to resolve `$item` expressions in props. If `expr` is `{ $item: "field" }`, returns `${basePath}/${field}`; if a plain string, returns it unchanged. Optional sugar — existing manual concatenation still works.
- **Demo**: the Large table gains a per-row "Delete" button that uses `{ $item: "" }` in its action params and a `removeItem` handler.

## Capabilities

### New Capabilities
- `item-expression-action`: `$item` and `$index` expressions resolved in action params at dispatch time by `resolveParams` / `useEmit`. Resolution is pure string concatenation with the repeat base path — no store subscription, no re-render cascade.
- `item-expression-props`: `useItemPath(expr)` hook that resolves `$item` expressions to absolute paths for use in component props. Components opt in; no renderer-level resolution.

### Modified Capabilities
<!-- None — all new capabilities. -->

## Impact

- **Affected files**: `src/hooks.ts` (resolveParams, useEmit), `src/renderer.tsx` (RepeatScope gains index context, export useRepeatIndex), `src/index.ts` (new exports), `demo/src/App.tsx` (per-row delete demo).
- **No breaking changes** — existing `useRepeatPath()` and path concatenation continue to work.
- **No new dependencies** — `useRepeatPath`/`useRepeatIndex` are lightweight context reads.
- **Performance**: zero subscription overhead. `$item`/`$index` are resolved on-demand in `emit()`, which is a closure invoked on user events, not during render.