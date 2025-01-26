import React, { useEffect, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card, Group, Text, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useItems } from "..//hooks/useNewItems";

interface ItemCardProps {
  itemId: string;
  index: number;
}

export const ItemCard = ({ itemId, index }: ItemCardProps): JSX.Element => {
  const { itemMetadata, deleteItem } = useItems();

  const [metadata, setMetadata] = useState(itemMetadata);

  useEffect(() => {
    setMetadata(itemMetadata);
  }, [itemMetadata]);

  if (!metadata) {
    return <Card>Error: Item metadata is not available.</Card>;
  }

  const item = metadata[itemId];

  if (!item) {
    return <Card>Error: Item not found.</Card>;
  }

  const handleRemoveItem = () => {
    deleteItem(itemId);
  };

  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          shadow="xs"
          withBorder
          mb="sm"
          maw={350}
        >
          <Group position="apart" align="center">
            <Text size="sm">{item.name}</Text>
            <ActionIcon
              color="red"
              onClick={handleRemoveItem}
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
