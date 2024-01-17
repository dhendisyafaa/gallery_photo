import { Router } from "express";
import {
  createAlbum,
  deleteAlbumById,
  getAlbumById,
  getAllAlbums,
  updateAlbum,
} from "../controllers/album.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const albumRouter = Router();

albumRouter.get("/album", getAllAlbums);
albumRouter.get("/album/:id", getAlbumById);
albumRouter.post("/album", authenticate, createAlbum);
albumRouter.patch("/album/:id", authenticate, updateAlbum);
albumRouter.delete("/album/:id", authenticate, deleteAlbumById);

export default albumRouter;
