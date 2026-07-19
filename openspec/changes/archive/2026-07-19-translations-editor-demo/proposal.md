## Why

The recently added object-repeat feature has no demo case. A translations editor — iterating over a `translations` object where each key is a locale key and each value is the editable string — is a natural, real-world use case that demonstrates the feature clearly.

## What Changes

- Create a `PathLabel` component — calls `useRepeatPath()`, extracts the last path segment (the object key), and renders it as text. Inside an object repeat with `path: "/translations"`, it displays `"greeting"`, `"farewell"`, etc.
- Create a new demo case `translations` under `demo/src/cases/translations/`:
  - A table of translation keys and editable values, built with `repeat` on a plain object
  - Each row: PathLabel for the key + BoundField for the value
  - Value edits update the store directly via the repeat path
- Add route `/translations` to the demo app router
- Add the new case to the home page `CASES` array
- Update README demo case counts

## Capabilities

### New Capabilities
- `path-label`: A `PathLabel` display component that extracts and renders the last segment of the current repeat path (the key name in object iteration, or the numeric index in array iteration)
- `translations-demo`: A demo case showing `repeat` on a plain object (not an array), demonstrating object key extraction and in-place value editing

### Modified Capabilities
<!-- None -->

## Impact

- **New component**: `demo/src/components/PathLabel.tsx`
- **New demo case**: `demo/src/cases/translations/` — spec builder, registry, case component
- **Modified**: `demo/src/App.tsx`, `demo/src/HomePage.tsx`, `README.md`
