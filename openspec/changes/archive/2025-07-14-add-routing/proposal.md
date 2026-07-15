## Why

The demo uses a tab bar to switch between cases — each case mounts conditionally behind `useState`. This makes cases unlinkable (no direct URL to the Switch example), prevents browser back/forward navigation, and couples the demo to a single-page model. Routing gives each case its own URL and replaces the tab bar with a proper landing page.

Additionally, the shared store persists state across cases, which is accidental behavior — each case should start with a clean slate. Making stores per-case completes the isolation started by per-case handlers.

## What Changes

- Add `wouter` dependency for lightweight hook-based routing (~1.5KB)
- Rewrite `App.tsx` to use `Router`/`Route`/`Switch` instead of `useState<Tab>` + conditional rendering
- Create `HomePage.tsx` — landing page with a feature-card grid linking to each case
- Delete `demo/src/store.ts` — no more shared store
- Each Case component creates its own store via `useState(() => createStore({...}))` on mount
- Each case page shows a "← Back" link to return to the home page
- Cases with seed data (Large, Table) initialize their store with that data inline

## Capabilities

### New Capabilities

None. Demo-only changes (UI navigation, no library behavior changes).

### Modified Capabilities

None.

## Impact

- `demo/package.json` — add `wouter` dependency
- `demo/src/App.tsx` — replaced (router instead of tab switcher)
- `demo/src/HomePage.tsx` — new file (card grid landing page)
- `demo/src/store.ts` — deleted
- `demo/src/cases/*/CaseName.tsx` (6 files) — per-case store creation, "← Back" link
- No library changes, no test changes
