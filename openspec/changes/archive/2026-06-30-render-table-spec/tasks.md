## 1. Add table registry components

- [x] 1.1 Create `Table` component — renders `<table>` with children, wrapped in a Paper for visual consistency
- [x] 1.2 Create `THead` component — renders `<thead>` with children
- [x] 1.3 Create `TBody` component — renders `<tbody>` with children
- [x] 1.4 Create `Tr` component — renders `<tr>` with children
- [x] 1.5 Create `Th` component — renders `<th>`, reads text from `element.props?.text`
- [x] 1.6 Create `Td` component — renders `<td>` with children
- [x] 1.7 Add all new components to the `registry` map

## 2. Build table spec

- [x] 2.1 Create `buildTableSpec()` function that seeds `/items` with 1000 `{ name, email }` objects (idempotent, matching existing `buildLargeSpec` pattern)
- [x] 2.2 Define the table spec with: root `Table` → children `["headerRow", "tableBody"]`, header row as `Tr` with three `Th` children, table body as `TBody` with `repeat: { path: "/items" }` and child `"row"`
- [x] 2.3 Define the repeated `row` element as `Tr` with children `["cellName", "cellEmail", "cellActions"]`, where `cellName`/`cellEmail` are `BoundField` (bind `"name"`/`"email"`) wrapped in `Td`, and `cellActions` is a `Td` containing an `ActionButton` that dispatches `removeItem` with `{ $index: true }`

## 3. Wire up the new tab

- [x] 3.1 Add `"table"` to the `Tab` union type and `SegmentedControl` data array in `App.tsx`
- [x] 3.2 Wire the `tableSpec` (memoized from `buildTableSpec`) into the tab-switch logic
- [x] 3.3 Verify the demo runs with `npm run dev` — confirm all 4 existing tabs still work and the new Table tab renders with headers and 1000 rows
