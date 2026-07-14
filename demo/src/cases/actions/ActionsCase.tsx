// ActionsCase.tsx — action dispatch demo.
import { Renderer } from "mini-render";
import actionSpec from "./spec.json";
import { store } from "../../store";
import { handlers } from "../../handlers";
import { registry } from "./registry";

export function ActionsCase() {
  return <Renderer spec={actionSpec} registry={registry} store={store} handlers={handlers} />;
}
