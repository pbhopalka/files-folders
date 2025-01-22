import React, { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, Group, Text, ActionIcon, Collapse, Stack } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";
import { ItemCard } from "./ItemCard";

interface FolderProps {
  id: string;
  name: string;
  items: { id: string; title: string }[];
  index: number;
  isOpenByDefault?: boolean;
  onRemove: (folderId: string) => void;
  onRemoveItem: (folderId: string, itemId: string) => void;
}

export const FolderCard = ({
  id,
  name,
  items,
  index,
  isOpenByDefault = false,
  onRemove,
  onRemoveItem,
}: FolderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          shadow="sm"
          withBorder
          mb="md"
        >
          <Group position="apart" align="center" {...provided.dragHandleProps}>
            <Text weight={500}>{name}</Text>
            <Group spacing="xs">
              <ActionIcon
                onClick={() => setIsOpen((prev) => !prev)}
                title={isOpen ? "Collapse" : "Expand"}
              >
                {isOpen ? (
                  <IconChevronUp size={16} />
                ) : (
                  <IconChevronDown size={16} />
                )}
              </ActionIcon>
              <ActionIcon
                onClick={() => onRemove(id)}
                color="red"
                title="Remove Folder"
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Group>

          <Collapse in={isOpen}>
            <Droppable droppableId={id} type="item">
              {(droppableProvided) => (
                <Stack
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  spacing="sm"
                  mt="md"
                >
                  {items.map((item, itemIndex) => (
                    <ItemCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      index={itemIndex}
                      folderId={id}
                      onRemove={onRemoveItem}
                    />
                  ))}
                  {droppableProvided.placeholder}
                </Stack>
              )}
            </Droppable>
          </Collapse>
        </Card>
      )}
    </Draggable>
  );
};
