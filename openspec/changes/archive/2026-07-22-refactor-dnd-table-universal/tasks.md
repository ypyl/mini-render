## 1. SortableRow component

- [x] 1.1 Create `demo/src/components/SortableRow.tsx` — uses `useSortable` + `useRepeatIndex` + `useValue` + `useSetValue`; renders `<Table.Tr>` with drag handle cell, `{children}`, and remove button cell

## 2. Refactor DndTable

- [x] 2.1 Rewrite `demo/src/components/DndTable.tsx` — remove `SortableRow` and `Item`; add `columns` prop; auto-generate Thead from `columns`; wrap children in `SortableContext`; keep sensors, `onDragEnd`, and Add button

## 3. Update demo case

- [x] 3.1 Update `demo/src/cases/dnd-table/buildSpec.ts` — add `columns` prop to DndTable; use `repeat` on `/items` with `SortableRow` children containing `BoundField` for each column
- [x] 3.2 Update `demo/src/cases/dnd-table/registry.ts` — register `SortableRow` + `BoundField`
- [x] 3.3 Update `demo/src/cases/dnd-table/DndTableCase.tsx` — update spec, add `BoundField` import to registry

## 4. Verification

- [x] 4.1 Run `npx tsc --noEmit -p demo/tsconfig.json` to verify TypeScript compiles
