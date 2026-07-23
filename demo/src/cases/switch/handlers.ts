// switch/handlers.ts — handlers for the Switch demo.
import type { Handlers } from "micro-render";

export const handlers: Handlers = {
  setStatus: (params, { setState }) => {
    setState("/appStatus", params.status);
  },
};
