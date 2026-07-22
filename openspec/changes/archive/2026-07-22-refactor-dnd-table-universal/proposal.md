## Why

`DndTable` currently iterates rows internally with `.map()` and hardcodes `{ name, email }` columns — it's a monolith tied to one data shape. Refactoring to use mini-render's `repeat` directive and a separate `SortableRow` component makes both components universal: `DndTable` becomes a generic sortable table wrapper (any columns, any item shape), and `SortableRow` becomes a reusable draggable row (usable outside DndTable contexts). This follows the existing pattern where `Table`/`THead`/`TBody`/`Tr`/`Td` are all independent, composable components.

## What Changes

- Split `DndTable` into two registry components:
  - `DndTable`: provides `DndContext` + `SortableContext` + Table shell with auto-generated header (drag column + content columns from new `columns` prop + actions column). Accepts children (repeated `SortableRow` elements) rendered inside `Table.Tbody`. Has "Add Row" button. Handles `onDragEnd` by writing reordered array to store.
  - `SortableRow`: uses `useSortable`; renders a `<Table.Tr>` with a drag handle cell, `{children}` (content cells from spec), and a remove button cell. Derives its sortable ID from repeat index + the item's `idKey` field.
- Remove hardcoded `interface Item { name: string; email: string }` — components use `Record<string, unknown>`.
- Update `dnd-table` demo spec to use `repeat` on `/items` with `SortableRow` children containing `BoundField` elements for the columns.
- `columns` prop on DndTable defines the header labels and implicitly determines column count (demo: `["Name", "Email"]`).

## Capabilities

### New Capabilities

None — `SortableRow` ships as part of the same demo case.

### Modified Capabilities

- `dnd-table-demo`: DndTable gains `columns` prop and renders children via repeat instead of internal `.map()`. New `SortableRow` component added as a peer registry component. The demo spec changes to declare columns via the spec rather than hardcoding them in the component.

## Impact

- **Components**: `DndTable.tsx` (major rewrite), new `SortableRow.tsx`
- **Demo spec**: `dnd-table/buildSpec.ts` — uses `repeat` + `SortableRow` + `BoundField`
- **Registry**: `dnd-table/registry.ts` — adds `SortableRow`
- **Dependencies**: No changes (still needs `@dnd-kit` + `@tabler/icons-react`)
