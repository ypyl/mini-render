## 1. Row component — gap support

- [x] 1.1 Import `Stack` from `@mantine/core` in `demo/src/components/Row.tsx`
- [x] 1.2 Add conditional rendering: when `element.props.gap` is set, wrap children in `<Stack gap={element.props.gap}>`; otherwise render `<>{children}</>` as before

## 2. Large Case spec — apply gap

- [x] 2.1 Add `props: { gap: "md" }` to the `list` element in `demo/src/cases/large/buildSpec.ts`

## 3. Verification

- [x] 3.1 Run the demo and confirm the Large Case shows `md` spacing between repeated `FieldsetRow` items
- [x] 3.2 Confirm other cases (basic, table, form) are unaffected — no visual regression
