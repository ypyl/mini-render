## Context

Tests currently use Node.js built-in `node:test` + `node:assert`, run via a two-step process: `tsc -p tsconfig.test.json` compiles `src-test/` to `dist-test/`, then `node --test` executes the JS output. There is no test framework, no watch mode, and no coverage instrumentation.

The test files inline the store implementation (~70 lines duplicated across two files) to avoid ESM import issues with the separate tsc compilation setup. This means coverage tools can't trace execution back to source files.

## Goals / Non-Goals

**Goals:**
- Replace `node:test` with Vitest as the test runner
- Add code coverage via `@vitest/coverage-v8` (V8-based instrumentation, no Babel/Istanbul)
- De-inline tests so they import from source, making coverage tracking accurate
- Set coverage thresholds as a CI quality gate (lines: 35%, functions: 50%, branches: 60%)
- Keep all 20 existing tests passing with identical assertions
- Re-export `resolveParams` from the library barrel (needed for direct testing)

**Non-Goals:**
- Adding React component tests (hooks, contexts, renderer) — separate change
- Migrating to Jest or any other test framework
- Adding test utilities, fixtures, or test infrastructure beyond Vitest config
- Achieving high coverage percentages (the gate is deliberately low until React tests exist)
- Changing any library runtime behavior

## Decisions

### Decision 1: Vitest over keeping `node:test` + separate coverage tool

**Choice:** Vitest with `@vitest/coverage-v8`.

**Alternatives considered:**
- Keep `node:test` and add `c8` for coverage — c8 is deprecated in favor of `@vitest/coverage-v8`. Also, de-inlining tests requires ESM imports from source, which `node:test` with tsc pre-compilation handles poorly.
- Keep `node:test` and add `nyc` (Istanbul) — requires transpilation step, heavy config, and Istanbul is slower than V8 native coverage.
- Switch to Jest — larger dependency, more config, slower. Vitest is the modern standard for Vite/ESM projects.

**Rationale:** Vitest is ESM-native, has built-in watch mode, uses V8 for fast coverage, and is the standard companion to Vite-based projects. It's one `vitest.config.ts` and two devDependencies.

### Decision 2: `@vitest/coverage-v8` over `@vitest/coverage-istanbul`

**Choice:** `@vitest/coverage-v8` (V8-native instrumentation).

**Rationale:** V8 coverage is faster (no source transformation), has zero parser overhead, and works natively with ESM/TypeScript. Istanbul requires Babel or esbuild transforms, adding config complexity. The only downside — branch coverage is slightly less precise than Istanbul — is irrelevant at our threshold levels.

### Decision 3: Re-export `resolveParams`

**Choice:** Restore `resolveParams` to the public API.

**Rationale:** The earlier ponytail cleanup made it private because no external consumer existed. But with de-inlined tests importing from source, `resolveParams` needs to be reachable. It's also genuinely useful for users writing custom action handlers — the same `$state`/`$item`/`$index` expressions in action params. Keeping it private would either force test hacks or prevent testing the real function.

### Decision 4: Coverage thresholds

**Choice:** lines: 35%, functions: 50%, branches: 60%, statements: 35%.

**Rationale:** After de-inlining, only `store.ts` (~170 lines of pure logic) is covered. The React files (`hooks.ts`, `contexts.tsx`, `renderer.tsx`, ~360 lines) have zero coverage. A 35% lines threshold reflects this reality — it's the honest current coverage plus a small buffer. Functions and branches get higher thresholds because `store.ts` has good branch coverage (the 20 tests exercise many code paths). Thresholds will ratchet up when React tests are added.

### Decision 5: Vitest config location and shape

**Choice:** `vitest.config.ts` at project root, using Vitest's `include` to pick up `src/**/*.test.ts`.

**Rationale:** The root `tsconfig.json` already covers `src/`, and Vitest reads it natively. No separate test tsconfig needed. The config is minimal: define test file pattern, enable coverage, set thresholds.

### Decision 6: Remove `tsconfig.test.json`

**Choice:** Delete it.

**Rationale:** Vitest uses its own esbuild-based transform (or the project's `tsconfig.json` directly). The separate test tsconfig existed solely to compile `src-test/` to `dist-test/` for `node:test`. With Vitest, nothing references it.

## Risks / Trade-offs

- **Vitest is a new devDependency** — adds ~200 packages (Vitest + Vite + coverage). However, the demo already depends on Vite, so the transitive overhead is partially shared. Mitigation: `npm install --save-dev` only adds what's needed; bundle size is dev-only, not shipped.
- **Thresholds could be annoying if wrong** — if `resolveParams` testing or store coverage are lower than estimated, the 35% gate could block commits. Mitigation: run coverage first, measure actual numbers, adjust thresholds to match reality + buffer.
- **De-inlining tests changes test behavior** — previously, tests ran against a self-contained copy of the store. Now they run against the real source. If the source and inlined copy have diverged, tests could break or pass differently. Mitigation: the inlined copy was a faithful reproduction; the only difference was the removed `getServerSnapshot`. All 20 tests should pass identically.
