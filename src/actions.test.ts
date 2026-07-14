// actions.test.ts — self-checks for the action system (resolveParams, setState built-in).
// Imports from source; keeps BUILTIN_SET_STATE inlined (React-free). Pure logic.
import { describe, it, expect } from "vitest";
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

describe("resolveParams", () => {
  it("replaces { $state } references with current store values", () => {
    const getState = () => ({ doc: { id: 42 }, items: [{ name: "A" }] });
    const out = resolveParams({ id: { $state: "/doc/id" }, label: "static", nested: { ref: { $state: "/items/0/name" } } }, getState);
    expect(out).toEqual({ id: 42, label: "static", nested: { ref: "A" } });
  });

  it("passes through non-$state values unchanged", () => {
    const out = resolveParams({ a: 1, b: "x", c: { d: 3 } }, () => ({}));
    expect(out).toEqual({ a: 1, b: "x", c: { d: 3 } });
  });

  it("$item with field resolves to absolute path", () => {
    const out = resolveParams({ itemPath: { $item: "name" } }, () => ({}), "/items/3");
    expect(out).toEqual({ itemPath: "/items/3/name" });
  });

  it("$item with empty string resolves to base path", () => {
    const out = resolveParams({ row: { $item: "" } }, () => ({}), "/items/7");
    expect(out).toEqual({ row: "/items/7" });
  });

  it("$item outside repeat resolves to undefined", () => {
    const out = resolveParams({ x: { $item: "name" } }, () => ({}));
    expect(out).toEqual({ x: undefined });
  });

  it("$index inside repeat returns index", () => {
    const out = resolveParams({ pos: { $index: true } }, () => ({}), "/items/3", 3);
    expect(out).toEqual({ pos: 3 });
  });

  it("$index outside repeat returns undefined", () => {
    const out = resolveParams({ pos: { $index: true } }, () => ({}));
    expect(out).toEqual({ pos: undefined });
  });

  it("mixed $item and $state in same params", () => {
    const getState = () => ({ user: { id: 42 } });
    const out = resolveParams({ itemPath: { $item: "" }, userId: { $state: "/user/id" } }, getState, "/items/2");
    expect(out).toEqual({ itemPath: "/items/2", userId: 42 });
  });

  it("$index false returns undefined", () => {
    const out = resolveParams({ pos: { $index: false } }, () => ({}), "/items/3", 3);
    expect(out).toEqual({ pos: undefined });
  });
});

describe("builtinSetState", () => {
  it("writes a path", () => {
    const store = createStore({ flag: false });
    let called = 0;
    store.subscribe("/flag", () => called++);
    builtinSetState({ path: "/flag", value: true }, { getState: store.getState, setState: store.set });
    expect(called).toBe(1);
    expect(store.get("/flag")).toBe(true);
  });

  it("does nothing when path is falsy", () => {
    const store = createStore({ x: 1 });
    builtinSetState({ path: undefined, value: 99 }, { getState: store.getState, setState: store.set });
    expect(store.get("/x")).toBe(1);
    builtinSetState({ path: "", value: 99 }, { getState: store.getState, setState: store.set });
    expect(store.get("/x")).toBe(1);
  });
});

describe("handler edge cases", () => {
  it("handler that does nothing causes no store notification", () => {
    const store = createStore();
    let calls = 0;
    store.subscribe("/any", () => calls++);
    // noop
    expect(calls).toBe(0);
  });

  it("async handler writes after await (late setState)", async () => {
    const store = createStore({ saved: false });
    const handler = async (params: Record<string, unknown>, api: { getState: () => unknown; setState: (p: string, v: unknown) => void }) => {
      await new Promise((r) => setTimeout(r, 10));
      api.setState("/saved", true);
    };
    await handler({}, { getState: store.getState, setState: store.set });
    expect(store.get("/saved")).toBe(true);
  });
});
