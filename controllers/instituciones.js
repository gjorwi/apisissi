var mongoose = require('../modelos/InstModel'),
Instituciones = mongoose.model('Instituciones');
var multiFunct = require('../extFunction/utilidades');//multiFunc llamaddo

// controllers/instituciones.js
const express = require('express');

// Definir el controlador
exports.getInstController = async (req, res) => {
  const filter = { status: true };
  try {
    const getAll = await Instituciones.find(filter).exec();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Consulta de instituciones extraidas',
      data:getAll
    };
    console.log(respuesta)
    res.json(respuesta);
  } catch (error) {
    console.log(err)
    var respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'Error inesperado',
      data:err
    };
    
    res.json(respuesta);
  }
};
exports.getIdInstController = async (req, res) => {
  const {id}=req.params
  const filter = { status: true, _id:id};
  try {
    const getOne = await Instituciones.findOne(filter).exec();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Consulta de institucion extraida',
      data:getOne
    };
    console.log(respuesta)
    res.json(respuesta);
  } catch (error) {
    console.log(err)
    var respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'Error inesperado',
      data:err
    };
    
    res.json(respuesta);
  }
};

exports.addInstController = async (req, res) => {
  const {instName,instDireccion,instDescripcion}=req.body
  let instCod=0;
  const filter = { instName: instName.toUpperCase(),status:true };
  try {
    //Verificar si ya existe
    let resultFindInstitucion = await Instituciones.find(filter).exec();
    if(resultFindInstitucion?.length>0){
      var respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'La Institucion ya se encuentra registrada',
        data:[]
      };
      res.json(respuesta);
      return
    }
    //Si no existe hacer...
    const findInstCod = await Instituciones.find().sort({instCod: -1}).limit(1).select({instCod: 1, _id:0}).exec();
    if(findInstCod.length!=0){
      instCod=parseInt(findInstCod[0].instCod)+1
      instCod= await multiFunct.addCeros(instCod,5);
    }else{
      instCod=1
      instCod= await multiFunct.addCeros(instCod,5);
    }
    var data={
      instCod:instCod,
      instName:instName.toUpperCase(),
      instDireccion:instDireccion.toUpperCase(),
      instDescripcion:instDescripcion.toUpperCase()
    }
    var newInstitucion= new Instituciones(data);
    let newInstitucionSave = await newInstitucion.save();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'La institucion ha sido agregada',
      data:newInstitucionSave
    };
    res.json(respuesta);
  } catch (error) {
    console.log(err)
    var respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'Error inesperado',
      data:err
    };
    res.json(respuesta);
  }
};

exports.deleteInstController = async (req, res) => {
  const {_id}=req.body
  let instCod=0;
  console.log(_id)
  const filter = { _id: _id };
  const update = { status: false };

  try {
    const deleteInst = await Instituciones.findOneAndUpdate(filter, update, {new: true,includeResultMetadata: true}).exec();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'La institucion ha sido eliminada',
      data:deleteInst
    };
    if(deleteInst.value==null){
      respuesta.mensaje='La Institucion no pudo ser eliminada'
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
