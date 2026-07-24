## Context

thin-render's demo currently has two table cases: an HTML table (1,000 rows via `repeat`) and a drag-and-drop table (@dnd-kit, 150 rows, local state). Neither uses Mantine's `<Table>` with the `data` prop or `<Pagination>`. Users want a more product-realistic example: server-style pagination where the full dataset lives in the store but the UI renders a windowed slice.

The Mantine `<Table>` with `TableData` prop is a compact API: pass `{ head, body, caption }` and the component renders everything. Paired with `<Pagination>`, this is a common product pattern (admin lists, data tables, search results).

## Goals / Non-Goals

**Goals:**
- Demo case with Mantine `<Table>` + `<Pagination>` at `/mantine-table`
- 300 rows in the store, pages of 10
- Pagination controlled via store path `/page` using action handlers
- Reusable `PaginatedTable` component in `demo/src/components/`
- Follow existing demo patterns (CaseContainer, registry, handlers, spec.json)

**Non-Goals:**
- Sorting, filtering, or search
- Server-side pagination (all data is pre-loaded)
- Library-level changes (no renderer, store, or hook modifications)
- Editable rows (read-only display)

## Decisions

### Decision 1: Pagination state lives in the store (not local React state)

The page number is stored at `/page` in the store. `<Pagination>`'s `onChange` dispatches a `goToPage` action that calls `setState("/page", page)`. The `PaginatedTable` component subscribes to `/page` via `useValue` and slices the full dataset accordingly.

**Rationale:** Follows thin-render's spec-driven architecture — all UI state lives in the store via actions, not in local `useState`. This also makes the page state inspectable via the store's debug mode.

**Alternative considered:** Local `useState` for page in the component. Easier but inconsistent with thin-render's philosophy. The pagination state wouldn't be visible to other components or middleware.

### Decision 2: PaginatedTable uses `TableData` prop for clean rendering

Mantine's `<Table>` accepts a `data` prop with `{ head: ReactNode[], body: ReactNode[][] }`. This is cleaner than manual `<Table.Tr>/<Table.Td>` iteration and matches the "data-first" API.

**Rationale:** Fewest lines, clearest intent. The component receives pre-computed `head` and `body` arrays and delegates rendering to Mantine.

### Decision 3: PaginatedTable is a standalone reusable component, not spec-driven rows

Unlike the HTML table demo which uses `repeat` + `TBody/Tr/Td` spec elements, the PaginatedTable component handles ALL table rendering internally. The spec just declares:

```json
{ "type": "PaginatedTable", "props": { "path": "/items", "pageSize": 10 } }
```

**Rationale:** The `<Table data>` prop doesn't compose well with spec-driven children — `body` is a 2D array of React nodes, not individual elements. Breaking it into spec-level Tr/Td components would be forced and add no value. This is the same pattern as DndTable (self-contained component with internal iteration).

### Decision 4: 300 rows, 10 per page

300 total items with 10 per page = 30 pages. Enough to show pagination boundaries, siblings, and edge cases (first page, last page). The dataset uses simple `{ id, name, email }` objects, similar to other table demos.

## Risks / Trade-offs

- **Pagination resets on spec rebuild** — Not a risk here. The store is created once in `useState` and the spec is built with `useMemo`. Page state persists across renders.
- **No library-level pagination support** — Pagination is entirely a demo-level concern. The library doesn't need a pagination directive or hook. This is fine — pagination is a UI pattern, not a core concern.
- **Component ≠ spec-driven** — PaginatedTable handles its own rendering, unlike the HTML table case. This is acceptable because the component IS registered in thin-render's registry and IS rendered by the spec. The spec still controls layout (via CaseContainer wrapping).
