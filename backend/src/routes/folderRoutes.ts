import { Router } from "express";
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} from "../controllers/folderController";

const router = Router();

router.get("/", getFolders);
router.post("/", createFolder);
router.put("/:id", updateFolder);
router.delete("/:id", deleteFolder);

export default router;
