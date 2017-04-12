var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
// initialize a new instance of socket.io by passing the http (the HTTP server) object


app.use(express.static(__dirname + '/public'));

// serving html
app.get('/', function (req, res) {
    
});

var connectedSockets={};
// initiate
var allUsers=[{}]; 

io.on('connection',function(socket){


    socket.on('addUser',function(data){ // New user enters chat room
        if(connectedSockets[data.nickname]){// nickname is taken
          
        }else{
            socket.emit('userAddingResult',{result:true});
            socket.nickname=data.nickname;
            // save each socket instance, will use when send direct message
           
            // broadcast welcome message, visible to all users except newly entered user
            
            // send all online user to new user
           
        }

    });

    // send message
    socket.on('addMessage',function(data){ 
       
        if(data.to){
             // send direct message to a user
            
        }else{// send group message
            // broadcast message, visible to all users except sender
           
        }

    });


    // user leaves chat room
    socket.on('disconnect', function () {  //有用户退出聊天室
            // broadcast message that a user left
            socket.broadcast.emit('userRemoved', {  //广播有用户退出
               
            });
            // remove user from users data
            
            // remove corresponding socket instance from data that contains all client side socket instances
           

        }
    );
});

// listen on the connection event for incoming sockets, log it to the console.
