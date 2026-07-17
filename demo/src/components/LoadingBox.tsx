// LoadingBox.tsx — wraps children in a relative Box with LoadingOverlay controlled by a store path.
import { Box, LoadingOverlay } from "@mantine/core";
import { useValue } from "mini-render";
import type { ComponentProps } from "mini-render";

export function LoadingBox({ element, children }: ComponentProps) {
  const loading = useValue<string>(String(element.props?.path ?? ""));
  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading === "true"} zIndex={1000} overlayProps={{ blur: 2 }} />
      {children}
    </Box>
  );
}
