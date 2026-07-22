## ADDED Requirements

### Requirement: DndTable supports edit/save/cancel toggle
DndTable SHALL support an edit/save/cancel lifecycle via Edit/Save/Cancel buttons rendered above the table. The store SHALL track editing state via `/editingSection`. On edit, DndTable SHALL snapshot the current items array into `/_snapshot/items` for cancel support. On save, the snapshot SHALL be cleared and editing disabled. On cancel, items SHALL be restored from `/_snapshot/items` and editing disabled. When `/editingSection` is true, SortableRow cells SHALL render as editable `TextInput` elements that write changes to the store at per-cell paths.

DndTable SHALL read the initial items array from the store ONCE on mount (via `getByPath` in a `useState` lazy initializer). It SHALL NOT subscribe to the items path — subscribing causes structural sharing to create a new array reference on every cell edit, triggering DndTable re-renders that reset TextInput cursor positions.

#### Scenario: Edit button enables cell editing
- **WHEN** the Edit button is clicked
- **THEN** the buttons change to "Save" / "Cancel"
- **AND** all cell inputs become editable (borders visible, values changeable)
- **AND** the current items array is snapshotted to `/_snapshot/items`

#### Scenario: Editing a cell updates the store
- **WHEN** editing is enabled and the user types "NewName" into the Name cell of the first row
- **THEN** the store at `/items/0/name` is updated to "NewName"

#### Scenario: Save commits changes
- **WHEN** the user has edited cells and clicks "Save"
- **THEN** the snapshot at `/_snapshot/items` is cleared and editing is disabled
- **AND** cell inputs return to read-only displaying the edited values

#### Scenario: Cancel reverts all changes
- **WHEN** the user has edited cells and clicks "Cancel"
- **THEN** all cell values revert to their pre-edit state (restored from `/_snapshot/items`)
- **AND** editing is disabled
- **AND** the snapshot is cleared

#### Scenario: Cursor does not jump during editing
- **WHEN** a user types into a TextInput cell
- **THEN** the cursor position is preserved (DndTable does not re-render because it does not subscribe to the items array)

### Requirement: SortableRow supports editable cells
SortableRow SHALL accept `editing` and `path` props from DndTable. When `editing` is true, cells SHALL render as editable `TextInput` elements bound to the store via `useValue`/`useSetValue` at computed per-cell paths (`${path}/${index}/${field}`). When `editing` is false, cells SHALL render as read-only `TextInput` with variant `unstyled`.

#### Scenario: Editable cells write to store
- **WHEN** SortableRow renders with `editing: true` at index 0 with `path: "/items"` and the user changes the "name" field
- **THEN** the store at `/items/0/name` is updated

#### Scenario: Read-only cells do not write to store
- **WHEN** SortableRow renders with `editing: false`
- **THEN** cell inputs are read-only and user cannot modify values
