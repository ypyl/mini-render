## Context

Two test files (`store.test.ts`, `actions.test.ts`) use `node:assert` while the other three use Vitest `expect`. This is a mechanical conversion — no logic changes.

## Goals / Non-Goals

**Goals:**
- Replace `node:assert` with Vitest `expect` in store.test.ts and actions.test.ts
- Wrap tests in `describe`/`it` for consistency with other test files
- All 22 assertions produce identical results

**Non-Goals:**
- Changing test logic or adding new tests
- Converting assertion semantics (e.g., deepStrictEqual stays deep, not shallow)

## Decisions

### Decision 1: Direct mechanical conversion

**Mapping:**
- `import assert from "node:assert/strict"` → `import { describe, it, expect } from "vitest"`
- `test("name", () => { ... })` → `it("name", () => { ... })` wrapped in `describe`
- `assert.equal(a, b)` → `expect(a).toBe(b)`
- `assert.deepStrictEqual(a, b)` → `expect(a).toEqual(b)`

**Rationale:** `.toBe()` is strict equality (===) matching `assert.equal`'s semantics. `.toEqual()` is deep equality matching `assert.deepStrictEqual`.

## Risks / Trade-offs

None. Pure syntax change, no behavioral difference.
