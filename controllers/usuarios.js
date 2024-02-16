var mongoose = require('../modelos/usuModel'),
Usuarios = mongoose.model('Usuarios');
var multiFunct = require('../extFunction/utilidades');//multiFunc llamaddo
const bcrypt = require('bcrypt');

// controllers/instituciones.js
const express = require('express');

// Definir el controlador
exports.getUsuController = async (req, res) => {
  const filter = { status: true };
  try {
    const getAll = await Usuarios.find(filter).populate(['usuDepartId','usuInstId']).exec();
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

exports.addUsuController = async (req, res) => {
  const {usuName,usuUserName,usuCed,instCod,departCod,usuPassword,usuTelefono,admin,onlyRead}=req.body
  const filter = { usuCed: usuCed, status:true };
  const filter2 = { usuUserName: usuUserName};
  try {
    //Verificar si ya existe
    let resultFindUsuario = await Usuarios.find(filter).exec();
    let resultFindUserName = await Usuarios.find(filter2).exec();
    console.log('Result: '+ resultFindUsuario)
    if(resultFindUsuario?.length>0){
      var respuesta = {
        error: true,
        codigo: 500,
        mensaje: 'El usuario ya se encuentra registrado',
        data:[]
      };
      res.json(respuesta);
      return
    }
    if(resultFindUserName?.length>0){
      var respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'El nombre de usuario ya existe',
        data:[]
      };
      res.json(respuesta);
      return
    }
    //Si no existe hacer...
    // Generate a salt
    const salt = await bcrypt.genSalt(15);
    console.log('clave: '+usuPassword)
    // Hash the password using the salt
    const newUsuPassword = await bcrypt.hash(usuPassword, salt);
    var data={
      usuName:usuName.toUpperCase(),
      usuUserName:usuUserName.toUpperCase(),
      usuCed:usuCed,
      usuInstId:instCod,
      usuDepartId:departCod,
      usuPassword:newUsuPassword,
      usuTelefono:usuTelefono,
      admin:admin,
      onlyRead:onlyRead
    }
    var newUsuarios= new Usuarios(data);
    let newUsuariosSaved = await newUsuarios.save();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'El Usuarios ha sido agregado',
      data:newUsuariosSaved
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

exports.deleteUsuController = async (req, res) => {
  const {_id}=req.body
  const filter = { _id: _id };
  const update = { status: false };

  try {
    const deleteUsu = await Usuarios.findOneAndUpdate(filter, update, {new: true,includeResultMetadata: true}).exec();
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'El usuario ha sido eliminado',
      data:deleteUsu
    };
    if(deleteUsu.value==null){
      respuesta.mensaje='El usuario no pudo ser eliminado'
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
