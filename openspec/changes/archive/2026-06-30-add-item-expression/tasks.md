## 1. Repeat scope index exposure

## 1. Repeat scope index exposure

- [x] 1.1 Add `RepeatIndexContext` and `RepeatIndexProvider` in `src/renderer.tsx`
- [x] 1.2 Update `RepeatScope` to pass both `path` and `index` via the two contexts
- [x] 1.3 Implement and export `useRepeatIndex()` hook
- [x] 1.4 Update `RepeatChildren` to pass `index` to `RepeatScope`

## 2. $item / $index resolution in resolveParams

- [x] 2.1 Extend `resolveParams` signature to accept `repeatBasePath: string` and `repeatIndex: number | undefined`
- [x] 2.2 Add `$item` resolution: `{ $item: "<field>" }` → `${basePath}/${field}`; `{ $item: "" }` → `basePath`
- [x] 2.3 Add `$index` resolution: `{ $index: boolean }` → `repeatIndex`
- [x] 2.4 When no repeat scope, `$item` and `$index` resolve to `undefined`
- [x] 2.5 Write unit tests in `src-test/actions.test.ts`: $item with field, $item empty, $index, outside repeat, mixed with $state

## 3. useEmit captures repeat scope

- [x] 3.1 In `useEmit`, call `useRepeatPath()` and `useRepeatIndex()` to capture scope
- [x] 3.2 Pass `repeatPath` and `repeatIndex` into `useMemo` dependency array
- [x] 3.3 Pass captured values to `resolveParams` call inside `emit()`

## 4. useItemPath convenience hook

- [x] 4.1 Implement `useItemPath(expr)` in `src/hooks.ts`: string → passthrough; `{ $item }` → `${base}/${field}`; no scope → undefined
- [x] 4.2 Export `useItemPath` from `src/index.ts`

## 5. Public API exports

- [x] 5.1 Export `useRepeatIndex` from `src/renderer.tsx` (replaces internal-only, make public)
- [x] 5.2 Export `useItemPath` from `src/index.ts`
- [x] 5.3 Verify `npx tsc --noEmit` passes

## 6. Demo: per-row delete in Large table

- [x] 6.1 Add `removeItem` handler to demo: reads `/items`, filters by index, writes back
- [x] 6.2 Add delete `ActionButton` to `row` element in `buildLargeSpec` with `on: { click: { action: "removeItem", params: { index: { $index: true } } } }`
- [x] 6.3 Add delete button element key to row's children array

## 7. Verification

- [x] 7.1 Run `npm test` — all existing 14 tests + new $item/$index tests pass
- [x] 7.2 `npx tsc --noEmit` passes for library and demo
- [x] 7.3 Demo builds with `npm run build`
- [x] 7.4 Verify: Large tab — each row has a Delete button
- [x] 7.5 Verify: clicking Delete on row 5 removes that row; remaining rows re-index; no duplicate-key warnings