## Why

The demo component registry currently maps a small subset of Mantine's catalog. A component showcase demo — themed as a Feature Flags Dashboard — demonstrates that mini-render can cleanly wrap any Mantine interactive component. It also teaches a new pattern: a single-page dashboard with multiple control types working together on a shared store.

## What Changes

- Create five new registry components wrapping Mantine primitives:
  - `ToggleField` — Mantine `<Switch>`, boolean toggle bound to a store path
  - `SliderField` — Mantine `<Slider>`, numeric range bound to a store path with configurable min/max/label
  - `Badge` — Mantine `<Badge>`, displays text from props with configurable color
  - `Alert` — Mantine `<Alert>`, displays a title + children with configurable color/variant
  - `SegmentedField` — Mantine `<SegmentedControl>`, discrete choice bound to a store path with options
- Create a new demo case `feature-flags` under `demo/src/cases/feature-flags/`:
  - A dashboard with an info Alert banner, an environment SegmentedField, and 3 feature flag cards
  - Each flag card has a ToggleField, a descriptive label, and a Badge showing status
  - One flag includes a SliderField for rollout percentage
- Add route `/feature-flags` to the demo app router
- Add the new case to the home page `CASES` array
- Update README demo case counts

## Capabilities

### New Capabilities
- `toggle-field`: A boolean switch component bound to a store path via `useBound`
- `slider-field`: A numeric slider component bound to a store path with min/max/label props
- `badge`: A static display component rendering Mantine `<Badge>` with text and color from props
- `alert`: A callout display component rendering Mantine `<Alert>` with title, color, and children
- `segmented-field`: A segmented control component bound to a store path with options
- `feature-flags-demo`: A demo dashboard case showcasing the five new components in a coherent UI

### Modified Capabilities
<!-- None -->

## Impact

- **New components**: `demo/src/components/ToggleField.tsx`, `SliderField.tsx`, `Badge.tsx`, `Alert.tsx`, `SegmentedField.tsx`
- **New demo case**: `demo/src/cases/feature-flags/` — handlers, spec builder, registry, case component
- **Modified**: `demo/src/App.tsx`, `demo/src/HomePage.tsx`, `README.md`
