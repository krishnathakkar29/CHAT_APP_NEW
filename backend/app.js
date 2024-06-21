import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import chatRouter from "./routes/chat.js";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { v2 as cloudinary } from 'cloudinary';

const app = express();

const port = process.env.PORT || 8080;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/chat", chatRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is listening on port ${port} in ${envMode} mode`);
});

export {envMode}