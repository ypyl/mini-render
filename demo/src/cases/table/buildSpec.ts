// table/buildSpec.ts — builds the HTML table spec with repeat.
import type { Spec } from "micro-render";

export function buildTableSpec(itemCount: number): Spec {
  return {
    root: "container",
    elements: {
      container: {
        type: "CaseContainer",
        props: {
          title: `${itemCount}-Row HTML Table`,
          description: "1,000-row HTML table with <thead>/<tbody> — demonstrates composing semantic HTML via repeat on <tr> elements.",
          technicalDescription: "Spec\nCaseContainer → StackRow → [EditToggle, Table → [THead → Tr → Th×4, TBody(repeat: /items) → Tr → [Td→BoundField×3, Td→ActionButton(\"✕\")]]]\nState\n{ items: Array<{ name, email }> } — 1,000 rows\nFeatures\n• repeat — array iteration composing semantic HTML (THead/TBody/Tr/Td/Th)\n• Spec-driven HTML — full table structure declared in JSON\n• $index — action params for per-row deletion\n• Per-path subscriptions — granular re-renders at scale",
        },
        children: ["table"],
      },
      table: {
        type: "Table",
        props: {},
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
