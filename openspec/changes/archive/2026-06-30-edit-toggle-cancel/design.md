## Context

The demo currently uses a single `toggleEdit` handler that flips `/editingSection`, and a static `ActionButton` labeled "Edit" that dispatches it. In edit mode, the button still says "Edit" — there's no visual indication of mode and no way to cancel edits. The user wants view mode → [Edit], edit mode → [Save] [Cancel], with Cancel reverting changes.

## Goals / Non-Goals

**Goals:**
- Replace `toggleEdit` with `startEdit`, `saveEdit`, `cancelEdit` handlers.
- `startEdit` snapshots the entire store state to `/_snapshot` before setting `editingSection = true`.
- `cancelEdit` restores state from `/_snapshot` and sets `editingSection = false`.
- `saveEdit` clears `/_snapshot` and sets `editingSection = false`.
- Create a reusable `EditToggle` component that subscribes to `/editingSection` and renders the correct button(s).
- Replace all `toggleBtn` elements across all 4 toggle-using tabs (Form, Actions, Large, Table) with `EditToggle`.
- Preserve granular re-render: cancel restore only re-renders cells whose values actually changed.

**Non-Goals:**
- No changes to BoundField — it still reads `/editingSection`.
- No changes to mini-render library core.
- No tab-switch handling (auto-save if tab switched while editing is acceptable — the snapshot is simply stale).

## Decisions

**Decision 1: Snapshot the full state object, not per-path**

`startEdit` calls `getState()` (returns the full state object) and deep-clones it to `/_snapshot`. `cancelEdit` iterates keys of the snapshot and calls `setState` for each. This is simpler than tracking individual changed paths and handles nested state correctly.

**Decision 2: `EditToggle` emits three events: edit, save, cancel**

The component uses `useValue("/editingSection")` to decide which buttons to render. Each button calls `emit()` with a distinct event name. The spec maps these to handlers:

```
on: { edit: { action: "startEdit" }, save: { action: "saveEdit" }, cancel: { action: "cancelEdit" } }
```

**Decision 3: Save and Cancel buttons render as a Mantine Group**

`<Group gap="xs"><Button>Save</Button><Button variant="outline">Cancel</Button></Group>` — the Cancel button uses outline variant to visually distinguish it as a secondary action.

**Decision 4: Deep clone via structuredClone**

`structuredClone(getState())` produces a value-independent snapshot. This is a native API (available in all modern browsers and Node 17+). No dependency needed.

**Decision 5: Restore uses setState per snapshot key, not wholesale replace**

Iterating `Object.entries(snapshot)` and calling `store.set(key, value)` for each key means each path gets its own granular notification. If a cell's value didn't change between snapshot and current, `setState` with the same value is a no-op in the store (equality check) — the cell doesn't re-render.

## Risks / Trade-offs

- **Risk: `structuredClone` fails on non-cloneable values (functions, Symbols)** — the demo store only contains plain serializable data (`{ items: [...], editingSection: bool, savedAt: string, ... }`). No functions or Symbols.
  - *Mitigation:* Not a concern for this demo. If the user adds non-cloneable values, `structuredClone` throws — add a try/catch or document the limitation.

- **Risk: `/_snapshot` persisting if user switches tabs mid-edit** — the snapshot stays in the store until overwritten or until `saveEdit`/`cancelEdit` clears it. If never cleared, it's just dead data.
  - *Mitigation:* Acceptable. The next `startEdit` overwrites it. Could add cleanup on tab switch but that's out of scope.
