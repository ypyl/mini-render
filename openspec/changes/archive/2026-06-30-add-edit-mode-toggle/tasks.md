## 1. BoundField read-only/editable toggle

- [x] 1.1 Update BoundField to call `useValue<boolean>("/editingSection")` alongside `useBound(path)`
- [x] 1.2 When `/editingSection` is falsy, render value as unstyled text (`<span>` or Box with transparent style) matching test2's EditableField pattern
- [x] 1.3 When `/editingSection` is truthy, render current `<MantineTextInput>` with default variant
- [x] 1.4 Verify read-only text and editable input occupy the same vertical space (no layout shift on toggle)

## 2. toggleEdit handler and wiring

- [x] 2.1 Add `toggleEdit` handler to the demo's `handlers` map: reads `/editingSection` via `getState()`, writes negated value
- [x] 2.2 Add `ActionButton` with `on: { click: { action: "toggleEdit" } }` to Form spec
- [x] 2.3 Add `ActionButton` with `on: { click: { action: "toggleEdit" } }` to Actions spec
- [x] 2.4 Add `ActionButton` with `on: { click: { action: "toggleEdit" } }` to Large spec
- [x] 2.5 Do NOT add toggle to Basic spec (no BoundFields present)

## 3. Verification

- [x] 3.1 `npx tsc --noEmit` passes for demo
- [x] 3.2 Demo builds with `npm run build` (Vite production build)
- [x] 3.3 Verify: Form tab — fields default read-only, click Edit → fields become editable, click again → read-only
- [x] 3.4 Verify: Large tab — all 2000 cells toggle between read-only text and editable inputs on button click
- [x] 3.5 Verify: no React duplicate-key warnings on toggle
- [x] 3.6 Verify: only BoundFields re-render on toggle; Card/StaticText elements do not (React DevTools Profiler)