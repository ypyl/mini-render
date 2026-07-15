// large/buildSpec.ts — builds the 1000-row repeated cards spec.
import type { Spec } from "mini-render";

export function buildLargeSpec(itemCount: number): Spec {
  return {
    root: "root",
    elements: {
      root: {
        type: "Card",
        props: { title: `${itemCount}-Row Editable Table (edit any cell)` },
        children: ["toggleBtn", "list"],
      },
      toggleBtn: {
        type: "EditToggle",
        on: { edit: { action: "startEdit" }, save: { action: "saveEdit" }, cancel: { action: "cancelEdit" } },
      },
      list: {
        type: "StackRow",
        props: { gap: "md" },
        repeat: { path: "/items" },
        children: ["row"],
      },
      row: {
        type: "FieldsetRow",
        props: {},
        children: ["cellName", "cellEmail", "deleteBtn"],
      },
      deleteBtn: {
        type: "ActionButton",
        props: { label: "✕" },
        on: { click: { action: "removeItem", params: { index: { $index: true } } } },
      },
      cellName: {
        type: "BoundField",
        props: { bind: "name", label: "Name" },
      },
      cellEmail: {
        type: "BoundField",
        props: { bind: "email", label: "Email" },
      },
    },
  };
}
