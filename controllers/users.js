'use strict'
// Cargamos los modelos para usarlos posteriormente
const User = require('../models/users');
const service = require('../services');

function signUp(req, res){
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        image: req.body.image,
    });
    user.save((err) => {
        if(err){
            res.status(500).send({message: 'Error al crear el usuario: ${err}'});
        }
        else{
            return res.status(200).send({token: service.createToken(user)});
        }
    });
}

function signIn (req, res) {
    User.find({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send({ message: err })
      if (!user) return res.status(404).send({ message: 'No existe el usuario' })
  
      req.user = user
      res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(user)
      })
    })
  }

function getUser(req, res){
    User.find({}, (err, docs) => {
        if(err) return res.status(500).send({message: 'Error al buscar el usuario: ${err}'});
        // if (!req.params.id) return res.status(404).send({message: `El id no existe`})
        res.send(200, { docs })
        
    });
}

module.exports = {
    signUp,
    signIn,
    getUser
}