let express = require("express")
const {listen} = require('socket.io')
var app= express()
var server = require('http').createServer(app)
var io = require('socket.io')(server);
let users =[];
let connections =[];
server.listen(3000)

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");

})
io.sockets.on('connection',function(socket){
    
    connections.push(socket);
    console.log("connected:socket connected",connections.length);
    socket.on("disconnect",function(data) {
        connections.splice(connections.indexOf(socket),1);
        console.log("disconnected:socket disconnected", connections.length);
    });
    socket.on("send message",function(data){
        console.log(data);
        io.sockets.emit('new message',{msg:data})
    });


   
});
console.log("server is listening!")