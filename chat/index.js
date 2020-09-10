var express = require('express');
var app = require('express');
var http = require('http').createServer(app);
var server = http.createServer(app);
var io = require('socket.io').listen(server);


server.listen(8888);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

/*app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
*/
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  });
  
  //http.listen(3000, () => {
    //console.log('listening on *:3000');
  //});

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

  io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });