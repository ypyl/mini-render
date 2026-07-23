// TableCase.tsx — HTML table demo with repeat.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "micro-render";
import { handlers } from "./handlers";
import { registry } from "./registry";
import { buildTableSpec } from "./buildSpec";

export function TableCase() {
  const [store] = useState(() => {
    const items: { name: string; email: string }[] = [];
    for (let i = 0; i < 1000; i++) {
      items.push({ name: `User ${i}`, email: `user${i}@example.com` });
    }
    return createStore({ items });
  });

  const spec = useMemo(() => buildTableSpec(1000), []);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Table</span>
      </Breadcrumbs>
      <Renderer spec={spec} registry={registry} store={store} handlers={handlers} />
    </Container>
  );
}
