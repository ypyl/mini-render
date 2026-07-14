// large/registry.ts — components used by the Large (1000 rows) demo.
import { Card } from "../../components/Card";
import { Row } from "../../components/Row";
import { BoundField } from "../../components/BoundField";
import { ActionButton } from "../../components/ActionButton";
import { EditToggle } from "../../components/EditToggle";
import type { Registry } from "mini-render";

export const registry: Registry = { Card, Row, BoundField, ActionButton, EditToggle };
