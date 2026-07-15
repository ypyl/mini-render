## Context

The Large case uses a `Row` component (bare fragment) for each repeated item, rendering `deleteBtn` first, then `cellName` and `cellEmail` inline. This produces cramped, ungrouped rows.

## Goals / Non-Goals

**Goals:**
- Group each repeated item in a visual container (Mantine Fieldset)
- Place fields before the delete button
- Vertical stacking for readability

**Non-Goals:**
- Changing the Table case (it uses HTML `<tr>/<td>` — already well-structured)
- Adding legends or item numbering to fieldsets (fine without for a demo)
- Changing FieldsetRow beyond a simple wrapper

## Decisions

### Decision 1: FieldsetRow wraps children in `<Fieldset radius="md">`

```tsx
import { Fieldset } from "@mantine/core";
import type { ComponentProps } from "mini-render";

export function FieldsetRow({ children }: ComponentProps) {
  return <Fieldset radius="md">{children}</Fieldset>;
}
```

No `legend` prop — items are visually distinct enough with borders alone. Adding "Item 1", "Item 2" for 1000 rows would be noisy.

### Decision 2: Reorder children in spec: fields first, delete last

```diff
"children": [
-  "deleteBtn",
   "cellName",
-  "cellEmail"
+  "cellEmail",
+  "deleteBtn"
]
```

The delete button appears at the bottom of the fieldset, after the fields. This follows the natural reading order: read/scan data first, then act.

### Decision 3: Row component stays in the codebase

`Row` is still used by the Switch case (`cases/switch/spec.json` uses `Row` for the button row). It's a valid demo component — just no longer needed in the Large case.

## Risks / Trade-offs

None. This is a visual improvement with no behavioral changes.
