## 1. Setup

- [x] 1.1 Install `wouter` in demo (`npm install wouter`)

## 2. Create HomePage

- [x] 2.1 Create `demo/src/HomePage.tsx` — feature card grid using Mantine Card + SimpleGrid, wouter Link, emoji icons, case descriptions

## 3. Update routing and store isolation

- [x] 3.1 Rewrite `App.tsx` — Router/Switch/Route, one route per case, catch-all 404
- [x] 3.2 Update `BasicCase.tsx` — per-case store via useState, "← Back" link, remove shared store import
- [x] 3.3 Update `FormCase.tsx` — per-case store via useState, "← Back" link, remove shared store import
- [x] 3.4 Update `ActionsCase.tsx` — per-case store via useState, "← Back" link, remove shared store import
- [x] 3.5 Update `LargeCase.tsx` — per-case store via useState with seed data inline, "← Back" link, remove shared store import
- [x] 3.6 Update `TableCase.tsx` — per-case store via useState with seed data inline, "← Back" link, remove shared store import
- [x] 3.7 Update `SwitchCase.tsx` — per-case store via useState, "← Back" link, remove shared store import

## 4. Cleanup

- [x] 4.1 Delete `demo/src/store.ts`

## 5. Verify

- [x] 5.1 Run `npx tsc --noEmit` in demo — no type errors
- [x] 5.2 Run demo build — compiles clean
- [x] 5.3 Run library tests — no regressions
