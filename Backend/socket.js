// socket.js
export function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log(" A user connected:", socket.id);

    socket.on("chatMessage", (msg) => {
      console.log(" Message received:", msg);
      // Broadcast to all clients
      io.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
      console.log(" User disconnected:", socket.id);
    });
  });
}
