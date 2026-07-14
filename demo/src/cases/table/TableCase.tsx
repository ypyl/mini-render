// TableCase.tsx — HTML table demo with repeat.
import { useMemo } from "react";
import { Renderer } from "mini-render";
import { store } from "../../store";
import { handlers } from "../../handlers";
import { registry } from "./registry";
import { buildTableSpec } from "./buildSpec";

export function TableCase() {
  // Seed data once (idempotent)
  if (store.get("/items") === undefined) {
    const items: { name: string; email: string }[] = [];
    for (let i = 0; i < 1000; i++) {
      items.push({ name: `User ${i}`, email: `user${i}@example.com` });
    }
    store.set("/items", items);
  }

  const spec = useMemo(() => buildTableSpec(1000), []);

  return <Renderer spec={spec} registry={registry} store={store} handlers={handlers} />;
}
