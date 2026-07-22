## Context

The `watch` feature on `UIElement` enables store-change-triggered actions. The simplest demo of this is live validation: as the user types in a field, a watcher fires a validation handler, which writes an error message to the store. An error display component reads the error path and shows/hides accordingly. This pattern needs no EditToggle — the field is always editable and validation runs on every keystroke.

## Goals / Non-Goals

**Goals:**
- Create a reusable `ErrorDisplay` component that reads a store path and conditionally renders red text
- Create a `/watch-validation` demo case with one BoundField (Name), a watch binding for validation, and an ErrorDisplay for the error
- Validation rule: name must be at least 3 characters

**Non-Goals:**
- Multiple fields or complex validation rules
- Debouncing (store writes are already optimized — no re-render from watch itself)
- Integration with the edit/save/cancel pattern

## Decisions

**Decision 1: ErrorDisplay as a separate component**
Reading a store path and conditionally showing an error is a pattern worth reusing. The component takes `path` and shows `<Text c="red">` when the value is a non-empty string. Alternative considered: inline error in BoundField — couples display to input, less reusable.

**Decision 2: BoundField always editable (no EditToggle)**
The demo focuses on the watch mechanism, not the edit lifecycle. Keeping the field always editable simplifies the spec. Alternative considered: adding EditToggle — would distract from the watch story.

**Decision 3: Watch on the BoundField element itself**
The `watch` is declared on the BoundField element that owns the path being watched. This is the natural placement — the element that causes the change also declares what should happen on change. The handler writes to a different path (`/errors/name`) read by ErrorDisplay. Alternative considered: watch on a separate element — less intuitive placement.

## Risks / Trade-offs

- **Watch fires on every keystroke**: Writing to `/errors/name` on every change triggers ErrorDisplay to re-render. This is correct behavior but worth noting that watch dispatch itself causes no re-render — only the subsequent `setState` in the handler does.
