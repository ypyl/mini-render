// PreviewBox.tsx — renders a styled Paper from /preview store paths.
import { Paper } from "@mantine/core";
import { useValue } from "mini-render";
import type { ComponentProps } from "mini-render";

export function PreviewBox({}: ComponentProps) {
  const title = useValue<string>("/preview/title") ?? "Preview";
  const color = useValue<string>("/preview/color") ?? "#000";
  const size = useValue<string>("/preview/size") ?? "24px";

  return (
    <Paper shadow="sm" p="xl" withBorder ta="center">
      <div style={{ color, fontSize: size, fontWeight: 600 }}>
        {title}
      </div>
    </Paper>
  );
}
