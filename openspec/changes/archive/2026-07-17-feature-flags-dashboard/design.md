## Context

The demo app maps a handful of Mantine components to registry components (Button, TextInput, Paper, Modal, Select, LoadingOverlay). A showcase demo — themed as a Feature Flags Dashboard — demonstrates that any Mantine interactive component can be wrapped in the same pattern: read from a store path via `useValue`/`useBound`, write via `useSetValue`, render via a Mantine primitive.

## Goals / Non-Goals

**Goals:**
- Create 5 new registry components: ToggleField, SliderField, Badge, Alert, SegmentedField
- Create a dashboard demo with 3 feature flag cards, an info Alert, and an environment SegmentedField
- Follow the established component pattern: accept `ComponentProps`, read from store, render Mantine
- Static components (Badge, Alert) read from `element.props` only; interactive components use `useBound`

**Non-Goals:**
- No dynamic flag creation/deletion — 3 hardcoded flags in the spec
- No persistence or backend calls
- Badge does not reactively change — static text from spec
- No FlagCard component — flags are composed from existing FieldsetRow + new components

## Decisions

### Decision 1: Badge is static

Badge reads `text` and `color` from `element.props`. It does not subscribe to the store.

**Why**: Simpler implementation. The demo doesn't need reactive badges — the static text "Active"/"Inactive" is set in the spec alongside the ToggleField. For a dynamic badge, a future `BoundBadge` could read from a path.

### Decision 2: No FlagCard repeat — individual flag rows

Each flag is a distinct element in the spec: `flagDarkMode`, `flagBetaDashboard`, `flagAiSuggestions`. No `repeat` array.

**Why**: Each flag has different structure (some have sliders, some don't). Repeat would require all flags to share an identical structure, which they don't.

### Decision 3: SliderField with label formatter

SliderField accepts `min`, `max`, `label` props. The `label` is a format string — `"{value}%"` — rendered with the current value.

**Why**: One SliderField shows rollout percentage ("60%"). A format string keeps the component generic while supporting this use case. If `label` is falsy, no label renders.

### Decision 4: Alert wraps children

Alert accepts `title` and `color` from props and renders children inside the alert body. This makes it composable — the demo passes an info text as a child element.

**Why**: Matches Mantine's Alert API. Children can be any spec elements (StaticText, etc.).

### Decision 5: Single spec builder

One `buildDashboardSpec()` function generates the entire spec. One Renderer, one store, one registry.

**Why**: The demo is a single-page dashboard — no cross-store pattern needed. Simpler than the two-store demo.

## Risks / Trade-offs

- **9 components in one registry**: The case registry grows large. → Acceptable for a showcase demo; each import is explicit.
