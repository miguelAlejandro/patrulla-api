'use strict'
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var users_routes = require('./routes/users'); 
// var patrullas_routes = require('./routes/patrullas'); 
// var sensores_routes = require('./routes/sensores');
// app.use('/api/users', users_routes);
// app.use('/api/patrullas', patrullas_routes);
// app.use('/api/sensores', sensores_routes);



mongoose.connect('mongodb://localhost:27017/patrulla', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {

        console.log("La conexión a la base de datos curso_mean_social se ha realizado correctamente")

        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(4000, function () {
            console.log('Example app listening on port 3000!');
            app.get('/', function (req, res) {
                res.send('API Patrulla');
            });
        })
    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));