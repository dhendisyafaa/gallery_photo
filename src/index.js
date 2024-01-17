import dotenv from "dotenv";
dotenv.config();

import app from "./middlewares/index.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server up and running in port ${PORT}`);
});
