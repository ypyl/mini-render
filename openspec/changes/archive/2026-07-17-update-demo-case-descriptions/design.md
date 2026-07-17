## Context

The `Card` component (`demo/src/components/Card.tsx`) is a generic wrapper around Mantine's `<Paper>` with an optional `<Title>`. It's used both as the root container in five demo cases and as inner cards (e.g., the "Loaded"/"Error" cards in the Switch demo). The home page (`HomePage.tsx`) already has per-case descriptions, but those aren't visible when actually viewing a demo case.

Rather than changing the generic `Card`, we create a dedicated `CaseContainer` component that semantically marks the root wrapper of a demo case and always shows both title and description.

## Goals / Non-Goals

**Goals:**
- Create a new `CaseContainer` component with `title` and `description` props
- Render title as `<Title order={4}>` and description below it as `<Text c="dimmed" size="sm">`
- Swap root elements in all five demo specs from `Card` to `CaseContainer`, adding descriptions
- Keep `Card` unchanged for non-root usage (Switch demo inner cards)

**Non-Goals:**
- No modifications to the `Card` component
- No new dependencies, no schema changes
- Not modifying the home page cards (they already have descriptions)

## Decisions

1. **New component over modifying Card**: `CaseContainer` is semantically distinct — it says "this is a demo case wrapper." `Card` stays a generic building block. This avoids polluting Card's API with demo-specific concerns.

2. **Rendering**: Use `<Text c="dimmed" size="sm" mt="xs">` — matches the style already used on home page cards for visual consistency.

3. **Props — `title` required, `description` optional**: Title is always shown. Description only renders when present (though all root demo cases will include one).

4. **Registry changes**: Each demo case's `registry.ts` currently imports `Card`. For cases where Card was only the root wrapper (basic, form, actions, large), we replace it with `CaseContainer`. For the Switch demo, Card is also used for inner cards (`"Loaded"` / `"Error"`), so we keep both `Card` and `CaseContainer` in its registry.

## Risks / Trade-offs

- **Nil** — purely additive, no breaking changes, no behavioral changes to existing functionality.
