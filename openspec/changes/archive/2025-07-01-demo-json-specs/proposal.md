## Why

The demo currently hardcodes all three static specs (`basicSpec`, `formSpec`, `actionSpec`) as TypeScript objects inside `App.tsx`. This buries the spec data—the very thing the library exists to render—inside imperative code. Moving specs to standalone JSON files makes the demo self-documenting (the JSON *is* the spec format), mirrors real-world usage (specs fetched from a backend), and makes the demo easy to extend with new example specs without touching component code.

## What Changes

- Extract `basicSpec`, `formSpec`, and `actionSpec` from `App.tsx` into separate JSON files under `demo/src/specs/`
- Import them via Vite's native JSON imports (static, synchronous, build-time)
- The two large specs (`buildLargeSpec`, `buildTableSpec`) remain in code—they require dynamic data seeding via `store.set()` and don't fit the static-JSON pattern
- No library changes. No dependency changes. Pure demo refactor.

## Capabilities

### New Capabilities

None. This is a demo-only refactor; no library capabilities change.

### Modified Capabilities

None.

## Impact

- `demo/src/App.tsx` — remove inline `basicSpec`/`formSpec`/`actionSpec` objects, replace with JSON imports
- `demo/src/specs/basic.json` — new file
- `demo/src/specs/form.json` — new file
- `demo/src/specs/actions.json` — new file
- No library code, tests, or dependencies affected
