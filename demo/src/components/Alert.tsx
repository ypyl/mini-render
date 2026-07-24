// Alert.tsx — Mantine Alert with title, color, and children.
import { Alert as MantineAlert } from "@mantine/core";
import type { ComponentProps } from "thin-render";

export function Alert({ element, children }: ComponentProps) {
  const title = element.props?.title as string | undefined;
  const color = element.props?.color as string | undefined;

  return (
    <MantineAlert title={title} color={color} variant="light">
      {children}
    </MantineAlert>
  );
}
