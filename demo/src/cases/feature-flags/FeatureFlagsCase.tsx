// FeatureFlagsCase.tsx — Feature Flags Dashboard demo.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "mini-render";
import { registry } from "./registry";
import { buildDashboardSpec } from "./buildSpec";

export function FeatureFlagsCase() {
  const [store] = useState(() =>
    createStore({
      environment: "development",
      flags: {
        darkMode: true,
        betaDashboard: false,
        aiSuggestions: { enabled: true, rollout: 50 },
      },
    }),
  );

  const spec = useMemo(() => buildDashboardSpec(), []);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Feature Flags</span>
      </Breadcrumbs>
      <Renderer spec={spec} registry={registry} store={store} />
    </Container>
  );
}
