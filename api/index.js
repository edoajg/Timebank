'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//conex db

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/timebank', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
          console.log("La conexion a la base de datos timebank se ha realizado correctamente")
          //crear server
          app.listen(port, () => {
            console.log("servidor corriendo en http://localhost:3800");
          });
      })
      .catch(err => console.log(err));
