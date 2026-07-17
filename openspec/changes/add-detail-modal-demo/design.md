## Context

The demo currently lacks an example of interdependent state — where two completely separate store paths are bridged only by an action handler. Real applications frequently have list views and detail views backed by different endpoints, with the handler mediating between them. This demo introduces that pattern along with async handlers and a new `Modal` component.

## Goals / Non-Goals

**Goals:**
- Create a `Modal` component that reads visibility from a store path and renders Mantine `<Modal>` when the value is truthy
- Create a `detail-modal` demo case with a table of items, a "Details" button per row, and a modal that shows generated detail data
- The handler simulates an async backend call: set loading → delay → write detail data → clear loading
- Table state (`/items`) and detail state (`/itemDetail`, `/loadingDetail`) are completely independent store paths — only the handler bridges them
- Add the new case to routing and home page

**Non-Goals:**
- No actual network calls — handler uses `await new Promise(r => setTimeout(r, ms))`
- No editable fields in the modal — read-only detail display
- No caching of previously loaded details

## Decisions

### Decision 1: Modal visibility via store path

The `Modal` component accepts a `path` prop and uses `useValue(path)` to determine visibility. When the value is truthy, the Mantine `<Modal>` renders with `opened={true}`.

**Why**: Mirrors the existing `Switch` component pattern. Keeps modal state in the store where handlers can control it. No imperative `emit`-based open/close — declarative and testable.

**Alternative considered**: Event-based open/close via `emit`. Rejected — would need a ref or local state in the Modal, breaking the pure-declarative model.

### Decision 2: Single `/itemDetail` path, not per-item

The handler writes detail data to a single `/itemDetail` store path. Each click overwrites it. No per-item cache (`/itemDetails/<id>`).

**Why**: Simpler spec, fewer concepts. The point is "separate paths joined by a handler" — the single-path version demonstrates this clearly. Per-item caching adds complexity without teaching anything new.

### Decision 3: Spec builder, not JSON

The table rows vary by item count and data, so a `buildDetailModalSpec(itemCount)` function generates the spec at runtime, matching the pattern used by `large` and `table` cases.

**Why**: Consistent with existing complex demo cases. The table body uses `repeat` with `TBody`/`Tr`/`Td` components from the existing table component set.

### Decision 4: Loading state as a separate store path

The handler writes `/loadingDetail: true` before the simulated delay and `/loadingDetail: false` after. The modal uses a `Switch` component to toggle between a loading spinner and the detail content.

**Why**: Teaches two things at once — async patterns in handlers AND conditional rendering. Also demonstrates that one action can write to multiple store paths in sequence.

### Decision 5: Mock data in handler

A hardcoded lookup table maps item IDs to detail objects. The handler `await`s 600ms then reads from this table. No external files, no imports beyond the handler module.

**Why**: Self-contained, easy to understand, zero dependencies.

## Risks / Trade-offs

- **Loading state flicker on fast machines**: The 600ms delay might look like a flash. → Use a minimum of 400ms to ensure the spinner is perceptible.
- **Modal close on outside click**: Mantine's `<Modal>` defaults to closing on overlay click, but the store path won't update. → Set `closeOnClickOutside={false}` so only the explicit Close button clears the path.
