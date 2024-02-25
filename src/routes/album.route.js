import { Router } from "express";
import {
  createAlbum,
  deleteAlbumById,
  getAlbumById,
  getAlbumByUser,
  getAlbumsBySearch,
  getAlbumsLength,
  getAllOfficialAlbums,
  getAllUserAlbums,
  updateAlbum,
} from "../controllers/album.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const albumRouter = Router();

albumRouter.get("/albums-length", authenticate, getAlbumsLength);
albumRouter.get("/album", getAllUserAlbums);
albumRouter.get("/album/search", getAlbumsBySearch);
albumRouter.get("/official-album", getAllOfficialAlbums);
albumRouter.get("/album/user", getAlbumByUser);
albumRouter.get("/album/:id", getAlbumById);
albumRouter.post("/album", authenticate, createAlbum);
albumRouter.patch("/album/:id", authenticate, updateAlbum);
albumRouter.delete("/album/:id", authenticate, deleteAlbumById);

export default albumRouter;
