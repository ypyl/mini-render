## 1. Dependencies

- [x] 1.1 Install `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, and `@tabler/icons-react` in `demo/`

## 2. DndTable component

- [x] 2.1 Create `demo/src/components/DndTable.tsx` — self-contained component using `@dnd-kit` with drag handles, Name/Email columns, add-row button, and per-row remove button; reads/writes store directly via `useValue`/`useSetValue`

## 3. Demo case

- [x] 3.1 Create `demo/src/cases/dnd-table/` directory
- [x] 3.2 Create `demo/src/cases/dnd-table/buildSpec.ts` — CaseContainer + DndTable with `path: "/items"`
- [x] 3.3 Create `demo/src/cases/dnd-table/registry.ts` — register CaseContainer + DndTable
- [x] 3.4 Create `demo/src/cases/dnd-table/DndTableCase.tsx` — store with initial items, render Renderer with spec + registry

## 4. App integration

- [x] 4.1 Add `/dnd-table` route and `DndTableCase` import in `demo/src/App.tsx`
- [x] 4.2 Add Drag & Drop entry to `CASES` array in `demo/src/HomePage.tsx`
- [x] 4.3 Update demo count and case list in `README.md`
