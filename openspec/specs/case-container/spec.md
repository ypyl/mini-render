## ADDED Requirements

### Requirement: CaseContainer renders a titled wrapper with description
A `CaseContainer` component SHALL exist as a registry component that wraps children in a Mantine `<Paper>` with a required `title` and optional `description`. The title SHALL render as an `<h4>` heading. When `description` is present and non-empty, it SHALL render below the title in dimmed, smaller text.

#### Scenario: CaseContainer with title and description
- **WHEN** a spec element has `type: "CaseContainer"` with `props: { title: "Form Demo", description: "Shows two-way binding with edit/save/cancel lifecycle" }`
- **THEN** the title renders as an `<h4>` heading
- **AND** the description renders below the title in dimmed, smaller text
- **AND** children render below the description inside the Paper

#### Scenario: CaseContainer with title only
- **WHEN** a spec element has `type: "CaseContainer"` with `props: { title: "Basic Static Rendering" }` and no `description` prop
- **THEN** the title renders normally
- **AND** no description text is rendered
- **AND** children still render inside the Paper

#### Scenario: CaseContainer with empty description
- **WHEN** a spec element has `type: "CaseContainer"` with `description: ""` (empty string)
- **THEN** no description text is rendered (same behavior as when prop is absent)

### Requirement: Card component is unchanged
The existing `Card` component SHALL remain unchanged. It SHALL continue to render only an optional title without description support. It SHALL remain available for non-root usage (e.g., inner cards in the Switch demo).

#### Scenario: Card still works for inner cards
- **WHEN** the Switch demo renders
- **THEN** the "✅ Loaded" and "❌ Error" inner cards render using `type: "Card"` with only a `title` prop, exactly as before

### Requirement: All root demo case elements use CaseContainer with descriptions
Each demo case's root element SHALL use `type: "CaseContainer"` (instead of `type: "Card"`) and SHALL include a `description` prop that explains what the case demonstrates.

#### Scenario: Basic case shows description
- **WHEN** navigating to `/basic`
- **THEN** the CaseContainer renders with description text explaining static spec rendering

#### Scenario: Form case shows description
- **WHEN** navigating to `/form`
- **THEN** the CaseContainer renders with description text explaining two-way bound editable fields

#### Scenario: Actions case shows description
- **WHEN** navigating to `/actions`
- **THEN** the CaseContainer renders with description text explaining action dispatch with state feedback

#### Scenario: Large case shows description
- **WHEN** navigating to `/large`
- **THEN** the CaseContainer renders with description text explaining the 1,000-row repeat with inline-editable cells

#### Scenario: Table case shows description
- **WHEN** navigating to `/table`
- **THEN** the CaseContainer renders with description text explaining the HTML table structure via repeat

#### Scenario: Switch case shows description
- **WHEN** navigating to `/switch`
- **THEN** the CaseContainer renders with description text explaining conditional rendering with useValue
