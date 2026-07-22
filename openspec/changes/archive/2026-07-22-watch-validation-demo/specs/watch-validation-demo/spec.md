## ADDED Requirements

### Requirement: ErrorDisplay shows error text from store
An `ErrorDisplay` component SHALL exist as a registry component that reads a string from the store at `element.props.path` and renders it in red text (Mantine `<Text c="red">`). When the value is empty or undefined, it SHALL render nothing.

#### Scenario: ErrorDisplay shows error
- **WHEN** the store has `{ errors: { name: "Too short" } }` and ErrorDisplay has `path: "/errors/name"`
- **THEN** red text "Too short" is rendered

#### Scenario: ErrorDisplay shows nothing when empty
- **WHEN** the store has `{ errors: { name: "" } }` and ErrorDisplay has `path: "/errors/name"`
- **THEN** nothing is rendered

### Requirement: Watch validation demo case has its own page
A demo case SHALL exist at `/watch-validation` with a `WatchValidationCase` component containing a BoundField for "Name" with a `watch` binding on `/name` that triggers a `validateName` handler, and an ErrorDisplay showing the result at `/errors/name`. The field SHALL be always editable (no EditToggle).

#### Scenario: Navigating to watch validation page
- **WHEN** navigating to `/watch-validation`
- **THEN** a CaseContainer renders with title "Watch Validation"
- **AND** a BoundField for "Name" is visible and editable
- **AND** no error is shown initially

#### Scenario: Typing a short name shows error
- **WHEN** the user types "AB" (fewer than 3 characters) into the Name field
- **THEN** red error text "Name must be at least 3 characters" appears below the field

#### Scenario: Typing a valid name clears error
- **WHEN** the user has typed "AB" and then types "ABC" (3+ characters)
- **THEN** the error text disappears

#### Scenario: Home page includes watch validation card
- **WHEN** viewing the home page
- **THEN** a card for "Watch Validation" is present with a description mentioning reactive validation
