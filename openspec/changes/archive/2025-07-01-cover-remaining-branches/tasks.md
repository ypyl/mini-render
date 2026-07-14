## 1. Store branches

- [x] 1.1 Add test: `immutableSetByPath` with null root coerces to `{}`
- [x] 1.2 Add test: subscribing two listeners to the same store path notifies both

## 2. Hooks branch

- [x] 2.1 Add test: `useEmit` with action "setState" not in handlers skips warning (need wrapper without builtins for this test)

## 3. Contexts branch

- [x] 3.1 Add test: ActionProvider without `builtins` prop (undefined default)

## 4. Renderer branch

- [x] 4.1 Add test: RepeatChildren with items missing the key field falls back to index

## 5. Thresholds

- [x] 5.1 Update `vitest.config.ts` branches threshold to 90

## 6. Verify

- [x] 6.1 Run `npm test` — all tests pass
- [x] 6.2 Run `npm run coverage` — branches ≥ 90%
- [x] 6.3 Run `npx tsc --noEmit` — clean
