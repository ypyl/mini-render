## Why

Each case page currently has no layout container and a raw "← Back" text link. Wrapping pages in Mantine's `Container` centers the content and gives it proper padding, while `Breadcrumbs` provides a cleaner, standard navigation pattern than a bare link.

## What Changes

- Wrap each Case component in `<Container size="md" py="md">` for centered, padded layout
- Replace `← Back` link with `<Breadcrumbs>` showing `Home / CaseName`
- No new dependencies — both components are already in `@mantine/core`

## Capabilities

### New Capabilities

None. Demo-only layout polish.

### Modified Capabilities

None.

## Impact

- `demo/src/cases/basic/BasicCase.tsx`
- `demo/src/cases/form/FormCase.tsx`
- `demo/src/cases/actions/ActionsCase.tsx`
- `demo/src/cases/large/LargeCase.tsx`
- `demo/src/cases/table/TableCase.tsx`
- `demo/src/cases/switch/SwitchCase.tsx`

Each file: add `Container` and `Breadcrumbs` imports, wrap return in `Container`, replace `Link` with `Breadcrumbs`.
