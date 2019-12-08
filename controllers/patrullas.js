'use strict'

const Patrullas = require('../models/patrullas');

function create(req, res) {
    const patrulla = new Patrullas({
        email: req.body.email,
        nombre: req.body.nombre,
        serial: req.body.serial
       
    });
    patrulla.save((err) => {
        if (err) {
            res.status(500).send({ message: `Error al crear la patrulla: ${err}` });
        }
        else {
            return res.status(200).send({ message: `Patrulla creada` });
        }
    });

}

function read(req, res) {
    Patrullas.find({}, (err, patrullas) => {
        if (err) return res.status(500).send({ message: err })
        if (patrullas.length == 0) return res.status(404).send({ message: 'No hay patrullas' })

        res.status(200).send({patrullas})

    })
}


function delet(req, res) {
    Patrullas.findByIdAndRemove({ id: req.body.id }, (err) => {
            if (err) {
                res.status(500).send({ message: `Error al eliminar la patrulla: ${err}` });
            }
            else {
                res.status(200).send({ message: `patrulla eliminada` });
            }
        
    })
}

module.exports = {
    create,
    read,
    delet
}