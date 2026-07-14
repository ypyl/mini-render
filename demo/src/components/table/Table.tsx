// Table.tsx — HTML table wrapped in a paper card.
import { Paper, Title } from "@mantine/core";
import type { ComponentProps } from "mini-render";

export function Table({ element, children }: ComponentProps) {
  return (
    <Paper shadow="sm" p="md" withBorder>
      {element.props?.title ? (
        <Title order={4} mb="xs">{String(element.props.title)}</Title>
      ) : null}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table>
    </Paper>
  );
}
