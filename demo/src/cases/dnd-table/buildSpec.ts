// dnd-table/buildSpec.ts — Drag & Drop table demo spec.
import type { Spec } from "mini-render";

export function buildDndTableSpec(): Spec {
  return {
    root: "container",
    elements: {
      container: {
        type: "CaseContainer",
        props: {
          title: "Drag & Drop Table",
          description: "Reorder rows via drag-and-drop, add new rows, and remove existing ones — powered by @dnd-kit with the store as source of truth.",
          technicalDescription: "Spec\nCaseContainer → DndTable(path: \"/items\", columns: [\"Name\", \"Email\"])\nState\n{ items: Array<{ name, email }>, editingSection: true }\nFeatures\n• @dnd-kit — drag-and-drop via DndContext + useSortable\n• Edit/Save/Cancel — snapshot-based editable cells with undo\n• Configurable columns — header and cells driven by columns prop\n• useValue/useSetValue — per-cell store bindings\n• Internal iteration — @dnd-kit requires same-component render pass",
        },
        children: ["table"],
      },
      table: {
        type: "DndTable",
        props: { path: "/items", columns: ["Name", "Email"], idKey: "name" },
      },
    },
  };
}
