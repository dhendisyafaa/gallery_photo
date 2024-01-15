import { Router } from "express";
import {
  createLike,
  deleteLikeById,
  getAllLikes,
} from "../controllers/like.controller.js";

const router = Router();

router.get("/like", getAllLikes);
router.post("/like", createLike);
router.delete("/like/:id", deleteLikeById);

export default router;
