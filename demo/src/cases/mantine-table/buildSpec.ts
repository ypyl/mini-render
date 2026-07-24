// mantine-table/buildSpec.ts — builds the Mantine Table spec.
import type { Spec } from "thin-render";

export function buildSpec(): Spec {
  return {
    root: "container",
    elements: {
      container: {
        type: "CaseContainer",
        props: {
          title: "Mantine Table with Pagination",
          description: "Mantine-styled table with pagination — 300 rows, 10 per page. Pagination state lives in the store at /page.",
          technicalDescription: "Spec\nCaseContainer → PaginatedTable(path: /items, pageSize: 10)\nState\n{ items: Array<{ id, name, email }> — 300 rows, page: number }\nFeatures\n• Mantine Table with TableData prop — head/body as data, not spec elements\n• Pagination — Mantine Pagination bound to /page via useSetValue\n• Per-path subscriptions — table subscribes to /items and /page independently\n• Windowed rendering — only 10 rows rendered per page, not full dataset",
        },
        children: ["table"],
      },
      table: {
        type: "PaginatedTable",
        props: {
          path: "/items",
          columns: [
            { key: "id", label: "#" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
          ],
        },
      },
    },
  };
}
