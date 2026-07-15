## Context

The demo has no conditional rendering example. A Switch component demonstrates how to use `useValue` to render different subtrees based on state — no library changes needed.

## Goals / Non-Goals

**Goals:**
- Add a Switch registry component that reads a path and renders the matching child
- Create a demo case showing loading → loaded → error lifecycle
- Add it as a new tab in the demo

**Non-Goals:**
- Library changes — Switch uses only public API (`useValue`)
- react-query integration (doesn't need it — simulate state changes via action handlers)
- Multiple Switch patterns (just the simple "path value matches child key" pattern)

## Decisions

### Decision 1: Pattern A — state value matches child element key

Switch reads `path`, gets the value (`"loading"`, `"loaded"`, `"error"`), and renders the `children` element whose key matches. If no match, renders nothing.

### Decision 2: Switch is a demo component, not a library export

It lives in `demo/src/components/` alongside the other demo components. It's ~10 lines and serves as an example of what consumers can build.

### Decision 3: Demo scenario

Three buttons at the top toggle `/appStatus` between `"loading"`, `"loaded"`, and `"error"`. The Switch renders a spinner, a success card, or an error card accordingly. Uses existing action handlers.
