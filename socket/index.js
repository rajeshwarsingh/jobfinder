// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const socketEvents = require('./utils/socket'); 

// const port = process.env.PORT || 4001;
// const index = require("./route/index");

// const app = express();
// app.use(index);

// const server = http.createServer(app);

// const io = socketIo(server);

// let interval;

// // io.on("connection", (socket) => {
// //   console.log("New client connected");

// //   if (interval) {
// //     clearInterval(interval);
// //   }
// //   interval = setInterval(() => getApiAndEmit(socket), 1000);
// //   socket.on("disconnect", () => {
// //     console.log("Client disconnected");
// //     clearInterval(interval);
// //   });

// //   socket.on('testEmit',(data)=>{
// //     console.log('get Data :',data)
// //   })

// // });

// // const getApiAndEmit = socket => {
// //   const response = new Date();
// //   // Emitting a new message. Will be consumed by the client
// //   socket.emit("FromAPI", response);
// // };
// new socketEvents(this.socket).socketConfig();
// server.listen(port, () => console.log(`Listening on port ${port}`));



/*
* @author Shashank Tiwari
* Showing online users using Nodejs and Socket.io
*/

'use strict';

const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

const config = require('./utils/config');
const socketEvents = require('./utils/socket'); 
const routes = require('./utils/routes');
// const hostName = 'https://jugaad-socket.herokuapp.com'
class Server{

    constructor(){
        this.port =  process.env.PORT || 3002;
        this.host = process.env.HOST?process.env.HOST:`127.0.0.1`;
        
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http,{
            cors: {
              origin: '*',
            }
          });
        // this.socket.origins(['http://localhost:3000/','http://localhost:3000','http://localhost:3000/chatapp'])
    }

    appConfig(){        
        this.app.use(
            bodyParser.json()
        );
        new config(this.app);
    }

    /* Including app Routes starts*/
    includeRoutes(){
        new routes(this.app).routesConfig();
        new socketEvents(this.socket).socketConfig();
    }
    /* Including app Routes ends*/  

    appExecute(){

        this.appConfig();
        this.includeRoutes();

        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }

}

const app = new Server();
app.appExecute();