import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Card,
  Group,
  Text,
  ActionIcon,
  Collapse,
  Stack,
  Box,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconFilePlus,
  IconFolderPlus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { ItemCard } from "./ItemCard";
import { useItems } from "../hooks/useNewItems";
import { useFolders } from "../hooks/useNewFolders";
import { ListPage } from "./ListPage";
import { AddItemModal } from "./AddItemModal";
import AddFolderModal from "./AddFolderModal";

interface FolderProps {
  itemId: string;
  index: number;
  onFileAdd: (folderId: string) => void;
  onFolderAdd: (folderId: string) => void;
}

enum ModalState {
  FILE_ADD = "FILE_ADD",
  FOLDER_ADD = "FOLDER_ADD",
}

export const FolderCard = ({
  itemId,
  index,
  onFileAdd,
  onFolderAdd,
}: FolderProps): JSX.Element => {
  const { itemMetadata, deleteItem, isLoading } = useItems();
  const { updateFolderState } = useFolders();
  const [metadata, setMetadata] = useState(itemMetadata);

  useEffect(() => {
    setMetadata(itemMetadata);
  }, [itemMetadata]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (!metadata || (itemId !== "root" && !metadata[itemId])) {
    return <Box>Error: Item metadata is not available.</Box>;
  }

  const { name, isOpen } =
    itemId === "root"
      ? { name: "Files & Folder app", isOpen: true }
      : metadata[itemId];

  const handleRemoveItem = () => {
    deleteItem(itemId);
  };

  const handleFolderToggle = () => {
    updateFolderState(itemId, !isOpen);
  };

  const handleAddFile = () => {
    onFileAdd(itemId);
  };

  const handleAddFolder = () => {
    onFolderAdd(itemId);
  };

  return (
    <>
      <Draggable draggableId={itemId} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            shadow="sm"
            withBorder
            mb="md"
            w={itemId !== "root" ? "100%" : undefined}
          >
            <Group
              position="apart"
              align="center"
              {...provided.dragHandleProps}
            >
              <Text weight={500}>{name}</Text>
              <Group spacing="xs">
                <ActionIcon onClick={handleAddFile} title="Add file">
                  <IconFilePlus />
                </ActionIcon>
                <ActionIcon onClick={handleAddFolder} title="Add folder">
                  <IconFolderPlus />
                </ActionIcon>
                {itemId !== "root" && (
                  <>
                    <ActionIcon
                      onClick={handleFolderToggle}
                      title={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? (
                        <IconChevronUp size={16} />
                      ) : (
                        <IconChevronDown size={16} />
                      )}
                    </ActionIcon>
                    <ActionIcon
                      onClick={handleRemoveItem}
                      color="red"
                      title="Remove Folder"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </>
                )}
              </Group>
            </Group>

            <Collapse py={16} in={isOpen}>
              <ListPage
                folderId={itemId}
                onFileAdd={onFileAdd}
                onFolderAdd={onFolderAdd}
              />
            </Collapse>
          </Card>
        )}
      </Draggable>
    </>
  );
};
