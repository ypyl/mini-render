## Context

The current `DndTable` is a monolith: it iterates items internally with `.map()`, hardcodes `{ name, email }` columns, and includes a private `SortableRow` nested function. This works for the demo but violates the principle that `demo/src/components/` should contain reusable, composable pieces. The existing Table demo already demonstrates the pattern: `Table`, `THead`, `TBody`, `Tr`, `Th`, `Td` are all independent registry components composed via spec. DndTable + SortableRow should follow the same pattern.

## Goals / Non-Goals

**Goals:**
- Split `DndTable` into a wrapper component (provides DndContext, SortableContext, Table shell, auto header, Add button) and `SortableRow` (a standalone registry component using useSortable)
- DndTable iterates children via mini-render's `repeat` directive (no internal `.map()`)
- Columns are defined in the spec via `columns` prop on DndTable + `children` on SortableRow — not hardcoded in the component
- Remove the `Item` interface — components work with `Record<string, unknown>`

**Non-Goals:**
- Making SortableRow work outside a DndTable context (it requires SortableContext ancestor)
- Configurable drag handle or remove button styling
- Multiple DndTables on one page

## Decisions

**Decision 1: DndTable auto-generates the Table.Thead**
DndTable renders a complete `<Table>` with a header row containing: a drag column (empty), one `<Th>` per entry in `columns` prop, and an actions column (empty). This keeps the spec concise — the user only declares content columns, not layout columns. Alternative considered: let the spec define the full header including drag/actions columns — more verbose and error-prone.

**Decision 2: SortableRow renders drag handle + children + remove button**
SortableRow always renders three cell groups: drag handle, `{children}` (the user's content cells), and a remove button. The drag handle uses `useSortable`'s `listeners` for activation. The remove button writes to the store directly via `useSetValue`, filtering itself out by index. Alternative considered: remove via emit — not possible since emit doesn't take runtime params.

**Decision 3: Sortable ID = `${repeatIndex}-${item[idKey]}`**
The sortable ID is derived from the repeat index (from `useRepeatIndex()`) and the item's value at `idKey`. This matches the IDs computed by DndTable for `SortableContext.items`. Alternative considered: just using the index — but indices change after reorder, causing animation glitches.

**Decision 4: DndTable reads items to compute SortableContext IDs, not to iterate**
DndTable reads the array from the store solely to compute the `items` prop for `SortableContext`. The actual iteration is done by mini-render's `repeat` directive. DndTable also handles `onDragEnd` by computing the new order and writing it to the store. Alternative considered: using local `useListState` — breaks the store-as-source-of-truth pattern.

## Risks / Trade-offs

- **SortableRow.remove uses useSetValue**: SortableRow has direct store write access (via useSetValue on the array path). This is acceptable since it follows the pattern of other self-contained components (Modal, PreviewBox). Risk: tight coupling to store path structure. Mitigation: the path is derived from repeat context, which is already a mini-render concept.
- **DndTable's Thead doesn't know column count until render**: The header auto-generates from `columns` prop. If the spec changes columns but forgets to update `columns`, header/cell count mismatches. Mitigation: this is a spec authoring concern, not a runtime issue — the mismatch would be visually obvious.

## Open Questions

None.
