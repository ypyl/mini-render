## 1. Add edit toggle to table spec

- [x] 1.1 Add `toggleBtn` element to `buildTableSpec()` spec — an `ActionButton` labeled "Edit" wired to the `toggleEdit` handler, placed as a child of the `table` root element
- [x] 1.2 Remove `store.set("/editingSection", true)` from the seeding block in `buildTableSpec()`

## 2. Verify

- [x] 2.1 Run `npx tsc --noEmit` in demo to confirm TypeScript compiles
- [x] 2.2 Run `npm test` to confirm all 20 existing tests still pass
