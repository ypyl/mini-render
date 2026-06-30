## Why

The mini-render demo currently renders all BoundField inputs as always-editable. In real extraction/editing UIs (like test2's `EditableField`), fields default to read-only plain text and only become editable when the user activates an edit mode. This is a common UX pattern worth demonstrating in the demo to show mini-render's action system and per-path granular re-render working together.

## What Changes

- **BoundField** in the demo gains a read-only mode: when editing is off, renders unstyled plain text (no input border); when editing is on, renders a bordered Mantine TextInput.
- **Editing state** lives in the store at `/editingSection` (boolean). BoundField reads this flag via `useValue` alongside its bound data path.
- **Edit toggle action**: a new `toggleEdit` handler flips the `/editingSection` flag in the store. An `ActionButton` in each spec that has BoundFields dispatches this action.
- **Large table** inherits the same toggle — one button flips all 2000 cells from read-only to editable and back.
- All demo specs (Form, Actions, Large) gain a toggle button where applicable.

## Capabilities

### New Capabilities
- `editable-field-mode`: BoundField renders read-only (unstyled text) or editable (Mantine TextInput) based on `/editingSection` boolean in the store. Uses `useValue("/editingSection")` — one subscription, granular re-render when toggled.
- `edit-toggle-action`: a `toggleEdit` handler registered at the top flips `/editingSection`. An `ActionButton` in affected specs dispatches this via `on: { click: { action: "toggleEdit" } }`.

### Modified Capabilities
<!-- None — demo-only, no library spec changes. -->

## Impact

- **Affected files**: `mini-render/demo/src/App.tsx` only (BoundField component, handlers, specs).
- **No library changes** — mini-render core (`src/`) untouched.
- **No new dependencies** — uses existing `useValue` hook.
- **No breaking changes** — existing tabs continue to work; Forms/Actions/Large gain the toggle.