// watch-validation/registry.ts — components used by the watch validation demo.
import { CaseContainer } from "../../components/CaseContainer";
import { BoundField } from "../../components/BoundField";
import { ErrorDisplay } from "../../components/ErrorDisplay";
import { StackRow } from "../../components/StackRow";
import type { Registry } from "micro-render";

export const registry: Registry = {
  CaseContainer,
  BoundField,
  ErrorDisplay,
  StackRow,
};
