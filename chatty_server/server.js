// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const faker = require('faker')

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};

var colors = ['tomato', 'cornflowerblue', 'bisque', 'chocolate', 'salmon', 'honeydew'];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (socket) => {
  var randomColor = colors[getRandomInt(0, colors.length -1)];
  var usersOnline = {
    type: 'number',
    number: wss.clients.length
  };

  console.log('Clients connected:', wss.clients.length);
  wss.broadcast(JSON.stringify(usersOnline));
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  socket.on('close', () => {
    console.log('Client disconnected', wss.clients.length);
    usersOnline.number = wss.clients.length;
    wss.broadcast(JSON.stringify(usersOnline));
  });


  socket.on('message', (rawMessage) => {
    const message = JSON.parse(rawMessage);
    var newId = uuid.v1();

    if (message.type === 'postMessage') {
      message.id = newId;
      message.type = 'incomingMessage';
      message.color = randomColor;
      if (message.username === '') {
        message.username = 'Anonymous';
      };
      // console.log(message);
      wss.broadcast(JSON.stringify(message));
    };
    if (message.type === 'postNotification') {
      message.id = newId;
      message.type = 'incomingNotification';
      wss.broadcast(JSON.stringify(message));
    };
  });

});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}