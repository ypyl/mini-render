## 1. New components

- [x] 1.1 Create `demo/src/components/ToggleField.tsx` — Mantine `<Switch>` bound to store path via `useBound<boolean>`
- [x] 1.2 Create `demo/src/components/SliderField.tsx` — Mantine `<Slider>` bound to store path via `useBound<number>`, with min/max/label props
- [x] 1.3 Create `demo/src/components/Badge.tsx` — Mantine `<Badge>` with text and color from `element.props`
- [x] 1.4 Create `demo/src/components/Alert.tsx` — Mantine `<Alert>` with title and color from props, renders children
- [x] 1.5 Create `demo/src/components/SegmentedField.tsx` — Mantine `<SegmentedControl>` bound to store path with options

## 2. Demo case

- [x] 2.1 Create `demo/src/cases/feature-flags/` directory
- [x] 2.2 Create `demo/src/cases/feature-flags/buildSpec.ts` — CaseContainer + Alert + SegmentedField + 3 flag cards (FieldsetRow + ToggleField + Badge, one with SliderField)
- [x] 2.3 Create `demo/src/cases/feature-flags/registry.ts` — register CaseContainer, ToggleField, SliderField, Badge, Alert, SegmentedField, FieldsetRow, StackRow, StaticText
- [x] 2.4 Create `demo/src/cases/feature-flags/FeatureFlagsCase.tsx` — initializes store with flag + environment defaults, renders Renderer

## 3. App integration

- [x] 3.1 Add `/feature-flags` route and `FeatureFlagsCase` import in `demo/src/App.tsx`
- [x] 3.2 Add feature-flags entry to `CASES` array in `demo/src/HomePage.tsx`
- [x] 3.3 Update demo count and case list in `README.md`
