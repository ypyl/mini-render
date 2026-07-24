// mantine-table/handlers.ts — handlers for the Mantine Table demo.
import type { Handlers } from "thin-render";

export const handlers: Handlers = {
  // Handlers kept minimal — pagination uses inline store.set via useSetValue
  // in PaginatedTable.tsx, matching the DndTable pattern for self-contained
  // components.
};
