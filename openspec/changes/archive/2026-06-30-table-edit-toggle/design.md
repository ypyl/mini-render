## Context

The table demo (`buildTableSpec()`) currently seeds `/editingSection` to `true`, making all `BoundField` cells always editable. The "Large (1000)" tab instead uses a toggle button wired to `toggleEdit` handler that flips `/editingSection`. The user wants parity: an "Edit" button on the table demo that toggles read-only/editable mode.

`BoundField` already reads `/editingSection` to control its `readOnly` prop. The `toggleEdit` handler already exists. The `ActionButton` component already dispatches `emit("click")`. No new components, handlers, or paths needed.

## Goals / Non-Goals

**Goals:**
- Add an "Edit" toggle button above the table that toggles `/editingSection`.
- Table fields start read-only and become editable on toggle click.
- Remove the hardcoded `store.set("/editingSection", true)` from seeding.

**Non-Goals:**
- No new handlers or store paths.
- No changes to BoundField, ActionButton, or any library code.
- No UI changes beyond the toggle button.

## Decisions

**Decision 1: Place toggleBtn as a child of the Table element**

The `Table` component wraps in Paper and renders children (the `<table>`). Adding `toggleBtn` as a child spec element renders a button inside the Paper, above the table — visually consistent with other tabs. The HTML is a `<button>` inside a `<div>`, not inside `<table>`, so no invalid markup.

**Decision 2: Reuse existing `toggleEdit` handler**

No need to create a new handler. The `toggleEdit` handler reads `/editingSection` and flips it — works identically across all tabs that use it.

**Decision 3: Remove seeding of `/editingSection`**

Currently `buildTableSpec()` unconditionally sets `/editingSection` to `true`. This overrides whatever value was set by other tabs. Removing it means the table respects the global toggle state. On first visit, `/editingSection` is `undefined` which is falsy → fields appear read-only — correct default.

## Risks / Trade-offs

- **Risk: `/editingSection` shared across tabs** — toggling edit on one tab affects all tabs. This is existing behavior (not introduced by this change) and is acceptable for a demo.
  - *Mitigation:* None needed — this is the existing demo design.
