// BasicCase.tsx — static spec rendering demo.
import { Renderer } from "mini-render";
import basicSpec from "./spec.json";
import { store } from "../../store";
import { handlers } from "../../handlers";
import { registry } from "./registry";

export function BasicCase() {
  return <Renderer spec={basicSpec} registry={registry} store={store} handlers={handlers} />;
}
