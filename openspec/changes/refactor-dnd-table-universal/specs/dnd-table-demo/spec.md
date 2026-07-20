## MODIFIED Requirements

### Requirement: DndTable renders a sortable table with drag handles
A `DndTable` component SHALL exist as a registry component that reads an array from the store at `element.props.path` and renders a Mantine `<Table>` with an auto-generated header row containing a drag column header, one `<Table.Th>` per entry in `element.props.columns`, and an actions column header. Rows SHALL be rendered via internal iteration (`.map()`) inside `<SortableContext>`. An "Add Row" button SHALL appear below the table, appending a new item with default values to the store. On drag end, DndTable SHALL compute the reordered array via `arrayMove` and write it to the store.

> **Limitation:** DndTable does NOT use mini-render's `repeat` directive. @dnd-kit requires `SortableContext` and `useSortable` to be in the same React render pass; `repeat` renders via a separate `RepeatChildren`/`ElementRenderer` pass, desynchronizing @dnd-kit's animation cycle and causing a double-move visual glitch. This is an inherent incompatibility between external DnD libraries and spec-driven repeat rendering.

#### Scenario: Table renders rows from store with configurable columns
- **WHEN** the store has `{ items: [{ name: "Alice", email: "a@x.com" }, { name: "Bob", email: "b@x.com" }] }` and the spec has DndTable with `columns: ["Name", "Email"]`
- **THEN** the header row renders Th elements for the drag column, "Name", "Email", and actions column
- **AND** two rows are rendered internally by DndTable with drag handles, Name/Email values, and remove buttons

#### Scenario: Drag-and-drop reorders rows
- **WHEN** a user drags the second row above the first row and drops it
- **THEN** the visual order updates to show the dragged row first
- **AND** the store at the configured path is updated with the new array order

#### Scenario: Add row button appends a new item
- **WHEN** the user clicks the "Add Row" button
- **THEN** a new item with default values (one "New" per column) is appended to the array in the store

#### Scenario: Keyboard-based reordering
- **WHEN** a user focuses a drag handle and uses keyboard controls to move a row
- **THEN** the row reorders and the store is updated on completion

### Requirement: SortableRow renders a draggable table row
A `SortableRow` component SHALL exist as a direct component (not a mini-render registry component) that uses `useSortable` from `@dnd-kit`. It SHALL render a `<Table.Tr>` with: a drag handle cell (using `useSortable`'s `listeners` for activation), content cells derived from a `columns` prop (rendered as read-only TextInputs), and a remove button cell. The sortable ID SHALL be derived from the first column's value. The remove button SHALL call the `onRemove` callback with the row index.

#### Scenario: SortableRow renders with drag handle, columns, and remove
- **WHEN** SortableRow renders inside a SortableContext with `columns: ["Name", "Email"]` and `item: { name: "Alice", email: "a@x.com" }`
- **THEN** the row renders with a grip icon in the first cell, "Alice" and "a@x.com" in content cells, and a remove button in the last cell

#### Scenario: SortableRow remove button calls onRemove
- **WHEN** the user clicks the remove button on a SortableRow with `index: 1`
- **THEN** the `onRemove` callback is called with `1`

### Requirement: Dnd table demo case has its own page
A demo case SHALL exist at the `/dnd-table` route with a `DndTableCase` component that creates a store with a list of items and renders a `Renderer` with a spec containing a DndTable element.

#### Scenario: Navigating to dnd-table page
- **WHEN** navigating to `/dnd-table`
- **THEN** the DndTable renders inside a CaseContainer with title "Drag & Drop Table"
- **AND** the table shows rows with drag handles, Name and Email cells, and remove buttons
- **AND** an "Add Row" button is visible below the table

#### Scenario: Home page includes dnd-table card
- **WHEN** viewing the home page
- **THEN** a card for "Drag & Drop" is present with a description mentioning drag-and-drop reordering
