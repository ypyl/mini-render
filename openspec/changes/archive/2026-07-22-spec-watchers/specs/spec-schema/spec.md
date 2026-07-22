## MODIFIED Requirements

### Requirement: Spec is a keyed element map with a root pointer
The library SHALL accept a `Spec` value consisting of a `root` key (string) and an `elements` map keyed by element id. Each element in `elements` MUST declare a `type` (string) referencing a registry component. An element MAY declare `props` (a plain serializable object of literal values and path strings), `children` (an ordered array of child element ids), `on` (event→action bindings), `repeat` (array iteration config), and `watch` (store path → action bindings fired on store mutation).

#### Scenario: Minimal valid spec
- **WHEN** a spec `{ root: "r", elements: { r: { type: "Text", props: { text: "hi" } } } }` is rendered
- **THEN** the `Renderer` resolves `elements.r` and renders the registry component registered for `"Text"` without error

#### Scenario: Spec with children forms a tree
- **WHEN** a spec defines element A with `children: ["b"]` and element `b` exists in `elements`
- **THEN** `Renderer` renders element A's component with element `b` rendered as a child, in the order given by the `children` array

#### Scenario: Missing root element fails gracefully
- **WHEN** the `root` value does not match any key in `elements`
- **THEN** `Renderer` renders nothing and does not throw

#### Scenario: Element with watch field
- **WHEN** a spec element has `watch: { "/form/name": [{ action: "validate", params: { value: { $state: "/form/name" } } }] }`
- **THEN** the element is valid and renders normally; the `watch` field is handled by the renderer separately from rendering
