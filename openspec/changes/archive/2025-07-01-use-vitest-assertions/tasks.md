## 1. Convert store.test.ts

- [x] 1.1 Replace `import assert from "node:assert/strict"` with `import { describe, it, expect } from "vitest"`
- [x] 1.2 Convert `test("name", () => { ... })` to `describe`/`it` blocks
- [x] 1.3 Convert `assert.equal()` to `expect().toBe()` and `assert.deepStrictEqual()` to `expect().toEqual()`

## 2. Convert actions.test.ts

- [x] 2.1 Replace `import assert from "node:assert/strict"` with `import { describe, it, expect } from "vitest"`
- [x] 2.2 Convert `test("name", () => { ... })` to `describe`/`it` blocks
- [x] 2.3 Convert `assert.equal()` to `expect().toBe()` and `assert.deepStrictEqual()` to `expect().toEqual()`

## 3. Verify

- [x] 3.1 Run `npm test` — all 69 tests pass
- [x] 3.2 Run `npm run coverage` — no regression (100% lines, 95.4% branches)
- [x] 3.3 Run `npx tsc --noEmit` — clean
