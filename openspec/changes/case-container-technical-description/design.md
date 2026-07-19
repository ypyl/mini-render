## Context

`CaseContainer` currently renders a `title` (h4) and optional `description` (dimmed text) from spec props. Demos convey *what* the case does but not *how* mini-render powers it. The component uses `@mantine/core` v9 which ships `Spoiler` — a built-in collapsible section with show/hide toggle.

## Goals / Non-Goals

**Goals:**
- Add an optional `technicalDescription` prop to CaseContainer rendered inside a Mantine Spoiler, collapsed by default
- Write technical descriptions (Spec / State / Features) for all 10 existing demo cases
- Preserve backward compatibility — cases without the new prop render identically

**Non-Goals:**
- Markdown rendering — plain text with `white-space: pre-wrap` is sufficient
- Per-case Spoiler label customization — fixed "How it works" / "Hide details"
- Auto-generating technical descriptions from specs
- Changing the existing `description` prop behavior

## Decisions

**Decision 1: Spoiler placement — between description and children**
The Spoiler sits below the description and above the demo content. This follows the natural reading order: what it does → how it works → the demo itself. Alternative considered: below children (disrupts flow after interacting with the demo).

**Decision 2: `maxHeight={0}` to force collapsed state**
Setting `maxHeight={0}` ensures the Spoiler is always collapsed on page load, regardless of content length. The Mantine Spoiler shows the toggle whenever content height exceeds `maxHeight`, so `0` guarantees it. Alternative considered: using `expanded={false}` with controlled state — unnecessary since we never want it default-expanded.

**Decision 3: Plain text with `white-space: pre-wrap`**
No markdown parser dependency. The technical descriptions use a simple 3-section format (Spec / State / Features) with newlines for structure. A `<Text>` component with `white-space: pre-wrap` preserves line breaks. Alternative considered: `@mantine/tiptap` or `react-markdown` — overkill for a few lines of structured text.

**Decision 4: Fixed Spoiler labels**
`showLabel="How it works"` and `hideLabel="Hide details"` are hardcoded in CaseContainer. No prop for customization — keeps the API simple and the UI consistent. Alternative considered: per-case customization via another prop like `technicalDescriptionLabel` — adds complexity for no real gain since all cases share the same purpose.

**Decision 5: Technical description content lives in spec files**
The `technicalDescription` string is added to each case's spec JSON/TS as a prop on the CaseContainer element. This follows the existing pattern (`title`, `description` are already spec props). The per-case `Case.tsx` file doesn't need changes unless it constructs props dynamically.

## Risks / Trade-offs

- **Long spec files**: JSON specs (actions, basic, form, switch) will grow by ~8 lines each. Mitigation: descriptions are concise (5–9 lines); JSON readability remains acceptable.
- **Spoiler content taller than viewport**: If a user clicks "How it works" and the content is very long, the Spoiler expands in-place, potentially pushing the demo off-screen. Mitigation: descriptions are capped at ~8 lines; the Spoiler animates smoothly; users can scroll.

## Open Questions

None — all design decisions settled during exploration.
