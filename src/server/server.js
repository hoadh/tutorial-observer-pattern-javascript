const express = require('express');
const io = require('socket.io');
const http = require('http');
const PORT = 5000;
const app = express();
const httpServer = new http.Server(app);
httpServer.listen(PORT, () => console.log(`listening on *: ${PORT}`));

const socketServer = io(httpServer);
socketServer.on('connection', (socket) => {
  console.info('A new connection has established at ' + Date.now());
});

const messageList = require('./text-list');
const listLength = messageList.length;

function generate_random_time() {
  return  Math.random() * 10000;
}

function send_random_message() {
  setTimeout(send_random_message, generate_random_time());
  const randomIndex = Math.floor(Math.random() * listLength);
  socketServer.emit('chat-message', messageList[randomIndex]);
}

send_random_message();