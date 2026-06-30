## ADDED Requirements

### Requirement: Table demo renders a spec as an HTML table with column headers
The demo app SHALL provide a "Table" tab that renders a spec as a proper HTML `<table>` with a `<thead>` containing three column headers (Name, Email, Actions) and a `<tbody>` driven by `repeat` over `/items`.

#### Scenario: Table renders with headers
- **WHEN** the "Table" tab is selected
- **THEN** an HTML `<table>` is rendered with a `<thead>` containing `<th>` cells for "Name", "Email", and "Actions"

#### Scenario: Table renders rows for each item in /items
- **WHEN** `/items` contains 3 objects and the "Table" tab is selected
- **THEN** the `<tbody>` contains 3 `<tr>` rows, each corresponding to one item

### Requirement: Table cells use existing binding and action primitives
Each data row SHALL render its name and email via `BoundField` components (reading from the repeat-scoped `bind` paths `"name"` and `"email"`), and its actions cell SHALL contain an `ActionButton` labeled "✕" that dispatches the `removeItem` handler with `{ $index: true }`.

#### Scenario: Name and email cells are editable bound fields
- **WHEN** the "Table" tab is selected and the user types into the Name cell of the first row
- **THEN** the corresponding item's `name` field at `/items/0/name` updates and only that cell re-renders

#### Scenario: Delete button removes the row
- **WHEN** the user clicks the "✕" button in row index 2
- **THEN** the `removeItem` handler is invoked with `index: 2` and the item is removed from `/items`

### Requirement: Table spec is self-seeding
The table demo spec builder SHALL seed `/items` with 1000 `{ name, email }` objects on first render if `/items` is undefined, matching the existing large-demo seeding behavior.

#### Scenario: First visit seeds 1000 items
- **WHEN** the store's `/items` is undefined and the "Table" tab is first selected
- **THEN** `/items` is populated with 1000 objects, each having `name` and `email` fields, and the table renders 1000 rows
