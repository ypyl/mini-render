// form/handlers.ts — handlers for the bound editable fields demo.
import type { Handlers } from "thin-render";

export const handlers: Handlers = {
  startEdit: (_params, { getState, setState }) => {
    setState("/_snapshot", structuredClone(getState()));
    setState("/editingSection", true);
  },
  saveEdit: (_params, { setState }) => {
    setState("/_snapshot", undefined);
    setState("/editingSection", false);
  },
  cancelEdit: (_params, { getState, setState }) => {
    const s = getState() as Record<string, unknown>;
    const snap = (s._snapshot as Record<string, unknown>) ?? {};
    // ponytail: union of snapshot + current keys so newly-created fields reset to undefined
    const snapKeys = Object.keys(snap);
    const currentKeys = Object.keys(s).filter(k => k !== "_snapshot" && k !== "editingSection");
    for (const key of [...new Set([...snapKeys, ...currentKeys])]) {
      setState(`/${key}`, snap[key]);
    }
    setState("/_snapshot", undefined);
    setState("/editingSection", false);
  },
};
