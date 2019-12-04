'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var SensoresSchema = Schema({
    nombre: String,
    email: String,
  
    serial: String,
   
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Sensores', SensoresSchema);