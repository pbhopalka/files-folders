import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(bodyParser.json());

// In-memory database structure
let storage: Record<string, string[]> = {
  root: [], // Root folder contains file/folder IDs
};

interface Item {
  id: string;
  name: string;
  type: "file" | "folder";
  icon?: string;
  isOpen?: boolean;
}

let itemMetadata: Record<string, Item> = {};

// Emit real-time updates
const emitUpdate = () => {
  const data = { storage, itemMetadata };
  console.log(data);
  io.emit("updateData", data);
};

// **GET all files and folders**
app.get("/api/data", (req, res) => {
  res.json(storage);
});

// **GET metadata information for all files and folders**
app.get("/api/item/metadata", (req, res) => {
  res.json(itemMetadata);
});

// **Create a new file**
app.post("/api/files", (req, res) => {
  const { title, folderId = "root" } = req.body;
  const fileId = `file-${uuidv4()}`;

  if (!storage[folderId]) {
    return res.status(404).json({ error: "Folder not found" });
  }

  const newItem: Item = { id: fileId, name: title, type: "file" };
  itemMetadata[fileId] = newItem;

  storage[folderId].push(fileId);

  emitUpdate();
  res.json({ id: fileId, title });
});

// **Create a new folder**
app.post("/api/folders", (req, res) => {
  const { name, parentId = "root" } = req.body;
  const folderId = `folder-${uuidv4()}`;

  if (!storage[parentId]) {
    return res.status(404).json({ error: "Parent folder not found" });
  }

  const newItem: Item = {
    id: folderId,
    name: name,
    type: "folder",
    isOpen: true,
  };
  itemMetadata[folderId] = newItem;

  storage[parentId].push(folderId);
  storage[folderId] = []; // Create a new empty folder entry

  emitUpdate();
  res.json({ id: folderId, name });
});

app.put("/api/folders", (req, res) => {
  const { folderId, isOpen } = req.body;

  itemMetadata[folderId] = { ...itemMetadata[folderId], isOpen };
  emitUpdate();
  res.json({ id: folderId, isOpen });
});

// **Move file or folder**
app.put("/api/move", (req, res) => {
  const { itemId, fromFolderId, toFolderId, toIndex } = req.body;

  if (!storage[fromFolderId] || !storage[toFolderId]) {
    return res.status(404).json({ error: "Folder not found" });
  }

  storage[fromFolderId] = storage[fromFolderId].filter((id) => id !== itemId);
  storage[toFolderId].splice(toIndex, 0, itemId);

  emitUpdate();
  res.json({ message: "Item moved successfully" });
});

// **Delete file or folder**
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;

  // Find and remove the item from its folder
  for (const folderId in storage) {
    storage[folderId] = storage[folderId].filter((itemId) => itemId !== id);
  }

  // If it's a folder, delete its entry
  if (storage[id]) {
    delete storage[id];
  }

  if (itemMetadata[id]) {
    delete itemMetadata[id];
  }

  emitUpdate();
  res.json({ message: "Item deleted successfully" });
});

// **Real-time updates via WebSockets**
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.emit("updateData", { storage, itemMetadata });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
