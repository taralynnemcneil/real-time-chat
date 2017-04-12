http://www.jb51.net/article/71658.htm
https://github.com/sheila1227/ChatRoom-AngularJS

1. npm init

2. edit package.json
"dependencies": {
  "express": "^4.13.3",
  "socket.io": "^1.3.6"
 }

3. add app.js in root folder

var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.on('connection',function(socket){
  socket.on('addUser',function(data){ // when new user enters chat room
  });

  socket.on('addMessage',function(data){ // when a user send a message
  });
  
  socket.on('disconnect', function () { // when a user leaves chat room
  );
});

http.listen(3002, function () {
  console.log('listening on *:3002');
});

====================================
-addUser Event

check if username is taken, if not:

socket.emit('userAddingResult',{result:true});

allUsers.push(data); //allUsers save all users

socket.emit('allUser',allUsers); // send all online user list to the new user
socket.broadcast.emit('userAdded',data); // broadcast welcome message, visible to all users except the newly entered user

-addMessage Event

// send direct message to a user
connectedSockets[nickname].emit('messageAdded',data)

// send group message
socket.broadcast.emit('messageAdded',data);

-disconnect
// user leaves chat room
a)// goup notice: Username leaves chat room
socket.broadcast.emit('userRemoved', data);

b) remove user from users data
c) remove corresponding socket instance from data that contains all client side socket instances
delete connectedSockets[nickname];

Run node app.js to check
====================================
4. add public folder
5. add index.html, add bootstrap, angularjs, socket.io,jQ, clientJs and css

<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title></title>
  <link href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="./assets/style/app.css"/>
  <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
  <script src="/socket.io/socket.io.js"></script>
  <script src="//cdn.bootcss.com/angular.js/1.4.3/angular.min.js"></script>
  <script src="./assets/js/app.js"></script>
</head>
<body></body>
</html>

6. add assets folder > js folder, style folder
7. config module and controller in js file
	add two services(factory)[line4-34]: socket to encapsulate events to angular context
			  randomcolor to generate random color to user avatar

	add two directive: message and user

8. edit login form and chatroom on index.html

<!-- chat room -->
<div class="chat-room-wrapper" ng-show="hasLogined">
...
</div>
<!-- end of chat room -->

<!-- login form -->
<div class="userform-wrapper" ng-show="!hasLogined">
...
</div>
<!-- end of login form -->

9. config js

 $scope.login = function() { //login
   socket.emit("addUser", {...});
 }

 // receive login result
 socket.on('userAddingResult', function(data) {
   if (data.result) {
     $scope.hasLogined = true;

   } else { // nickname is taken
     $scope.hasLogined = false;
   }
 });

10. config controller in app.js chatCtrl 
include the following socket listen

// receive new user info, show system welcome msg, refresh user list

socket.on('userAdded', function(data) {});

// receive all user info, initiate user list

socket.on('allUser', function(data) {});

// receive user left notification, refresh user list

socket.on('userRemoved', function(data) {});

// receive new msg, add to chat history

socket.on('messageAdded', function(data) {});

11. add two directives: message and user, add corresponding html

//message: js

app.directive('message', ['$timeout',function($timeout) {
  return {
    restrict: 'E',
    templateUrl: 'message.html',
    scope:{
      info:"=",
      self:"=",
      scrolltothis:"&"
    },
    link:function(scope, elem, attrs){
        $timeout(scope.scrolltothis);
    }
  };
}])

//message: html
<div ng-switch on="info.type">
  <!-- welcome msg -->
  <div class="system-notification" ng-switch-when="welcome"></div>
  <!-- leaving msg -->
  <div class="system-notification" ng-switch-when="bye"></div>
  <!-- chat msg -->
  <div class="normal-message" ng-switch-when="normal" ng-class="{others:self!==info.from,self:self===info.from}">
    <div class="name-wrapper">{{info.from}} @ {{time | date: 'HH:mm:ss' }}</div>
    <div class="content-wrapper">{{info.text}}<span class="avatar"></span></div>
  </div>
</div>

//notes:
//in message.html, use ng-switch directive to listen to the value of info.type,
//show different content according to its value.
//i.e. when info.type = "welcome", create one dom node, delete the two div below

//in order to differentiate sent messages and received messages, you need to gieve the 
//messages different style. to achieve this, use ng-class directive

ng-class="{others:self!==info.from,self:self===info.from}"

// when self===infomfrom  returns true, use class self, else return class others
