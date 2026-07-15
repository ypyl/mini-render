// FieldsetRow.tsx — wraps repeated items in a Mantine Fieldset for visual grouping.
import { Fieldset } from "@mantine/core";
import type { ComponentProps } from "mini-render";

export function FieldsetRow({ children }: ComponentProps) {
  return <Fieldset radius="md">{children}</Fieldset>;
}
