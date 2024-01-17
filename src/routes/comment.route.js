import { Router } from "express";
import {
  createComment,
  deleteCommentById,
  getAllComments,
  getCommentByImageId,
  updateComment,
} from "../controllers/comment.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const commentRouter = Router();

commentRouter.get("/comment", authenticate, getAllComments);
commentRouter.get("/comment/:id", getCommentByImageId);
commentRouter.post("/comment", authenticate, createComment);
commentRouter.patch("/comment/:id", authenticate, updateComment);
commentRouter.delete("/comment/:id", authenticate, deleteCommentById);

export default commentRouter;
