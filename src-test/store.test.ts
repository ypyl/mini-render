// store.test.ts — self-checks for the path-based store (fully self-contained).
// Pure logic, no React, no module imports needed.
import { test } from "node:test";
import assert from "node:assert/strict";

// ── Inlined store implementation ───────────────────────────────────

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
  const base = root !== null && typeof root === "object" && !Array.isArray(root)
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

function createStore(initial: Record<string, unknown> = {}) {
  let state: unknown = { ...initial };
  const listeners = new Map<string, Set<Listener>>();
  function notify(affected: string) {
    for (const [sp, set] of listeners) {
      if (pathsOverlap(sp, affected)) for (const fn of set) fn();
    }
  }
  return {
    get(path: string) { return getByPath(state, path); },
    set(path: string, value: unknown) {
      if (getByPath(state, path) === value) return;
      state = immutableSetByPath(state, path, value);
      notify(path);
    },
    subscribe(path: string, listener: Listener) {
      let s = listeners.get(path);
      if (!s) { s = new Set(); listeners.set(path, s); }
      s.add(listener);
      return () => { s!.delete(listener); if (s && s.size === 0) listeners.delete(path); };
    },
    getState() { return state; },
    getServerSnapshot() { return state; },
  };
}

// ── Tests ─────────────────────────────────────────────────────────

test("getByPath reads nested values and undefined for missing segments", () => {
  const s = { items: [{ name: "A", qty: 1 }] };
  assert.equal(getByPath(s, "/items/0/name"), "A");
  assert.equal(getByPath(s, "items/0/qty"), 1);
  assert.equal(getByPath(s, "/items/99/name"), undefined);
  assert.equal(getByPath(s, "/missing/deep"), undefined);
});

test("immutableSetByPath creates nested structure when absent", () => {
  const next = immutableSetByPath({}, "/a/b/c", 5) as Record<string, unknown>;
  assert.equal(getByPath(next, "/a/b/c"), 5);
});

test("immutableSetByPath preserves sibling branch identity (structural sharing)", () => {
  const before: Record<string, unknown> = {
    items: [
      { name: "A", qty: 1, meta: { x: 1 } },
      { name: "B", qty: 2, meta: { x: 2 } },
    ],
    other: { keep: true },
  };
  const item1Before = (before.items as unknown[])[1];
  const meta0Before = ((before.items as unknown[])[0] as Record<string, unknown>).meta;
  const otherBefore = before.other;

  const next = immutableSetByPath(before, "/items/0/name", "X") as Record<string, unknown>;
  const itemsNext = next.items as unknown[];
  assert.equal(itemsNext[1], item1Before);
  assert.equal((itemsNext[0] as Record<string, unknown>).meta, meta0Before);
  assert.equal(next.other, otherBefore);
  assert.equal((itemsNext[0] as Record<string, unknown>).name, "X");
  assert.equal(((before.items as unknown[])[0] as Record<string, unknown>).name, "A");
});

test("pathsOverlap: equal, ancestor, descendant, disjoint", () => {
  assert.equal(pathsOverlap("/items", "/items"), true);
  assert.equal(pathsOverlap("/items", "/items/0"), true);
  assert.equal(pathsOverlap("/items/0/name", "/items"), true);
  assert.equal(pathsOverlap("/items/0", "/items/0/name"), true);
  assert.equal(pathsOverlap("/other", "/items/0/name"), false);
  assert.equal(pathsOverlap("/items/0/name", "/items/1/name"), false);
  assert.equal(pathsOverlap("", ""), true);
  assert.equal(pathsOverlap("", "/x"), true);
});

test("subscribe: exact match notified", () => {
  const store = createStore();
  let calls = 0;
  const unsub = store.subscribe("/x", () => calls++);
  store.set("/x", 1);
  assert.equal(calls, 1);
  unsub();
  store.set("/x", 2);
  assert.equal(calls, 1);
});

test("subscribe: ancestor notified by descendant set", () => {
  const store = createStore({ items: [{ name: "A" }] });
  let calls = 0;
  store.subscribe("/items", () => calls++);
  store.set("/items/0/name", "B");
  assert.equal(calls, 1);
});

test("subscribe: descendant notified by ancestor set (array replaced)", () => {
  const store = createStore({ items: [{ name: "A" }] });
  let calls = 0;
  store.subscribe("/items/0/name", () => calls++);
  store.set("/items", [{ name: "B" }]);
  assert.equal(calls, 1);
});

test("subscribe: unrelated path not notified", () => {
  const store = createStore();
  let calls = 0;
  store.subscribe("/other", () => calls++);
  store.set("/items/0/name", "A");
  assert.equal(calls, 0);
});

test("set: no-op when strictly equal value does not notify", () => {
  const store = createStore({ x: 1 });
  let calls = 0;
  store.subscribe("/x", () => calls++);
  store.set("/x", 1);
  assert.equal(calls, 0);
  store.set("/x", 2);
  store.set("/x", 2);
  assert.equal(calls, 1);
});