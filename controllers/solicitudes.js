var mongoose = require('../modelos/solModel'),
Solicitudes = mongoose.model('Solicitudes');
var mongoose2 = require('../modelos/usuModel'),
Usuarios = mongoose2.model('Usuarios');
var multiFunct = require('../extFunction/utilidades');//multiFunc llamaddo

// controllers/instituciones.js
const express = require('express');

// Definir el controlador
exports.getSolController = async (req, res) => {
  const {usuDepartId,usuInstId}=req.body
  const filter = { status: true ,solDepartId:usuDepartId,solInstId:usuInstId};
  try {
    const getAll = await Solicitudes.find(filter).populate(['solDepartIdDest','solUsuId','solAsignUsuId']).exec();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Consulta de Solicitudes extraidas',
      data:getAll
    };
    console.log(respuesta)
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
exports.addSolController = async (req, res) => {
  const {solDepartId,asignUsuId,solDescripcion,usuId}=req.body
  let instCod=0;
  const filter = { _id:usuId,status:true };
  try {
    //Verificar si ya existe
    let resultFindUsuario = await Usuarios.find(filter).exec();
    const {usuInstId,usuDepartId}=resultFindUsuario[0]
    //Si no existe hacer...
    var data={
      solUsuId:usuId,
      solInstId:usuInstId,
      solDepartId:solDepartId,
      solDepartIdDest:usuDepartId,
      solAsignUsuId:asignUsuId,
      solDescripcion:solDescripcion,
    }
    var newSolicitud= new Solicitudes(data);
    let newSolicitudSave = await newSolicitud.save();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'La solicitud ha sido enviada',
      data:newSolicitudSave
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

// exports.deleteInstController = async (req, res) => {
//   const {_id}=req.body
//   let instCod=0;
//   console.log(_id)
//   const filter = { _id: _id };
//   const update = { status: false };

//   try {
//     const deleteInst = await Instituciones.findOneAndUpdate(filter, update, {new: true,includeResultMetadata: true}).exec();
//     var respuesta = {
//       error: false,
//       codigo: 200,
//       mensaje: 'La institucion ha sido eliminada',
//       data:deleteInst
//     };
//     if(deleteInst.value==null){
//       respuesta.mensaje='La Institucion no pudo ser eliminada'
//     }
//     res.json(respuesta);

//   } catch (error) {
//     console.log(error)
//     var respuesta = {
//       error: true,
//       codigo: 501,
//       mensaje: 'Error inesperado',
//       data:error
//     };
//     res.json(respuesta);
//   }
// };
