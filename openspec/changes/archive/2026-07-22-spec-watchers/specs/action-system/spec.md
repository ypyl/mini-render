## ADDED Requirements

### Requirement: Actions can be triggered by store changes via watch
In addition to `emit(eventName)` via `on` bindings, actions SHALL be triggerable by store mutations via `watch` bindings. When a watched store path changes, the configured action bindings SHALL be resolved and their handlers invoked exactly as if triggered by `emit` — same param resolution, same `{ getState, setState }` API, same handler function signature. The handler SHALL NOT be able to distinguish whether it was triggered by `emit` or by `watch`.

#### Scenario: Watch-triggered handler receives same API as emit-triggered
- **WHEN** a handler is invoked via `watch` on `/form/name`
- **THEN** it receives `(resolvedParams, { getState, setState })` — identical to being invoked via `emit("click")`

#### Scenario: Built-in setState works in watch bindings
- **WHEN** an element has `watch: { "/country": [{ action: "setState", params: { path: "/city", value: "" } }] }` and `/country` changes from `"US"` to `"CA"`
- **THEN** `/city` is set to `""` without any user-registered handler
