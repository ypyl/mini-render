// ActionButton.tsx — emits an action on click.
import { Button as MantineButton } from "@mantine/core";
import type { ComponentProps } from "mini-render";

export function ActionButton({ element, emit }: ComponentProps) {
  return (
    <MantineButton onClick={() => emit("click")}>
      {String(element.props?.label ?? "Click")}
    </MantineButton>
  );
}
