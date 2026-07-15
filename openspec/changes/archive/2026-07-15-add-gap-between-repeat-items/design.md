## Context

The Large Case demo (`demo/src/cases/large/`) renders 1000 repeated items via the `repeat` mechanism. Each item is a `FieldsetRow` (Mantine Fieldset), but there is no spacing between consecutive items — they sit flush against each other. The `Row` wrapper component (used as the repeat container) currently renders a React Fragment (`<></>`), providing no visual structure.

Mantine provides `<Stack gap>` for vertical spacing between children. The design goal is to add optional gap support to `Row` so repeat containers can get spacing without affecting other uses of `Row`.

## Goals / Non-Goals

**Goals:**
- `Row` accepts an optional `gap` prop and renders children inside `<Stack gap={gap}>` when set
- The Large Case spec passes `gap: "md"` to the `list` element
- Backward compatible: existing uses of `Row` without `gap` behave identically

**Non-Goals:**
- Adding gap to every repeat container globally
- Creating a new component type — `Row` is the right place since it's already the repeat wrapper
- Supporting horizontal gap (Group) — YAGNI until needed

## Decisions

### Decision 1: Extend Row instead of creating a new component

**Chosen**: Add optional `gap` prop to existing `Row` component.

**Alternatives considered**:
- **New `Stack` component**: Would require registering yet another component in every registry that needs gap. More boilerplate, no benefit over a prop.
- **Gap on FieldsetRow**: Would put spacing responsibility on the leaf component rather than the container — wrong layer. The container should manage spacing between children.
- **CSS-only via Fieldset margin**: Brittle, not theme-aware, bypasses Mantine's spacing system.

**Rationale**: `Row` is the repeat container. It already has one job (wrapping children). Adding a prop that conditionally swaps Fragment for Stack is minimal and keeps the API surface small.

### Decision 2: Use Mantine Stack, not raw CSS

**Chosen**: `<Stack gap={gap}>` from `@mantine/core`.

**Rationale**: Mantine Stack uses theme-aware spacing tokens (`xs`, `sm`, `md`, `lg`, `xl` or numeric values). This keeps spacing consistent with the rest of the demo UI and avoids hardcoded CSS.

## Risks / Trade-offs

- **Stack adds a DOM wrapper** (`<div>` with flexbox styles) when `gap` is set. This is semantically correct (the container now has layout responsibility) and matches how Mantine Stack is designed to work. No measurable perf impact at 1000 items.
- **Component complexity**: `Row` now has a conditional branch. Trivial — one ternary.

## Open Questions

<!-- None -->
