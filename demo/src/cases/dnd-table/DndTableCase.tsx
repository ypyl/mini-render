// DndTableCase.tsx — Drag & Drop table demo.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "thin-render";
import { registry } from "./registry";
import { buildDndTableSpec } from "./buildSpec";

const INITIAL_ITEMS = Array.from({ length: 150 }, (_, i) => ({
  name: `User ${i}`,
  email: `user${i}@example.com`,
}));

export function DndTableCase() {
  const [store] = useState(() => createStore({ items: INITIAL_ITEMS, editingSection: true }));
  const spec = useMemo(() => buildDndTableSpec(), []);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Drag & Drop</span>
      </Breadcrumbs>
      <Renderer spec={spec} registry={registry} store={store} />
    </Container>
  );
}
