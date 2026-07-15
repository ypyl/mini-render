## Context

The demo's `HomePage` shows a title, description, and grid of case cards. There's no way to reach the GitHub repository from the page. The repo URL is known: `https://github.com/ypyl/mini-render`.

## Goals / Non-Goals

**Goals:**
- Add a subtle, clearly labeled link to the GitHub repo on the home page
- Link opens in a new tab (`target="_blank"`)
- Styled consistently with the existing design (Mantine components)

**Non-Goals:**
- GitHub star count, fork count, or other dynamic repo metadata
- Footer or persistent nav link — just the home page

## Decisions

### Decision 1: Anchor below description, before cards

**Chosen**: Place the repo link between the description paragraph and the case cards grid, centered.

**Why**: It's logically part of the header/intro section. Visitors read the description then either see "view source" or scroll to the cases. Placing it after the cards would bury it.

### Decision 2: Use Mantine Anchor with external link icon

**Chosen**: `<Anchor href="..." target="_blank">` with a GitHub emoji or text label like "View on GitHub".

**Why**: No new dependencies. Mantine's `Anchor` is already imported and handles external link styling consistently with the theme.

## Risks / Trade-offs

- **Repo URL hardcoded**: If the repo is renamed or transferred, the link breaks. Trivial to update — one string in a known location.

## Open Questions

<!-- None -->
