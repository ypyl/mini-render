## Why

The demo is a single 350-line `App.tsx` that mixes 12 components, a registry, handlers, store, two spec-builders, and a tab switcher. Each demo case (Basic, Form, Actions, Large, Table) should be self-contained in its own folder so they can be understood, modified, and extended independently.

## What Changes

- Extract shared components into `demo/src/components/` (Card, BoundField, ActionButton, EditToggle, StaticText, Row)
- Extract table-specific components into `demo/src/components/table/` (Table, THead, TBody, Tr, Th, Td)
- Extract shared store and handlers into `demo/src/store.ts` and `demo/src/handlers.ts`
- Create `demo/src/cases/` with one folder per case: `basic/`, `form/`, `actions/`, `large/`, `table/`
- Each case folder contains its own registry and case component
- `large/` and `table/` also contain their `buildSpec` functions
- `App.tsx` reduces to just the tab switcher, importing from `cases/`
- No behavioral changes — all five tabs render identically

## Capabilities

### New Capabilities

None. Pure code organization refactor.

### Modified Capabilities

None.

## Impact

- `demo/src/App.tsx` — shrinks from ~350 to ~30 lines
- `demo/src/components/` — 6 new files (shared components)
- `demo/src/components/table/` — 6 new files (table components)
- `demo/src/store.ts` — new file (extracted from App.tsx)
- `demo/src/handlers.ts` — new file (extracted from App.tsx)
- `demo/src/cases/` — 5 new folders with registry + case component each
- No library changes, no test changes
