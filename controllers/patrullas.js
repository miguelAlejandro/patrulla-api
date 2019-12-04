'use strict'

const Patrullas = require('../models/patrullas');

function create(req, res) {
    const patrulla = new Patrullas({
        email: req.body.docs.email,
        nombre: req.body.docs.nombre,
        patrullaId: req.body.docs.patrullaId
       
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
    Patrullas.find({}, (err, patrulla) => {
        if (err) return res.status(500).send({ message: err })
        if (patrulla.length == 0) return res.status(404).send({ message: 'No hay patrullas' })

        res.status(200).send({ patrulla: patrulla, })

    })
}


function delet(req, res) {
    Patrullas.find({ id: req.body.docs.id }, (err, patrulla) => {
        patrulla.remove((err) => {
            if (err) {
                res.status(500).send({ message: `Error al eliminar la patrulla: ${err}` });
            }
            else {
                return res.status(200).send({ message: `patrulla eliminada` });
            }
        });
    })
}

module.exports = {
    create,
    read,
    delet
}