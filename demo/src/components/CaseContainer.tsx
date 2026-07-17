// CaseContainer.tsx — demo case wrapper with title and description.
import { Paper, Title, Text } from "@mantine/core";
import type { ComponentProps } from "mini-render";

export function CaseContainer({ element, children }: ComponentProps) {
  return (
    <Paper shadow="sm" p="md" withBorder>
      {element.props?.title ? (
        <Title order={4} mb="xs">{String(element.props.title)}</Title>
      ) : null}
      {element.props?.description ? (
        <Text c="dimmed" size="sm" mb="md">{String(element.props.description)}</Text>
      ) : null}
      {children}
    </Paper>
  );
}
