'use strict'

const Patrullas = require('../models/patrullas');

function create(req, res){
    res.status(200).send({message: 'create_patrulla'});
}

function read(req, res){
    Patrullas.find({}, (err, patrullas) => {
        if (err) return res.status(500).send({ message: err })
        if (patrullas.length == 0) return res.status(404).send({ message: 'No hay patrullas' })
        
        res.status(200).send({patrullas: patrullas,})

      })
}

function update(req, res){
    res.status(200).send({message: 'update_patrulla'});
}

function delet(req, res){
    res.status(200).send({message: 'delet_patrulla'});
}

module.exports = {
    create,
    read,
    update,
    delet
}
