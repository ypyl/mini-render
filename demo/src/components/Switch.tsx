// Switch.tsx — renders the child element whose key matches the value at props.path.
import { useValue } from "mini-render";
import type { ComponentProps } from "mini-render";
import { Children, type ReactElement } from "react";

export function Switch({ element, children }: ComponentProps) {
  const value = useValue<string>(String(element.props?.path ?? ""));
  if (value == null) return null;
  const arr = Children.toArray(children) as ReactElement[];
  const match = arr.find((c) => c.key === value);
  return match ?? null;
}
