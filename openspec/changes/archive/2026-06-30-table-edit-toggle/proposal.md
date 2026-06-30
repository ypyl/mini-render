## Why

The table demo currently seeds `/editingSection` to `true` to make fields always editable. The existing "Large (1000)" tab has an "Edit" toggle button that lets the user switch between read-only and editable modes — the table demo should have the same UX so users can see edit-mode toggling work in a proper HTML `<table>` context.

## What Changes

- Add a `toggleBtn` element to the table spec's root element, wired to the existing `toggleEdit` handler.
- Remove the unconditional `store.set("/editingSection", true)` from `buildTableSpec()` — the toggle button controls edit state instead.
- The table demo now starts in read-only mode and the user clicks "Edit" to make fields editable, matching the Large (1000) tab behavior.

## Capabilities

### New Capabilities
<!-- None — this is a modification to existing table demo behavior. -->

### Modified Capabilities
- `table-demo`: The table demo now includes an edit-toggle button; fields start read-only and become editable on toggle instead of being always editable.

## Impact

- **Affected code**: `demo/src/App.tsx` — `buildTableSpec()` function: add `toggleBtn` element to spec, remove `store.set("/editingSection", true)`.
- **Dependencies**: None. Reuses existing `toggleEdit` handler and `ActionButton` component.
- **Breaking changes**: None. Behavioral change only — fields default to read-only instead of editable.
