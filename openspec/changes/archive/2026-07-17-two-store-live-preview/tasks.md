## 1. New components

- [x] 1.1 Create `demo/src/components/SelectField.tsx` — always-writable dropdown reading `bind` path via `useBound`, rendering Mantine `<Select>` with options from `element.props.options`
- [x] 1.2 Create `demo/src/components/PreviewBox.tsx` — reads `/preview/title`, `/preview/color`, `/preview/size` via `useValue`, renders a styled `<Paper>`

## 2. Demo case

- [x] 2.1 Create `demo/src/cases/two-store/` directory
- [x] 2.2 Create `demo/src/cases/two-store/handlers.ts` — `applySettings` handler closes over `storeB`, reads `/settings` from store A, writes to `/preview` in store B
- [x] 2.3 Create `demo/src/cases/two-store/buildSettingsSpec.ts` — settings panel: CaseContainer + BoundField (title) + SelectField (color, size) + ActionButton (Apply)
- [x] 2.4 Create `demo/src/cases/two-store/buildPreviewSpec.ts` — preview panel: CaseContainer + PreviewBox
- [x] 2.5 Create `demo/src/cases/two-store/registry.ts` — register CaseContainer, BoundField, SelectField, ActionButton, PreviewBox, StackRow
- [x] 2.6 Create `demo/src/cases/two-store/TwoStoreCase.tsx` — creates two stores (storeA with `{ settings, editingSection: true }`, storeB with `{ preview }`), renders two Renderers in a SimpleGrid cols={2}

## 3. App integration

- [x] 3.1 Add `/two-store` route and `TwoStoreCase` import in `demo/src/App.tsx`
- [x] 3.2 Add two-store entry to `CASES` array in `demo/src/HomePage.tsx`
- [x] 3.3 Update demo count and case list in `README.md`
