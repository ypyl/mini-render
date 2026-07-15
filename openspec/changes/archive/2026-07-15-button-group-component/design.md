## Context

The Switch demo renders three mutually-exclusive status buttons ("Loading", "Loaded", "Error") inside a `Row` component — a transparent Fragment wrapper. The buttons appear as separate, unconnected elements with default browser spacing. Mantine provides `Button.Group` which renders buttons as a visually connected segmented control: adjacent borders collapse, border-radius is adjusted on first/last children, and a subtle separator appears between buttons.

The pattern is well-established in Mantine: wrap `<Button>` children in `<Button.Group>`.

## Goals / Non-Goals

**Goals:**
- Create a `ButtonGroup` registry component wrapping children in Mantine `<Button.Group>`
- Update the Switch demo spec to use `ButtonGroup` instead of `Row` for the button row
- Component is stateless — just a presentational wrapper

**Non-Goals:**
- Configurable orientation (Mantine `Button.Group` defaults to horizontal; vertical not needed)
- Customizable border radius or separator props
- Applying `ButtonGroup` to other demos unless they have the same need

## Decisions

### Decision 1: Separate `ButtonGroup` component vs extending `Row`

**Chosen**: New standalone `ButtonGroup` component.

**Alternatives considered**:
- **Add `group` prop to `Row`**: Violates single-responsibility. `Row` is the transparent Fragment wrapper; adding Mantine-specific grouping would bloat it.
- **Use `StackRow` with zero gap**: Wrong semantics — `StackRow` is for vertical stacking, not horizontal connected groups. Zero gap also doesn't give the segmented-control look (rounded corners, separators).

**Rationale**: Following the `StackRow` precedent — a thin, single-purpose wrapper component. Clean separation: `Row` = Fragment, `StackRow` = vertical Stack, `ButtonGroup` = horizontal button group.

### Decision 2: No props beyond standard ComponentProps

**Chosen**: `ButtonGroup` takes only `{ element, children }` from `ComponentProps`. It ignores `element.props`.

**Rationale**: Mantine `Button.Group` needs no configuration for the common case (connected horizontal buttons). If props like `orientation` or `borderWidth` are needed later, they can be added then. YAGNI.

## Risks / Trade-offs

- **Mantine dependency**: `ButtonGroup` imports from `@mantine/core`, which is already a demo dependency. No new dependency.
- **Single use case**: Only the Switch demo uses it today. That's fine — `FieldsetRow` also started with one consumer. Components earn their place by need, not speculation.

## Open Questions

<!-- None -->
