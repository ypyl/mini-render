## Context

The mini-render demo currently renders BoundField as always-editable `<MantineTextInput>`. In the test2 extraction UI (the motivation for mini-render), `EditableField` defaults to read-only unstyled text and only shows an input when the user activates edit mode. This is a standard UX for document extraction UIs — the read-only view is cleaner for review, and the editing view is for correction.

The change is purely in `mini-render/demo/src/App.tsx`. No library modifications.

## Goals / Non-Goals

**Goals:**
- BoundField renders read-only (plain text) by default, editable (Mantine TextInput) when `/editingSection` is truthy.
- An "Edit" toggle button dispatches `toggleEdit` handler that flips `/editingSection`.
- The toggle applies to Form, Actions, and Large tabs. Basic tab stays static.
- One granular subscription per BoundField to `/editingSection` — when toggled, only BoundFields (not the renderer or other components) re-render.

**Non-Goals:**
- Per-row or per-field edit mode (global toggle only for the demo).
- Animations or transitions between modes.
- Changing the library API or adding read-only support to `ComponentProps`.
- The Actions tab's "Save" handler — it already works and is unrelated.

## Decisions

### Decision 1: Single boolean flag at `/editingSection`
A single store path holds the editing state. All BoundFields read the same flag. This keeps the demo simple — one toggle flips all fields.

**Alternative considered:** Per-section flags (e.g., `/editingSections/form`, `/editingSections/large`). Rejected for the demo — adds complexity without demonstrating anything the global flag doesn't.

**Alternative considered:** Track editing in React state instead of the store. Rejected — using the store demonstrates the action system and per-path re-render, which is the point of the demo.

### Decision 2: BoundField reads `/editingSection` via `useValue`
Each BoundField calls `useValue<boolean>("/editingSection")` in addition to `useBound(path)`. When the toggle fires, the store notifies all `/editingSection` subscribers → only BoundFields re-render. Other components (Cards, StaticText, etc.) are untouched.

**Rationale:** This showcases the granular subscription guarantee — every BoundField (up to 2000 in Large tab) re-renders on toggle, but nothing else does. The toggle is an explicit action, not a frequent edit, so 2000 re-renders on a button click is acceptable.

### Decision 3: Read-only mode renders plain unstyled text
When `/editingSection` is falsy, BoundField renders `<span>{value}</span>` (or the value inside a Box with no border). When truthy, renders the current `<MantineTextInput>`. This mirrors test2's `EditableField` behavior — the read-only text fills the same space to minimize layout shift.

### Decision 4: Toggle button lives in each relevant spec
Each spec (Form, Actions, Large) gets an `ActionButton` with `on: { click: { action: "toggleEdit" } }`. The handler is registered once at the App level.

### Decision 5: No changes to mini-render library source
This is a demo-only feature. The `ComponentProps` interface, registry, store, hooks, and renderer are unchanged.

## Risks / Trade-offs

- **[Toggle re-renders all BoundFields]** → 2000 re-renders on toggle in Large tab. Acceptable: the toggle is a discrete action, not a continuous edit. Each BoundField is a lightweight component (Mantine TextInput or a span). Verified during implementation — build + dev server responsiveness confirms it's fine.
- **[Layout shift on mode switch]** → Mitigated by using the same wrapper Box and positioning for both modes; Mantine TextInput with `variant="default"` and transparent border in read-only mode avoids shift, similar to test2's approach.
- **[No per-row toggle]** → Deferred. The global toggle demonstrates the pattern; per-row toggles would use the same mechanism with more complex state management but add no new concept.