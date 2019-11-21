'use strict'

const Sensores = require('../models/sensores');

function create(req, res){
    return res.status(200).send({message: 'create_sensor'});
}

function read(req, res){
    Sensores.find({}, (err, sensores) => {
        if (err) return res.status(500).send({ message: err })
        if (sensores.length == 0) return res.status(404).send({ message: 'No hay sensores' })
        
        res.status(200).send({sensores: sensores,})

      })
}

function update(req, res){
    return res.status(200).send({message: 'update_sensor'});
}

function delet(req, res){
    return res.status(200).send({message: 'delet_sensor'});
}

module.exports = {
    create,
    read,
    update,
    delet
}