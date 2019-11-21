'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var UserSchema = Schema({
    name: String,
    email: String,
    password: String,
    descripcion: String,
    role: String, 
    image: Buffer,
    activar: String,
    alertaId: [String],
    sensoresId: [String],
    patrullaId: [String]
    
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('User', UserSchema);