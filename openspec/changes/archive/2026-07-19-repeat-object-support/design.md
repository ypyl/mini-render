## Context

The `repeat` directive renders children once per element in a state array. Users must store data as arrays even when the natural shape is a key-value object (settings, flags, translations). Adding object iteration removes this friction with zero spec changes.

## Goals / Non-Goals

**Goals:**
- `RepeatChildren` iterates objects when the value at `repeat.path` is a plain object
- `{ $item: "" }` returns the value path (`/path/key`), consistent with array behavior where it returns the item path (`/items/0`)
- React key behavior is consistent: `repeat.key` extracts from the *value* for both arrays and objects
- Existing array behavior is untouched
- No new fields on `RepeatConfig` or `UIElement`

**Non-Goals:**
- No nested object recursion — only top-level iteration
- No Map/Set support — only plain objects
- No change to `resolveParams` or `useItemPath` — they already work with the base path

## Decisions

### Decision 1: `Array.isArray()` detection, no `mode` field

```ts
const value = useValue(repeat.path);
if (Array.isArray(value)) { /* existing .map() */ }
else if (value && typeof value === 'object') { /* Object.entries() */ }
else { /* empty fragment */ }
```

**Why**: The value's runtime type is the source of truth. Adding a `mode` field duplicates what the data already says and creates the possibility of mismatch.

### Decision 2: Object key as React key when `repeat.key` is undefined

For arrays: `key undefined` → fallback to numeric index. For objects: `key undefined` → fallback to object key.

**Why**: The object key is a natural, stable identity. A numeric index would be worse because `Object.entries()` order, while consistent, isn't as meaningful as the key itself.

### Decision 3: `RepeatIndexContext` type widens

`number | undefined` → `string | number | undefined`. `useRepeatIndex()` follows.

**Why**: For arrays, index is still `number`. For objects, index is still the numeric position. The wider type is only needed because `RepeatIndexContext.Provider` receives a `number`, but the context type is consumed by `useRepeatIndex()` which components can use. In practice, `{ $index: true }` still returns the numeric position for both modes.

## Risks / Trade-offs

- **`Object.entries()` ordering**: String keys follow insertion order in ES2015+. Integer-like keys sort numerically first — this matches `Object.keys()` behavior and is predictable.
- **TypeScript break**: `useRepeatIndex()` return type widens — callers assuming `number` will need to handle `string`. This is a minor breaking change for TS users.
