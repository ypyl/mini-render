## Why

No existing demo shows multiple independent store instances bridged by a handler. Real applications often have separate state domains — settings vs preview, list vs detail, draft vs published — where changes in one are explicitly applied to another. This demo teaches cross-store state copy, divergent state, and side-by-side renderers.

## What Changes

- Create a `SelectField` component — renders a Mantine `<Select>` dropdown, reads the selected value from a store path via `useValue`, writes on change via `useSetValue`
- Create a `PreviewBox` component — reads title, color, and size from `/preview/*` paths and renders a styled `<Paper>` with dynamic color and font size
- Create a new demo case `two-store` under `demo/src/cases/two-store/`:
  - Left panel: settings form (title text input + color SelectField + size SelectField) with an "Apply Changes" button
  - Right panel: live preview card that only updates when Apply is clicked
  - Two `<Renderer>` instances side-by-side, each with its own `createStore()`
  - The `applySettings` handler reads from store A and writes to store B via closure — explicitly crossing the store boundary
- Add route `/two-store` to the demo app router
- Add the new case to the home page `CASES` array
- Update README demo case counts

## Capabilities

### New Capabilities
- `select-field`: A `SelectField` registry component that renders a Mantine `<Select>` dropdown, reads from a store path, and writes the selected value back on change. Accepts `bind` (store path) and `options` (array of `{ value, label }`) props.
- `preview-box`: A `PreviewBox` registry component that reads `/preview/title`, `/preview/color`, `/preview/size` from its store and renders a styled `<Paper>` displaying the title with the selected color and font size.
- `two-store-demo`: A demo case showing two independent stores — settings and preview — bridged by a cross-store handler. Demonstrates divergent state (changes in settings don't affect preview until Apply) and multiple `<Renderer>` instances in one React component.

### Modified Capabilities
<!-- None -->

## Impact

- **New components**: `demo/src/components/SelectField.tsx`, `demo/src/components/PreviewBox.tsx`
- **New demo case**: `demo/src/cases/two-store/` — handlers, two spec builders, registry, case component
- **Modified**: `demo/src/App.tsx` — add route
- **Modified**: `demo/src/HomePage.tsx` — add case to `CASES`
- **Modified**: `README.md` — update demo count
