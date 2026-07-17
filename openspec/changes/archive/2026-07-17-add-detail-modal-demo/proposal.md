## Why

No existing demo case shows state that spans multiple independent store paths bridged by an action — the pattern at the heart of real-world apps where a list endpoint and a detail endpoint feed completely separate views. Adding a "detail modal" demo case teaches this concept and also introduces async handler patterns (simulated backend call with loading state).

## What Changes

- Create a new `Modal` component — reads visibility from a store path via `useValue`, renders Mantine `<Modal>` when truthy
- Create a new demo case `detail-modal` under `demo/src/cases/detail-modal/`:
  - A table of ~10 items (id, name, industry) with a "Details" button per row
  - Click dispatches `loadDetail` with the item's id via `$item`
  - Handler simulates an async backend call: sets loading state, awaits a delay, writes generated detail data to `/itemDetail`, clears loading
  - A Modal opens when `/itemDetail` is populated, shows the detail fields and a close button
  - Close button clears `/itemDetail` to hide the modal
- Add route `/detail-modal` to the demo app router
- Add the new case to the home page `CASES` array
- Update README demo case counts

## Capabilities

### New Capabilities
- `modal-component`: A `Modal` registry component that reads a store path to control visibility, renders a Mantine `<Modal>` with title and children when the path value is truthy
- `detail-modal-demo`: A demo case that demonstrates interdependent state — clicking a table row triggers an async handler that generates data into a completely separate store path, displayed in a modal

### Modified Capabilities
<!-- None — new capabilities, no existing spec changes -->

## Impact

- **New component**: `demo/src/components/Modal.tsx`
- **New demo case**: `demo/src/cases/detail-modal/` (spec builder, handlers, registry, case component)
- **Modified**: `demo/src/App.tsx` — add route
- **Modified**: `demo/src/HomePage.tsx` — add case to `CASES`
- **Modified**: `README.md` — update demo count
