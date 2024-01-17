import cors from "cors";
import express from "express";
import upload from "../configs/multer.js";
import router from "../routes/index.js";

const app = express();

// middlewares
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use(upload.single("data_image"));

// routers
app.use(router);

export default app;
