## Context

Coverage gaps: 1 statement + 6 branches remain. These are in defensive code paths (unsubscribe cleanup, root coercion, optional prop branches). Finding the exact gaps requires iterative test-and-measure.

## Goals / Non-Goals

**Goals:**
- Close all remaining gaps: 100% statements, branches, functions, lines
- Set all thresholds to 100

**Non-Goals:**
- Changing library code (these are test gaps, not code issues)

## Decisions

### Decision 1: Iterative approach

Write a candidate test, run coverage, check if gap closes, repeat. The exact uncovered branches need runtime investigation.

### Decision 2: Thresholds to 100

All four metrics set to 100. This locks in full coverage as a CI gate.
