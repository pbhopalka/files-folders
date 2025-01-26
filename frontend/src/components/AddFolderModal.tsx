import { Modal, Button, TextInput, Stack } from "@mantine/core";
import { useState } from "react";
import { useFolders } from "../hooks/useNewFolders";

interface Props {
  onClose: () => void;
  parentFolderId: string;
}

const AddFolderModal = ({ onClose, parentFolderId }: Props) => {
  const [name, setName] = useState("");
  const { addFolder } = useFolders();

  const handleSubmit = () => {
    addFolder(name, parentFolderId);
    onClose();
  };

  return (
    <Modal opened onClose={onClose} title="Add New Folder">
      <Stack spacing="sm">
        <TextInput
          label="Folder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleSubmit}>Add Folder</Button>
      </Stack>
    </Modal>
  );
};

export default AddFolderModal;
