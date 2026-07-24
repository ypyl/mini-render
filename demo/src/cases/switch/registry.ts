// switch/registry.ts — components used by the Switch demo.
import { CaseContainer } from "../../components/CaseContainer";
import { Card } from "../../components/Card";
import { ActionButton } from "../../components/ActionButton";
import { BoundField } from "../../components/BoundField";
import { StaticText } from "../../components/StaticText";
import { Switch } from "../../components/Switch";
import { ButtonGroup } from "../../components/ButtonGroup";
import type { Registry } from "thin-render";

export const registry: Registry = { CaseContainer, Card, ActionButton, BoundField, StaticText, Switch, ButtonGroup };
