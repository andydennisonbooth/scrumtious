// Generated by CoffeeScript 1.10.0

/* server.js */

(function() {
  var db, io;

  io = require('socket.io')(require('./app').server);

  db = require('./app').db;

  io.on('connection', function(socket) {
    socket.on('handshake', function(fingerprint) {
      return db.collection('boards').findOne({
        'fingerprint': fingerprint
      }, function(err, item) {
        return socket.emit('initialize', item.data);
      });
    });
    return socket.on('disconnect', function() {
      return console.log('connlost');
    });
  });

}).call(this);
