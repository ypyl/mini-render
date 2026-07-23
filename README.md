# micro-render

A ~700-line spec-driven React renderer with **granular per-path re-renders**. Edit one cell in a 1000-row table — only that one cell's component re-renders.

Built as a minimal alternative to `@json-render/react`, dropping AI streaming, Zod validation, directives, devtools, and multi-framework output. Just the rendering core, a path-based store, and an action system.

**[Live demo →](https://ypyl.github.io/micro-render/)**

## Why

`@json-render/react` cascades re-renders across the entire element tree on any state change because three React contexts (`State`, `Visibility`, `Actions`) all subscribe to the full state. Editing one cell in a repeated structure re-renders every component. micro-render fixes this at the architecture level: the renderer subscribes to nothing, and leaf components subscribe to individual store paths via `useSyncExternalStore`.

## Architecture

```
┌──────────┐     ┌──────────────┐      ┌──────────────┐
│   Spec   │ ──▶ │  Renderer    │ ──▶ │  Registry    │
│ (JSON    │     │ (walks tree, │      │ (type →      │
│  tree)   │     │  builds emit)│      │  component)  │
└──────────┘     └──────┬───────┘      └──────────────┘
                        │
                 ┌──────▼───────┐
                 │    Store     │
                 │ (path-based, │
                 │  granular)   │
                 └──────┬───────┘
                        │
                 ┌──────▼───────┐
                 │   Handlers   │
                 │ (registered  │
                 │  at top)     │
                 └──────────────┘
```

### Key design invariants

- **StoreContext** holds the store *reference* — never the state value. It never changes, so `useContext` never triggers re-renders.
- **ActionContext** holds handler map + `getState`/`setState` — also stable. Dispatching an action never re-renders anything by itself.
- **ElementRenderer** is `React.memo`'d and subscribes to no state. It only re-renders when the spec changes.
- **Leaf components** subscribe to individual paths via `useBound()`/`useValue()` — each uses `useSyncExternalStore` with a per-path snapshot. Changing `/items/0/name` re-renders only the component subscribed to that exact path.

## Quick start

```bash
cd demo
npm install
npm run dev     # http://localhost:5173
```

### Basic usage

```tsx
import { Renderer, createStore, type Spec, type Registry } from "micro-render";

// 1. Define a spec (what to render)
const spec: Spec = {
  root: "card",
  elements: {
    card: { type: "Card", props: { title: "Hello" }, children: ["greeting"] },
    greeting: { type: "StaticText", props: { text: "World" } },
  },
};

// 2. Build a registry (type → React component)
const registry: Registry = {
  Card: ({ element, children }) => <Paper>{children}</Paper>,
  StaticText: ({ element }) => <>{element.props?.text}</>,
};

// 3. Create a store (state lives here)
const store = createStore({});

// 4. Render
<Renderer spec={spec} registry={registry} store={store} />
```

### Two-way binding

Components use `useBound(path)` to read and write a single store path:

```tsx
import { useBound } from "micro-render";

function BoundField({ element }: ComponentProps) {
  const [value, setValue] = useBound<string>(String(element.props?.bind));
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

The spec declares the path:

```json
{ "type": "BoundField", "props": { "bind": "/user/name", "label": "Name" } }
```

Changing this input writes to `/user/name` and re-renders *only* this `BoundField`.

### Actions

Register handlers at the top, dispatch from components via `emit`:

```tsx
// Handler (pure function of params + store API)
const handlers = {
  saveDoc: (params, { setState }) => {
    setState("/savedAt", new Date().toISOString());
  },
};

// Spec binds an event to the handler
const spec = {
  root: "btn",
  elements: {
    btn: {
      type: "ActionButton",
      props: { label: "Save" },
      on: { click: { action: "saveDoc" } },
    },
  },
};
```

The `emit("click")` closure is built per-element by the renderer, resolves params on-demand (read, not subscribe), and invokes the handler. Action params support:

- `{ $state: "/path" }` — reads the current value from the store
- `{ $item: "field" }` — resolves to the absolute state path (e.g., `/items/5/field`)
- `{ $item: "" }` — resolves to the repeat base path (e.g., `/items/5`)
- `{ $index: true }` — resolves to the numeric repeat index

Built-in `setState` action is always available: `{ action: "setState", params: { path: "/flag", value: true } }`.

### Repeat (arrays)

```json
{ "type": "Card", "repeat": { "path": "/items" }, "children": ["row"] }
```

Renders `row` once per item in `/items`. Inside a repeat, components can use:
- `useRepeatPath()` — get the current item's base path (`/items/0`, `/items/1`, etc.)
- `useRepeatIndex()` — get the numeric index (`0`, `1`, etc.)
- `useItemPath(expr)` — resolve `{ $item: "field" }` to the full path

For stable React keys across re-renders, provide a `key` field on the repeat config pointing to a unique field on each item (e.g., `"repeat": { "path": "/items", "key": "id" }`). Without it, the array index is used, which breaks on reorder or delete. The unique ID must come from your data — micro-render does not auto-generate IDs.

### Watch (reactive derivations)

```json
{ "type": "BoundField", "props": { "bind": "name" },
  "watch": { "/name": [{ "action": "validateName" }] } }
```

When `/name` changes, the `validateName` handler fires — without causing `ElementRenderer` to re-render. The handler can read any path and write results (e.g. errors to `/errors/name`), which DOES trigger targeted re-renders in subscribing components. Built on `store.subscribe`, not `useValue` — no re-render from the watch itself.

## API

### `<Renderer>`

| Prop | Type | Description |
|------|------|-------------|
| `spec` | `Spec \| null` | The declarative UI tree |
| `registry` | `Registry` | `Record<string, ComponentType<ComponentProps>>` |
| `store` | `Store` | Created by `createStore()`, stable reference |
| `handlers` | `Handlers?` | `Record<string, Handler>` — action handlers |
| `loading` | `boolean?` | Suppresses missing-element warnings during streaming |

### Hooks

| Hook | Signature | Description |
|------|-----------|-------------|
| `useBound<T>(path)` | `[T \| undefined, (v: T) => void]` | Two-way bind to a path |
| `useValue<T>(path)` | `T \| undefined` | Read-only subscription to a path |
| `useSetValue(path)` | `(v: unknown) => void` | Write-only setter for a path |
| `useEmit(on?)` | `(event: string) => void` | Dispatch actions bound to an element's `on` map |
| `useRepeatPath()` | `string` | Current repeat scope's base path |
| `useRepeatIndex()` | `number \| undefined` | Current repeat scope's numeric index |
| `useItemPath(expr)` | `string \| undefined` | Resolve `$item` expression or pass through string |

### Component contract (`ComponentProps`)

```ts
interface ComponentProps {
  element: UIElement;          // current spec element
  children?: ReactNode;       // rendered child elements
  emit: (event: string) => void;  // dispatch bound actions
}
```

### Spec types

```ts
interface Spec {
  root: string;
  elements: Record<string, UIElement>;
}

interface UIElement {
  type: string;
  props?: Record<string, unknown>;
  children?: string[];
  on?: Record<string, ActionBinding | ActionBinding[]>;
  watch?: Record<string, ActionBinding[]>;
  repeat?: { path: string; key?: string };
}

interface ActionBinding {
  action: string;
  params?: Record<string, unknown>;  // $state, $item, $index expressions
}
```

## Tests

```bash
npm test   # 31 pure-logic tests (store + actions), zero framework deps
```

## Demo

The demo app (`demo/`) has twelve self-contained cases:

| Case | What it shows |
|-----|---------------|
| **Basic** | Static spec rendering |
| **Form** | `BoundField` inputs with read-only/editable toggle |
| **Actions** | `ActionButton` + handler writes timestamp to store |
| **Large (1000)** | 1000-row × 2-column editable table via `repeat` — edit one cell, only that cell re-renders. Per-row ✕ delete using `{ $index: true }`. |
| **Table** | 1000-row HTML `<table>` with `<thead>`/`<tbody>` structure built via `repeat` |
| **Switch** | Conditional rendering via `useValue` — three mutually-exclusive status views |
| **Detail Modal** | Click a table row → async handler simulates backend call → detail data loads into a separate store path and displays in a Modal |
| **Two Store** | Two stores, two Renderers side by side — settings panel changes update a live preview only on Apply via a cross-store handler |
| **Feature Flags** | Dashboard with ToggleField, SliderField, Badge, Alert, and SegmentedField — showcases five Mantine-derived components |
| **Translations** | Editable translation strings via repeat on a plain object — demonstrates object key iteration with PathLabel and BoundField |
| **Drag & Drop** | Sortable table with drag-and-drop reordering, add, and remove — powered by @dnd-kit with the store as source of truth |
| **Watch Validation** | Live validation as you type — the watch directive triggers a handler on store change without re-rendering |

## vs json-render

| | json-render | micro-render |
|---|-------------|-------------|
| Re-render scope on cell edit | Full tree (context cascade) | One component |
| AI streaming (JSONL patches) | ✓ | ✗ |
| Zod catalog validation | ✓ | ✗ |
| Directives (`$format`, `$math`) | ✓ | ✗ |
| `$item` / `$index` in action params | ✓ | ✓ |
| Devtools | ✓ | ✗ |
| Vue/Svelte/Solid | ✓ | ✗ |
| Runtime deps | React + Zod | React only |
| LOC (core) | ~3,000 | ~700 |

## Roadmap

- [ ] **`$computed` / `useComputed`** — pure display-only derivations (e.g. `fullName = firstName + " " + lastName`) without writing to the store. A `useComputed(expr)` hook resolves `{ $computed: "fn", args: { ... } }` expressions at render time, following the same pattern as `useItemPath` for `$item`. Components call the hook; the renderer stays expression-free. See [json-render computed values](https://json-render.dev/docs/computed-values) for reference.
