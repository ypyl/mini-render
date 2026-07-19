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
          technicalDescription: "Spec\nCaseContainer → PreviewBox\nState\n{ preview: { title, color, size } }\nFeatures\n• Two Renderers — side-by-side independent spec rendering\n• PreviewBox — renders preview content from store state\n• Cross-store communication — updated by settings panel handler",
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
