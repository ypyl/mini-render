// TwoStoreCase.tsx — settings + live preview with two independent stores.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs, SimpleGrid } from "@mantine/core";
import { Renderer, createStore } from "mini-render";
import type { Store } from "mini-render";
import { createHandlers } from "./handlers";
import { registry } from "./registry";
import { buildSettingsSpec } from "./buildSettingsSpec";
import { buildPreviewSpec } from "./buildPreviewSpec";

export function TwoStoreCase() {
  const [storeA] = useState(() =>
    createStore({
      settings: { title: "Hello", color: "blue", size: "24px" },
      editingSection: true,
    }),
  );
  const [storeB] = useState<Store>(() =>
    createStore({
      preview: { title: "Hello", color: "blue", size: "24px" },
    }),
  );

  const settingsSpec = useMemo(() => buildSettingsSpec(), []);
  const previewSpec = useMemo(() => buildPreviewSpec(), []);
  const handlersA = useMemo(() => createHandlers(storeB), [storeB]);

  return (
    <Container size="lg" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Two Store</span>
      </Breadcrumbs>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Renderer spec={settingsSpec} registry={registry} store={storeA} handlers={handlersA} />
        <Renderer spec={previewSpec} registry={registry} store={storeB} handlers={{}} />
      </SimpleGrid>
    </Container>
  );
}
