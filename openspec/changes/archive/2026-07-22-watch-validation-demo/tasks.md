## 1. ErrorDisplay component

- [x] 1.1 Create `demo/src/components/ErrorDisplay.tsx` — reads `element.props.path` via `useValue`, renders `<Text c="red">` when value is non-empty string, else nothing

## 2. Demo case

- [x] 2.1 Create `demo/src/cases/watch-validation/` directory
- [x] 2.2 Create `demo/src/cases/watch-validation/buildSpec.ts` — CaseContainer + StackRow with BoundField(name, watch) + ErrorDisplay
- [x] 2.3 Create `demo/src/cases/watch-validation/handlers.ts` — `validateName` handler checking `name.length >= 3`
- [x] 2.4 Create `demo/src/cases/watch-validation/registry.ts` — register CaseContainer, BoundField, ErrorDisplay, StackRow
- [x] 2.5 Create `demo/src/cases/watch-validation/WatchValidationCase.tsx` — store with initial name + errors, render Renderer

## 3. App integration

- [x] 3.1 Add `/watch-validation` route in `App.tsx`
- [x] 3.2 Add Watch Validation entry to `CASES` in `HomePage.tsx`
- [x] 3.3 Update demo count and case list in `README.md`

## 4. Verification

- [x] 4.1 Run `npx tsc --noEmit -p demo/tsconfig.json` to verify TypeScript compiles
