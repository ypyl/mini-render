// ToggleField.tsx — Mantine Switch bound to a boolean store path.
import { Switch } from "@mantine/core";
import { useBound } from "mini-render";
import type { ComponentProps } from "mini-render";

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
