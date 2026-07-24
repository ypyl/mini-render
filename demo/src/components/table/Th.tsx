// Th.tsx — HTML th element.
import type { ComponentProps } from "thin-render";

export function Th({ element }: ComponentProps) {
  return (
    <th style={{ textAlign: "left", padding: "8px", borderBottom: "2px solid #ddd" }}>
      {String(element.props?.text ?? "")}
    </th>
  );
}
