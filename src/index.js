import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import upload from "./configs/multer.js";

dotenv.config();

import albumRoutes from "./routes/album.route.js";
import authRoutes from "./routes/auth.route.js";
import commentRoutes from "./routes/comment.route.js";
import imageRoutes from "./routes/image.route.js";
import likeRoutes from "./routes/like.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use(upload.single("data_image"));

// routes
app.use(authRoutes);
app.use(userRoutes);
app.use(albumRoutes);
app.use(imageRoutes);
app.use(commentRoutes);
app.use(likeRoutes);

app.listen(PORT, () => {
  console.log(`server up and running in port ${PORT}`);
});
