import { Modal, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { addItem, Item } from "../hooks/useItems";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddItemModal = ({ isOpen, onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const { mutate } = addItem();

  const handleSubmit = () => {
    const itemToAdd: Item = {
      title,
      icon,
      order: 0,
    };
    mutate(itemToAdd);
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Add New Item">
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
    </Modal>
  );
};
