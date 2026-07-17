## Why

Demo case pages currently use the generic `Card` component as their root container, which only renders a title. When viewing a demo case (e.g., /basic, /form), there's no inline description explaining what the case demonstrates — you have to go back to the home page to read the summary. Creating a dedicated `CaseContainer` component (with title + description) gives each demo case a self-documenting wrapper without changing the generic `Card`.

## What Changes

- Create a new `CaseContainer` component — wraps children in a Paper with a title and description (dimmed text below title)
- Update all demo specs (basic, form, actions, switch, large) to use `type: "CaseContainer"` instead of `type: "Card"` as their root element, with both `title` and `description` props
- Update all demo registries to import and register `CaseContainer` instead of `Card` (where Card was only used as the root wrapper)
- `Card` component remains unchanged — it stays a generic titled container for non-root use (e.g., Switch demo's inner cards)

## Capabilities

### New Capabilities
- `case-container`: A new `CaseContainer` component that renders a Paper with a title, a dimmed description, and children — semantically marking it as the main wrapper for a demo case

### Modified Capabilities
<!-- None — no existing spec behavior changes, purely additive -->

## Impact

- **New component**: `demo/src/components/CaseContainer.tsx`
- **Specs**: `demo/src/cases/*/spec.json` (basic, form, actions, switch) — change root `type` from `"Card"` to `"CaseContainer"`, add `description` prop
- **Spec builder**: `demo/src/cases/large/buildSpec.ts` — change root `type` from `"Card"` to `"CaseContainer"`, add `description` prop
- **Registries**: `demo/src/cases/*/registry.ts` — replace `Card` import/registration with `CaseContainer` for the 5 cases that use Card only as root wrapper
