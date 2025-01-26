import { FolderCard } from "./FolderCard";
import { useItems } from "../hooks/useNewItems";
import { Box, Group } from "@mantine/core";
import { ItemCard } from "./ItemCard";
import { useEffect, useState } from "react";

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

  const [storageOrder, setStorageOrder] = useState(storage);
  const [metadata, setMetadata] = useState(itemMetadata);

  useEffect(() => {
    setStorageOrder(storage);
  }, [storage]);

  useEffect(() => {
    setMetadata(itemMetadata);
  }, [itemMetadata]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (!metadata) {
    return <Box>Error: Item metadata is not available.</Box>;
  }

  const rootElement = storageOrder[folderId] || [];

  if (rootElement.length === 0) {
    return <Box>No items yet. Add a new item or folder</Box>;
  }

  return (
    <Group>
      {rootElement.map((element, index) => {
        const item = metadata[element];
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
