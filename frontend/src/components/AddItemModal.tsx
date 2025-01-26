import { Modal, Button, TextInput, Stack } from "@mantine/core";
import { useState } from "react";
import { useItems } from "../hooks/useNewItems";

interface Props {
  onClose: () => void;
  folderId: string;
}

export const AddItemModal = ({ onClose, folderId }: Props) => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const { addFile } = useItems();

  const handleSubmit = () => {
    addFile(title, folderId);
    onClose();
  };

  return (
    <Modal opened onClose={onClose} title="Add New Item">
      <Stack spacing="sm">
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          label="Icon"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
        <Button onClick={handleSubmit}>Add Item</Button>
      </Stack>
    </Modal>
  );
};
