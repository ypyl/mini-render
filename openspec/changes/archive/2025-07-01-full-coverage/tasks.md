## 1. Investigate and fix store.ts gaps

- [x] 1.1 Add test: `immutableSetByPath` with array root (covers `Array.isArray(root)` branch)
- [x] 1.2 Add test: `immutableSetByPath` with primitive number root
- [x] 1.3 Add test: unsubscribe when other listeners remain (set.size > 0 after removal)

## 2. Investigate and fix contexts.tsx gap

- [x] 2.1 Identify and cover the remaining branch (likely `if (path)` or `??` nuance)

## 3. Investigate and fix renderer.tsx gaps

- [x] 3.1 Identify and cover branch at line 77 (likely `children ?? []` for undefined children)
- [x] 3.2 Identify and cover branch at line 126 (likely `useValue(...) ?? []` nullish fallback)

## 4. Thresholds

- [x] 4.1 Set all coverage thresholds to 100 in `vitest.config.ts`

## 5. Verify

- [x] 5.1 Run `npm test` — all tests pass
- [x] 5.2 Run `npm run coverage` — 100% across all metrics
- [x] 5.3 Run `npx tsc --noEmit` — clean
