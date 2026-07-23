// DndTable.tsx — generic sortable table wrapper providing DndContext + SortableContext.
//
// NOTE 1 (internal .map vs repeat): This component iterates items internally
// with .map() rather than using micro-render's `repeat` directive. @dnd-kit
// requires that SortableContext and useSortable be in the same React render
// pass. `repeat` renders via RepeatChildren/ElementRenderer in a separate
// pass, which desynchronizes @dnd-kit's animation cycle and causes a
// double-move visual glitch. This is a known limitation of combining
// external DnD libraries with the spec-driven repeat model.
//
// NOTE 2 (inline handlers vs handlers.ts): Edit/Save/Cancel logic lives
// inline rather than in a handlers.ts file (unlike Form/Large/Table demos).
// DndTable must hold items in local React state so @dnd-kit can batch
// updates — subscribing to the store's items array causes re-renders on
// every cell edit (structural sharing), which resets TextInput cursor
// positions. Because local state is the single source of truth rather
// than the store, handler-based edit/save/cancel would require
// bidirectional sync (store → local) that re-introduces the subscription
// problem. The inline approach is architecturally necessary, not a shortcut.
//
// NOTE 3 (large-list drag latency): With ~150 items, a small activation
// delay occurs when starting a drag. @dnd-kit propagates drag state changes
// via React context (DndContext/SortableContext), which triggers re-renders
// for all useSortable consumers. React.memo cannot help — context changes
// bypass memoization. This is an inherent @dnd-kit limitation, not a
// micro-render issue. MeasuringStrategy changes (WhileDragging vs
// BeforeDragging) don't help because the bottleneck is context propagation,
// not DOM measurement. At 50 items the delay is imperceptible; at 150 it's
// noticeable but acceptable for a demo.
import { useMemo, useRef, useState } from "react";
import { useValue, useSetValue, useStore, getByPath, type ComponentProps } from "micro-render";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button, Group, Table, VisuallyHidden } from "@mantine/core";
import { SortableRow } from "./SortableRow";

export function DndTable({ element }: ComponentProps) {
  const path = String(element.props?.path ?? "/items");
  const columns = (element.props?.columns as string[] | undefined) ?? [];

  // Read initial items ONCE from the store without subscribing.
  // useValue would subscribe, causing DndTable to re-render on every cell edit
  // (structural sharing creates a new array reference), which makes TextInput
  // cursor jump. Instead, read the store directly on mount via useStore().
  const store = useStore();
  const setItems = useSetValue(path);
  const [items, setLocalItems] = useState<Record<string, unknown>[]>(
    () => (getByPath(store.getState(), path) as Record<string, unknown>[]) ?? [],
  );

  // Edit/save/cancel from store
  const editing = useValue<boolean>("/editingSection") ?? false;
  const setEditingSection = useSetValue("/editingSection");

  const dragging = useRef(false);

  const updateItems = (newItems: Record<string, unknown>[]) => {
    setLocalItems(newItems);
    setItems(newItems);
  };

  const idKey = String(element.props?.idKey ?? "name");
  const ids = useMemo(
    () => items.map((item, i) => String(item[idKey] ?? i)),
    [items, idKey],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = () => {
    dragging.current = true;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      dragging.current = false;
      return;
    }
    const oldIndex = items.findIndex(
      (item, i) => String(item[idKey] ?? i) === active.id,
    );
    const newIndex = items.findIndex(
      (item, i) => String(item[idKey] ?? i) === over.id,
    );
    if (oldIndex === -1 || newIndex === -1) {
      dragging.current = false;
      return;
    }
    updateItems(arrayMove(items, oldIndex, newIndex));
    dragging.current = false;
  };

  const handleAdd = () => {
    const defaults: Record<string, unknown> = {};
    for (const col of columns) {
      defaults[col.toLowerCase()] = "New";
    }
    updateItems([...items, defaults]);
  };

  const handleRemove = (index: number) => {
    updateItems(items.filter((_, i) => i !== index));
  };

  // Edit/save/cancel — snapshot the items array for cancel support
  const snapshotItems = useValue<Record<string, unknown>[]>("/_snapshot/items");
  const setSnapshotItems = useSetValue("/_snapshot/items");

  const handleEdit = () => {
    setSnapshotItems(structuredClone(items));
    setEditingSection(true);
  };

  const handleSave = () => {
    setSnapshotItems(undefined);
    setEditingSection(false);
  };

  const handleCancel = () => {
    if (snapshotItems) {
      setLocalItems(snapshotItems);
      setItems(snapshotItems);
    }
    setSnapshotItems(undefined);
    setEditingSection(false);
  };

  return (
    <>
      <Group mb="sm">
        {!editing ? (
          <Button size="sm" variant="outline" onClick={handleEdit}>
            Edit
          </Button>
        ) : (
          <>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="subtle" color="red" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
        <Button size="sm" variant="light" onClick={handleAdd}>
          Add Row
        </Button>
      </Group>

      <Table.ScrollContainer minWidth={420}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={40}>
                  <VisuallyHidden>Drag handle</VisuallyHidden>
                </Table.Th>
                {columns.map((col) => (
                  <Table.Th key={col}>{col}</Table.Th>
                ))}
                <Table.Th w={60} />
              </Table.Tr>
            </Table.Thead>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
              <Table.Tbody>
                {items.map((item, i) => (
                  <SortableRow
                    key={String(item[idKey] ?? i)}
                    item={item}
                    index={i}
                    onRemove={handleRemove}
                    columns={columns}
                    editing={editing}
                    path={path}
                  />
                ))}
              </Table.Tbody>
            </SortableContext>
          </Table>
        </DndContext>
      </Table.ScrollContainer>
    </>
  );
}
