import { Router } from "express";
import {
  deleteImageById,
  getAllImages,
  getImageById,
  getTrendingImages,
  getTrendingImagesByAlbum,
  updateImage,
  uploadImage,
} from "../controllers/image.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const imageRouter = Router();

imageRouter.get("/image", getAllImages);
imageRouter.get("/image/trending", getTrendingImages);
imageRouter.get("/image/trending/:id", getTrendingImagesByAlbum);
imageRouter.get("/image/:id", authenticate, getImageById);
imageRouter.post("/image", authenticate, uploadImage);
imageRouter.patch("/image/:id", authenticate, updateImage);
imageRouter.delete("/image/:id", authenticate, deleteImageById);

export default imageRouter;
