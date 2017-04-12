
var app=angular.module("chatRoom",[]);

// add socket service to encapsulate events to angular context
app.factory('socket', function($rootScope) {
    var socket = io(); 
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                

            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                

            });
        }
    };
});

// add randomColor service to generate random color to user avatar
app.factory('randomColor', function($rootScope) {
    return {
       
    };
});

app.factory('userService', function($rootScope) {
    return {
        get: function(users,nickname) {
            if(users instanceof Array){
                for(var i=0;i<users.length;i++){
                    if(users[i].nickname===nickname){
                        return users[i];
                    }
                }
            }else{
                return null;
            }
        }
    };
});

app.controller("chatCtrl",['$scope','socket','randomColor','userService',function($scope,socket,randomColor,userService){
    var messageWrapper= $('.message-wrapper');
    $scope.hasLogined=false;
    $scope.receiver="";// default as group message
    $scope.publicMessages=[];// group message
    $scope.privateMessages={};// pm
    $scope.messages=$scope.publicMessages;// show group message by default
    $scope.users=[];//
    // color of current user avatar
    $scope.color=randomColor.newColor();
    // login and enters chat room
    $scope.login=function(){  
       

    }
    $scope.scrollToBottom=function(){
        messageWrapper.scrollTop(messageWrapper[0].scrollHeight);
    }

    $scope.postMessage=function(){
        var msg={text:$scope.words,type:"normal",color:$scope.color,from:$scope.nickname,to:$scope.receiver};
        var rec=$scope.receiver;
        if(rec){ 
            // private message
           if(!$scope.privateMessages[rec]){
               
           }
            $scope.privateMessages[rec].push(msg);
        }else{ 
            // group message
           
        }
        $scope.words="";
        if(rec!==$scope.nickname) { 
            // exclude the condition that send pm to oneself
            
        }
    }
    $scope.setReceiver=function(receiver){
        $scope.receiver=receiver;
        if(receiver){ //pm
            if(!$scope.privateMessages[receiver]){
               
            }
            $scope.messages=$scope.privateMessages[receiver];
        }else{//brodcast
            
        }
        var user=userService.get($scope.users,receiver);
        if(user){
            user.hasNewMessage=false;
        }
    }

    
    // receive login result
    socket.on('userAddingResult',function(data){
        if(data.result){
           
        }else{
            // nickname is taken
            
        }
    });

    
    // receive new user,
    // show welcome message,
    // refresh online users
    socket.on('userAdded', function(data) {
        
    });

    
    // receive online users info, initiate online list
    socket.on('allUser', function(data) {
        if(!$scope.hasLogined) return;
        $scope.users=data;
    });

    
    // receive users who leaves chat room, 
    // refresh online user list
    socket.on('userRemoved', function(data) {
        
    });

    
    // receive new messages, add to chat history
    socket.on('messageAdded', function(data) {
        if(!$scope.hasLogined) return;
        if(data.to){ // pm
            if(!$scope.privateMessages[data.from]){
                $scope.privateMessages[data.from]=[];
            }
            $scope.privateMessages[data.from].push(data);
        }else{// group
            $scope.publicMessages.push(data);
        }
        var fromUser=userService.get($scope.users,data.from);
        var toUser=userService.get($scope.users,data.to);
        if($scope.receiver!==data.to) {
             // receive notifications when receiver are NOT chatting with the sender
            if (fromUser && toUser.nickname) {
                fromUser.hasNewMessage = true;//pm
            } else {
                toUser.hasNewMessage = true;//group
            }
        }
    });
}]);

// add two directives: message and user, add corresponding html
app.directive('message', ['$timeout',function($timeout) {
    return {
        restrict: 
        templateUrl: 
        scope:
        link:
        
    };
}])
    .directive('user', ['$timeout',function($timeout) {
        return {
            restrict: 
            templateUrl: 
            scope:
            link:

        };
    }]);
