// StaticText.tsx — renders plain text from props.
import type { ComponentProps } from "thin-render";

export function StaticText({ element }: ComponentProps) {
  return <>{String(element.props?.text ?? "")}</>;
}
