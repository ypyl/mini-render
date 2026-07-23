// DetailModalCase.tsx — detail modal demo.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "micro-render";
import { handlers } from "./handlers";
import { registry } from "./registry";
import { buildDetailModalSpec, ITEMS } from "./buildSpec";

export function DetailModalCase() {
  const [store] = useState(() =>
    createStore({
      items: ITEMS,
      loadingDetail: "false",
    }),
  );

  const spec = useMemo(() => buildDetailModalSpec(), []);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Detail Modal</span>
      </Breadcrumbs>
      <Renderer spec={spec} registry={registry} store={store} handlers={handlers} />
    </Container>
  );
}
