## 1. Type definition

- [x] 1.1 Add optional `watch` field to `UIElement` interface in `src/spec.ts` — `watch?: Record<string, ActionBinding[]>`

## 2. Renderer — watch handling

- [x] 2.1 Add `useEffect` in `_ElementRenderer` to subscribe to watched paths via `store.subscribe` — on change, resolve params and invoke handlers; clean up on unmount

## 3. Tests

- [x] 3.1 Add test: watch fires handler when watched path mutates
- [x] 3.2 Add test: watch does not fire when unrelated path mutates
- [x] 3.3 Add test: watch unsubscribes on unmount
- [x] 3.4 Add test: multiple actions per path fire in order
- [x] 3.5 Add test: built-in setState works in watch bindings
- [x] 3.6 Verify all existing tests still pass (82/82)

## 4. Verification

- [x] 4.1 Run `npm test` to verify all tests pass
- [x] 4.2 Run `npm run coverage` to verify 100% coverage is maintained
- [x] 4.3 Run `npm run build` to verify library compiles
