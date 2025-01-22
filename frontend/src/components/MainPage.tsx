import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Button, Stack, Group, TextInput } from "@mantine/core";
import { FolderCard } from "./FolderCard";
import { ItemCard } from "./ItemCard";
import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  title: string;
}

interface FolderType {
  id: string;
  name: string;
  items: Item[];
}

const MainPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]); // Items on the main page
  const [folders, setFolders] = useState<FolderType[]>([]); // List of folders
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newFolderName, setNewFolderName] = useState("");

  // Handle drag-and-drop logic
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return; // Dropped outside of any valid droppable

    if (source.droppableId === "main" && destination.droppableId === "main") {
      // Reorder items in the main list
      const reorderedItems = [...items];
      const [movedItem] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 1, movedItem);
      setItems(reorderedItems);
    } else if (source.droppableId === destination.droppableId) {
      // Reorder items within the same folder
      const folder = folders.find((f) => f.id === source.droppableId);
      if (!folder) return;

      const reorderedItems = [...folder.items];
      const [movedItem] = reorderedItems.splice(source.index, 1);
      reorderedItems.splice(destination.index, 0, movedItem);

      setFolders((prevFolders) =>
        prevFolders.map((f) =>
          f.id === folder.id ? { ...f, items: reorderedItems } : f
        )
      );
    } else {
      // Move items between folder or between folder and main
      const sourceFolder = folders.find((f) => f.id === source.droppableId);
      const destinationFolder = folders.find(
        (f) => f.id === destination.droppableId
      );

      if (sourceFolder && destinationFolder) {
        // Moving between folders
        const sourceItems = [...sourceFolder.items];
        const [movedItem] = sourceItems.splice(source.index, 1);

        const destinationItems = [...destinationFolder.items];
        destinationItems.splice(destination.index, 0, movedItem);

        setFolders((prevFolders) =>
          prevFolders.map((f) =>
            f.id === sourceFolder.id
              ? { ...f, items: sourceItems }
              : f.id === destinationFolder.id
              ? { ...f, items: destinationItems }
              : f
          )
        );
      } else if (sourceFolder && !destinationFolder) {
        // Moving from folder to main
        const sourceItems = [...sourceFolder.items];
        const [movedItem] = sourceItems.splice(source.index, 1);

        setFolders((prevFolders) =>
          prevFolders.map((f) =>
            f.id === sourceFolder.id ? { ...f, items: sourceItems } : f
          )
        );

        setItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems.splice(destination.index, 0, movedItem);
          return updatedItems;
        });
      } else if (!sourceFolder && destinationFolder) {
        // Moving from main to folder
        const sourceItems = [...items];
        const [movedItem] = sourceItems.splice(source.index, 1);

        const destinationItems = [...destinationFolder.items];
        destinationItems.splice(destination.index, 0, movedItem);

        setFolders((prevFolders) =>
          prevFolders.map((f) =>
            f.id === destinationFolder.id
              ? { ...f, items: destinationItems }
              : f
          )
        );

        setItems(sourceItems);
      }
    }
  };

  // Add new item
  const addItem = () => {
    if (!newItemTitle.trim()) return;
    setItems((prev) => [...prev, { id: uuidv4(), title: newItemTitle }]);
    setNewItemTitle("");
  };

  // Add new folder
  const addFolder = () => {
    if (!newFolderName.trim()) return;
    setFolders((prev) => [
      ...prev,
      { id: uuidv4(), name: newFolderName, items: [] },
    ]);
    setNewFolderName("");
  };

  // Remove folder
  const removeFolder = (folderId: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== folderId));
  };

  // Remove item
  const removeItem = (folderId: string | undefined, itemId: string) => {
    if (folderId) {
      setFolders((prevFolders) =>
        prevFolders.map((f) =>
          f.id === folderId
            ? { ...f, items: f.items.filter((item) => item.id !== itemId) }
            : f
        )
      );
    } else {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack spacing="lg" p="lg">
        {/* Add New Item */}
        <Group>
          <TextInput
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="New Item Title"
          />
          <Button onClick={addItem}>Add Item</Button>
        </Group>

        {/* Add New Folder */}
        <Group>
          <TextInput
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="New Folder Name"
          />
          <Button onClick={addFolder}>Add Folder</Button>
        </Group>

        {/* Items List */}
        <Droppable droppableId="main" type="item">
          {(provided) => (
            <Stack
              ref={provided.innerRef}
              {...provided.droppableProps}
              spacing="sm"
              mt="md"
            >
              {items.map((item, index) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  index={index}
                  onRemove={removeItem}
                />
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>

        {/* Folder List */}
        {folders.map((folder, index) => (
          <FolderCard
            key={folder.id}
            id={folder.id}
            name={folder.name}
            items={folder.items}
            index={index}
            onRemove={removeFolder}
            onRemoveItem={removeItem}
          />
        ))}
      </Stack>
    </DragDropContext>
  );
};

export default MainPage;
