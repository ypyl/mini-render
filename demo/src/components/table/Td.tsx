// Td.tsx — HTML td element.
import type { ComponentProps } from "micro-render";

export function Td({ children }: ComponentProps) {
  return (
    <td style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{children}</td>
  );
}
