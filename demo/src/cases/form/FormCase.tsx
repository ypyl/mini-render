// FormCase.tsx — bound editable fields demo.
import { Renderer } from "mini-render";
import formSpec from "./spec.json";
import { store } from "../../store";
import { handlers } from "../../handlers";
import { registry } from "./registry";

export function FormCase() {
  return <Renderer spec={formSpec} registry={registry} store={store} handlers={handlers} />;
}
