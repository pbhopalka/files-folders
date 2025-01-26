import { Folder, useListFoldersQuery } from "../hooks/useFolders";
import { Item, useListItemsQuery } from "../hooks/useItems";
import { FolderCard } from "./FolderCard";
import { useItems } from "../hooks/useNewItems";
import { Box, Button, Group, Stack } from "@mantine/core";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ItemCard } from "./ItemCard";

interface ListPageProps {
  folderId: string;
  onFileAdd: (folderId: string) => void;
  onFolderAdd: (folderId: string) => void;
}

export const ListPage = ({
  folderId,
  onFileAdd,
  onFolderAdd,
}: ListPageProps) => {
  const { isLoading, storage, itemMetadata } = useItems();

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (!itemMetadata) {
    return <Box>Error: Item metadata is not available.</Box>;
  }

  const rootElement = storage[folderId] || [];

  if (rootElement.length === 0) {
    return <Box>No items yet. Add a new item or folder</Box>;
  }

  return (
    <Group>
      {rootElement.map((element, index) => {
        const item = itemMetadata[element];
        if (!item) {
          return <Box key={element}>Error: Item not found.</Box>;
        }

        const isFile = item.type === "file";

        if (isFile) {
          return <ItemCard key={element} itemId={element} index={index} />;
        }

        return (
          <FolderCard
            key={element}
            itemId={element}
            index={index}
            onFileAdd={onFileAdd}
            onFolderAdd={onFolderAdd}
          />
        );
      })}
    </Group>
  );
};
