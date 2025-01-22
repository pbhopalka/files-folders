import { Modal, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { addFolder } from "../hooks/useFolders";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddFolderModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState("");
  const { mutate } = addFolder();

  const handleSubmit = () => {
    mutate({ name, isOpen: true, order: 0 });
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Add New Folder">
      <TextInput
        label="Folder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleSubmit}>Add Folder</Button>
    </Modal>
  );
};

export default AddFolderModal;
