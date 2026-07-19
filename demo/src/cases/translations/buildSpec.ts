// translations/buildSpec.ts — Translations editor using object repeat.
import type { Spec } from "mini-render";

export function buildTranslationsSpec(): Spec {
  return {
    root: "container",
    elements: {
      container: {
        type: "CaseContainer",
        props: {
          title: "Translations Editor",
          description: "Each row is a translation key with its editable value — powered by repeat on a plain object (not an array).",
        },
        children: ["rows"],
      },
      rows: {
        type: "StackRow",
        props: { gap: "sm" },
        repeat: { path: "/translations" },
        children: ["row"],
      },
      row: {
        type: "FieldsetRow",
        props: {},
        children: ["keyLabel", "valueField"],
      },
      keyLabel: {
        type: "PathLabel",
        props: {},
      },
      valueField: {
        type: "BoundField",
        props: { bind: "", label: "" },
      },
    },
  };
}
