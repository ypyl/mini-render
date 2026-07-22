## Why

The DndTable demo currently shows read-only rows — users can reorder and remove but can't edit cell values. Adding the edit/save/cancel toggle (matching the existing Form and Large demos) completes the CRUD pattern: create (add row), read (display), update (edit cells), delete (remove row), plus reorder. This makes the demo feel like a real spreadsheet and demonstrates how mini-render's store bindings work inside a DnD context.

## What Changes

- DndTable reads `/editingSection` from the store and conditionally renders an `EditToggle` button (Edit → Save/Cancel) matching the existing Form/Large/Table pattern
- SortableRow receives an `editing` flag and switches cells between read-only `TextInput` and editable `TextInput` with value changes written to the store at the item's path
- DndTable case store initializes with `editingSection: true` so rows are editable by default
- DndTable includes handlers (`startEdit`, `saveEdit`, `cancelEdit`) using the snapshot-based pattern from existing demos

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `dnd-table-demo`: DndTable gains an edit/save/cancel toggle and handlers. SortableRow supports editable cells bound to the store. The demo store includes an `editingSection` flag.

## Impact

- **Components**: `DndTable.tsx` (add EditToggle, handlers, pass `editing` to SortableRow), `SortableRow.tsx` (accept `editing`, use bound inputs)
- **Demo spec**: `buildSpec.ts` — add `EditToggle` to spec or have DndTable render it internally
- **Demo case**: `DndTableCase.tsx` — initialize `editingSection: true` in store
- **Handlers**: New `handlers.ts` in dnd-table case (startEdit, saveEdit, cancelEdit)
