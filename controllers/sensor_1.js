'use strict'

const Sensores = require('../models/sensor_1');

function create(req, res) {
    const sensor = new Sensores({
        value: req.body.value,
        name: req.body.name,
        time: req.body.time

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
    var data;
    Sensores.find({}, (err, sensores) => {
        if (err) return res.status(500).send({ message: err })
        if (sensores.length == 0) return res.status(404).send({ message: 'No hay sensores' })

        data = sensores[sensores.length - 1];
        var hora = new Date(data.time);
        
        res.status(200).send({ data, hora})

    })
}
function alertas(req, res) {
    Sensores.find({}, (err, sensores) => {
        if (err) return res.status(500).send({ message: err })
        if (sensores.length == 0) return res.status(404).send({ message: 'No hay sensores' })

        //De 8 am hasta 10pm Nivel maximos permitidos hasta 70db 
        var permitido_1 = [];

        //De 10:01pm a 7:50 am Niveles máximos permitidos 60 db 
        var permitido_2 = [];

        //Alertas generadas
        var alertas_1 = [];
        var alertas_2 = [];

        //filtrando los datos en dos grupos
        for (const inf in sensores) {
            const tiempoDelSensor = new Date(sensores[inf].time);
            if (tiempoDelSensor.getHours() >= 8 && tiempoDelSensor.getHours() <= 21) { 
                permitido_1[permitido_1.length] = sensores[inf]
            } 
            else { 
                permitido_2[permitido_2.length] = sensores[inf]
            }
        }

        var tiempo = 10;
        var minuto = 60;
        var muestreo = 5;
        var promedio = (tiempo*minuto)/muestreo;
        var suma = 0;

        //Algoritmo de las Alertas de 8 am hasta las 10pm mayores de 70db en un tiempo de 10 minutos del promedio
        for (const p in permitido_1) {
            if(promedio >= 1){
                suma += permitido_1[p].value;
                promedio -= 1;
            }
            else{
                promedio = (tiempo*minuto)/muestreo;
                suma = suma / promedio;
                if(suma >= 56){
                    console.log("alerta 0101")
                    var fecha = new Date(permitido_1[p]._doc.time);
                    alertas_1[alertas_1.length] = {time: fecha, name: permitido_1[p]._doc.name, serial : permitido_1[p]._doc.codigo}
                }
            }
        }

        //Algoritmo de las Alertas de 10:01pm hasta 7:50 am mayores de 70db en un tiempo de 10 minutos del promedio
        promedio = (tiempo*minuto)/muestreo;
        suma = 0;
        for (const p in permitido_2) {
            if(promedio >= 1){
                suma += permitido_2[p].value;
                promedio -= 1;

            }
            else{
                promedio = (tiempo*minuto)/muestreo;
                suma = suma / promedio;
                if(suma >= 60){
                    alertas_2[alertas_2.length] = {time: permitido_2[p].time, name: permitido_2[p].name, serial : permitido_2[p].codigo}
                }
            }
        }
        
        var alert = [alertas_1, alertas_2]
        res.status(200).send({ alert })

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
    delet,
    alertas
}