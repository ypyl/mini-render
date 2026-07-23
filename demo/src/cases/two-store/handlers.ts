// two-store/handlers.ts — cross-store handler for the two-store demo.
import type { Handlers } from "micro-render";
import type { Store } from "micro-render";

export function createHandlers(storeB: Store): Handlers {
  return {
    applySettings: (_params, { getState }) => {
      const state = getState() as Record<string, unknown>;
      const settings = state.settings;
      storeB.set("/preview", structuredClone(settings));
    },
  };
}
