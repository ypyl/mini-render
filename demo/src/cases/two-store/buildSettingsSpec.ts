// two-store/buildSettingsSpec.ts — settings panel spec.
import type { Spec } from "mini-render";

export function buildSettingsSpec(): Spec {
  return {
    root: "container",
    elements: {
      container: {
        type: "CaseContainer",
        props: {
          title: "Settings",
          description: "Change the values below and click Apply to update the preview.",
          technicalDescription: "Spec\nCaseContainer → StackRow → [BoundField(bind: \"settings/title\"), SelectField(bind: \"settings/color\"), SelectField(bind: \"settings/size\"), ActionButton(\"Apply\")]\nState\n{ settings: { title, color, size }, editingSection: true }\nFeatures\n• Multiple stores — two independent createStore instances\n• Cross-store handler — applySettings reads store A, writes store B via storeB.set\n• SelectField — enum-style dropdown binding\n• BoundField — text binding with nested path",
        },
        children: ["fields"],
      },
      fields: {
        type: "StackRow",
        props: { gap: "md" },
        children: ["titleField", "colorField", "sizeField", "applyBtn"],
      },
      titleField: {
        type: "BoundField",
        props: { bind: "settings/title", label: "Title" },
      },
      colorField: {
        type: "SelectField",
        props: {
          bind: "settings/color",
          options: [
            { value: "blue", label: "Blue" },
            { value: "red", label: "Red" },
            { value: "green", label: "Green" },
            { value: "orange", label: "Orange" },
            { value: "violet", label: "Violet" },
          ],
        },
      },
      sizeField: {
        type: "SelectField",
        props: {
          bind: "settings/size",
          options: [
            { value: "16px", label: "Small" },
            { value: "24px", label: "Medium" },
            { value: "32px", label: "Large" },
            { value: "48px", label: "X-Large" },
          ],
        },
      },
      applyBtn: {
        type: "ActionButton",
        props: { label: "Apply Changes" },
        on: { click: { action: "applySettings" } },
      },
    },
  };
}
