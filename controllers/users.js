'use strict'
// Cargamos los modelos para usarlos posteriormente
const User = require('../models/users');
const service = require('../services');

function signUp(req, res){
    const user = new User({
        name: req.body.docs.name,
        email: req.body.docs.email,
        password: req.body.docs.password,
        role: req.body.docs.role,
        image: req.body.docs.image,
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
    User.find({ email: req.body.docs.email }, (err, user) => {
      if (err) return res.status(500).send({ message: err })
      if (!user) return res.status(404).send({ message: 'No existe el usuario' })
  
      req.user = user
      console.log(user[0].email)
      if(user[0].password != req.body.docs.password){
        res.status(200).send({
            message: 'usuario y password error',
          })
      }
      else{
        res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken(user)
          })
      }
      
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