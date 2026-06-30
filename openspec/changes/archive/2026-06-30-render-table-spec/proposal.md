## Why

The current large-table demo renders repeated rows as a stack of Card/Row wrappers — there is no proper columnar table layout with `<thead>` headers and `<tbody>` rows. Users exploring mini-render need a canonical example of rendering a spec as a real HTML table with named columns (Name, Email, Actions) to understand how to build data-grid-like UIs from specs.

## What Changes

- Add a new demo tab (or enhance the existing "Large" tab) that renders a spec as a proper HTML `<table>` with column headers (Name, Email, Actions) and per-row actions.
- Introduce a `Table`, `THead`, `TBody`, `Tr`, and `Td` set of registry components in the demo that map spec elements to table HTML.
- The spec structure will declare: a root Table element, a header row with three header cells, and a repeat-driven body with rows containing Name/Email cells and an Actions cell.
- The Actions column per row will include a delete button (using existing `removeItem` handler) — demonstrating the per-row `$index` action pattern inside a table context.
- All existing behavior (granular re-render, `repeat`, `$index`, `useBound`, `emit`) remains unchanged; this change is purely additive — new demo components and a new spec.

## Capabilities

### New Capabilities
- `table-demo`: A demo tab showing a proper HTML `<table>` rendered from a spec, with column headers (Name, Email, Actions) and per-row actions, built entirely with mini-render's existing repeat, binding, and action primitives.

### Modified Capabilities
<!-- No existing spec requirements are changing. This is a demo-only addition. -->

## Impact

- **Affected code**: `demo/src/App.tsx` — new tab entry, new spec builder, new registry component set (`Table`, `THead`, `TBody`, `Tr`, `Td`).
- **Dependencies**: No new dependencies. Uses existing Mantine components for styling (already in demo).
- **Breaking changes**: None. This is additive.
