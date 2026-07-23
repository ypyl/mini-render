// feature-flags/registry.ts — components used by the Feature Flags dashboard.
import { CaseContainer } from "../../components/CaseContainer";
import { ToggleField } from "../../components/ToggleField";
import { SliderField } from "../../components/SliderField";
import { Badge } from "../../components/Badge";
import { Alert } from "../../components/Alert";
import { SegmentedField } from "../../components/SegmentedField";
import { FieldsetRow } from "../../components/FieldsetRow";
import { StackRow } from "../../components/StackRow";
import { StaticText } from "../../components/StaticText";
import type { Registry } from "micro-render";

export const registry: Registry = {
  CaseContainer, ToggleField, SliderField, Badge, Alert, SegmentedField,
  FieldsetRow, StackRow, StaticText,
};
