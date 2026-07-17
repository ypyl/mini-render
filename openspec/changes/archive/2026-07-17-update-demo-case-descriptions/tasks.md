## 1. Create CaseContainer component

- [x] 1.1 Create `demo/src/components/CaseContainer.tsx` — wraps children in `<Paper>` with `<Title>` and optional `<Text c="dimmed" size="sm">` description below it

## 2. Update demo specs to use CaseContainer

- [x] 2.1 Swap root `type` from `"Card"` to `"CaseContainer"` and add `description` in `demo/src/cases/basic/spec.json`
- [x] 2.2 Swap root `type` from `"Card"` to `"CaseContainer"` and add `description` in `demo/src/cases/form/spec.json`
- [x] 2.3 Swap root `type` from `"Card"` to `"CaseContainer"` and add `description` in `demo/src/cases/actions/spec.json`
- [x] 2.4 Swap root `type` from `"Card"` to `"CaseContainer"` and add `description` in `demo/src/cases/switch/spec.json` (keep inner `"Card"` elements for Loaded/Error states)
- [x] 2.5 Swap root `type` from `"Card"` to `"CaseContainer"` and add `description` in `demo/src/cases/large/buildSpec.ts`

## 3. Update demo registries

- [x] 3.1 Replace `Card` with `CaseContainer` in `demo/src/cases/basic/registry.ts`
- [x] 3.2 Replace `Card` with `CaseContainer` in `demo/src/cases/form/registry.ts`
- [x] 3.3 Replace `Card` with `CaseContainer` in `demo/src/cases/actions/registry.ts`
- [x] 3.4 Add `CaseContainer` (keep `Card`) in `demo/src/cases/switch/registry.ts`
- [x] 3.5 Replace `Card` with `CaseContainer` in `demo/src/cases/large/registry.ts`
