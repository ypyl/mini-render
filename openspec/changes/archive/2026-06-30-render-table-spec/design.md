## Context

mini-render's existing "Large (1000)" demo tab renders 1000 rows via `repeat` but uses Card/Row wrappers — no actual HTML `<table>` structure. There are no column headers, and the visual layout is a vertical stack of Paper cards, not a column-aligned grid.

The user wants a canonical example of rendering a spec as a proper HTML table with named columns (Name, Email, Actions). This is a demo-only addition — no changes to the mini-render library core.

## Goals / Non-Goals

**Goals:**
- Add a new "Table" tab to the demo that renders a spec as a proper HTML `<table>` with `<thead>`/`<tbody>`.
- Display column headers: Name, Email, Actions.
- Render rows via `repeat`, each row having 3 cells (name, email, delete button).
- Use existing mini-render primitives only: `repeat`, `useBound`, `emit`, `$index`.
- Keep the 1000-row scale to demonstrate granular re-render performance in a table context.

**Non-Goals:**
- No changes to the mini-render library (src/). This is purely a demo addition.
- No sorting, filtering, pagination, or column resizing.
- No new hooks or store APIs.
- No new dependencies.

## Decisions

**Decision 1: Add new registry components rather than modifying existing ones**

The existing demo components (`Row`, `Card`, etc.) are used by other tabs. Creating new, purpose-specific components (`Table`, `THead`, `TBody`, `Tr`, `Th`, `Td`) avoids coupling and keeps each tab's registry self-documenting.

**Decision 2: Table, THead, TBody, Tr are pure presentational (children passthrough)**

These components simply render their HTML tag and pass `children` through. They subscribe to no state and carry no behavior. This mirrors the existing `Row` component pattern.

```
Table   → <table>{children}</table>
THead   → <thead>{children}</thead>
TBody   → <tbody>{children}</tbody>
Tr      → <tr>{children}</tr>
```

**Decision 3: Th renders text from props; Td renders children**

- `Th` reads `element.props?.text` as a static string — column headers don't need binding.
- `Td` renders children — cells contain bound components (`BoundField`, `ActionButton`).

**Decision 4: Repeat lives on tbody, not on tr**

The `tbody` element carries `repeat: { path: "/items" }`. Each repeat iteration renders the `row` element (a `Tr`). This matches the existing pattern where `list` (the repeat container) is distinct from `row` (the repeated child).

**Decision 5: Reuse existing store seeding and handlers**

The table demo seeds `/items` with 1000 `{ name, email }` objects (identical to the existing large demo) and reuses the `removeItem` handler. A per-row delete button in the Actions column dispatches `removeItem` with `{ $index: true }`.

**Decision 6: Add a new tab rather than replacing the existing "Large" tab**

The existing "Large (1000)" tab demonstrates the Card/Row layout pattern. The new "Table" tab demonstrates the HTML table pattern. Both are useful reference examples. The tab label will be "Table".

## Risks / Trade-offs

- **Risk: HTML table semantics conflict with React's component model** — React renders `<td>` inside components, which works fine. Mantine's `Table` component could be used for styling, but plain HTML elements with inline styles keep the example framework-agnostic.
  - *Mitigation*: Use plain HTML tags with minimal Mantine `Box`/`Paper` wrappers only where needed for visual consistency with the rest of the demo.

- **Risk: Styling inconsistency** — The table demo uses raw HTML elements, which won't match Mantine's design system without extra styling.
  - *Mitigation*: Wrap in a `Paper` container (as other tabs do for the outer card) and apply minimal inline CSS or Mantine `styles` prop for borders/padding. This is a demo — perfect styling is not the goal.

## Open Questions
<!-- None — all decisions are clear for this demo-only change. -->
