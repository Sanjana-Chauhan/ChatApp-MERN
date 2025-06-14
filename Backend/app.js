import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(` User connected: ${socket.id}`);

  socket.on('chat-message', (data) => {
    console.log(`Message received: ${data}`);
    socket.broadcast.emit('chat-message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log(' Server running on http://localhost:5000');
});
