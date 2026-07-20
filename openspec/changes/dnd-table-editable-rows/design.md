## Context

The DndTable demo currently renders static read-only cells. The existing Form, Large, and Table demos already demonstrate the edit/save/cancel toggle pattern: an `EditToggle` button, an `editingSection` flag in the store, `BoundField` components that read `/editingSection` to switch between read-only and editable modes, and handlers (`startEdit`, `saveEdit`, `cancelEdit`) using `structuredClone` for snapshot-based cancel. DndTable should adopt this same pattern, but since SortableRow is called directly (not via mini-render registry), the editable logic goes into SortableRow using store hooks.

## Goals / Non-Goals

**Goals:**
- Add a global edit/save/cancel toggle to DndTable, matching the existing demo pattern
- SortableRow cells become editable `TextInput` when editing, read-only when not
- Cell changes persist to the store at the item's path (e.g., `/items/0/name`)
- Cancel reverts to the pre-edit snapshot

**Non-Goals:**
- Per-row edit toggle (one row at a time) — global toggle is sufficient
- Per-cell validation or type coercion
- Changing the existing snapshot-based handler pattern

## Decisions

**Decision 1: Global edit toggle via EditToggle component**
DndTable renders an `EditToggle` button above the table. The `EditToggle` dispatches `startEdit`/`saveEdit`/`cancelEdit` actions. The store holds `editingSection: boolean` and `_snapshot` for cancel. This exactly matches the Form/Large/Table pattern. Alternative considered: per-row edit button — more complex UI for marginal gain.

**Decision 2: SortableRow uses `useValue`/`useSetValue` for bound cells**
SortableRow computes the item path as `${arrayPath}/${index}` and uses `useValue` to read each cell's value. On change, it calls `useSetValue` for that cell path. When `editing` is false, inputs are read-only. This keeps the store as source of truth. Alternative considered: SortableRow receives `item` as a prop and manages local state — loses store reactivity.

**Decision 3: Edit/save/cancel logic lives inside DndTable**
DndTable reads `/editingSection` from the store and renders its own Edit/Save/Cancel buttons. On edit, it snapshots state via `structuredClone` into `/_snapshot`. On save, it clears the snapshot. On cancel, it restores from snapshot. This avoids external handlers and keeps the spec simple. Alternative considered: using the spec's `on` bindings and a separate `handlers.ts` — adds indirection for no benefit.

**Decision 4: SortableRow receives `editing` flag + `path` from DndTable**
DndTable passes `editing` (boolean) and `path` (the array path, e.g., `/items`) to each SortableRow. SortableRow computes per-cell paths as `${path}/${index}/${field}` and uses `useValue`/`useSetValue`. This keeps SortableRow generic — any array path and any columns work.

## Risks / Trade-offs

- **SortableRow subscribes to per-cell paths**: Each cell calls `useValue` which subscribes to the store. For 5 rows × 2 columns = 10 subscriptions. This is fine at demo scale but would need optimization for thousands of cells. Mitigation: the existing Large/Table demos prove this pattern scales.
- **Snapshot captures the entire store**: `structuredClone(getState())` clones all paths, not just `/items`. This is the same pattern used in existing demos and is fine for a demo.

## Open Questions

None.
