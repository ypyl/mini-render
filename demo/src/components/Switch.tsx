// Switch.tsx — renders the child element whose key matches the value at props.path.
import { useValue } from "thin-render";
import type { ComponentProps } from "thin-render";
import { Children, type ReactElement } from "react";

export function Switch({ element, children }: ComponentProps) {
  const value = useValue<string>(String(element.props?.path ?? ""));
  if (value == null) return null;
  const arr = Children.toArray(children) as ReactElement[];
  // React's Children.toArray prefixes non-stringifiable keys with ".$"
  const match = arr.find((c) => {
    const rawKey = typeof c.key === "string" && c.key.startsWith(".$")
      ? c.key.slice(2)
      : c.key;
    return rawKey === value;
  });
  return match ?? null;
}
