## Context

Five branch groups remain uncovered, all defenseive/edge-case paths that don't occur in normal usage. Lines and functions are at 100%.

## Goals / Non-Goals

**Goals:**
- Cover the five remaining branch groups across store.ts, hooks.ts, contexts.tsx, renderer.tsx
- Push branch coverage from 91.6% to ~95%+
- Raise branches threshold to 90

**Non-Goals:**
- New test infrastructure — all tests fit in existing files or use existing patterns

## Decisions

### Decision 1: Minimal tests per branch

Each test is 3-5 lines. No abstraction, no helpers. The branches are simple conditions that need one exercise each.

### Decision 2: Existing test files only

All tests go into existing `*.test.ts` / `*.test.tsx` files. No new test file needed.

## Risks / Trade-offs

None. These are defensive branches; covering them adds confidence that edge cases behave as designed.
