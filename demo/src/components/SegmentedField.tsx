// SegmentedField.tsx — Mantine SegmentedControl bound to a store path.
import { SegmentedControl } from "@mantine/core";
import { useBound } from "mini-render";
import type { ComponentProps } from "mini-render";

interface Option {
  value: string;
  label: string;
}

export function SegmentedField({ element }: ComponentProps) {
  const path = String(element.props?.bind ?? "");
  const options: Option[] = (element.props?.options as Option[]) ?? [];
  const [value, setValue] = useBound<string>(path);

  return (
    <SegmentedControl
      data={options}
      value={value ?? options[0]?.value ?? ""}
      onChange={(v) => setValue(v)}
    />
  );
}
