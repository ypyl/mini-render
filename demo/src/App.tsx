// App.tsx — demo tab switcher.
import { useState } from "react";
import { Stack, SegmentedControl, Title } from "@mantine/core";
import { BasicCase } from "./cases/basic/BasicCase";
import { FormCase } from "./cases/form/FormCase";
import { ActionsCase } from "./cases/actions/ActionsCase";
import { LargeCase } from "./cases/large/LargeCase";
import { TableCase } from "./cases/table/TableCase";
import { SwitchCase } from "./cases/switch/SwitchCase";

type Tab = "basic" | "form" | "actions" | "large" | "table" | "switch";

export function App() {
  const [tab, setTab] = useState<Tab>("form");

  return (
    <Stack p="md" gap="md">
      <Title order={3}>mini-render demo</Title>
      <SegmentedControl
        value={tab}
        onChange={(v) => setTab(v as Tab)}
        data={[
          { label: "Basic", value: "basic" },
          { label: "Form", value: "form" },
          { label: "Actions", value: "actions" },
          { label: "Large (1000)", value: "large" },
          { label: "Table", value: "table" },
          { label: "Switch", value: "switch" },
        ]}
      />
      {tab === "basic" && <BasicCase />}
      {tab === "form" && <FormCase />}
      {tab === "actions" && <ActionsCase />}
      {tab === "large" && <LargeCase />}
      {tab === "table" && <TableCase />}
      {tab === "switch" && <SwitchCase />}
    </Stack>
  );
}
