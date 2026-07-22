// ErrorDisplay.tsx — conditionally displays error text from a store path.
import { Text } from "@mantine/core";
import { useValue, type ComponentProps } from "mini-render";

export function ErrorDisplay({ element }: ComponentProps) {
  const path = String(element.props?.path ?? "");
  const error = useValue<string>(path);

  if (!error) return null;

  return (
    <Text c="red" size="sm">
      {error}
    </Text>
  );
}
