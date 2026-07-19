## 1. Renderer changes

- [x] 1.1 Update `RepeatChildren` in `src/renderer.tsx` — branch on `Array.isArray(value)` (existing `.map()`) vs `typeof value === "object"` (`Object.entries()`), with empty fragment for non-iterables
- [x] 1.2 Update React key logic for object branch — `repeat.key` defined → `String(value[repeat.key])`, undefined → `objKey`

## 2. Type updates

- [x] 2.1 Widen `RepeatIndexContext` type in `src/hooks.ts` from `number | undefined` to `string | number | undefined`
- [x] 2.2 Update `useRepeatIndex` return type to match

## 3. Tests

- [x] 3.1 Add test: object repeat renders one child per key
- [x] 3.2 Add test: `repeat.key` extracts from value for objects
- [x] 3.3 Add test: fallback to object key when repeat.key missing
- [x] 3.4 Add test: non-iterable renders nothing
- [x] 3.5 Verify existing array repeat tests still pass
