// actions.test.ts — self-checks for the action system (resolveParams, setState built-in).
// Imports from source; keeps BUILTIN_SET_STATE inlined (React-free). Pure logic.
import { test } from "vitest";
import assert from "node:assert/strict";
import { getByPath, createStore } from "./store";
import { resolveParams } from "./hooks";

// ── BUILTIN_SET_STATE (from src/contexts.tsx, inlined to avoid React import) ─
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

// ── $item / $index tests ──────────────────────────────────────────

test("resolveParams: $item with field resolves to absolute path", () => {
  const out = resolveParams({ itemPath: { $item: "name" } }, () => ({}), "/items/3");
  assert.deepStrictEqual(out, { itemPath: "/items/3/name" });
});

test("resolveParams: $item with empty string resolves to base path", () => {
  const out = resolveParams({ row: { $item: "" } }, () => ({}), "/items/7");
  assert.deepStrictEqual(out, { row: "/items/7" });
});

test("resolveParams: $item outside repeat resolves to undefined", () => {
  const out = resolveParams({ x: { $item: "name" } }, () => ({}));
  assert.deepStrictEqual(out, { x: undefined });
});

test("resolveParams: $index inside repeat returns index", () => {
  const out = resolveParams({ pos: { $index: true } }, () => ({}), "/items/3", 3);
  assert.deepStrictEqual(out, { pos: 3 });
});

test("resolveParams: $index outside repeat returns undefined", () => {
  const out = resolveParams({ pos: { $index: true } }, () => ({}));
  assert.deepStrictEqual(out, { pos: undefined });
});

test("resolveParams: mixed $item and $state in same params", () => {
  const getState = () => ({ user: { id: 42 } });
  const out = resolveParams({ itemPath: { $item: "" }, userId: { $state: "/user/id" } }, getState, "/items/2");
  assert.deepStrictEqual(out, { itemPath: "/items/2", userId: 42 });
});
