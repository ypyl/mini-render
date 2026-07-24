// Modal.tsx — renders Mantine Modal when store path is truthy.
import { Modal as MantineModal } from "@mantine/core";
import { useValue, useSetValue } from "thin-render";
import type { ComponentProps } from "thin-render";

export function Modal({ element, children }: ComponentProps) {
  const path = String(element.props?.path ?? "");
  const open = useValue(path);
  const setValue = useSetValue(path);
  const title = element.props?.title ? String(element.props.title) : undefined;

  return (
    <MantineModal
      opened={!!open}
      onClose={() => setValue(undefined)}
      title={title}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      {children}
    </MantineModal>
  );
}
