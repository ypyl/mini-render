## Context

The DndTable demo currently hardcodes 5 static items. The Large and Table demos already demonstrate 1,000-row performance for repeat/editing. The DndTable should join them by showing a meaningful dataset size (150 rows) to validate that @dnd-kit + mini-render store performance holds up under realistic load.

## Goals / Non-Goals

**Goals:**
- Generate 150 rows of test data in the DndTable demo
- Validate drag-and-drop responsiveness at this scale
- Match the demo theme: 150 is large enough to test, not so large it's unusable

**Non-Goals:**
- Performance optimizations (this is a data change, not a refactor)
- Pagination or virtual scrolling

## Decisions

**Decision 1: Programmatically generate rows**
Use a loop `for (let i = 0; i < 150; i++)` to create items like `{ name: "User 0", email: "user0@example.com" }`. This matches the pattern used in the Large and Table demos. Alternative considered: hardcoding 150 items — verbose and unnecessary.

**Decision 2: Keep the editingSection default to true**
Rows start editable so the user can immediately see the edit experience at scale. Same as the current 5-row setup.

## Risks / Trade-offs

- **150 editable TextInputs with store subscriptions**: Each cell subscribes to its store path. 150 rows × 2 columns = 300 subscriptions. This is well within React's capacity but worth monitoring. Mitigation: the Large demo already handles 2,000 subscriptions (1,000 × 2) without issue.
