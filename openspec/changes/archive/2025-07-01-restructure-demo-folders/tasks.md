## 1. Extract shared store and handlers

- [x] 1.1 Create `demo/src/store.ts` — extract store creation from App.tsx
- [x] 1.2 Create `demo/src/handlers.ts` — extract all action handlers from App.tsx

## 2. Extract shared components

- [x] 2.1 Create `demo/src/components/` with StaticText, Card, BoundField, ActionButton, EditToggle, Row
- [x] 2.2 Create `demo/src/components/table/` with Table, THead, TBody, Tr, Th, Td

## 3. Create case folders

- [x] 3.1 Create `cases/basic/` — registry (StaticText, Card) + BasicCase
- [x] 3.2 Create `cases/form/` — registry (Card, BoundField, EditToggle) + FormCase
- [x] 3.3 Create `cases/actions/` — registry (Card, ActionButton, BoundField, EditToggle) + ActionsCase
- [x] 3.4 Create `cases/large/` — registry + buildSpec + LargeCase
- [x] 3.5 Create `cases/table/` — registry + buildSpec + TableCase

## 4. Rewrite App.tsx

- [x] 4.1 Replace inline imports with case component imports
- [x] 4.2 Tab switcher renders `<BasicCase/>`, `<FormCase/>`, etc.

## 5. Verify

- [x] 5.1 Run demo build (`npx vite build`) — compiles clean
- [x] 5.2 Run `npx tsc --noEmit` in demo — no type errors
- [x] 5.3 Visual check: all five tabs render correctly
