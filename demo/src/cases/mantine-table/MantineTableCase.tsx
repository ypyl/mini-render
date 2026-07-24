// MantineTableCase.tsx — Mantine Table with pagination demo case.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "thin-render";
import { handlers } from "./handlers";
import { registry } from "./registry";
import { buildSpec } from "./buildSpec";

const TOTAL = 300;

function generateItems() {
  const items: { id: number; name: string; email: string }[] = [];
  for (let i = 1; i <= TOTAL; i++) {
    items.push({ id: i, name: `User ${i}`, email: `user${i}@example.com` });
  }
  return items;
}

export function MantineTableCase() {
  const [store] = useState(() => createStore({
    items: generateItems(),
    page: 1,
  }));

  const spec = useMemo(() => buildSpec(), []);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Mantine Table</span>
      </Breadcrumbs>
      <Renderer spec={spec} registry={registry} store={store} handlers={handlers} />
    </Container>
  );
}
