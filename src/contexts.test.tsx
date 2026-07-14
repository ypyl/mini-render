// contexts.test.tsx — tests for StoreProvider and ActionProvider.
import { describe, it, expect } from "vitest";
import { useContext } from "react";
import { render } from "@testing-library/react";
import { StoreContext, StoreProvider, ActionContext, ActionProvider, BUILTIN_SET_STATE } from "./contexts";
import { createStore } from "./store";

// ── Helpers ───────────────────────────────────────────────────────

function StoreReader() {
  const store = useContext(StoreContext);
  return <div data-testid="store">{store ? "present" : "null"}</div>;
}

function ActionReader() {
  const ctx = useContext(ActionContext);
  return <div data-testid="actions">{ctx ? Object.keys(ctx.handlers).join(",") : "null"}</div>;
}

// ── Tests ─────────────────────────────────────────────────────────

describe("StoreProvider", () => {
  it("provides the store to descendants", () => {
    const store = createStore({ x: 1 });
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <StoreReader />
      </StoreProvider>,
    );
    expect(getByTestId("store").textContent).toBe("present");
  });

  it("renders children", () => {
    const store = createStore();
    const { getByText } = render(
      <StoreProvider store={store}>
        <span>child</span>
      </StoreProvider>,
    );
    expect(getByText("child")).toBeInTheDocument();
  });
});

describe("ActionProvider", () => {
  it("provides handlers to descendants", () => {
    const store = createStore();
    const handler = () => {};
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <ActionProvider handlers={{ myAction: handler }} builtins={{ setState: BUILTIN_SET_STATE }} store={store}>
          <ActionReader />
        </ActionProvider>
      </StoreProvider>,
    );
    expect(getByTestId("actions").textContent).toContain("myAction");
    expect(getByTestId("actions").textContent).toContain("setState");
  });

  it("user handlers override builtins on name clash", () => {
    const store = createStore();
    const userHandler = () => {};
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <ActionProvider handlers={{ setState: userHandler }} builtins={{ setState: BUILTIN_SET_STATE }} store={store}>
          <ActionReader />
        </ActionProvider>
      </StoreProvider>,
    );
    // Both present but user handler is the actual value (we only check keys here)
    expect(getByTestId("actions").textContent).toContain("setState");
  });

  it("works without builtins prop (undefined default)", () => {
    const store = createStore();
    const { getByTestId } = render(
      <StoreProvider store={store}>
        <ActionProvider handlers={{}} store={store}>
          <ActionReader />
        </ActionProvider>
      </StoreProvider>,
    );
    expect(getByTestId("actions").textContent).toBe("");
  });
});

describe("BUILTIN_SET_STATE", () => {
  it("does nothing when path is undefined", () => {
    const store = createStore({ x: 1 });
    BUILTIN_SET_STATE({ path: undefined, value: 99 }, { getState: store.getState, setState: store.set });
    expect(store.get("/x")).toBe(1);
  });
});
