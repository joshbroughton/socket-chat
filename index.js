const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('chat message', 'a user connected');
  socket.on('disconnect', () => {
    io.emit('chat message', 'user disconnected');
  });
});

io.on('connection', (socket) => {
  username = "Anonymous"
  socket.on('chat message', (msg) => {
    msg = username + ": " + msg
    io.emit('chat message', msg);
  });

  socket.on('update name', (name) => {
    username = name;
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
