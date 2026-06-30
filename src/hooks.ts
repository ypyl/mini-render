// hooks.ts — store hooks + emit builder.
//
// useValue uses useSyncExternalStore with a per-path subscribe/getSnapshot so
// a component re-renders ONLY when the value at its path changes. This is the
// granular re-render contract. See specs/path-based-store/spec.md and
// specs/action-system/spec.md.
import {
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  StoreContext,
  ActionContext,
  type ActionContextValue,
} from "./contexts";
import type { OnMap, ActionBinding } from "./spec";
import { getByPath } from "./store";

/** Return the stable store; throws if no provider. */
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}

/**
 * Subscribe to a single path. Re-renders only when that path's value changes
 * (by strict equality of the resolved snapshot).
 */
export function useValue<T>(path: string): T | undefined {
  const store = useStore();
  // subscribe returns an unsubscribe fn; React caches it across renders when
  // stable. Bind to `store` + `path`.
  const subscribe = useCallback(
    (listener: () => void) => store.subscribe(path, listener),
    [store, path],
  );
  const getSnapshot = useCallback(() => getByPath(store.getState(), path), [
    store,
    path,
  ]);
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot,
  ) as T | undefined;
}

/** Stable setter for a path. */
export function useSetValue(path: string): (value: unknown) => void {
  const store = useStore();
  return useCallback(
    (value: unknown) => store.set(path, value),
    [store, path],
  );
}

/** Two-way bind: [currentValue, setValue]. */
export function useBound<T>(path: string): [T | undefined, (value: T) => void] {
  const value = useValue<T>(path);
  const setRaw = useSetValue(path);
  const set = useCallback((v: T) => setRaw(v), [setRaw]);
  return [value, set];
}

/** Resolve `{ $state: "<path>" }` references in action params at dispatch time. Recurses into nested objects. */
export function resolveParams(
  params: Record<string, unknown>,
  getState: () => unknown,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(params)) {
    if (
      val !== null &&
      typeof val === "object" &&
      !Array.isArray(val) &&
      typeof (val as Record<string, unknown>).$state === "string"
    ) {
      out[key] = getByPath(getState(), (val as { $state: string }).$state);
    } else if (
      val !== null &&
      typeof val === "object" &&
      !Array.isArray(val)
    ) {
      // Recurse into nested plain objects
      out[key] = resolveParams(
        val as Record<string, unknown>,
        getState,
      );
    } else {
      out[key] = val;
    }
  }
  return out;
}

/**
 * Build a stable `emit(event)` closure dispatching the element's action
 * bindings. `emit` reads state on-demand (never subscribes) and invokes
 * handlers with `{ getState, setState }`. Dispatch itself never re-renders —
 * only subsequent setState calls do.
 */
export function useEmit(on?: OnMap): (event: string) => Promise<void> | void {
  const ctxRaw = useContext(ActionContext);
  if (!ctxRaw) throw new Error("useEmit must be used within an ActionProvider");
  const ctx: ActionContextValue = ctxRaw;

  return useMemo(() => {
    async function emit(eventName: string): Promise<void> {
      if (!on) return;
      const binding = on[eventName];
      if (!binding) return;
      const bindings: ActionBinding[] = Array.isArray(binding)
        ? binding
        : [binding];
      for (const b of bindings) {
        const handler = ctx.handlers[b.action];
        if (!handler) {
          if (b.action !== "setState") {
            console.warn(`mini-render: no handler registered for "${b.action}"`);
          }
          continue;
        }
        const resolved = b.params
          ? resolveParams(b.params, ctx.getState)
          : {};
        await handler(resolved, {
          getState: ctx.getState,
          setState: ctx.setState,
        });
      }
    }
    return emit;
  }, [on, ctx]);
}

export type { ActionContextValue };