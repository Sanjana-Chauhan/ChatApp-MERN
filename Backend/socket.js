// socket.js
import { Server } from "socket.io";

let users = []; // global array to track users

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("set_nickname", (nickname) => {
      socket.nickname = nickname;

      // Avoid duplicates: remove if already present (edge case)
      users = users.filter((u) => u.id !== socket.id);
   
      users.push({ id: socket.id, name: nickname ,online:true});

      io.emit("user_list", users); // broadcast full list
      io.emit("user_joined", nickname); // system message
    });

    socket.on("chat-message", (data) => {
      const sender = socket.nickname || "Anonymous";
      const messageData = {
        ...data,
        from: sender,
      };
      socket.broadcast.emit("chat-message", messageData);
    });

    socket.on("disconnect", () => {
      const nickname = socket.nickname || "Someone";

      // Remove from users list
      users = users.filter((u) => u.id !== socket.id);

      io.emit("user_list", users); // update the client list
      socket.broadcast.emit("user_left", `${nickname} left the chat`);
    });
  });
};
