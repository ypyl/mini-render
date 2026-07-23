// WatchValidationCase.tsx — Watch validation demo.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "micro-render";
import { registry } from "./registry";
import { handlers } from "./handlers";
import { buildWatchValidationSpec } from "./buildSpec";

export function WatchValidationCase() {
  const [store] = useState(() =>
    createStore({ name: "", errors: { name: undefined }, editingSection: true }),
  );
  const spec = useMemo(() => buildWatchValidationSpec(), []);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Watch Validation</span>
      </Breadcrumbs>
      <Renderer spec={spec} registry={registry} store={store} handlers={handlers} />
    </Container>
  );
}
