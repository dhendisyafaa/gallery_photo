import { Router } from "express";
import {
  deleteAvatarUser,
  deleteUserById,
  getAllUsers,
  getAvatarUser,
  getUserById,
  getUserByUsername,
  getUserStatistics,
  getUsersLength,
  updateAvatarUser,
  updateUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const userRouter = Router();

userRouter.get("/user-statistics", getUserStatistics);
userRouter.get("/users-length", authenticate, getUsersLength);
userRouter.get("/user", authenticate, getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.get("/user/username/:username", getUserByUsername);
userRouter.get("/user/avatar/:id", authenticate, getAvatarUser);
userRouter.patch("/user/avatar/:id", authenticate, updateAvatarUser);
userRouter.delete("/user/avatar/:id", authenticate, deleteAvatarUser);
userRouter.patch("/user/:id", authenticate, updateUser);
userRouter.delete("/user/:id", authenticate, deleteUserById);

export default userRouter;
