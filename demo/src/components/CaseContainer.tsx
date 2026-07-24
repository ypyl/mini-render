// CaseContainer.tsx — demo case wrapper with title and description.
import { Divider, Paper, Spoiler, Text, Title } from "@mantine/core";
import type { ComponentProps } from "thin-render";

export function CaseContainer({ element, children }: ComponentProps) {
  return (
    <Paper shadow="sm" p="md" withBorder>
      {element.props?.title ? (
        <Title order={4} mb="xs">{String(element.props.title)}</Title>
      ) : null}
      {element.props?.description ? (
        <Text c="dimmed" size="sm" mb="md">{String(element.props.description)}</Text>
      ) : null}
      {element.props?.technicalDescription ? (
        <div style={{ marginBottom: "var(--mantine-spacing-md)" }}>
          <Spoiler maxHeight={0} showLabel="How it works" hideLabel="Hide details">
            <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
              {String(element.props.technicalDescription)}
            </Text>
          </Spoiler>
        </div>
      ) : null}
      <Divider mb="md" />
      {children}
    </Paper>
  );
}
