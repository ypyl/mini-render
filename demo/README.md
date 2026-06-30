# mini-render demo

Demonstrates the `mini-render` library — a ~300 LOC spec-driven React renderer with
**granular per-path re-renders**. Editing one cell in a 1000-row table re-renders
only that one cell.

## Running

```bash
cd mini-render/demo
npm install    # first time
npm run dev    # starts at http://localhost:5173
```

## Tabs

| Tab | What it shows |
|-----|---------------|
| **Basic** | Static spec → renders a paper card with text. No state, no reactivity. |
| **Form** | Two `BoundField` inputs bound to `/name` and `/email`. Edit one — only that field re-renders. |
| **Actions** | `ActionButton` wired to a `saveDoc` handler that sets `/savedAt`. Clicking writes the current timestamp. The `BoundField` at `/savedAt` shows it. Dispatch never re-renders anything by itself — the handler's write triggers the re-render. |
| **Large (1000)** | 1000 rows × 2 columns = 2000 `BoundField` cells, each subscribed to `/items/{index}/{field}` via `repeat`. Editing one cell re-renders exactly one `BoundField` component. The other 1999 stay untouched. |

## Performance verification

1. Open **React DevTools Profiler**.
2. Switch to the **Large (1000)** tab.
3. Start profiling, type in one cell, stop.
4. The flamegraph shows **one** `BoundField` re-render — not 1000.
5. The `RepeatChildren` container re-runs its `.map` (cheap), but `ElementRenderer` wrappers skip (memo'd with stable props).

Or install **React Scan** in the browser to visualize re-renders as colored borders.
