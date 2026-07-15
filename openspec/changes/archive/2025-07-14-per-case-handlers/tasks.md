## 1. Create per-case handler files

- [x] 1.1 Create `demo/src/cases/actions/handlers.ts` — saveDoc, startEdit, saveEdit, cancelEdit
- [x] 1.2 Create `demo/src/cases/form/handlers.ts` — startEdit, saveEdit, cancelEdit
- [x] 1.3 Create `demo/src/cases/large/handlers.ts` — startEdit, saveEdit, cancelEdit, removeItem
- [x] 1.4 Create `demo/src/cases/table/handlers.ts` — startEdit, saveEdit, cancelEdit, removeItem
- [x] 1.5 Create `demo/src/cases/switch/handlers.ts` — setStatus

## 2. Update Case component imports

- [x] 2.1 Update `ActionsCase.tsx` — import handlers from `./handlers`
- [x] 2.2 Update `FormCase.tsx` — import handlers from `./handlers`
- [x] 2.3 Update `LargeCase.tsx` — import handlers from `./handlers`
- [x] 2.4 Update `TableCase.tsx` — import handlers from `./handlers`
- [x] 2.5 Update `SwitchCase.tsx` — import handlers from `./handlers`
- [x] 2.6 Update `BasicCase.tsx` — remove unused handlers import and prop

## 3. Remove shared handlers file

- [x] 3.1 Delete `demo/src/handlers.ts`

## 4. Verify

- [x] 4.1 Run `npx tsc --noEmit` in demo — no type errors
- [x] 4.2 Run demo build — compiles clean
- [x] 4.3 Run library tests — no regressions
