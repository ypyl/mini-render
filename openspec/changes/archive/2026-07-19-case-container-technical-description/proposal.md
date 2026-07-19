## Why

The demo cases currently show a short one-line description that explains *what* the demo does but not *how* it uses mini-render. Developers exploring the demo want to understand the spec structure, store shape, and which mini-render features are at play — without cluttering the page. A collapsible technical description behind a Spoiler serves both audiences: clean UI by default, deep-dive available on click.

## What Changes

- Add optional `technicalDescription` prop to `CaseContainer` — a plain-text string rendered inside a Mantine `Spoiler` (collapsed by default with "How it works" / "Hide details" toggle).
- Write technical descriptions for all 10 existing demo cases, each covering the spec structure, initial state shape, and key mini-render features used.
- Existing `title` and `description` props are unchanged; `technicalDescription` is fully optional — cases without it render identically to today.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `case-container`: CaseContainer gains an optional `technicalDescription` prop. When present, a Mantine Spoiler (collapsed by default) renders between the description and children, displaying the technical text with `white-space: pre-wrap`.

## Impact

- **Component**: `demo/src/components/CaseContainer.tsx` — new prop handling and Spoiler import
- **Specs**: 10 case spec files (5 `.json` + 5 `buildSpec.ts`) — each gets a `technicalDescription` string added to the CaseContainer element props
- **Dependencies**: `@mantine/core` already includes `Spoiler` (v9.x) — no new dependency
- **Documentation**: README demo descriptions may need updating if the one-liners become redundant alongside the technical descriptions
