## Why

The `repeat` directive currently only works on arrays. Real data often arrives as objects — settings maps, locale strings, feature flags — and flattening them to arrays just to iterate them is wasteful. Supporting objects natively makes mini-render more natural to use with common JSON shapes.

## What Changes

- `RepeatChildren` in the renderer detects whether the value at `repeat.path` is an array or a plain object (via `Array.isArray`). Arrays use the existing `.map()` path; objects use `Object.entries()`.
- For object iteration, `{ $item: "" }` returns the path to the property *value* (e.g., `/settings/theme`), enabling `BoundField` with `bind: ""` to read/write the value directly.
- React keys: when iterating an object, if `repeat.key` is undefined, the object's own key is used. If `repeat.key` is defined, it's read from the property *value* (consistent with array behavior).
- `RepeatIndexContext` type widens from `number | undefined` to `string | number | undefined`. `useRepeatIndex()` follows suit.

No new spec fields. No API changes. `RepeatConfig` is unchanged.

## Capabilities

### New Capabilities
- `repeat-objects`: The `repeat` directive iterates over plain objects in addition to arrays, using `Object.entries()` for key-value pairs.

### Modified Capabilities
- `spec-schema`: `RepeatConfig` unchanged — `mode` is unnecessary; detection is automatic via `Array.isArray`.

## Impact

- **Modified**: `src/renderer.tsx` — `RepeatChildren` adds object branch
- **Modified**: `src/hooks.ts` — `RepeatIndexContext` type widens
- **Related**: existing array-repeat behavior is untouched; all current demos continue working
