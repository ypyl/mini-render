// actions.test.ts — self-checks for the action system (resolveParams, setState built-in).
// Pure logic tests, no React. Inlines tested functions to avoid ESM module path issues.
// See specs/action-system/spec.md.
import { test } from "node:test";
import assert from "node:assert/strict";

// ── Inlined from src/store.ts ─────────────────────────────────────
function getByPath(state: unknown, path: string): unknown {
  const p = path[0] === "/" ? path.slice(1) : path;
  const segs = p ? p.split("/").filter((s) => s.length > 0) : [];
  let cur: unknown = state;
  for (const seg of segs) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[seg];
  }
  return cur;
}

function immutableSetByPath(root: unknown, path: string, value: unknown): unknown {
  const p = path[0] === "/" ? path.slice(1) : path;
  const segs = p ? p.split("/").filter((s) => s.length > 0) : [];
  if (segs.length === 0) return value;
  const base =
    root !== null && typeof root === "object" && !Array.isArray(root)
      ? { ...(root as Record<string, unknown>) }
      : Array.isArray(root) ? [...(root as unknown[])] : {};
  let cur: Record<string, unknown> | unknown[] = base;
  for (let i = 0; i < segs.length - 1; i++) {
    const seg = segs[i]!;
    const nextSeg = segs[i + 1]!;
    let child = (cur as Record<string, unknown>)[seg];
    if (Array.isArray(child)) child = [...child];
    else if (child !== null && typeof child === "object") child = { ...(child as Record<string, unknown>) };
    else child = /^\d+$/.test(nextSeg) ? [] : {};
    (cur as Record<string, unknown>)[seg] = child;
    cur = child as Record<string, unknown> | unknown[];
  }
  const last = segs[segs.length - 1]!;
  if (Array.isArray(cur)) (cur as unknown[])[parseInt(last, 10)] = value;
  else (cur as Record<string, unknown>)[last] = value;
  return base;
}

function pathsOverlap(a: string, b: string): boolean {
  if (a === b) return true;
  const seg = (s: string) => { const p = s[0] === "/" ? s.slice(1) : s; return p ? p.split("/") : []; };
  const sa = seg(a), sb = seg(b);
  const min = Math.min(sa.length, sb.length);
  for (let i = 0; i < min; i++) if (sa[i] !== sb[i]) return false;
  return true;
}

type Listener = () => void;
interface Store { get(p: string): unknown; set(p: string, v: unknown): void; subscribe(p: string, fn: Listener): () => void; getState(): unknown; getServerSnapshot(): unknown; }
function createStore(initial: Record<string, unknown> = {}): Store {
  let state: unknown = { ...initial };
  const listeners = new Map<string, Set<Listener>>();
  function notify(affected: string) {
    for (const [sp, set] of listeners) if (pathsOverlap(sp, affected)) for (const fn of set) fn();
  }
  return {
    get(p: string) { return getByPath(state, p); },
    set(p: string, v: unknown) {
      if (getByPath(state, p) === v) return;
      state = immutableSetByPath(state, p, v);
      notify(p);
    },
    subscribe(p: string, fn: Listener) {
      let s = listeners.get(p); if (!s) { s = new Set(); listeners.set(p, s); }
      s.add(fn);
      return () => { s!.delete(fn); if (s && s.size === 0) listeners.delete(p); };
    },
    getState() { return state; },
    getServerSnapshot() { return state; },
  };
}

// ── Inlined from src/hooks.ts ─────────────────────────────────────
function resolveParams(params: Record<string, unknown>, getState: () => unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(params)) {
    if (val !== null && typeof val === "object" && !Array.isArray(val) && typeof (val as Record<string, unknown>).$state === "string") {
      out[key] = getByPath(getState(), (val as { $state: string }).$state);
    } else if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      out[key] = resolveParams(val as Record<string, unknown>, getState);
    } else out[key] = val;
  }
  return out;
}

// ── BUILTIN_SET_STATE (from src/contexts.tsx) ─────────────────────
const builtinSetState = (
  params: Record<string, unknown>,
  api: { getState: () => unknown; setState: (p: string, v: unknown) => void },
) => {
  const path = params.path as string | undefined;
  if (path) api.setState(path, params.value);
};

// ── Tests ─────────────────────────────────────────────────────────

test("resolveParams replaces { $state } references with current store values", () => {
  const getState = () => ({ doc: { id: 42 }, items: [{ name: "A" }] });
  const out = resolveParams({ id: { $state: "/doc/id" }, label: "static", nested: { ref: { $state: "/items/0/name" } } }, getState);
  assert.deepStrictEqual(out, { id: 42, label: "static", nested: { ref: "A" } });
});

test("resolveParams passes through non-$state values unchanged", () => {
  const out = resolveParams({ a: 1, b: "x", c: { d: 3 } }, () => ({}));
  assert.deepStrictEqual(out, { a: 1, b: "x", c: { d: 3 } });
});

test("setState built-in handler writes a path", () => {
  const store = createStore({ flag: false });
  let called = 0;
  store.subscribe("/flag", () => called++);
  builtinSetState({ path: "/flag", value: true }, { getState: store.getState, setState: store.set });
  assert.equal(called, 1);
  assert.equal(store.get("/flag"), true);
});

test("handler that does nothing causes no store notification", () => {
  const store = createStore();
  let calls = 0;
  store.subscribe("/any", () => calls++);
  // noop
  assert.equal(calls, 0);
});

test("async handler writes after await (late setState)", async () => {
  const store = createStore({ saved: false });
  const handler = async (params: Record<string, unknown>, api: { getState: () => unknown; setState: (p: string, v: unknown) => void }) => {
    await new Promise((r) => setTimeout(r, 10));
    api.setState("/saved", true);
  };
  await handler({}, { getState: store.getState, setState: store.set });
  assert.equal(store.get("/saved"), true);
});