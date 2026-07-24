// Card.tsx — paper card with optional title.
import { Paper, Title } from "@mantine/core";
import type { ComponentProps } from "thin-render";

export function Card({ element, children }: ComponentProps) {
  return (
    <Paper shadow="sm" p="md" withBorder>
      {element.props?.title ? (
        <Title order={4} mb="xs">{String(element.props.title)}</Title>
      ) : null}
      {children}
    </Paper>
  );
}
