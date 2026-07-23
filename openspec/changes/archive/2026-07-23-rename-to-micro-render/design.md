## Context

The package is currently `@ypyl/micro-render`. `micro-render` (unscoped) was taken on npm, so the scoped version was used as a workaround. The user wants a clean, unscoped name. `micro-render` is available on npm.

## Goals / Non-Goals

**Goals:**
- Rename the package to `micro-render` everywhere
- Keep the existing v0.2.0 published under `@ypyl/micro-render`

**Non-Goals:**
- Unpublish `@ypyl/micro-render` — it stays as an artifact
- Change the GitHub repo name (outside this change scope)

## Decisions

**Decision 1: Find-replace all occurrences, no regex needed**
The string "micro-render" appears in ~15 files (package.json, READMEs, demo imports, openspec config). Simple string replacement covers all cases. Alternative considered: manual file-by-file editing — same result, more work.

**Decision 2: No npm deprecation of the old package**
The old package stays published. Future versions go to `micro-render`. Consumers who installed `@ypyl/micro-render@0.2.0` can keep using it; they'll need to switch to `micro-render` for updates.

## Risks / Trade-offs

- **Breaking change for existing users**: Anyone who installed `@ypyl/micro-render` needs to update imports. Mitigation: no known external users at 0.2.0 — early stage, acceptable.
