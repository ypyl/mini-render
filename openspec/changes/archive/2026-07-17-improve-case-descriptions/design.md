## Context

Each case card on the home page has an emoji, title, and one-line description. The descriptions currently describe the case's behavior in general terms. They should instead answer: "What mini-render concept does this case teach?"

## Goals / Non-Goals

**Goals:**
- Each description names the specific mini-render API or pattern the case demonstrates
- Descriptions are concise (one line, ~15-25 words)
- Consistent tone across all six cases

**Non-Goals:**
- Changing the card layout or styling
- Adding tags, badges, or difficulty levels
- Modifying the cases themselves

## Decisions

### Decision 1: Description formula

Each description follows: `<what the case UI does> — demonstrates <mini-render concept>.`

Examples:
- "Two-way editable fields via `useBound` — demonstrates per-path subscribe-and-write bindings"
- "Button group dispatches actions to handlers — demonstrates the `emit` + action system"

**Why**: Makes the educational purpose explicit. First-time visitors get a learning roadmap.

## Risks / Trade-offs

- **Subjective wording**: Descriptions are opinionated. Easy to iterate — changes are in one file.

## Open Questions

<!-- None -->
