import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import chatRouter from "./routes/chat.js";
import userRouter from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { v2 as cloudinary } from "cloudinary";
import { Server } from "socket.io";
import http from "http";
import { corsOptions } from "./constants/config.js";
import cors from "cors";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

const port = process.env.PORT || 8080;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const userSocketIDs = new Map();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
connectDB();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/chat", chatRouter);

const user = {
  _id: "moimsd",
  name: "kt",
};

io.on("connection", (socket) => {
  console.log(`Joined ${socket.id}`);

  userSocketIDs.set(user._id, socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSockets = getSockets(members);

    try {
      await Message.create(messageForDB)
    } catch (error) {
      
    }

    io.to(membersSockets).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });

    io.to(membersSockets).emit(NEW_MESSAGE_ALERT, {chatId})


    console.log(messageForRealTime);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`server is listening on port ${port} in ${envMode} mode`);
});

export { envMode, userSocketIDs };
