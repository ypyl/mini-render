// PaginatedTable.tsx — Mantine Table + Pagination bound to store state.
//
// Reads an array from the store at `element.props.path` and renders a
// windowed slice based on the page number at `/page`. Columns are
// configured via `element.props.columns` (array of `{ key: string, label?: string }`).
// Pagination state lives in the store (not local React state).
import { useMemo } from "react";
import { Table, Pagination, type TableData } from "@mantine/core";
import { useValue, useSetValue, type ComponentProps } from "thin-render";

interface ColumnDef {
  key: string;
  label?: string;
}

const PAGE_SIZE = 10;

export function PaginatedTable({ element }: ComponentProps) {
  const path = String(element.props?.path ?? "");
  const columns = (element.props?.columns as ColumnDef[] | undefined) ?? [];
  const page = useValue<number>("/page") ?? 1;
  const setPage = useSetValue("/page");
  const allItems = useValue<Record<string, unknown>[]>(path) ?? [];

  const sliced = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allItems.slice(start, start + PAGE_SIZE);
  }, [allItems, page]);

  const tableData: TableData = useMemo(
    () => ({
      head: columns.map((c) => c.label ?? c.key),
      body: sliced.map((item) => columns.map((c) => item[c.key] as React.ReactNode)),
    }),
    [sliced, columns],
  );

  return (
    <>
      <Table data={tableData} striped highlightOnHover withTableBorder withColumnBorders />
      <Pagination
        total={Math.ceil(allItems.length / PAGE_SIZE)}
        value={page}
        onChange={setPage}
        mt="md"
      />
    </>
  );
}
