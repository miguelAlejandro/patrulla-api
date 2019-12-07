'use strict'

const Alertas = require('../models/alertas');

function create(req, res) {
    console.log(req.body);
    const alerta = new Alertas({
        nombre: req.body.nombre,
        email: req.body.email,
        emailDestino: req.body.emailDestino,
        ubicacion: req.body.ubicacion,
        informacion: req.body.informacion,
        serial: req.body.serial
    });
    
    alerta.save((err) => {
        if (err) {
            res.status(500).send({ message: `Error al crear la alerta: ${err}` });
        }
        else {
            return res.status(200).send({ message: `Alerta creada` });
        }
    });

}

function read(req, res) {
    Alertas.find({}, (err, alertas) => {
        if (err) return res.status(500).send({ message: err })
        if (alertas.length == 0) return res.status(404).send({ message: 'No hay alertas' })

        res.status(200).send({alertas})

    })
}


function delet(req, res) {
    Alertas.find({ id: req.body.docs.id }, (err, alert) => {
        alert.remove((err) => {
            if (err) {
                res.status(500).send({ message: `Error al eliminar la alerta: ${err}` });
            }
            else {
                return res.status(200).send({ message: `Eliminada la alerta`});
            }
        });
    })
}

module.exports = {
    create,
    read,
    delet
}
