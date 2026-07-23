// ButtonGroup.tsx — wraps children in a Mantine ButtonGroup for segmented controls.
import { ButtonGroup as MantineButtonGroup } from "@mantine/core";
import type { ComponentProps } from "micro-render";

export function ButtonGroup({ children }: ComponentProps) {
  return <MantineButtonGroup>{children}</MantineButtonGroup>;
}
