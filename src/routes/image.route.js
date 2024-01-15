import { Router } from "express";
import {
  deleteImageById,
  getAllImages,
  getImageById,
  updateImage,
  uploadImage,
} from "../controllers/image.controller.js";

const router = Router();

router.get("/image", getAllImages);
router.get("/image/:id", getImageById);
router.post("/image", uploadImage);
router.patch("/image/:id", updateImage);
router.delete("/image/:id", deleteImageById);

export default router;
