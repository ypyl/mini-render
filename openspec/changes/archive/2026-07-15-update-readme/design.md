## Context

The README was written early in the project and several things have changed since:
- Two demo cases added (Table, Switch)
- Codebase grew from ~450 to ~700 lines
- Tests grew from 20 to 31
- GitHub Pages demo is now live at `ypyl.github.io/mini-render`
- The quick start path assumes a specific clone directory name

## Goals / Non-Goals

**Goals:**
- Correct all stale numbers and lists in README
- Add live demo link prominently
- Create AGENTS.md with a README-update rule

**Non-Goals:**
- Rewriting the README structure
- Changing the architecture section
- Updating API docs (they're already accurate)

## Decisions

### Decision 1: AGENTS.md at repo root

**Chosen**: Create `AGENTS.md` at the repository root.

**Why**: This is the standard location pi looks for repo-level agent instructions. The file contains a simple rule: when making changes that affect documented features, counts, or capabilities, update the corresponding README sections.

### Decision 2: Live demo link placement

**Chosen**: Add link near the top, after the one-line description, before the architecture section.

**Why**: It's the first thing a visitor should see after understanding what the project is. The demo is the best way to understand mini-render.

## Risks / Trade-offs

- **AGENTS.md is aspirational**: The agent follows it best-effort. Real enforcement requires the user to remind or the agent to check. Worth having regardless.

## Open Questions

<!-- None -->
