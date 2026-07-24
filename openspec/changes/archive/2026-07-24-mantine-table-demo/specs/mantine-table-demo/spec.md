## ADDED Requirements

### Requirement: PaginatedTable component renders Mantine Table with pagination

A `PaginatedTable` component SHALL exist as a registry component that reads an array from the store at `element.props.path` and renders a Mantine `<Table>` using the `data` prop. The component SHALL accept `pageSize` from props (default 10). It SHALL subscribe to `/page` in the store to determine the current page. Rows rendered SHALL be the slice `items[(page-1)*pageSize .. page*pageSize]` from the full dataset. A Mantine `<Pagination>` component SHALL be rendered below the table, with `total` set to `Math.ceil(items.length / pageSize)` and `value` bound to the current page from the store. The `onChange` callback SHALL dispatch a `goToPage` action that writes the new page number to `/page`.

#### Scenario: Table renders first page of data
- **WHEN** the store has 300 items and `/page` is 1
- **THEN** the table renders rows 1 through 10 from the dataset
- **AND** the pagination shows page 1 as active with 30 total pages

#### Scenario: Changing page updates visible rows
- **WHEN** the user clicks page 3 on the pagination component
- **THEN** the `goToPage` action sets `/page` to 3
- **AND** the table re-renders showing rows 21 through 30

#### Scenario: Pagination controls navigate correctly
- **WHEN** the user clicks the "next" button on the last page
- **THEN** no action is dispatched (page stays at last)
- **WHEN** the user clicks the "previous" button on the first page
- **THEN** no action is dispatched (page stays at 1)

#### Scenario: Table uses Mantine TableData prop
- **WHEN** the PaginatedTable renders
- **THEN** the Mantine `<Table>` receives a `data` prop with `head` (column headers) and `body` (2D array of row data)

### Requirement: Mantine table demo case has its own page

A demo case SHALL exist at the `/mantine-table` route with a `MantineTableCase` component that creates a store with 300 items and an initial `/page` value of 1. The case SHALL render a `Renderer` with the spec that uses `PaginatedTable` inside a `CaseContainer`.

#### Scenario: Navigating to mantine-table page
- **WHEN** navigating to `/mantine-table`
- **THEN** the PaginatedTable renders inside a CaseContainer with title "Mantine Table"
- **AND** the table shows 10 rows with page 1 active
- **AND** pagination shows 30 pages

#### Scenario: Home page includes mantine-table card
- **WHEN** viewing the home page
- **THEN** a card for "Mantine Table" is present with a description mentioning Mantine-styled table with pagination
