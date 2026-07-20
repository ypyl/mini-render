## Why

The existing demo cases cover form editing, actions, repeat, conditional rendering, and modals — but none demonstrate list mutation with drag-and-drop reordering. Adding a DnD table demo showcases how mini-render's action system and store can power interactive list operations (add, remove, reorder) integrated with a third-party library (`@dnd-kit`), proving the architecture handles complex UI interactions beyond basic CRUD.

## What Changes

- Add `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, and `@tabler/icons-react` as demo dependencies
- Create `DndTable` registry component — a self-contained component using `@dnd-kit` to render a sortable table with drag handles, add-row button, and per-row remove buttons; reads/writes a list at a store path via actions
- Create a new demo case at `/dnd-table` with a store containing a list of items, a JSON spec wiring the DndTable component, and handlers for `addItem`, `removeItem`, and `reorderItems`
- Add the `/dnd-table` route and home page card

## Capabilities

### New Capabilities

- `dnd-table-demo`: A demo case with a sortable table using `@dnd-kit` for drag-and-drop row reordering, plus add/remove row buttons. Demonstrates list mutation via action handlers and integration of a third-party interaction library within the spec-driven model.

### Modified Capabilities

None.

## Impact

- **Dependencies**: 4 new packages in `demo/package.json` (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `@tabler/icons-react`)
- **New component**: `demo/src/components/DndTable.tsx`
- **New case**: `demo/src/cases/dnd-table/` (Case, spec, registry, handlers)
- **App integration**: `App.tsx` (route), `HomePage.tsx` (card), `README.md` (demo count + listing)
