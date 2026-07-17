## 1. Modal component

- [x] 1.1 Create `demo/src/components/Modal.tsx` — reads `path` from props via `useValue`, renders Mantine `<Modal opened={truthy}>` with `closeOnClickOutside={false}`, title from `element.props.title`, children inside

## 2. Demo case infrastructure

- [x] 2.1 Create `demo/src/cases/detail-modal/` directory
- [x] 2.2 Create `demo/src/cases/detail-modal/handlers.ts` — `loadDetail` (set `/loadingDetail` true, await 600ms, lookup detail from hardcoded map by id, write to `/itemDetail`, set `/loadingDetail` false) and `closeModal` (set `/itemDetail` to undefined)
- [x] 2.3 Create `demo/src/cases/detail-modal/buildSpec.ts` — `buildDetailModalSpec()` generating CaseContainer root with table (repeat on `/items`, TBody/Tr/Td/ActionButton per row) and Modal (Switch on `/loadingDetail` to toggle loading spinner vs detail StaticText fields, Close ActionButton)
- [x] 2.4 Create `demo/src/cases/detail-modal/registry.ts` — register CaseContainer, Table, TBody, Tr, Td, ActionButton, Modal, Switch, StaticText, StackRow
- [x] 2.5 Create `demo/src/cases/detail-modal/DetailModalCase.tsx` — initializes store with 10 items (id, name, industry), renders Renderer with spec, registry, handlers

## 3. App integration

- [x] 3.1 Add `/detail-modal` route and `DetailModalCase` import in `demo/src/App.tsx`
- [x] 3.2 Add detail-modal entry to `CASES` array in `demo/src/HomePage.tsx` with emoji, title, and concept-naming description
- [x] 3.3 Update demo count and case list in `README.md`
