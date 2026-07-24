// watch-validation/handlers.ts — validation handler for watch demo.
import type { Handlers } from "thin-render";

export const handlers: Handlers = {
  validateName: (_params, { getState, setState }) => {
    const state = getState() as Record<string, unknown>;
    const name = (state.name as string) ?? "";
    if (name.length < 3) {
      setState("/errors/name", "Name must be at least 3 characters");
    } else {
      setState("/errors/name", undefined);
    }
  },
};
