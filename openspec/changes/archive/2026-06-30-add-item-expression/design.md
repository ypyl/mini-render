## Context

mini-render's `useEmit` resolves `$state` references in action params at dispatch time (reads store, no subscription). Inside a `repeat`, components can use `useRepeatPath()` to get the current item's base path (e.g., `/items/5`). However, action params cannot reference this path — `emit("click")` dispatches with static params only. A delete-in-repeat handler has no way to know which row triggered it without workarounds.

## Goals / Non-Goals

**Goals:**
- `resolveParams` resolves `{ $item: "<field>" }` to the absolute state path `${repeatBasePath}/${field}` at dispatch time.
- `{ $item: "" }` resolves to the repeat base path itself (e.g., `/items/5`).
- `{ $index: true }` resolves to the numeric repeat index.
- Resolution is pure string concatenation — no store read, no subscription, no re-render.
- Provide a `useItemPath(expr)` convenience hook for components that want `$item` resolution in props.

**Non-Goals:**
- `$item` resolution in the renderer (ElementRenderer). Leaves component props untouched.
- Backward-incompatible changes to the `ComponentProps` interface or the spec schema.
- `$item` in visibility conditions (no visibility system in mini-render).

## Decisions

### Decision 1: `$item` resolved at dispatch time, not at render time
`useEmit` already calls `useRepeatPath()` and `resolveParams` is called inside `emit()`. Adding `$item` handling to `resolveParams` means it's resolved when the user clicks — a read-on-demand pattern, identical to `$state`. No subscription, no renderer-level changes.

**Alternative considered:** Resolve `$item` in ElementRenderer and pass resolved paths to components. Rejected — adds subscription to ElementRenderer (must read repeat context), defeats memo, reintroduces cascading re-render.

### Decision 2: RepeatScope exposes both path and index
Currently `RepeatPathContext` holds only the path string. Add `RepeatIndexContext` holding the numeric index. `useRepeatIndex()` reads it. This enables `{ $index: true }` in action params and is useful for display (row numbers).

**Alternative considered:** Extract index from the path string (`parseInt(path.split("/").pop())`). Rejected — fragile if path format changes, and the index is already known at construction time.

### Decision 3: `useEmit` depends on repeat scope in useMemo
`useEmit` calls `useRepeatPath()` and `useRepeatIndex()`. These are added to the `useMemo` dependency array. For an element at a fixed position in the repeat, the path and index are static (`/items/5` never changes for a given element instance). The memo stays stable. If the array is reordered and the element ends up at a different index, the memo recomputes — correct behavior.

**Risk:** If every element in a repeat calls `useEmit`, each captures its own scope (correct). No shared mutable state.

### Decision 4: `useItemPath` returns unresolved expression when no repeat scope
If called outside a repeat, `useItemPath({ $item: "x" })` returns `undefined`. This is a nop — the component handles the undefined case (e.g., renders nothing). This mirrors json-render's behavior.

## Risks / Trade-offs

- **[useMemo dependency on repeatPath]** → If the repeat base path changes for an element (array reorder), the memo invalidates and `emit` is rebuilt. Acceptable — reorders are rare operations and re-building a closure is cheap.
- **[`$item` only in action params, not props]** → Spec authors porting from json-render may expect `$item` in props. Mitigation: provide `useItemPath()` hook for components; document the pattern.
- **[Index starts at 0]** → Matches JavaScript array indexing. No off-by-one risk.
- **[No `$item` in `useBound`/`useValue` paths]** → Components must still manually concatenate paths with `useRepeatPath()`. This is intentional — the hook-level subscription model requires an actual path string.