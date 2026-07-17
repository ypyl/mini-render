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
