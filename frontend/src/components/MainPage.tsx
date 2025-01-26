import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Button, Stack, Group, TextInput } from "@mantine/core";
import { useItems } from "../hooks/useNewItems";
import { FolderCard } from "./FolderCard";
import { AddItemModal } from "./AddItemModal";
import AddFolderModal from "./AddFolderModal";

enum ModalState {
  FILE_ADD = "FILE_ADD",
  FOLDER_ADD = "FOLDER_ADD",
}

const MainPage: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [folderIdToAdd, setFolderIdToAdd] = useState("root");

  const { moveItem } = useItems();

  // Handle drag-and-drop logic
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return; // Dropped outside of any valid droppable

    moveItem(
      draggableId,
      source.droppableId,
      destination.droppableId,
      destination.index
    );
  };

  const handleAddFile = (folderId: string) => {
    setModalState(ModalState.FILE_ADD);
    setFolderIdToAdd(folderId);
  };

  const handleAddFolder = (folderId: string) => {
    setModalState(ModalState.FOLDER_ADD);
    setFolderIdToAdd(folderId);
  };

  const hideModal = () => {
    setModalState(null);
    setFolderIdToAdd("root");
  };

  return (
    <>
      {modalState === ModalState.FILE_ADD && (
        <AddItemModal onClose={hideModal} folderId={folderIdToAdd} />
      )}

      {modalState === ModalState.FOLDER_ADD && (
        <AddFolderModal onClose={hideModal} parentFolderId={folderIdToAdd} />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Stack spacing="lg" p="lg">
          <Droppable droppableId="root" type="folder">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
                }}
                {...provided.droppableProps}
              >
                <FolderCard
                  itemId="root"
                  index={0}
                  onFileAdd={handleAddFile}
                  onFolderAdd={handleAddFolder}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Stack>
      </DragDropContext>
    </>
  );
};

export default MainPage;
