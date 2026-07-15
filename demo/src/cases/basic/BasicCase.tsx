// BasicCase.tsx — static spec rendering demo.
import { useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "mini-render";
import basicSpec from "./spec.json";
import { registry } from "./registry";

export function BasicCase() {
  const [store] = useState(() => createStore({}));

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Basic</span>
      </Breadcrumbs>
      <Renderer spec={basicSpec} registry={registry} store={store} />
    </Container>
  );
}
