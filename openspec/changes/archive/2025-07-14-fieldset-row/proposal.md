## Why

The Large case renders each repeated item as a bare inline row (`Row` component is a fragment), with the delete button appearing first, followed by Name and Email fields all on one line. This looks cramped and visually confusing — fields and actions have no visual grouping or hierarchy.

## What Changes

- Create `FieldsetRow` component — wraps children in Mantine `<Fieldset radius="md">` for visual grouping
- Update Large case spec: change row type from `Row` to `FieldsetRow`, reorder children so fields come before the delete button
- Update Large case registry to include `FieldsetRow` instead of `Row`

## Capabilities

### New Capabilities

None. Demo-only layout improvement.

### Modified Capabilities

None.

## Impact

- `demo/src/components/FieldsetRow.tsx` — new file (~6 lines)
- `demo/src/cases/large/buildSpec.ts` — row type + children order changed
- `demo/src/cases/large/registry.ts` — Row → FieldsetRow
