// SwitchCase.tsx — conditional rendering demo.
import { useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "mini-render";
import switchSpec from "./spec.json";
import { registry } from "./registry";
import { handlers } from "./handlers";

export function SwitchCase() {
  const [store] = useState(() => createStore({}));

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Switch</span>
      </Breadcrumbs>
      <Renderer spec={switchSpec} registry={registry} store={store} handlers={handlers} />
    </Container>
  );
}
