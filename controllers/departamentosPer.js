var mongoose = require('../modelos/departModel'),
Departamentos = mongoose.model('Departamentos');
var multiFunct = require('../extFunction/utilidades');//multiFunc llamaddo

// controllers/instituciones.js
const express = require('express');

// Definir el controlador
exports.getDepartPerController = async (req, res) => {
  const {departId}=req.body
  
  filter = { status: true , _id: {$ne: departId}};
  try {
    const getAll = await Departamentos.find(filter).exec();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Consulta de Departamentos extraidas',
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