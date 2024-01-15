import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUserById);

export default router;
