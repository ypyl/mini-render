// SliderField.tsx — Mantine Slider bound to a numeric store path.
import { Slider, Text } from "@mantine/core";
import { useBound } from "mini-render";
import type { ComponentProps } from "mini-render";

export function SliderField({ element }: ComponentProps) {
  const path = String(element.props?.bind ?? "");
  const min = Number(element.props?.min ?? 0);
  const max = Number(element.props?.max ?? 100);
  const labelFmt = element.props?.label as string | undefined;
  const [value, setValue] = useBound<number>(path);
  const current = value ?? min;

  return (
    <div>
      {labelFmt ? (
        <Text size="sm" mb="xs">{labelFmt.replace("{value}", String(current))}</Text>
      ) : null}
      <Slider
        value={current}
        min={min}
        max={max}
        onChange={(v) => setValue(v)}
      />
    </div>
  );
}
