// Generated by CoffeeScript 1.10.0

/* app.js */

(function() {
  var app, bodyparser, express, mongodb, path;

  path = require('path');

  express = require('express');

  mongodb = require('mongodb');

  app = exports.app = express();

  app.use(express["static"](path.join(__dirname, 'public')));

  app.set('view engine', 'jade');

  app.use(require('express-session')({
    secret: require('node-uuid').v4(),
    resave: true,
    saveUninitialized: true
  }));

  app.use(require('cookie-parser')());

  bodyparser = require('body-parser');

  app.use(bodyparser.json());

  app.use(bodyparser.urlencoded({
    extended: true
  }));

  mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/scrumtious', function(err, database) {
    var server;
    if (err) {
      console.log(err);
      process.exit(1);
    }
    exports.db = database;
    console.log('Database connection ready');
    app.use('/', require('./routes'));
    app.set('port', process.env.PORT || 5000);
    server = exports.server = app.listen(app.get('port'), function() {
      var host, port;
      host = server.address().address;
      port = app.get('port');
      return console.log("Application server running at http://" + host + ":" + port);
    });
    return require('./socket');
  });

}).call(this);
