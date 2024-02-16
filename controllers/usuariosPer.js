var mongoose = require('../modelos/usuModel'),
Usuarios = mongoose.model('Usuarios');
var multiFunct = require('../extFunction/utilidades');//multiFunc llamaddo
const bcrypt = require('bcrypt');

// controllers/instituciones.js
const express = require('express');

// Definir el controlador
exports.getUsuPerController = async (req, res) => {
  const {usuDepartId,usuInstId}=req.body
  let filter = { status: true,usuDepartId:usuDepartId,usuInstId:usuInstId};
  if(!usuDepartId){
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Consulta de usuarios extraidas',
      data:[]
    };
    return res.json(respuesta);
  }
  try {
    const getAll = await Usuarios.find(filter).exec();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Consulta de usuarios extraidas',
      data:getAll
    };
    res.json(respuesta);

  } catch (error) {
    console.log(error)
    var respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'Error inesperado '+error,
      data:[]
    };
    res.json(respuesta);
  }
};