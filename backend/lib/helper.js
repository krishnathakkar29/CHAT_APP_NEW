import { userSocketIDs } from "../app.js";

export const getOtherMember = (members, userId) => {
  return members.find(({ _id }) => _id.toString() != userId.toString());
};

export const getSockets = (users = []) => {
  let sockets = [];

  users.forEach((user) => {
    const userId = user.toString();
    const socketId = userSocketIDs.get(userId);

    sockets.push(socketId);
  });

  return sockets;
};
export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
