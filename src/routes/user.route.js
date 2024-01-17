import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const userRouter = Router();

userRouter.get("/user", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.patch("/user/:id", authenticate, updateUser);
userRouter.delete("/user/:id", authenticate, deleteUserById);

export default userRouter;
