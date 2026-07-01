## 1. Replace handlers

- [x] 1.1 Remove `toggleEdit` handler from the `handlers` map
- [x] 1.2 Add `startEdit` handler — deep-clones `getState()` to `/_snapshot`, sets `editingSection` to `true`
- [x] 1.3 Add `saveEdit` handler — clears `/_snapshot`, sets `editingSection` to `false`
- [x] 1.4 Add `cancelEdit` handler — restores all `/_snapshot` keys via `setState`, clears `/_snapshot`, sets `editingSection` to `false`

## 2. Create EditToggle component

- [x] 2.1 Create `EditToggle` component — subscribes to `/editingSection`, renders single "Edit" button in view mode, renders "Save" + "Cancel" buttons (Group) in edit mode, uses `emit("edit"/"save"/"cancel")`
- [x] 2.2 Add `EditToggle` to the registry map

## 3. Replace spec elements across all tabs

- [x] 3.1 Replace `toggleBtn` in `buildLargeSpec()` with `EditToggle` element mapping `edit`/`save`/`cancel` events to the new handlers
- [x] 3.2 Replace `toggleBtn` in `buildTableSpec()` with `EditToggle` element
- [x] 3.3 Replace `toggleBtn` in `formSpec` with `EditToggle` element
- [x] 3.4 Replace `toggleBtn` in `actionSpec` with `EditToggle` element

## 4. Verify

- [x] 4.1 Run `npx tsc --noEmit` in demo to confirm TypeScript compiles
- [x] 4.2 Run `npm test` to confirm all 20 existing tests still pass
