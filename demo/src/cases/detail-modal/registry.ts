// detail-modal/registry.ts — components used by the Detail Modal demo.
import { CaseContainer } from "../../components/CaseContainer";
import { Table } from "../../components/table/Table";
import { THead } from "../../components/table/THead";
import { TBody } from "../../components/table/TBody";
import { Tr } from "../../components/table/Tr";
import { Th } from "../../components/table/Th";
import { Td } from "../../components/table/Td";
import { BoundField } from "../../components/BoundField";
import { ActionButton } from "../../components/ActionButton";
import { Modal } from "../../components/Modal";
import { LoadingBox } from "../../components/LoadingBox";
import { StackRow } from "../../components/StackRow";
import type { Registry } from "mini-render";

export const registry: Registry = {
  CaseContainer, Table, THead, TBody, Tr, Th, Td, BoundField, ActionButton, Modal, LoadingBox, StackRow,
};
