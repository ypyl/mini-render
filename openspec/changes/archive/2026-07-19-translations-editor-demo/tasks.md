## 1. PathLabel component

- [x] 1.1 Create `demo/src/components/PathLabel.tsx` — calls `useRepeatPath()`, extracts last segment, renders as text

## 2. Demo case

- [x] 2.1 Create `demo/src/cases/translations/` directory
- [x] 2.2 Create `demo/src/cases/translations/buildSpec.ts` — CaseContainer + repeat on `/translations`, each row: PathLabel + BoundField (bind: "")
- [x] 2.3 Create `demo/src/cases/translations/registry.ts` — register CaseContainer, PathLabel, BoundField, FieldsetRow
- [x] 2.4 Create `demo/src/cases/translations/TranslationsCase.tsx` — store with translations object + editingSection: true, renders Renderer

## 3. App integration

- [x] 3.1 Add `/translations` route and `TranslationsCase` import in `demo/src/App.tsx`
- [x] 3.2 Add translations entry to `CASES` array in `demo/src/HomePage.tsx`
- [x] 3.3 Update demo count and case list in `README.md`
