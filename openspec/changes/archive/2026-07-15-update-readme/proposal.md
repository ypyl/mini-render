## Why

The README has drifted from the actual codebase: demo case count, line count, test count, and paths are stale. It also lacks a link to the live GitHub Pages demo. Additionally, there's no repo-level instruction telling the agent to keep README files in sync when making changes.

## What Changes

- **README.md**: Fix stale data — demo case list (4→6, add Table and Switch), LOC (~450→~700), test count (20→31), quick start path (`cd mini-render/demo` → `cd demo`), and add live demo link
- **AGENTS.md**: New file instructing the agent to update README files whenever a change affects documented behavior, counts, or features

## Capabilities

### New Capabilities
<!-- None — documentation-only change -->

### Modified Capabilities
<!-- None -->

## Impact

- **Modified**: `README.md`
- **New**: `AGENTS.md`
