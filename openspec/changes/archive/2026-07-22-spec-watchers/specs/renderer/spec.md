## ADDED Requirements

### Requirement: ElementRenderer subscribes to watched paths and dispatches actions
For each element with a `watch` field, `ElementRenderer` SHALL use `store.subscribe` (not `useValue`) to subscribe to each watched path. On mutation, it SHALL resolve action params via `resolveParams` and invoke the configured handlers with `{ getState, setState }`. Subscriptions SHALL be cleaned up on unmount. The subscribe callback SHALL NOT cause ElementRenderer to re-render.

#### Scenario: Watch fires handler on store mutation
- **WHEN** an element has `watch: { "/form/name": [{ action: "validate" }] }` and the store mutates `/form/name` from `"A"` to `"AB"`
- **THEN** the `validate` handler is invoked with resolved params and `{ getState, setState }`
- **AND** `ElementRenderer` does NOT re-render as a result of the subscription firing

#### Scenario: Watched path change that does not overlap does not fire
- **WHEN** an element has `watch: { "/form/name": [{ action: "validate" }] }` and the store mutates `/form/email`
- **THEN** the `validate` handler is NOT invoked

#### Scenario: Watch unsubscribes on unmount
- **WHEN** an element with a `watch` field unmounts (e.g., via conditional rendering)
- **THEN** subsequent mutations to the watched path do NOT invoke the handler

#### Scenario: Multiple actions per watched path fire in order
- **WHEN** an element has `watch: { "/qty": [{ action: "recalculate" }, { action: "checkInventory" }] }` and `/qty` changes
- **THEN** `recalculate` runs before `checkInventory`
