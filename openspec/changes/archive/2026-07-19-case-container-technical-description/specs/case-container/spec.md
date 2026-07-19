## MODIFIED Requirements

### Requirement: CaseContainer renders a titled wrapper with description
A `CaseContainer` component SHALL exist as a registry component that wraps children in a Mantine `<Paper>` with a required `title` and optional `description`. The title SHALL render as an `<h4>` heading. When `description` is present and non-empty, it SHALL render below the title in dimmed, smaller text.

When `technicalDescription` is present and non-empty, CaseContainer SHALL render a Mantine `Spoiler` between the description and children. The Spoiler SHALL be collapsed by default (`maxHeight={0}`) with `showLabel="How it works"` and `hideLabel="Hide details"`. The `technicalDescription` text SHALL render inside the Spoiler using `white-space: pre-wrap` to preserve line breaks.

When `technicalDescription` is absent or empty, no Spoiler is rendered.

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

#### Scenario: CaseContainer with technical description
- **WHEN** a spec element has `type: "CaseContainer"` with `props: { title: "Demo", technicalDescription: "Spec\n...\nFeatures\n..." }`
- **THEN** a Mantine Spoiler renders between the description area and children
- **AND** the Spoiler is collapsed by default (toggle shows "How it works")
- **AND** clicking the toggle reveals the technical description text with preserved line breaks
- **AND** clicking again collapses it (toggle shows "Hide details")

#### Scenario: CaseContainer without technical description
- **WHEN** a spec element has `type: "CaseContainer"` with no `technicalDescription` prop
- **THEN** no Spoiler is rendered
- **AND** the component behaves identically to before this change

#### Scenario: CaseContainer with empty technical description
- **WHEN** a spec element has `type: "CaseContainer"` with `technicalDescription: ""` (empty string)
- **THEN** no Spoiler is rendered (same as when prop is absent)
