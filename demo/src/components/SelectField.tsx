// SelectField.tsx — always-writable dropdown bound to a store path.
import { Select } from "@mantine/core";
import { useBound } from "micro-render";
import type { ComponentProps } from "micro-render";

interface Option {
  value: string;
  label: string;
}

export function SelectField({ element }: ComponentProps) {
  const path = String(element.props?.bind ?? "");
  const options: Option[] = (element.props?.options as Option[]) ?? [];
  const [value, setValue] = useBound<string>(path);

  return (
    <Select
      data={options}
      value={value ?? null}
      onChange={(v) => setValue(v ?? "")}
      clearable={false}
    />
  );
}
