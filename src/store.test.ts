// store.test.ts — self-checks for the path-based store.
// Imports from source; no inlined copies. Pure logic, no React.
import { test } from "vitest";
import assert from "node:assert/strict";
import {
  getByPath,
  immutableSetByPath,
  pathsOverlap,
  createStore,
} from "./store";

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

test("immutableSetByPath sets array index at terminal path", () => {
  const next = immutableSetByPath({ items: ["a", "b"] }, "/items/0", "X") as Record<string, unknown>;
  assert.deepStrictEqual(next.items, ["X", "b"]);
});
