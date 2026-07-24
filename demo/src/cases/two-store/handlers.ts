// two-store/handlers.ts — cross-store handler for the two-store demo.
import type { Handlers } from "thin-render";
import type { Store } from "thin-render";

export function createHandlers(storeB: Store): Handlers {
  return {
    applySettings: (_params, { getState }) => {
      const state = getState() as Record<string, unknown>;
      const settings = state.settings;
      storeB.set("/preview", structuredClone(settings));
    },
  };
}
