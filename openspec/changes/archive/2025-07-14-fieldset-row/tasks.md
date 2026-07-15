## 1. Create FieldsetRow component

- [x] 1.1 Create `demo/src/components/FieldsetRow.tsx` — wraps children in Mantine `<Fieldset radius="md">`

## 2. Update Large case to use FieldsetRow

- [x] 2.1 Update `demo/src/cases/large/buildSpec.ts` — change row type to `FieldsetRow`, reorder children
- [x] 2.2 Update `demo/src/cases/large/registry.ts` — replace `Row` with `FieldsetRow`

## 3. Verify

- [x] 3.1 Run `npx tsc --noEmit` in demo — no type errors
- [x] 3.2 Run demo build — compiles clean
