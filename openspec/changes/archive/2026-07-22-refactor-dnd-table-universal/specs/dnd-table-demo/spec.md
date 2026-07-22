## MODIFIED Requirements

### Requirement: DndTable renders a sortable table with drag handles
A `DndTable` component SHALL exist as a registry component that reads an array from the store at `element.props.path` and renders a Mantine `<Table>` with an auto-generated header row containing a drag column header, one `<Table.Th>` per entry in `element.props.columns`, and an actions column header. Rows SHALL be rendered via internal iteration (`.map()`) inside `<SortableContext>` using the `SortableRow` component. An "Add Row" button SHALL appear below the table, appending a new item with default values to the store. On drag end, DndTable SHALL compute the reordered array via `arrayMove` and write it to the store.

> **Limitation:** DndTable does NOT use mini-render's `repeat` directive. @dnd-kit requires `SortableContext` and `useSortable` to be in the same React render pass; `repeat` renders via a separate `RepeatChildren`/`ElementRenderer` pass, desynchronizing @dnd-kit's animation cycle and causing a double-move visual glitch. This is an inherent incompatibility between external DnD libraries and spec-driven repeat rendering.

#### Scenario: Table renders rows from store
- **WHEN** the store has `{ items: [{ name: "Alice", email: "a@x.com" }] }` and the spec has DndTable with `columns: ["Name", "Email"]`
- **THEN** the header row renders Th elements for the drag column, "Name", "Email", and actions column
- **AND** rows are rendered with drag handles, Name/Email values, and remove buttons

#### Scenario: Drag-and-drop reorders rows
- **WHEN** a user drags the second row above the first row and drops it
- **THEN** the visual order updates to show the dragged row first
- **AND** the store at the configured path is updated with the new array order

#### Scenario: Add row button appends a new item
- **WHEN** the user clicks the "Add Row" button
- **THEN** a new item `{ name: "New", email: "new@example.com" }` is appended to the array in the store

#### Scenario: Remove button removes the specified row
- **WHEN** the user clicks the remove button on the first row
- **THEN** that row is removed from the array in the store

#### Scenario: Keyboard-based reordering
- **WHEN** a user focuses a drag handle and uses keyboard controls to move a row
- **THEN** the row reorders and the store is updated on completion
