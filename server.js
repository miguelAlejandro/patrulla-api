'use strict'
const config = require('./config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var routes = require('./routes');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });
app.use('/api', routes);


mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {

        console.log("La conexión a la base de datos curso_mean_social se ha realizado correctamente")

        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(config.port, function () {
            console.log('Example app listening on port 3000!');
            app.get('/', function (req, res) {
                res.send({ message: 'API patrulla' });
            });
        })
    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));