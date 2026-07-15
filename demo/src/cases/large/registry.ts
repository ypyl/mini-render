// large/registry.ts — components used by the Large (1000 rows) demo.
import { Card } from "../../components/Card";
import { FieldsetRow } from "../../components/FieldsetRow";
import { BoundField } from "../../components/BoundField";
import { ActionButton } from "../../components/ActionButton";
import { EditToggle } from "../../components/EditToggle";
import { StackRow } from "../../components/StackRow";
import type { Registry } from "mini-render";

export const registry: Registry = { Card, FieldsetRow, BoundField, ActionButton, EditToggle, StackRow };
