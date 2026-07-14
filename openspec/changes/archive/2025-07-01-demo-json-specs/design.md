## Context

The demo app (`demo/src/App.tsx`) currently builds all specs inline as TypeScript objects. Three of the five specs are fully static (no data seeding):

- `basicSpec` — static card + greeting text
- `formSpec` — two bound fields with edit toggle
- `actionSpec` — action button + timestamp display

The remaining two (`buildLargeSpec`, `buildTableSpec`) require runtime `store.set()` calls to seed array data, so they stay in code.

The goal is to extract the three static specs into standalone JSON files and import them via Vite's native JSON module resolution. Zero library changes.

## Goals / Non-Goals

**Goals:**
- Move static spec data out of `App.tsx` and into `demo/src/specs/*.json`
- Demonstrate the spec-as-JSON pattern that mirrors real backend-served specs
- Keep the demo fully functional with no regressions
- No new dependencies

**Non-Goals:**
- Add validation (Zod or otherwise) to the library or demo
- Add async spec loading (fetch, useSpec hook, etc.)
- Change the large table specs (`buildLargeSpec`, `buildTableSpec`) — they require programmatic seeding
- Modify the library API or exports in any way
- Create a spec-editing workflow or file watcher

## Decisions

### Decision 1: Static Vite JSON imports over dynamic fetch

**Choice:** Use `import spec from "./specs/basic.json"` (Vite inlines at build time).

**Alternatives considered:**
- `fetch()` + `useEffect` — more realistic for backend pattern, but adds loading/error state complexity with no real benefit for a demo
- Dynamic `import()` — also async, same complexity
- Keep inline TS — what we're moving away from

**Rationale:** Static imports are zero-cost, work with Vite's HMR out of the box, and the JSON file pattern alone is the educational win. Async loading can be added later without undoing this change.

### Decision 2: One JSON file per tab, not one mega-spec

**Choice:** `basic.json`, `form.json`, `actions.json` — three separate files.

**Rationale:** Matches the tab structure, keeps each file small and self-documenting, makes it trivial to add a new tab+spec without touching existing files.

### Decision 3: No spec file for large/table tabs

**Choice:** `buildLargeSpec()` and `buildTableSpec()` remain as functions in `App.tsx`.

**Rationale:** These specs are parameterized (item count) and require store seeding side effects. Extracting them to JSON would mean also extracting the seeding logic, which defeats the purpose. They're already a different category (performance demos, not spec-demo demos).

## Risks / Trade-offs

- **JSON files lack TypeScript type-checking** — a typo in a JSON field (e.g., `"typee"`) won't be caught at compile time. The renderer handles this gracefully (warns + returns null), so the worst case is a silent empty render, not a crash. Mitigation: TypeScript's `resolveJsonModule` infers the literal shape, and the `Spec` type is structurally compatible — most errors would surface as obvious rendering issues in the demo.
