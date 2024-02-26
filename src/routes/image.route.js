import { Router } from "express";
import {
  addImageToAlbum,
  deleteImageById,
  deleteImageInAlbum,
  getAllImages,
  getImageById,
  getImageByUser,
  getImagesByAlbum,
  getImagesBySearch,
  getImagesLength,
  getTrendingImages,
  getTrendingImagesByAlbum,
  updateImage,
  uploadImage,
} from "../controllers/image.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const imageRouter = Router();

imageRouter.get("/images-length", authenticate, getImagesLength);
imageRouter.get("/image/", getAllImages);
imageRouter.get("/image/user", getImageByUser);
imageRouter.get("/image/search", getImagesBySearch);
imageRouter.get("/image/album/:id", getImagesByAlbum);
imageRouter.get("/image/trending", getTrendingImages);
imageRouter.get("/image/trending/:id", getTrendingImagesByAlbum);
imageRouter.get("/image/:id", getImageById);
imageRouter.post("/image-album", authenticate, addImageToAlbum);
imageRouter.post("/image", authenticate, uploadImage);
imageRouter.patch("/image/:id", authenticate, updateImage);
imageRouter.delete("/image-album", authenticate, deleteImageInAlbum);
imageRouter.delete("/image/:id", authenticate, deleteImageById);

export default imageRouter;
