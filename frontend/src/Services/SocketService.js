import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // replace with your backend URL

const SocketService = {
  connect: () => {
    if (!socket.connected) socket.connect();
  },

  disconnect: () => {
    if (socket.connected) socket.disconnect();
  },

  emitMessage: (data) => {
    socket.emit("chat-message", data);
  },

  emitNickname: (nickname) => {
    socket.emit("set_nickname", nickname);
  },

  onMessage: (callback) => {
    socket.on("chat-message", callback);
  },

  onUserJoined: (callback) => {
    socket.on("user_joined", callback);
  },

  onUserLeft: (callback) => {
    socket.on("user_left", callback);
  },

  offAll: () => {
    socket.off("chat-message");
    socket.off("user_joined");
    socket.off("user_left");
  },
};

export default SocketService;
