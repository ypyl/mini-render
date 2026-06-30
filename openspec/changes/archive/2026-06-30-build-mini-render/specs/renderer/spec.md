## ADDED Requirements

### Requirement: Renderer resolves element types via a registry
The `<Renderer spec registry store? handlers? />` component SHALL walk the spec starting at `spec.root`, resolve each element's `type` against the `registry` map, and render the matched component. When no component is registered for `type`, `Renderer` SHALL render nothing and log a warning.

#### Scenario: Unknown type renders nothing
- **WHEN** an element has `type: "Nonexistent"` and no `Nonexistent` entry exists in the registry
- **THEN** `Renderer` renders nothing for that element and logs a warning to the console

### Requirement: ElementRenderer does not subscribe to state
The internal `ElementRenderer` SHALL NOT read the store value or subscribe to state. It MUST render based solely on the spec element, the registry, the stable `ActionContext`, and the stable `StoreContext` reference. Therefore an arbitrary state mutation elsewhere SHALL NOT re-render an `ElementRenderer` whose element and registry props are unchanged.

#### Scenario: State change does not re-render a static element
- **WHEN** an element of type `Text` renders `{ props: { text: "hi" } }` and `/other` changes
- **THEN** the `Text`'s `ElementRenderer` does not re-render

### Requirement: ElementRenderer is memoizable per element
`ElementRenderer` SHALL be wrapped in `React.memo` so that, when its `element` (by spec key), `spec`, and `registry` props are referentially unchanged, React skips re-rendering it.

#### Scenario: Memo skips re-render on unrelated parent re-render
- **WHEN** a parent component re-renders for an unrelated reason but passes the same `element`, `spec`, `registry` references to a memoized `ElementRenderer`
- **THEN** `React.memo` prevents the `ElementRenderer` body from running

### Requirement: Children render in spec order with stable keys
When an element declares `children: [k1, k2, ...]`, `Renderer` SHALL render each child `ElementRenderer` keyed by its spec key in the order listed. Missing child keys SHALL be skipped with a console warning (only when not streaming/loading).

#### Scenario: Out-of-order children preserve spec order
- **WHEN** an element has `children: ["b", "a"]`
- **THEN** child `b` is rendered before child `a`

### Requirement: RepeatChildren subscribes only to the array path
For an element with a `repeat` field, `RepeatChildren` SHALL read the array via a single `useValue` call on `repeat.path`. It MUST NOT subscribe to any deeper path. Each repeated child is wrapped in a scope that sets `${repeat.path}/${index}` as the relevant base path for descendant binding components. Because structural sharing replaces the array container on a deep leaf set, `RepeatChildren` MAY re-run its `.map` when a descendant path changes — this is cheap (it only re-creates React element descriptors) and does NOT re-render the row components, which are gated by memoized `ElementRenderer` wrappers and per-cell `useValue` subscriptions.

#### Scenario: Editing one cell re-renders only that cell component
- **WHEN** a 1000-row table is rendered via `RepeatChildren`, and `/items/0/name` changes
- **THEN** the binding component subscribed to `/items/0/name` re-renders; the other 999 rows' binding components do NOT re-render (their per-cell `useValue` snapshots are unchanged and their `ElementRenderer` wrappers are memoized with stable props)

#### Scenario: Adding an item re-renders the list
- **WHEN** the array at `/items` is replaced with a longer array (new array object)
- **THEN** `RepeatChildren` re-renders to map over the new length

### Requirement: Renderer provides stable emit per element
For each element with an `on` field, `ElementRenderer` SHALL build a stable `emit(name)` closure (stable across renders when `element.on` and the `ActionContext` are unchanged) that the rendered component invokes to dispatch actions.

#### Scenario: emit identity stable across re-renders
- **WHEN** the same element re-renders for unrelated reasons with the same `on` and same `ActionContext` reference
- **THEN** the `emit` function passed to the component is referentially identical