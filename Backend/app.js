// server.js
import express from "express";
import http from "http";
import cors from "cors";
import { setupSocket } from "./socket.js"; // <-- import from socket file

const app = express();
app.use(cors());

const server = http.createServer(app);

// Pass server to the Socket.IO setup
setupSocket(server);

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
