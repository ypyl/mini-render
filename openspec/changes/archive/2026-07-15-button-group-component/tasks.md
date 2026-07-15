## 1. ButtonGroup component

- [x] 1.1 Create `demo/src/components/ButtonGroup.tsx` — wraps children in Mantine `<Button.Group>`, accepts standard `ComponentProps`

## 2. Switch demo — use ButtonGroup

- [x] 2.1 Import `ButtonGroup` and add to registry in `demo/src/cases/switch/registry.ts`
- [x] 2.2 Change `buttons` element type from `"Row"` to `"ButtonGroup"` in `demo/src/cases/switch/spec.json`

## 3. Verification

- [x] 3.1 Run the demo and confirm Switch case buttons render as a connected segmented control
- [x] 3.2 Confirm clicking each button still dispatches the correct `setStatus` action
