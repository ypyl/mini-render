## Context

mini-render's demo already has a 1,000-row table case (`/table`) with repeat, BoundField, and per-row delete buttons. Adding drag-and-drop reordering demonstrates a more complex interaction pattern: a third-party library (`@dnd-kit`) integrated within the spec-driven model, with the store as the single source of truth for list state. The reference implementation at `mantinedev/ui.mantine.dev` uses `@dnd-kit` with `useListState` for local state — we adapt it to use the mini-render store and action system instead.

## Goals / Non-Goals

**Goals:**
- Create a `DndTable` registry component using `@dnd-kit` for vertical drag-and-drop row reordering
- Support add-row and per-row remove actions via the mini-render action system
- Keep the spec minimal — just `type: "DndTable"` with a `path` prop and optional `on` action bindings
- Integrate into the demo app with route, home page card, and technical description

**Non-Goals:**
- Horizontal reordering, multi-select, or nested drag targets
- A generic/reusable DnD abstraction for mini-render core — this is demo-only
- Column configuration via spec props — columns are hardcoded (Name, Email) for simplicity
- Editable cells with BoundField — rows use StaticText display to keep the component focused on DnD

## Decisions

**Decision 1: DndTable is a single self-contained component**
All `@dnd-kit` logic (DndContext, SortableContext, useSortable, sensors, handleDragEnd) lives inside one component. The spec is a single element: `{ type: "DndTable", props: { path: "/items" }, on: { add, remove, reorder } }`. This follows the pattern of `Modal`, `PreviewBox`, and `LoadingBox` — complex components with internal state, exposed via a simple spec interface. Alternative considered: splitting into `DndContext` + `SortableRow` as separate registry components — adds complexity without benefit since the DnD logic requires tight coupling between context and sortable items.

**Decision 2: Store is the source of truth, not local state**
The reference uses `useListState` for local state. We use the mini-render store: DndTable reads the list via `useValue(path)`, renders rows from it, and dispatches actions (`reorder`, `add`, `remove`) via `emit`. The case's handlers write to the store. This keeps the store as the single source of truth and demonstrates the action system with a real interaction. Alternative considered: using local `useListState` inside DndTable with no store integration — misses the point of demonstrating mini-render's architecture.

**Decision 3: Fixed columns (Name, Email) with remove button**
Columns are hardcoded: drag handle, Name, Email, Remove button. An "Add Row" button sits below the table. This keeps the spec minimal while demonstrating the key interactions. Alternative considered: configurable columns via spec props — adds spec complexity for marginal demo value; the pattern for configurable tables is already shown in the `/table` demo.

**Decision 4: `@tabler/icons-react` for the grip icon**
The reference uses `IconGripVertical` from `@tabler/icons-react`. This is a popular, lightweight icon library. Alternative considered: inline SVG or Unicode character (⋮⋮) — functional but less polished for a demo.

## Risks / Trade-offs

- **4 new dependencies**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `@tabler/icons-react`. Mitigation: all are well-maintained, tree-shakeable, and only added to the demo (not the library).
- **DnD state during drag**: During an active drag, the visual order differs from the store order. The store is only updated on `dragEnd`. This is correct behavior (optimistic UI) but worth noting.
- **Accessibility**: Keyboard-based reordering works via `KeyboardSensor` from `@dnd-kit`. `VisuallyHidden` labels on drag handles keep it accessible.

## Open Questions

None — the reference implementation is proven and the adaptation to mini-render's store/action model is straightforward.
