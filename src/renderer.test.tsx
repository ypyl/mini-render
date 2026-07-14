// renderer.test.tsx — tests for the Renderer and its internal components.
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { type ReactNode, createElement } from "react";
import { Renderer, type ComponentProps, type Registry } from "./renderer";
import { createStore } from "./store";
import type { Spec, UIElement } from "./spec";

// ── Spy components ────────────────────────────────────────────────

/** Captures ComponentProps for later assertion. */
function makeSpy() {
  const called: { call: number; element: unknown; children: ReactNode; emit: unknown }[] = [];
  function SpyComponent({ element, children, emit }: ComponentProps) {
    called.push({ call: called.length, element, children, emit });
    return createElement("div", { "data-testid": "spy" }, children);
  }
  (SpyComponent as unknown as Record<string, unknown>).called = called;
  return SpyComponent as typeof SpyComponent & { called: typeof called };
}

// ── Helpers ───────────────────────────────────────────────────────

function makeSpec(overrides: Partial<Spec> = {}): Spec {
  return {
    root: "r",
    elements: {
      r: { type: "Spy", children: [] },
    },
    ...overrides,
  };
}

// ── Tests: Renderer (public API) ──────────────────────────────────

describe("Renderer", () => {
  it("returns null for null spec", () => {
    const store = createStore();
    const { container } = render(
      <Renderer spec={null} registry={{}} store={store} />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("returns null when root element is missing from spec", () => {
    const store = createStore();
    const spec: Spec = { root: "missing", elements: {} };
    const { container } = render(
      <Renderer spec={spec} registry={{}} store={store} />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders root element through registry component", () => {
    const store = createStore();
    const Spy = makeSpy();
    const registry: Registry = { Spy };
    const spec = makeSpec({
      elements: {
        r: { type: "Spy", props: { label: "hello" } },
      },
    });

    render(<Renderer spec={spec} registry={registry} store={store} />);

    expect(Spy.called).toHaveLength(1);
    const el = Spy.called[0]!.element as UIElement;
    expect(el.type).toBe("Spy");
    expect((el.props as Record<string, unknown>).label).toBe("hello");
  });
});

// ── Tests: ElementRenderer edge cases ─────────────────────────────

describe("ElementRenderer", () => {
  it("warns when element key is missing and loading is false", () => {
    const store = createStore();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const spec: Spec = {
      root: "r",
      elements: {
        r: { type: "Spy", children: ["missing"] },
      },
    };
    const Spy = makeSpy();
    const registry: Registry = { Spy };

    render(<Renderer spec={spec} registry={registry} store={store} />);

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('missing element "missing"'),
    );
    warn.mockRestore();
  });

  it("does NOT warn when element key is missing and loading is true", () => {
    const store = createStore();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const spec: Spec = {
      root: "r",
      elements: {
        r: { type: "Spy", children: ["missing"] },
      },
    };
    const Spy = makeSpy();
    const registry: Registry = { Spy };

    render(<Renderer spec={spec} registry={registry} store={store} loading />);

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("warns when component type is not in registry", () => {
    const store = createStore();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const spec: Spec = {
      root: "r",
      elements: {
        r: { type: "NoSuchComponent" },
      },
    };

    render(<Renderer spec={spec} registry={{}} store={store} />);

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('no component registered for type "NoSuchComponent"'),
    );
    warn.mockRestore();
  });

  it("renders nested children", () => {
    const store = createStore();
    const Spy = makeSpy();
    const registry: Registry = { Spy };
    const spec: Spec = {
      root: "r",
      elements: {
        r: { type: "Spy", children: ["a"] },
        a: { type: "Spy", children: ["b"] },
        b: { type: "Spy" },
      },
    };

    render(<Renderer spec={spec} registry={registry} store={store} />);

    // Three elements rendered: root, a, b
    expect(Spy.called).toHaveLength(3);
  });
});

// ── Tests: RepeatChildren ─────────────────────────────────────────

describe("RepeatChildren", () => {
  it("renders children once per array item", () => {
    const store = createStore({ items: [{ name: "A" }, { name: "B" }, { name: "C" }] });
    const Spy = makeSpy();
    const registry: Registry = { Spy };
    const spec: Spec = {
      root: "list",
      elements: {
        list: { type: "Spy", repeat: { path: "/items" }, children: ["row"] },
        row: { type: "Spy", props: {} },
      },
    };

    render(<Renderer spec={spec} registry={registry} store={store} />);

    // 1 list + 3 rows = 4 renders
    expect(Spy.called).toHaveLength(4);
  });

  it("uses key field from repeat config for React keys", () => {
    const store = createStore({ items: [{ id: "x" }, { id: "y" }] });
    const Spy = makeSpy();
    const registry: Registry = { Spy };
    const spec: Spec = {
      root: "list",
      elements: {
        list: { type: "Spy", repeat: { path: "/items", key: "id" }, children: ["row"] },
        row: { type: "Spy" },
      },
    };

    // Renders without warning about missing keys
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Renderer spec={spec} registry={registry} store={store} />);
    // No key-related warnings expected
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("renders nothing for empty array", () => {
    const store = createStore({ items: [] });
    const Spy = makeSpy();
    const registry: Registry = { Spy };
    const spec: Spec = {
      root: "list",
      elements: {
        list: { type: "Spy", repeat: { path: "/items" }, children: ["row"] },
        row: { type: "Spy" },
      },
    };

    render(<Renderer spec={spec} registry={registry} store={store} />);

    // Only the list container, no rows
    expect(Spy.called).toHaveLength(1);
  });

  it("falls back to index when key field is missing on items", () => {
    // Items have no id field, but repeat config specifies key: "id"
    const store = createStore({ items: [{ name: "A" }, { name: "B" }] });
    const Spy = makeSpy();
    const registry: Registry = { Spy };
    const spec: Spec = {
      root: "list",
      elements: {
        list: { type: "Spy", repeat: { path: "/items", key: "id" }, children: ["row"] },
        row: { type: "Spy" },
      },
    };

    render(<Renderer spec={spec} registry={registry} store={store} />);

    // 1 list + 2 rows = 3 renders (no crash despite missing key field)
    expect(Spy.called).toHaveLength(3);
  });
});
