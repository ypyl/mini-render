import { useState, useMemo } from "react";
import {
  Box,
  TextInput as MantineTextInput,
  Button as MantineButton,
  Paper,
  Stack,
  SegmentedControl,
  Title,
} from "@mantine/core";
import {
  Renderer,
  createStore,
  useBound,
  useValue,
  useRepeatPath,
  type Spec,
  type Registry,
  type ComponentProps,
} from "mini-render";

// ── Presentational components (pure, no store knowledge) ──────────

function StaticText({ element }: ComponentProps) {
  return <>{String(element.props?.text ?? "")}</>;
}

function Card({ element, children }: ComponentProps) {
  return (
    <Paper shadow="sm" p="md" withBorder>
      {element.props?.title ? (
        <Title order={4} mb="xs">{String(element.props.title)}</Title>
      ) : null}
      {children}
    </Paper>
  );
}

// ── Binding components ────────────────────────────────────────────

/**
 * BoundField: reads `bind` from element.props, prepends the repeat-scope
 * base path if inside a repeat, and subscribes via useBound.
 */
function BoundField({ element }: ComponentProps) {
  const base = useRepeatPath();
  const fieldPath = String(element.props?.bind ?? "");
  const path = base ? `${base}/${fieldPath}` : fieldPath;
  const [value, setValue] = useBound<string>(path);
  const editing = useValue<boolean>("/editingSection");
  const readOnly = !editing;
  return (
    <Box>
      <MantineTextInput
        value={value ?? ""}
        readOnly={readOnly}
        variant="default"
        styles={
          readOnly
            ? { input: { borderColor: "transparent", backgroundColor: "transparent" } }
            : undefined
        }
        onChange={(e) => setValue(e.currentTarget.value)}
        label={String(element.props?.label ?? "")}
      />
    </Box>
  );
}

/**
 * ActionButton: emits "click" on press. Handler mapped in spec's `on`.
 */
function ActionButton({ element, emit }: ComponentProps) {
  return (
    <MantineButton onClick={() => emit("click")}>
      {String(element.props?.label ?? "Click")}
    </MantineButton>
  );
}

/** Transparent row wrapper for repeat children; renders children directly. */
function Row({ children }: ComponentProps) {
  return <>{children}</>;
}

// ── Registry ──────────────────────────────────────────────────────

const registry: Registry = {
  StaticText,
  Card,
  BoundField,
  ActionButton,
  Row,
};

// ── Global store (stable reference across tab switches) ────────────

const store = createStore({});

// ── Handlers (stable reference) ───────────────────────────────────

const handlers = {
  saveDoc: (
    _params: Record<string, unknown>,
    api: { setState: (p: string, v: unknown) => void },
  ) => {
    api.setState("/savedAt", new Date().toISOString());
  },
  toggleEdit: (
    _params: Record<string, unknown>,
    api: { getState: () => unknown; setState: (p: string, v: unknown) => void },
  ) => {
    const s = api.getState() as Record<string, unknown>;
    api.setState("/editingSection", !s.editingSection);
  },
  removeItem: (
    params: Record<string, unknown>,
    api: { getState: () => unknown; setState: (p: string, v: unknown) => void },
  ) => {
    const idx = params.index as number;
    const s = api.getState() as Record<string, unknown>;
    const items = (s.items as unknown[] | undefined) ?? [];
    api.setState("/items", items.filter((_, i) => i !== idx));
  },
};

/**
 * Build a spec for the large table with `repeat`.
 * Seeding is idempotent — only writes if value is undefined.
 */
function buildLargeSpec(itemCount: number): Spec {
  // Seed once (idempotent)
  if (store.get("/items") === undefined) {
    const items: { name: string; email: string }[] = [];
    for (let i = 0; i < itemCount; i++) {
      items.push({ name: `User ${i}`, email: `user${i}@example.com` });
    }
    store.set("/items", items);
  }

  return {
    root: "root",
    elements: {
      root: {
        type: "Card",
        props: { title: `${itemCount}-Row Editable Table (edit any cell)` },
        children: ["toggleBtn", "list"],
      },
      toggleBtn: {
        type: "ActionButton",
        props: { label: "Edit" },
        on: { click: { action: "toggleEdit" } },
      },
      list: {
        type: "Card",
        props: {},
        repeat: { path: "/items" },
        children: ["row"],
      },
      row: {
        type: "Row",
        props: {},
        children: ["deleteBtn", "cellName", "cellEmail"],
      },
      deleteBtn: {
        type: "ActionButton",
        props: { label: "✕" },
        on: { click: { action: "removeItem", params: { index: { $index: true } } } },
      },
      cellName: {
        type: "BoundField",
        props: { bind: "name", label: "Name" },
      },
      cellEmail: {
        type: "BoundField",
        props: { bind: "email", label: "Email" },
      },
    },
  };
}

// ── Other specs ───────────────────────────────────────────────────

const basicSpec: Spec = {
  root: "card",
  elements: {
    card: {
      type: "Card",
      props: { title: "Basic Static Rendering" },
      children: ["greeting"],
    },
    greeting: { type: "StaticText", props: { text: "Hello from mini-render!" } },
  },
};

const formSpec: Spec = {
  root: "card",
  elements: {
    card: {
      type: "Card",
      props: { title: "Bound Editable Fields" },
      children: ["toggleBtn", "name", "email"],
    },
    toggleBtn: {
      type: "ActionButton",
      props: { label: "Edit" },
      on: { click: { action: "toggleEdit" } },
    },
    name: { type: "BoundField", props: { bind: "name", label: "Name" } },
    email: { type: "BoundField", props: { bind: "email", label: "Email" } },
  },
};

const actionSpec: Spec = {
  root: "card",
  elements: {
    card: {
      type: "Card",
      props: { title: "Action Dispatch" },
      children: ["toggleBtn", "btn", "status"],
    },
    toggleBtn: {
      type: "ActionButton",
      props: { label: "Edit" },
      on: { click: { action: "toggleEdit" } },
    },
    btn: {
      type: "ActionButton",
      props: { label: "Save Document" },
      on: { click: { action: "saveDoc" } },
    },
    status: {
      type: "BoundField",
      props: { bind: "/savedAt", label: "Last saved at" },
    },
  },
};

// ── App ───────────────────────────────────────────────────────────

type Tab = "basic" | "form" | "actions" | "large";

export function App() {
  const [tab, setTab] = useState<Tab>("form");

  const largeSpec = useMemo(() => buildLargeSpec(1000), []);

  const spec = tab === "basic" ? basicSpec
    : tab === "form" ? formSpec
    : tab === "actions" ? actionSpec
    : largeSpec;

  return (
    <Stack p="md" gap="md">
      <Title order={3}>mini-render demo</Title>
      <SegmentedControl
        value={tab}
        onChange={(v) => setTab(v as Tab)}
        data={[
          { label: "Basic", value: "basic" },
          { label: "Form", value: "form" },
          { label: "Actions", value: "actions" },
          { label: "Large (1000)", value: "large" },
        ]}
      />
      <Renderer spec={spec} registry={registry} store={store} handlers={handlers} />
    </Stack>
  );
}