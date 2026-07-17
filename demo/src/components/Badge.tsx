// Badge.tsx — Mantine Badge with text and color from props.
import { Badge as MantineBadge } from "@mantine/core";
import type { ComponentProps } from "mini-render";

export function Badge({ element }: ComponentProps) {
  const text = String(element.props?.text ?? "");
  const color = element.props?.color as string | undefined;

  return (
    <MantineBadge color={color} variant="light">
      {text}
    </MantineBadge>
  );
}
