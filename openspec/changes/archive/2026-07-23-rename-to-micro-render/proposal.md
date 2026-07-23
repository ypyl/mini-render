## Why

The current package name `@ypyl/micro-render` is scoped under a personal npm username. Renaming to `micro-render` (unscoped, available on npm) gives the library a professional, standalone identity without personal branding in the package name.

## What Changes

- Rename `@ypyl/micro-render` → `micro-render` in `package.json` and all import statements
- Update `demo/package.json` dependency reference from `"micro-render": "file:.."` to `"micro-render": "file:.."`
- Update all README references from "micro-render" to "micro-render"
- Update `openspec/config.yaml` context to reflect new name
- **BREAKING**: Existing consumers using `import from "@ypyl/micro-render"` must switch to `import from "micro-render"`

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None — rename only, no behavior changes.

## Impact

- **package.json**: name field change
- **demo/**: all import statements, package.json dependency
- **README.md / demo/README.md**: all occurrences of "micro-render"
- **openspec/config.yaml**: context reference
- **npm registry**: old package `@ypyl/micro-render` remains published; new `micro-render` fires on next version tag
