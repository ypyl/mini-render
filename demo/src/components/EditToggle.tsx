// EditToggle.tsx — shows [Edit] in view mode, [Save] [Cancel] in edit mode.
import { Button as MantineButton } from "@mantine/core";
import { useValue, type ComponentProps } from "micro-render";

export function EditToggle({ emit }: ComponentProps) {
  const editing = useValue<boolean>("/editingSection");
  if (!editing) {
    return <MantineButton onClick={() => emit("edit")}>Edit</MantineButton>;
  }
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <MantineButton onClick={() => emit("save")}>Save</MantineButton>
      <MantineButton variant="outline" onClick={() => emit("cancel")}>Cancel</MantineButton>
    </div>
  );
}
