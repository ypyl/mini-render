## Why

The Large Case demo renders 1000 repeated items inside a Card with no visual spacing between them — each `FieldsetRow` sits flush against the next, making the list dense and hard to scan. Adding configurable gap between repeat children improves readability and matches Mantine's design patterns.

## What Changes

- **`Row` component**: Accepts an optional `gap` prop (via `element.props.gap`). When `gap` is set, renders children inside a Mantine `<Stack gap={gap}>` instead of a Fragment. Backward compatible — when `gap` is absent, renders `<>{children}</>` as before.
- **Large Case spec**: The `list` element in `buildSpec.ts` passes `gap: "md"` so repeated `FieldsetRow` items get standard Mantine spacing.

## Capabilities

### New Capabilities
- `row-gap-prop`: The `Row` wrapper component supports an optional `gap` prop that adds Mantine Stack-based spacing between its children.

### Modified Capabilities
<!-- None — existing specs unchanged -->

## Impact

- **Modified**: `demo/src/components/Row.tsx` — add optional gap support
- **Modified**: `demo/src/cases/large/buildSpec.ts` — pass `gap: "md"` to the `list` element
- **Existing cases unaffected**: Other cases using `Row` without `gap` continue to render as Fragment (no visual change)
