import { Router } from "express";
import {
  createComment,
  deleteCommentById,
  getAllComments,
  getCommentById,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.get("/comment", getAllComments);
router.get("/comment/:id", getCommentById);
router.post("/comment", createComment);
router.patch("/comment/:id", updateComment);
router.delete("/comment/:id", deleteCommentById);

export default router;
