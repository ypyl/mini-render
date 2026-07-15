## Why

The demo lacks an example of conditional rendering — showing different components based on state. A Switch component demonstrates this pattern using only the library's public API (`useValue`), proving that conditional rendering doesn't need library-level directives.

## What Changes

- Add `Switch` component to `demo/src/components/Switch.tsx` — reads a path, renders the child element whose key matches the value
- Add new demo case `cases/switch/` with spec, registry, and SwitchCase
- The case simulates a loading → loaded → error lifecycle with buttons to toggle state
- Add "Switch" tab to App.tsx

## Capabilities

### New Capabilities

None. Demo-only addition.

### Modified Capabilities

None.

## Impact

- `demo/src/components/Switch.tsx` — new file (~10 lines)
- `demo/src/cases/switch/` — new case folder (spec, registry, case component)
- `demo/src/App.tsx` — add Switch tab
- No library changes, no test changes
