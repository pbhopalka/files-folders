import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card, Group, Text, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface ItemCardProps {
  id: string;
  title: string;
  index: number;
  folderId?: string;
  onRemove: (folderId: string, itemId: string) => void;
}

export const ItemCard = ({
  id,
  title,
  index,
  folderId,
  onRemove,
}: ItemCardProps): JSX.Element => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          shadow="xs"
          withBorder
          mb="sm"
        >
          <Group position="apart" align="center">
            <Text size="sm">{title}</Text>
            <ActionIcon
              color="red"
              // TODO: Recheck this logic
              onClick={() => onRemove(folderId ?? "", id)}
              title="Remove Item"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Card>
      )}
    </Draggable>
  );
};
