## ADDED Requirements

### Requirement: toggleEdit handler flips the editing flag
A handler named `toggleEdit` SHALL be registered in the demo's handlers map. When invoked, it SHALL read the current `/editingSection` value from the store via `getState()` and write the negated boolean via `setState("/editingSection", ...)`. The handler MUST NOT require params.

#### Scenario: Toggle from false to true
- **WHEN** `/editingSection` is undefined or falsy and `toggleEdit` is invoked
- **THEN** `store.get("/editingSection")` becomes `true` and all `/editingSection` subscribers re-render

#### Scenario: Toggle from true to false
- **WHEN** `/editingSection` is `true` and `toggleEdit` is invoked
- **THEN** `store.get("/editingSection")` becomes `false` and all `/editingSection` subscribers re-render

### Requirement: ActionButton dispatches toggleEdit in relevant specs
The Form, Actions, and Large demo specs SHALL each include an `ActionButton` element with `on: { click: { action: "toggleEdit" } }` and label "Edit" / "Done" (or a single toggle label). Clicking the button SHALL invoke the `toggleEdit` handler.

#### Scenario: Button toggles edit mode
- **WHEN** the user clicks the "Edit" ActionButton in the Form tab
- **THEN** the `toggleEdit` handler is invoked, `/editingSection` flips, and all BoundFields switch between read-only and editable mode

### Requirement: Basic tab is unaffected
The Basic tab spec SHALL NOT include an edit toggle button, as it contains no BoundFields.

#### Scenario: Basic tab has no edit button
- **WHEN** the Basic tab is selected
- **THEN** no Edit/ActionButton toggle is rendered in that tab