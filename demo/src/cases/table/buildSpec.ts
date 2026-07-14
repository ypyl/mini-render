// table/buildSpec.ts — builds the HTML table spec with repeat.
import type { Spec } from "mini-render";

export function buildTableSpec(itemCount: number): Spec {
  return {
    root: "table",
    elements: {
      table: {
        type: "Table",
        props: { title: `${itemCount}-Row HTML Table` },
        children: ["toggleBtn", "headerRow", "tableBody"],
      },
      toggleBtn: {
        type: "EditToggle",
        on: { edit: { action: "startEdit" }, save: { action: "saveEdit" }, cancel: { action: "cancelEdit" } },
      },
      headerRow: { type: "Tr", children: ["thName", "thEmail", "thActions"] },
      thName: { type: "Th", props: { text: "Name" } },
      thEmail: { type: "Th", props: { text: "Email" } },
      thActions: { type: "Th", props: { text: "Actions" } },
      tableBody: {
        type: "TBody",
        repeat: { path: "/items" },
        children: ["row"],
      },
      row: {
        type: "Tr",
        children: ["cellName", "cellEmail", "cellActions"],
      },
      cellName: { type: "Td", children: ["nameField"] },
      cellEmail: { type: "Td", children: ["emailField"] },
      cellActions: { type: "Td", children: ["deleteBtn"] },
      nameField: { type: "BoundField", props: { bind: "name", label: "" } },
      emailField: { type: "BoundField", props: { bind: "email", label: "" } },
      deleteBtn: {
        type: "ActionButton",
        props: { label: "✕" },
        on: { click: { action: "removeItem", params: { index: { $index: true } } } },
      },
    },
  };
}
