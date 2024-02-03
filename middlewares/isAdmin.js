// Crear un nuevo archivo llamado `middleware.js`
var mongoose = require('../modelos/usuModel'),
Usuarios = mongoose.model('Usuarios');
const express = require('express');

// Definir la función `isAdmin`
exports.isAdmin = async (req, res, next) =>{
  // Obtener el ID de usuario de la solicitud
  const {usuId} = req.body;

  // Consultar la base de datos para obtener el campo "admin" del usuario
  const isAdmin = await Usuarios.findById(usuId).select('admin');

  // Si el usuario no es administrador, devolver un error
  if (!isAdmin) {
    var respuesta = {
      error: true,
      codigo: 403,
      mensaje: 'El usuario no es administrador',
      data:[]
    };
    return res.json(respuesta);;
  }

  // Si el usuario es administrador, continuar con la solicitud
  next();
}
