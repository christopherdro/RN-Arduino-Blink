'use strict';

let express = require('express');  
let httpServer = require('http').createServer();  
let five = require('johnny-five');
let io = require('socket.io')(httpServer);

let port = 3000; 

httpServer.listen(port);  
console.log('Server available at http://192.168.0.3:' + port);  

//Arduino board connection

let board = new five.Board();
let led, blinker;

board.on('ready', function() {  
  
  blinker = new five.Led(9);
  led = new five.Led.RGB({
    pins: {
      red: 6,
      green: 5,
      blue: 3
    }
  });
});

//Socket connection handler
io.on('connection', function (socket) {  
  console.log(`New Connection: ${socket.id}`);
  socket.on('led:on', function (data) {
     led.on();
     blinker.on();
     console.log('LED ON RECEIVED');
  });

  socket.on('led:off', function (data) {
    led.off();
    blinker.off();
    console.log('LED OFF RECEIVED');
  });

  socket.on('fade', function(data) {
    blinker.brightness(data);
  });

  socket.on('colorChange', function(data) {
    led.color(data);
  });
});

console.log('Waiting for connection');