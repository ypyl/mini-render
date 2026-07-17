// Modal.tsx — renders Mantine Modal when store path is truthy.
import { Modal as MantineModal } from "@mantine/core";
import { useValue } from "mini-render";
import type { ComponentProps } from "mini-render";

export function Modal({ element, children }: ComponentProps) {
  const path = String(element.props?.path ?? "");
  const open = useValue(path);
  const title = element.props?.title ? String(element.props.title) : undefined;

  return (
    <MantineModal
      opened={!!open}
      onClose={() => {}} // no-op — only store path change closes
      title={title}
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      {children}
    </MantineModal>
  );
}
