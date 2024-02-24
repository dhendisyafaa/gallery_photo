import { Router } from "express";
import {
  deleteAvatarUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateAvatarUser,
  updateUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const userRouter = Router();

userRouter.get("/user", authenticate, getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.get("/user/username/:username", getUserByUsername);
userRouter.patch("/user/avatar/:id", authenticate, updateAvatarUser);
userRouter.delete("/user/avatar/:id", authenticate, deleteAvatarUser);
userRouter.patch("/user/:id", authenticate, updateUser);
userRouter.delete("/user/:id", authenticate, deleteUserById);

export default userRouter;
