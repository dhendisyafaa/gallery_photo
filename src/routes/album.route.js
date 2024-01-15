import { Router } from "express";
import {
  createAlbum,
  deleteAlbumById,
  getAlbumById,
  getAllAlbums,
  updateAlbum,
} from "../controllers/album.controller.js";

const router = Router();

router.get("/album", getAllAlbums);
router.get("/album/:id", getAlbumById);
router.post("/album", createAlbum);
router.patch("/album/:id", updateAlbum);
router.delete("/album/:id", deleteAlbumById);

export default router;
