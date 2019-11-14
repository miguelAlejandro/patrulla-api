'use strict'

const Sensores = require('../models/sensores');

function create(req, res){
    return res.status(200).send({message: 'create_sensor'});
}

function read(req, res){
    return res.status(200).send({message: 'read_sensor'});
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