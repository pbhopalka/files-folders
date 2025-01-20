import { Request, Response } from "express";
import Folder from "../models/folder";

export const getFolders = async (_req: Request, res: Response) => {
  const folders = await Folder.findAll();
  res.json(folders);
};

export const createFolder = async (req: Request, res: Response) => {
  const { name, isOpen, order } = req.body;
  const newFolder = await Folder.create({ name, isOpen, order });
  res.status(201).json(newFolder);
};

export const updateFolder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, isOpen, order } = req.body;

  const folder = await Folder.findByPk(id);
  if (!folder) {
    return res.status(404).json({ message: "Folder not found" });
  }

  await folder.update({ name, isOpen, order });
  res.json(folder);
};

export const deleteFolder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const folder = await Folder.findByPk(id);
  if (!folder) {
    return res.status(404).json({ message: "Folder not found" });
  }

  await folder.destroy();
  res.status(204).send();
};
