// ActionsCase.tsx — action dispatch demo.
import { useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "mini-render";
import actionSpec from "./spec.json";
import { registry } from "./registry";
import { handlers } from "./handlers";

export function ActionsCase() {
  const [store] = useState(() => createStore({}));

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Actions</span>
      </Breadcrumbs>
      <Renderer spec={actionSpec} registry={registry} store={store} handlers={handlers} />
    </Container>
  );
}
