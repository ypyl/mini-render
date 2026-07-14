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
import basicSpec from "./specs/basic.json";
import formSpec from "./specs/form.json";
import actionSpec from "./specs/actions.json";

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

/** EditToggle: shows [Edit] in view mode, [Save] [Cancel] in edit mode. */
function EditToggle({ emit }: ComponentProps) {
  const editing = useValue<boolean>("/editingSection");
  if (!editing) {
    return <MantineButton onClick={() => emit("edit")}>Edit</MantineButton>;
  }
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <MantineButton onClick={() => emit("save")}>Save</MantineButton>
      <MantineButton variant="outline" onClick={() => emit("cancel")}>Cancel</MantineButton>
    </div>
  );
}

/** Transparent row wrapper for repeat children; renders children directly. */
function Row({ children }: ComponentProps) {
  return <>{children}</>;
}

// ── Table components ─────────────────────────────────────────────

function Table({ element, children }: ComponentProps) {
  return (
    <Paper shadow="sm" p="md" withBorder>
      {element.props?.title ? (
        <Title order={4} mb="xs">{String(element.props.title)}</Title>
      ) : null}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table>
    </Paper>
  );
}

function THead({ children }: ComponentProps) {
  return <thead>{children}</thead>;
}

function TBody({ children }: ComponentProps) {
  return <tbody>{children}</tbody>;
}

function Tr({ children }: ComponentProps) {
  return <tr>{children}</tr>;
}

function Th({ element }: ComponentProps) {
  return (
    <th style={{ textAlign: "left", padding: "8px", borderBottom: "2px solid #ddd" }}>
      {String(element.props?.text ?? "")}
    </th>
  );
}

function Td({ children }: ComponentProps) {
  return (
    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{children}</td>
  );
}

// ── Registry ──────────────────────────────────────────────────────

const registry: Registry = {
  StaticText,
  Card,
  BoundField,
  ActionButton,
  Row,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  EditToggle,
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
  startEdit: (
    _params: Record<string, unknown>,
    api: { getState: () => unknown; setState: (p: string, v: unknown) => void },
  ) => {
    api.setState("/_snapshot", structuredClone(api.getState()));
    api.setState("/editingSection", true);
  },
  saveEdit: (
    _params: Record<string, unknown>,
    api: { setState: (p: string, v: unknown) => void },
  ) => {
    api.setState("/_snapshot", undefined);
    api.setState("/editingSection", false);
  },
  cancelEdit: (
    _params: Record<string, unknown>,
    api: { getState: () => unknown; setState: (p: string, v: unknown) => void },
  ) => {
    const s = api.getState() as Record<string, unknown>;
    const snap = (s._snapshot as Record<string, unknown>) ?? {};
    // ponytail: union of snapshot + current keys so newly-created fields reset to undefined
    const snapKeys = Object.keys(snap);
    const currentKeys = Object.keys(s).filter(k => k !== "_snapshot" && k !== "editingSection");
    for (const key of [...new Set([...snapKeys, ...currentKeys])]) {
      api.setState(`/${key}`, snap[key]);
    }
    api.setState("/_snapshot", undefined);
    api.setState("/editingSection", false);
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
        type: "EditToggle",
        on: { edit: { action: "startEdit" }, save: { action: "saveEdit" }, cancel: { action: "cancelEdit" } },
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

/**
 * Build a spec for the HTML table with `repeat`.
 * Seeding is idempotent — only writes if value is undefined.
 */
function buildTableSpec(itemCount: number): Spec {
  if (store.get("/items") === undefined) {
    const items: { name: string; email: string }[] = [];
    for (let i = 0; i < itemCount; i++) {
      items.push({ name: `User ${i}`, email: `user${i}@example.com` });
    }
    store.set("/items", items);
  }

  return {
    root: "table",
    elements: {
      table: {
        type: "Table",
        props: { title: `${itemCount}-Row HTML Table` },
        children: ["toggleBtn", "headerRow", "tableBody"],
      },
      toggleBtn: {
        type: "EditToggle",
        on: { edit: { action: "startEdit" }, save: { action: "saveEdit" }, cancel: { action: "cancelEdit" } },
      },
      headerRow: { type: "Tr", children: ["thName", "thEmail", "thActions"] },
      thName: { type: "Th", props: { text: "Name" } },
      thEmail: { type: "Th", props: { text: "Email" } },
      thActions: { type: "Th", props: { text: "Actions" } },
      tableBody: {
        type: "TBody",
        repeat: { path: "/items" },
        children: ["row"],
      },
      row: {
        type: "Tr",
        children: ["cellName", "cellEmail", "cellActions"],
      },
      cellName: { type: "Td", children: ["nameField"] },
      cellEmail: { type: "Td", children: ["emailField"] },
      cellActions: { type: "Td", children: ["deleteBtn"] },
      nameField: { type: "BoundField", props: { bind: "name", label: "" } },
      emailField: { type: "BoundField", props: { bind: "email", label: "" } },
      deleteBtn: {
        type: "ActionButton",
        props: { label: "✕" },
        on: { click: { action: "removeItem", params: { index: { $index: true } } } },
      },
    },
  };
}

// ── App ───────────────────────────────────────────────────────────

type Tab = "basic" | "form" | "actions" | "large" | "table";

export function App() {
  const [tab, setTab] = useState<Tab>("form");

  const largeSpec = useMemo(() => buildLargeSpec(1000), []);
  const tableSpec = useMemo(() => buildTableSpec(1000), []);

  const spec = tab === "basic" ? basicSpec
    : tab === "form" ? formSpec
    : tab === "actions" ? actionSpec
    : tab === "large" ? largeSpec
    : tableSpec;

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
          { label: "Table", value: "table" },
        ]}
      />
      <Renderer spec={spec} registry={registry} store={store} handlers={handlers} />
    </Stack>
  );
}