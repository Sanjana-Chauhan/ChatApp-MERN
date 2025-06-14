// server.js
import express from "express";
import http from "http";
import cors from "cors";
import { configDotenv } from "dotenv";
import { setupSocket } from "./socket.js"; 

const app = express();
app.use(cors());
configDotenv();
const server = http.createServer(app);

// Pass server to the Socket.IO setup
setupSocket(server);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

const PORT=process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server running on http://localhost:", PORT);
});
