// TranslationsCase.tsx — Translations Editor demo (object repeat).
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Container, Breadcrumbs } from "@mantine/core";
import { Renderer, createStore } from "mini-render";
import { registry } from "./registry";
import { buildTranslationsSpec } from "./buildSpec";

export function TranslationsCase() {
  const [store] = useState(() =>
    createStore({
      translations: {
        greeting: "Hello",
        farewell: "Goodbye",
        welcome: "Welcome back",
        error: "Something went wrong",
        success: "Operation completed",
        loading: "Please wait...",
      },
      editingSection: true,
    }),
  );

  const spec = useMemo(() => buildTranslationsSpec(), []);

  return (
    <Container size="md" py="md">
      <Breadcrumbs mb="md">
        <Link href="/">Home</Link>
        <span>Translations</span>
      </Breadcrumbs>
      <Renderer spec={spec} registry={registry} store={store} />
    </Container>
  );
}
