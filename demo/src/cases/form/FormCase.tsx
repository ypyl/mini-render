// FormCase.tsx — bound editable fields demo.
import { useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "micro-render";
import formSpec from "./spec.json";
import { registry } from "./registry";
import { handlers } from "./handlers";

export function FormCase() {
  const [store] = useState(() => createStore({}));

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Form</span>
      </Breadcrumbs>
      <Renderer spec={formSpec} registry={registry} store={store} handlers={handlers} />
    </Container>
  );
}
