## 1. SortableRow — editable cells

- [x] 1.1 Update `demo/src/components/SortableRow.tsx` — accept `editing` and `path` props; when editing, render editable `TextInput` bound to store via `useValue`/`useSetValue` at `${path}/${index}/${field}`; when not editing, read-only `TextInput variant="unstyled"`

## 2. DndTable — edit/save/cancel toggle

- [x] 2.1 Update `demo/src/components/DndTable.tsx` — read `/editingSection` from store, render Edit/Save/Cancel buttons above the table, implement toggle + snapshot logic inline (no external handlers), pass `editing` and `path` to SortableRow

## 3. Demo case

- [x] 3.1 Update `demo/src/cases/dnd-table/DndTableCase.tsx` — add `editingSection: true` to store initial state
- [x] 3.2 Update `demo/src/cases/dnd-table/buildSpec.ts` — update technical description to mention editable cells

## 4. Verification

- [x] 4.1 Run `npx tsc --noEmit -p demo/tsconfig.json` to verify TypeScript compiles
