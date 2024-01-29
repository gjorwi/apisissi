var mongoose = require('../modelos/departModel'),
Departamentos = mongoose.model('Departamentos');
var multiFunct = require('../extFunction/utilidades');//multiFunc llamaddo

// controllers/instituciones.js
const express = require('express');

// Definir el controlador
exports.getHomeController = async (req, res) => {
  try {
    // const getAll = await Departamentos.find(filter).exec();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'hola',
      data:[]
    };
    res.json(respuesta);

  } catch (error) {
    console.log(error)
    var respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'Error inesperado',
      data:error
    };
    res.json(respuesta);
  }
};