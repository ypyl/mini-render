// two-store/registry.ts — components used by the two-store demo.
import { CaseContainer } from "../../components/CaseContainer";
import { BoundField } from "../../components/BoundField";
import { SelectField } from "../../components/SelectField";
import { ActionButton } from "../../components/ActionButton";
import { PreviewBox } from "../../components/PreviewBox";
import { StackRow } from "../../components/StackRow";
import type { Registry } from "micro-render";

export const registry: Registry = {
  CaseContainer, BoundField, SelectField, ActionButton, PreviewBox, StackRow,
};
