// StackRow.tsx — repeat wrapper with Mantine Stack gap between children.
import { Stack } from "@mantine/core";
import type { ComponentProps } from "micro-render";

export function StackRow({ element, children }: ComponentProps) {
  const gap = (element.props?.gap as string | number) ?? "md";
  const align = (element.props?.align as string) ?? "stretch";
  return <Stack gap={gap} align={align}>{children}</Stack>;
}
