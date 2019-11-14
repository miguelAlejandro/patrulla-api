'use strict'

const Patrullas = require('../models/patrullas');

function create(req, res){
    res.status(200).send({message: 'create_patrulla'});
}

function read(req, res){
    res.status(200).send({message: 'read_patrulla'});
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
