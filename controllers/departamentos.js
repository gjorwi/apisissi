var mongoose = require('../modelos/departModel'),
Departamentos = mongoose.model('Departamentos');
var multiFunct = require('../extFunction/utilidades');//multiFunc llamaddo

// controllers/instituciones.js
const express = require('express');

// Definir el controlador
exports.getDepartController = async (req, res) => {
  const filter = { status: true };
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
      mensaje: 'Error inesperado',
      data:error
    };
    res.json(respuesta);
  }
};

exports.addDepartController = async (req, res) => {
  const {departName,departDescripcion}=req.body
  let departCod=0;
  const filter = { departName: departName.toUpperCase(),status:true };
  // console.log(dep)
  try {
    //Verificar si ya existe
    let resultFindDepartamento = await Departamentos.find(filter).exec();
    console.log('Result: '+ resultFindDepartamento)
    if(resultFindDepartamento?.length>0){
      var respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'El departamento ya se encuentra registrado',
        data:[]
      };
      res.json(respuesta);
      return
    }
    //Si no existe hacer...
    const findDepartCod = await Departamentos.find().sort({departCod: -1}).limit(1).select({departCod: 1, _id:0}).exec();
    if(findDepartCod?.length!=0){
      departCod=parseInt(findDepartCod[0].departCod)+1
      departCod= await multiFunct.addCeros(departCod,5);
    }else{
      departCod=1
      departCod= await multiFunct.addCeros(departCod,5);
    }
    var data={
      departCod:departCod,
      departName:departName.toUpperCase(),
      departDescripcion:departDescripcion.toUpperCase()
    }
    var newDepartamento= new Departamentos(data);
    let newDepartamentoSave = await newDepartamento.save();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'El departamento ha sido agregado',
      data:newDepartamentoSave
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

exports.deleteDepartController = async (req, res) => {
  const {_id}=req.body
  const filter = { _id: _id };
  const update = { status: false };

  try {
    const deleteDepart = await Departamentos.findOneAndUpdate(filter, update, {new: true,includeResultMetadata: true}).exec();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'El departamento ha sido eliminado',
      data:deleteDepart
    };
    if(deleteDepart.value==null){
      respuesta.mensaje='El departamento no pudo ser eliminado'
    }
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
