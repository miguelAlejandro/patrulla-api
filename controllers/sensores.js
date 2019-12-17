'use strict'

const Sensores = require('../models/sensores');

function create(req, res) {
    const sensor = new Sensores({
        nombre: req.body.nombre,
        email: req.body.email,
        codigo: req.body.codigo,
        ejeX : req.body.ejeX,
        ejeY : req.body.ejeY
       
    });
    sensor.save((err) => {
        if (err) {
            res.status(500).send({ message: `Error al crear la sensor: ${err}` });
        }
        else {
            return res.status(200).send({ message: `Sensor creado` });
        }
    });

}

function read(req, res) {
    Sensores.find({}, (err, sensores) => {
        if (err) return res.status(500).send({ message: err })
        if (sensores.length == 0) return res.status(404).send({ message: 'No hay sensores' })

        res.status(200).send({sensores})

    })
}


function delet(req, res) {
    Sensores.findByIdAndRemove(req.body.id, (err) => {

            if (err) {
                res.status(500).send({ message: `Error al eliminar el sensor: ${err}` });
            }
            else {
                return res.status(200).send({ message: `sensor eliminada` });
            }
    })
}

module.exports = {
    create,
    read,
    delet
}