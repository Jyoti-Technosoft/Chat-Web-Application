import { Server } from "socket.io";

import * as constants from '../const/constant.js';
import chatRoom from '../controllers/chatMessage.js'

export function startSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    let cureentChatId = "";
    socket.join("clock-room");

    socket.on(constants.SET_CURRENT_USER_CHAT, (value) => {
      cureentChatId = value;
    });

    socket.on(constants.SEND_MESSAGE, async (value) => {
      const ans = await chatRoom.sendMessage(value);
      if (cureentChatId == value.reciver) {
        io.to("clock-room").emit(constants.EMIT_SEND_MESSAGE, ans);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("close", reason);
    });
  });
}
