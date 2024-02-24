import { Router } from "express";
import {
  loginUser,
  loginWithGoogle,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/login-google", loginWithGoogle);
authRouter.get("/refresh", refreshToken);

export default authRouter;
