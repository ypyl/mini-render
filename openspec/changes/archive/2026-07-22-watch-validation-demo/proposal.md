## Why

The `watch` feature just landed in the library but has no visible demo. A small live-validation demo shows the pattern concretely: one BoundField with a `watch` binding, a handler that validates on every keystroke, and an error display component that reacts to the store. This proves the core use case (derived state from store changes) works end-to-end.

## What Changes

- Create `ErrorDisplay` component — reads a store path and renders red text if the value is non-empty
- Create `/watch-validation` demo case with a BoundField for "Name", a `watch` binding that triggers `validateName` on change, and an `ErrorDisplay` showing the current error
- Add route and home page card

## Capabilities

### New Capabilities

- `watch-validation-demo`: A demo case demonstrating the `watch` directive — a BoundField with live validation triggered by store changes, displaying errors via a new `ErrorDisplay` component.

### Modified Capabilities

None.

## Impact

- **New component**: `demo/src/components/ErrorDisplay.tsx` — reusable error text display
- **New case**: `demo/src/cases/watch-validation/` (Case, spec, registry, handlers)
- **App integration**: `App.tsx` (route), `HomePage.tsx` (card), `README.md` (count + listing)
