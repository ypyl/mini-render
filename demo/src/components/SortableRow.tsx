// SortableRow.tsx — draggable table row using @dnd-kit useSortable.
// Called directly by DndTable, not via thin-render registry.
import { useCallback } from "react";
import { useValue, useSetValue } from "thin-render";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import { Button, Table, TextInput } from "@mantine/core";

interface SortableRowProps {
  item: Record<string, unknown>;
  index: number;
  onRemove: (index: number) => void;
  columns: string[];
  editing: boolean;
  path: string;
}

export function SortableRow({
  item,
  index,
  onRemove,
  columns,
  editing,
  path,
}: SortableRowProps) {
  // Use the first column value as the sortable ID
  const firstCol = columns[0]?.toLowerCase() ?? "name";
  const id = String(item[firstCol] ?? index);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Table.Tr ref={setNodeRef} style={style} {...attributes}>
      <Table.Td>
        <div {...listeners} style={{ cursor: "grab", lineHeight: 0 }}>
          <IconGripVertical size={18} stroke={1.5} />
        </div>
      </Table.Td>
      {columns.map((col) => (
        <EditableCell
          key={col}
          path={path}
          index={index}
          field={col.toLowerCase()}
          editing={editing}
        />
      ))}
      <Table.Td>
        <Button
          size="compact-xs"
          variant="subtle"
          color="red"
          onClick={() => onRemove(index)}
        >
          ✕
        </Button>
      </Table.Td>
    </Table.Tr>
  );
}

function EditableCell({
  path,
  index,
  field,
  editing,
}: {
  path: string;
  index: number;
  field: string;
  editing: boolean;
}) {
  const cellPath = `${path}/${index}/${field}`;
  const value = useValue<string>(cellPath);
  const setValue = useSetValue(cellPath);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    [setValue],
  );

  return (
    <Table.Td>
      <TextInput
        value={value ?? ""}
        readOnly={!editing}
        variant={editing ? "default" : "unstyled"}
        onChange={handleChange}
      />
    </Table.Td>
  );
}
