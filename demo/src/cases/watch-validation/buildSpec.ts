// watch-validation/buildSpec.ts — Watch validation demo spec.
import type { Spec } from "mini-render";

export function buildWatchValidationSpec(): Spec {
  return {
    root: "container",
    elements: {
      container: {
        type: "CaseContainer",
        props: {
          title: "Watch Validation",
          description: "Live validation as you type — the watch directive fires a handler on every store change without re-rendering the element.",
          technicalDescription: "Spec\nCaseContainer → StackRow → [BoundField(bind: \"name\", watch: /name → validateName), ErrorDisplay(path: \"/errors/name\")]\nState\n{ name: \"\", errors: { name: undefined } }\nFeatures\n• watch — store-change-triggered action dispatch via store.subscribe (no re-render)\n• validateName handler — reads /name, writes /errors/name\n• ErrorDisplay — reusable component showing store values conditionally",
        },
        children: ["stack"],
      },
      stack: {
        type: "StackRow",
        props: { gap: "md" },
        children: ["nameField", "nameError"],
      },
      nameField: {
        type: "BoundField",
        props: { bind: "name", label: "Name" },
        watch: {
          "/name": [{ action: "validateName" }],
        },
      },
      nameError: {
        type: "ErrorDisplay",
        props: { path: "/errors/name" },
      },
    },
  };
}
