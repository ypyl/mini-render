## ADDED Requirements

### Requirement: Demo initializes with 150 items
The DndTable demo SHALL initialize its store with 150 generated items instead of 5 hardcoded items, to stress-test drag-and-drop performance at scale.

#### Scenario: 150 items render
- **WHEN** navigating to `/dnd-table`
- **THEN** 150 rows are rendered with drag handles
