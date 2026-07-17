// Table.tsx — bare HTML table. Use CaseContainer for wrapping.
import type { ComponentProps } from "mini-render";

export function Table({ children }: ComponentProps) {
  return <table style={{ width: "100%", borderCollapse: "collapse" }}>{children}</table>;
}
