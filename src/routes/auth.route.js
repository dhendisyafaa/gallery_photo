import { Router } from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/refresh", refreshToken);

export default authRouter;
