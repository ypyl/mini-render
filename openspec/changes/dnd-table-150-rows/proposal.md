## Why

The DndTable demo currently has only 5 rows — not enough to stress-test the drag-and-drop performance or see how edit operations feel at scale. Bumping to 150 rows makes it a meaningful load test alongside the existing Large and Table demos (1,000 rows).

## What Changes

- Increase the `INITIAL_ITEMS` array in `DndTableCase.tsx` from 5 to 150 generated items

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `dnd-table-demo`: The demo case initializes with 150 rows instead of 5.

## Impact

- **Demo case**: `demo/src/cases/dnd-table/DndTableCase.tsx` — replace hardcoded 5-item array with a generated 150-item array
