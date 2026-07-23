// large/registry.ts — components used by the Large (1000 rows) demo.
import { CaseContainer } from "../../components/CaseContainer";
import { FieldsetRow } from "../../components/FieldsetRow";
import { BoundField } from "../../components/BoundField";
import { ActionButton } from "../../components/ActionButton";
import { EditToggle } from "../../components/EditToggle";
import { StackRow } from "../../components/StackRow";
import type { Registry } from "micro-render";

export const registry: Registry = { CaseContainer, FieldsetRow, BoundField, ActionButton, EditToggle, StackRow };
