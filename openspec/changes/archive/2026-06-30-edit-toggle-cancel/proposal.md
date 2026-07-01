## Why

The current "Edit" toggle button in all demo tabs is a single button that always shows "Edit" — the user can't tell if they're in view or edit mode without looking at the fields. Canceling edits when in edit mode requires toggling back (losing your changes) then toggling in again. The UX should show a single [Edit] button in view mode and [Save] [Cancel] buttons in edit mode, where Cancel reverts all changes made since entering edit mode.

## What Changes

- Replace the `toggleEdit` handler with three new handlers: `startEdit` (snapshots state + enables edit mode), `saveEdit` (clears snapshot + exits edit mode), `cancelEdit` (restores snapshot + exits edit mode).
- Add a reusable `EditToggle` component that subscribes to `/editingSection` and renders one button ([Edit]) in view mode and two buttons ([Save] [Cancel]) in edit mode.
- Replace all `ActionButton` toggle elements across all tabs (Form, Actions, Large, Table) with `EditToggle`.
- Remove the `toggleEdit` handler — dead code.

## Capabilities

### New Capabilities
- `edit-toggle-component`: A reusable `EditToggle` component that renders an "Edit" button in view mode, and "Save" / "Cancel" buttons in edit mode, dispatching `startEdit` / `saveEdit` / `cancelEdit` actions.

### Modified Capabilities
- `edit-toggle-action`: Replace the single `toggleEdit` handler with three handlers (`startEdit`, `saveEdit`, `cancelEdit`). `startEdit` snapshots the full state before enabling edit mode. `cancelEdit` restores the snapshot. `saveEdit` discards the snapshot. The `ActionButton` toggle requirement is replaced by `EditToggle`.

## Impact

- **Affected code**: `demo/src/App.tsx` — add `EditToggle` component, replace `toggleEdit` handler with three new handlers, replace `toggleBtn` spec elements across all tabs with `EditToggle` type.
- **Removed**: `toggleEdit` handler (no longer used).
- **Dependencies**: None. Uses existing `useValue`, `emit`, store APIs.
- **Breaking changes**: None — demo-only change.
