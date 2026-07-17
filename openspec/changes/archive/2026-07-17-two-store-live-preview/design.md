## Context

All existing demos use a single `<Renderer>` with a single store. Real applications frequently have multiple independent state domains — settings vs preview, draft vs published — bridged by explicit apply/save actions. This demo introduces that pattern with two `<Renderer>` instances side-by-side, each owning its own store, with a handler that closes over both stores to copy state from one to the other.

## Goals / Non-Goals

**Goals:**
- Create `SelectField` — an always-writable dropdown component reading/writing a store path
- Create `PreviewBox` — reads `/preview/*` paths and renders a styled display
- Create a demo case with two `<Renderer>` instances in a `SimpleGrid cols={2}` layout
- Left panel: settings with title input, color/size dropdowns, Apply button
- Right panel: preview card that only updates on Apply
- Handler closes over `storeB` to copy state across stores
- Store A initialized with `editingSection: true` so settings fields are always editable

**Non-Goals:**
- No `BoundField` used in the settings panel — all fields are always editable via `editingSection: true`
- No edit toggle — the editingSection is always on
- No bidirectional sync — changes flow A → B only
- No undo/reset — Apply is one-way

## Decisions

### Decision 1: Two separate specs

Each panel has its own spec — `buildSettingsSpec()` and `buildPreviewSpec()`. The case component renders two `<Renderer>`s with separate specs, registries, and stores.

**Why**: Clean separation, each side self-contained. The renderer doesn't support multiple roots in one spec.

### Decision 2: Cross-store via closure

The `applySettings` handler closes over `storeB`:

```ts
const storeB = createStore({ preview: { ... } });
const handlersA = {
  applySettings: (_params, { getState }) => {
    const settings = (getState() as any).settings;
    storeB.set("/preview", structuredClone(settings));
  }
};
```

**Why**: No special API needed. Handlers are plain functions — they can reference any variable in scope. This is the exact pattern real apps use when bridging stores.

### Decision 3: SelectField always editable

`SelectField` uses `useBound` like `BoundField` but ignores the `/editingSection` path. It's always writable.

**Why**: Settings panels shouldn't require an edit toggle. `BoundField` couples editability to a global flag — `SelectField` is purpose-built for always-on forms.

### Decision 4: PreviewBox renders inline styles

`PreviewBox` reads title, color, and font size from `/preview/*` and applies them as inline styles on a `<Paper>`.

**Why**: Visual — the user immediately sees the impact of their settings. No text inputs, no labels — just the styled output.

### Decision 5: Settings fields use BoundField + SelectField

The title uses `BoundField` (always editable via `editingSection: true`). Color and size use `SelectField`.

**Why**: Mixes existing and new components. Title needs free-form text, color/size benefit from constrained options.

## Risks / Trade-offs

- **Two specs diverge unintentionally**: If the settings spec adds a field but the preview doesn't show it, the handler still copies all settings keys. → The preview's `PreviewBox` only reads the fields it cares about; extra keys are harmless.
