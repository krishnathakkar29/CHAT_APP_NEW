import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import { multerUpload } from "../middlewares/multer.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newGroupValidator(), validateHandler, newGroupChat);
app.get("/my", getMyChats);
app.get("/my/groups", getMyGroups);

app.put("/addMembers", addMemberValidator(), validateHandler, addMembers);

app.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);

app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

app.post(
  "/message",
  multerUpload.array("files", 5),
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);

app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

app
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default app;
