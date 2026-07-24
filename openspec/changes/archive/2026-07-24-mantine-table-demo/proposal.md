## Why

The demo currently has an HTML table case (1,000 rows via `repeat`) but no Mantine-styled table with pagination. A Mantine table with `<Table>` + `<Pagination>` demonstrates a more realistic product scenario: server-style pagination where the store holds the full dataset but the UI renders a windowed view. This also tests how pagination state interacts with thin-render's action system and per-path subscriptions.

## What Changes

- New demo case at `/mantine-table` with a Mantine `<Table>` (using `TableData` prop) and `<Pagination>` component
- 300-element dataset in the store with pages of 10 rows each
- Pagination component controls page state via action handlers (set `/page` in store)
- Table rows render from a computed slice of the full dataset based on `/page`
- CaseContainer wraps it with technical description (following existing demo pattern)

## Capabilities

### New Capabilities
- `mantine-table-demo`: Demo case showing a Mantine Table with pagination rendered from a thin-render spec

### Modified Capabilities
<!-- None -->

## Impact

- New files: `demo/src/cases/mantine-table/` (case component, buildSpec, handlers, registry, spec.json)
- New component: `demo/src/components/PaginatedTable.tsx` — reusable Mantine Table + Pagination component that accepts `data`, `pageSize`, and `page`/`onChange` props
- `demo/src/App.tsx` — add route + nav link
- `demo/src/HomePage.tsx` — add case card
- `demo/package.json` — no new deps (Mantine Table and Pagination already included in `@mantine/core`)
