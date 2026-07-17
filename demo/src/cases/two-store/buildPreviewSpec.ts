// two-store/buildPreviewSpec.ts — preview panel spec.
import type { Spec } from "mini-render";

export function buildPreviewSpec(): Spec {
  return {
    root: "container",
    elements: {
      container: {
        type: "CaseContainer",
        props: {
          title: "Live Preview",
          description: "Preview updates only when you click Apply.",
        },
        children: ["preview"],
      },
      preview: {
        type: "PreviewBox",
        props: {},
        children: [],
      },
    },
  };
}
