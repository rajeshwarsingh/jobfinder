const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require('mongoose');
const helper = require('./utils/helper');

const port = process.env.PORT || 4001;

const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});


let interval;

io.on("connection", (socket) => {

  let userID = socket.request._query['userId'];
  let userSocketId = socket.id;

  console.log('New client connected with', userID, ' userId and ', userSocketId, ' socketId')

  const data = {
    id: userID,
    value: {
      $set: {
        socketId: userSocketId,
        online: 'Y'
      }
    }
  }

  helper.addSocketId(data, (error, response) => {
    // next();
  });

  socket.on('testEmit',(data)=>{
    console.log('get Data :',data)
  })

  socket.on("disconnect", () => {

    console.log("Client disconnected", socket.id);
    setTimeout(() => {
      helper.isUserLoggedOut(socket.id, (response) => {
        if (response.loggedOut) {
          socket.broadcast.emit('chat-list-response', {
            error: false,
            userDisconnected: true,
            socketId: socket.id
          });
        }
      });
    }, 1000);
  });

  socket.on('logout',(data)=>{

    const userId = data.userId;
    helper.logout(userId , (error, result)=>{
        io.to(socket.id).emit('logout-response',{
            error : false
        });
        socket.disconnect();
    }); 
});


});


server.listen(port, () => console.log(`Listening on port ${port}`));