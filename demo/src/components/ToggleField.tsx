// ToggleField.tsx — Mantine Switch bound to a boolean store path.
import { Switch } from "@mantine/core";
import { useBound } from "thin-render";
import type { ComponentProps } from "thin-render";

export function ToggleField({ element }: ComponentProps) {
  const path = String(element.props?.bind ?? "");
  const [value, setValue] = useBound<boolean>(path);

  return (
    <Switch
      checked={value ?? false}
      onChange={(e) => setValue(e.currentTarget.checked)}
    />
  );
}
