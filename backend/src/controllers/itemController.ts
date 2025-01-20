import { Request, Response } from "express";
import Item from "../models/item";

export const getItems = async (_req: Request, res: Response) => {
  const items = await Item.findAll();
  res.json(items);
};

export const createItem = async (req: Request, res: Response) => {
  const { title, icon, folderId, order } = req.body;
  const newItem = await Item.create({ title, icon, folderId, order });
  res.status(201).json(newItem);
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, icon, folderId, order } = req.body;

  const item = await Item.findByPk(id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  await item.update({ title, icon, folderId, order });
  res.json(item);
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  const item = await Item.findByPk(id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  await item.destroy();
  res.status(204).send();
};
