## Why

The Switch demo renders three status buttons ("Loading", "Loaded", "Error") as loose individual buttons with no visual grouping. They appear as separate buttons with default spacing rather than a cohesive segmented control, which is the standard Mantine pattern for mutually-exclusive state toggles. Adding a `ButtonGroup` wrapper component that uses Mantine's `Button.Group` makes the buttons visually connected and semantically grouped.

## What Changes

- **New `ButtonGroup` component**: Wraps children in Mantine `<Button.Group>`, visually connecting adjacent buttons into a segmented control (no gap between buttons, border-radius adjusted on first/last).
- **Switch demo spec updated**: The `buttons` element changes from `type: "Row"` to `type: "ButtonGroup"`, and the registry includes the new component.

## Capabilities

### New Capabilities
- `button-group`: A `ButtonGroup` registry component that wraps children in Mantine's `Button.Group` for visually connected button groups. Accepts no props beyond the standard `ComponentProps`.

### Modified Capabilities
<!-- None -->

## Impact

- **New file**: `demo/src/components/ButtonGroup.tsx`
- **Modified**: `demo/src/cases/switch/registry.ts` — add `ButtonGroup` import and registration
- **Modified**: `demo/src/cases/switch/spec.json` — change `buttons` type from `"Row"` to `"ButtonGroup"`
