## Why

Each demo case currently imports handlers from a shared `handlers.ts`, but uses only a subset. A developer reading one case folder can't see what its actions do without jumping to a shared file. Moving handlers into their respective case folders makes each case fully self-contained — you can read one folder and understand the entire demo.

## What Changes

- Create per-case `handlers.ts` in each case folder containing only the handlers that case uses
- Update each Case component to import from `./handlers` instead of `../../handlers`
- Basic case: drop the unused handlers import entirely (its spec has no action bindings)
- Delete the shared `demo/src/handlers.ts`

## Capabilities

### New Capabilities

None. Demo-only restructuring.

### Modified Capabilities

None.

## Impact

- `demo/src/cases/actions/handlers.ts` — new file (saveDoc, startEdit, saveEdit, cancelEdit)
- `demo/src/cases/form/handlers.ts` — new file (startEdit, saveEdit, cancelEdit)
- `demo/src/cases/large/handlers.ts` — new file (startEdit, saveEdit, cancelEdit, removeItem)
- `demo/src/cases/table/handlers.ts` — new file (startEdit, saveEdit, cancelEdit, removeItem)
- `demo/src/cases/switch/handlers.ts` — new file (setStatus)
- `demo/src/cases/basic/BasicCase.tsx` — remove handlers import/prop
- `demo/src/cases/{actions,form,large,table,switch}/*Case.tsx` — update import path
- `demo/src/handlers.ts` — deleted
- No library changes, no test changes
