// SwitchCase.tsx — conditional rendering demo.
import { Renderer } from "mini-render";
import switchSpec from "./spec.json";
import { store } from "../../store";
import { handlers } from "../../handlers";
import { registry } from "./registry";

export function SwitchCase() {
  return <Renderer spec={switchSpec} registry={registry} store={store} handlers={handlers} />;
}
