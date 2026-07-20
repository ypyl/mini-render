## ADDED Requirements

### Requirement: DndTable renders a sortable table with drag handles
A `DndTable` component SHALL exist as a registry component that reads an array from the store at `element.props.path` and renders a Mantine `<Table>` where each row has a drag handle, two data columns (Name, Email), and a remove button. Rows SHALL be reorderable via vertical drag-and-drop using `@dnd-kit`. An "Add Row" button SHALL appear below the table. All list mutations (add, remove, reorder) SHALL write directly to the store at the configured path.

#### Scenario: Table renders rows from store
- **WHEN** the store has `{ items: [{ name: "Alice", email: "a@x.com" }, { name: "Bob", email: "b@x.com" }] }` and DndTable has `path: "/items"`
- **THEN** two rows are rendered with drag handles and Name/Email values
- **AND** each row has a remove button

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

### Requirement: Dnd table demo case has its own page
A demo case SHALL exist at the `/dnd-table` route with a `DndTableCase` component that creates a store with a list of items and renders a `Renderer` with the DndTable spec.

#### Scenario: Navigating to dnd-table page
- **WHEN** navigating to `/dnd-table`
- **THEN** the DndTable renders inside a CaseContainer with title "Drag & Drop Table"
- **AND** the table shows rows with drag handles, Name, Email, and remove buttons
- **AND** an "Add Row" button is visible below the table

#### Scenario: Home page includes dnd-table card
- **WHEN** viewing the home page
- **THEN** a card for "Drag & Drop" is present with a description mentioning drag-and-drop reordering
