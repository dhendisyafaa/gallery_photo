import { Router } from "express";
import albumRouter from "./album.route.js";
import authRouter from "./auth.route.js";
import commentRouter from "./comment.route.js";
import imageRouter from "./image.route.js";
import likeRouter from "./like.route.js";
import reportRouter from "./report.route.js";
import responseReportRoute from "./responseReport.route.js";
import userRouter from "./user.route.js";

const router = Router();

router.use("/api", authRouter);
router.use("/api", userRouter);
router.use("/api", albumRouter);
router.use("/api", imageRouter);
router.use("/api", commentRouter);
router.use("/api", likeRouter);
router.use("/api", reportRouter);
router.use("/api", responseReportRoute);

export default router;
