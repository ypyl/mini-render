## 1. Project scaffold

- [x] 1.1 Create `mini-render/` directory at repo root with `package.json` (name `mini-render`, type module, React 19 + TypeScript peer/dev deps, zero runtime deps)
- [x] 1.2 Add `tsconfig.json` (strict, JSX react-jsx, module ESNext, target ES2022) and `vite.config.ts` for the demo
- [x] 1.3 Add module file stubs: `src/spec.ts`, `src/store.ts`, `src/contexts.ts`, `src/hooks.ts`, `src/renderer.tsx`, `src/index.ts`
- [x] 1.4 Verify `npx tsc --noEmit` passes on empty stubs

## 2. Spec schema (specs/spec-schema)

- [x] 2.1 In `src/spec.ts`, define `UIElement` (`type`, `props?`, `children?`, `on?`, `repeat?`), `ActionBinding` (`action`, `params?`), `RepeatConfig` (`path`, `key?`), and `Spec` (`root`, `elements`)
- [x] 2.2 Confirm types are exported from `src/index.ts`
- [x] 2.3 Verify no $-expression resolution is implied (types use `Record<string, unknown>` for `props`)

## 3. Path-based store (specs/path-based-store)

- [x] 3.1 Implement `getByPath(state, path)` returning nested value or undefined
- [x] 3.2 Implement `immutableSetByPath(state, path, value)` with structural sharing (clone only objects/arrays along path)
- [x] 3.3 Implement `createStore(initial)` returning `{ get, set, subscribe, getState, getServerSnapshot }`
- [x] 3.4 Implement per-path `subscribe(path, listener)` returning unsubscribe; maintain a `Map<pathString, Set<listener>>`
- [x] 3.5 On `set(path, value)`, skip when strictly equal (no-op), else immutable-set + notify listeners whose path equals, is ancestor of, or is descendant of the set path
- [x] 3.6 Write unit tests: exact match, ancestor match, descendant match, unrelated non-match, no-op no-notify, structural sharing of sibling branch identity

## 4. Contexts (specs/renderer, specs/action-system)

- [x] 4.1 Create `StoreContext` carrying the stable store reference (never the state) with a `StoreProvider` that wraps children
- [x] 4.2 Create `ActionContext` carrying `{ handlers, getState, setState }` with an `ActionProvider` that takes `handlers` and `store` props, memoizing the context value on `[handlers, store]`
- [x] 4.3 Verify both context values are referentially stable across renders when handlers/store are stable

## 5. Hooks (specs/path-based-store)

- [x] 5.1 Implement `useStore()` returning the stable store from `StoreContext` (throws if missing provider)
- [x] 5.2 Implement `useValue<T>(path)` using `useSyncExternalStore(subscribeFor(path), getFor(path), getServerSnapshot)` so re-render happens only on that path's value change
- [x] 5.3 Implement `useSetValue(path)` returning a stable callback `(v) => store.set(path, v)`
- [x] 5.4 Implement `useBound<T>(path)` returning `[useValue<T>(path), useSetValue(path)]`
- [x] 5.5 Add tests: `useValue` re-renders only on subscribed path change; unaffected sibling path change does not re-render

## 6. Action system (specs/action-system)

- [x] 6.1 Implement `resolveParams(params, getState)` replacing `{ $state: "<path>" }` values with `store.get(path)`
- [x] 6.2 Register a built-in `setState` handler (`{ path, value } => store.set(path, value)`) in the ActionProvider
- [x] 6.3 Implement `useActions()` returning a stable `emit(eventName)` closure that resolves `element.on[eventName]` (single or array) and invokes handlers sequentially with `(resolvedParams, { getState, setState })`
- [x] 6.4 Ensure `emit` resolves `$state` params at dispatch time (read, not subscribe)
- [x] 6.5 On unknown action name (other than `setState`), log a warning without throwing
- [x] 6.6 Tests: `setState` built-in writes a path; `$state` param resolved at dispatch; async handler's late setState still flows; handler that does nothing causes no re-render; ActionContext value stable on unrelated state change

## 7. Renderer (specs/renderer)

- [x] 7.1 Implement `ElementRenderer` as `React.memo`-ized; props `{ elementKey, spec, registry, loading? }`; resolves `element` from `spec.elements[elementKey]`
- [x] 7.2 In `ElementRenderer`, build the stable `emit` via `useActions()` (resolves against `element.on`); render `<Component element={element} emit={emit}>{children}</Component>`
- [x] 7.3 Render children by mapping `children` keys to `<ElementRenderer>` keyed by spec key; skip missing children with a console warning (when not loading)
- [x] 7.4 `ElementRenderer` MUST NOT call `useValue`/`subscribe` — verify it reads no store value
- [x] 7.5 Implement `RepeatChildren` calling `useValue(repeat.path)` once; map over the array with `repeat.key` (or index), wrapping each child group in a provider exposing `${path}/${index}` base context for descendant bindings
- [x] 7.6 Implement top-level `<Renderer>` that wires `StoreProvider` + `ActionProvider` (from `store`/`handlers` props) and renders the root `ElementRenderer`
- [x] 7.7 Tests: unknown type renders nothing + warns; missing root renders nothing; children preserve spec order; repeat renders N children; state change does NOT re-render a static `ElementRenderer`; editing one cell re-renders only that cell (others untouched)

## 8. Public API & registry helper (specs/binding-components)

- [x] 8.1 Export `Renderer`, `useValue`, `useSetValue`, `useBound`, `useActions`, `createStore`, `StoreProvider`, `ActionProvider`, and spec types from `src/index.ts`
- [x] 8.2 (Optional) Add a typed `defineRegistry(map)` passthrough helper; keep plain `Record<string, ComponentType>` as the canonical registry type
- [x] 8.3 Export `ComponentProps` type (`{ element, children?, emit }`)

## 9. Demo app (binding-components validation)

- [x] 9.1 Create `mini-render/demo/` Vite + React app (Mantine presentational components)
- [x] 9.2 Add presentational components: `TextInput`, `Button`, `Card` (plain props only, store-independent)
- [x] 9.3 Add binding components `BoundField` (`useBound(element.props.bind)`) and `ActionButton` (`onClick={() => emit("click")}`)
- [x] 9.4 Build a static "basic" spec example rendering text + a card
- [x] 9.5 Build an editable form example with BoundField instances wired to distinct paths
- [x] 9.6 Build an action example with an ActionButton wired to a `saveDoc` handler that sets `/savedAt`
- [x] 9.7 Build a 1000-row editable table example using `repeat` with per-cell `useBound` on `${path}/${index}/${field}`

## 10. Verification

- [x] 10.1 `npx tsc --noEmit` passes for both `mini-render` source and demo
- [x] 10.2 Demo builds with `npm run build` (Vite production build)
- [x] 10.3 Run the demo with React DevTools Profiler (or React Scan): editing one table cell shows exactly one component re-render; the other 999 rows do not re-render
- [x] 10.4 Editing one form field re-renders only that `BoundField`
- [x] 10.5 Clicking the ActionButton invokes the `saveDoc` handler and re-renders only subscribers on `/savedAt`
- [x] 10.6 Document the demo's expected perf behavior in a short README under `mini-render/demo/README.md`