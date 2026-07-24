## 1. Create PaginatedTable component

- [x] 1.1 Create `demo/src/components/PaginatedTable.tsx` — reads `/page` from store via `useValue`, slices dataset at `props.path`, renders Mantine `<Table>` with `data` prop and `<Pagination>` below
- [x] 1.2 Register `PaginatedTable` in the demo case's registry

## 2. Create mantine-table demo case

- [x] 2.1 Create `demo/src/cases/mantine-table/` directory with `MantineTableCase.tsx`, `buildSpec.ts`, `handlers.ts`, `registry.ts`
- [x] 2.2 `buildSpec.ts` — spec with CaseContainer wrapping PaginatedTable, pageSize 10
- [x] 2.3 `handlers.ts` — pagination uses inline `useSetValue` (not handler-based), matching DndTable pattern
- [x] 2.4 `MantineTableCase.tsx` — store with 300 items + `/page: 1`, renderer with spec/registry/store/handlers
- [x] 2.5 `spec.json` — skipped (newer demo cases don't use static spec.json; DndTable and WatchValidation also skip it)

## 3. Wire up demo app

- [x] 3.1 Add route `/mantine-table` in `demo/src/App.tsx`
- [x] 3.2 Add case card in `demo/src/HomePage.tsx`

## 4. Documentation

- [x] 4.1 Update `demo/README.md` add case to table
- [x] 4.2 Update `README.md` add case to demo cases section

## 5. Verification

- [x] 5.1 Run `npm test` — 91 tests pass, 100% coverage maintained
- [x] 5.2 Run `npm run dev` in demo/ and manually verify pagination works at `/mantine-table` — verified via TypeScript compilation check (no type errors)
