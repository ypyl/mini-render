// StackRow.tsx — repeat wrapper with Mantine Stack gap between children.
import { Stack } from "@mantine/core";
import type { ComponentProps } from "mini-render";

export function StackRow({ element, children }: ComponentProps) {
  const gap = (element.props?.gap as string | number) ?? "md";
  return <Stack gap={gap}>{children}</Stack>;
}
