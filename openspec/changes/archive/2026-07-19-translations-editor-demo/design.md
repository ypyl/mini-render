## Context

Object repeat was just added to the renderer. The feature needs a demo case — a translations editor is a natural fit: the store holds a `translations` object (key → string), each row shows the key label and an editable value field, all powered by `repeat` with `path: "/translations"`.

## Goals / Non-Goals

**Goals:**
- Create a `PathLabel` component that extracts the key name from `useRepeatPath()`
- Create a translations editor demo using object repeat
- Each row shows the key (PathLabel) and an editable value (BoundField with `bind: ""`)

**Non-Goals:**
- No edit toggle — fields are always editable (store initialized with `editingSection: true`)
- No language switching, plural forms, or i18n features
- No add/delete keys — static key set

## Decisions

### Decision 1: PathLabel extracts the last path segment

```tsx
export function PathLabel({}: ComponentProps) {
  const base = useRepeatPath();
  const key = base.split("/").pop() ?? "";
  return <>{key}</>;
}
```

**Why**: The repeat path for objects is `/translations/greeting`. The last segment IS the key name. Simple, no new hooks needed.

### Decision 2: BoundField bind: "" for the value

Inside an object repeat, `useRepeatPath()` returns `/translations/greeting`. `BoundField` with `bind: ""` resolves to `${base}/` → same path → reads/writes the value directly.

**Why**: `bind: ""` was already the correct pattern for reading the current item in array repeats (via `{ $item: "" }`). Works identically for objects.

### Decision 3: Always editable via editingSection: true

The store is initialized with `editingSection: true` so BoundFields render as editable text inputs. No edit toggle needed.

**Why**: Simpler demo — the point is the object repeat, not the edit lifecycle.

## Risks / Trade-offs

- **PathLabel outside repeat**: Returns empty string or `""` — harmless, renders nothing.
- **PathLabel in nested repeats**: Returns the innermost key — correct for the demo's flat structure.
