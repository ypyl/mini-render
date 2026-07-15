## 1. Create Switch component

- [x] 1.1 Create `demo/src/components/Switch.tsx` — renders child matching the value at `props.path`

## 2. Create switch demo case

- [x] 2.1 Create `demo/src/cases/switch/spec.json` — Switch spec with loading/loaded/error states
- [x] 2.2 Create `demo/src/cases/switch/registry.ts` — includes Switch + all state-specific components
- [x] 2.3 Create `demo/src/cases/switch/SwitchCase.tsx` — renders Switch spec with toggling buttons
- [x] 2.4 Add action handlers for toggling state (setStatus)

## 3. Wire up tab

- [x] 3.1 Add "Switch" tab to `App.tsx`

## 4. Verify

- [x] 4.1 Run demo build — compiles clean
- [x] 4.2 Run `npx tsc --noEmit` in demo — no type errors
