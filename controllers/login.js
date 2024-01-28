var mongoose = require('../modelos/usuModel'),
Usuarios = mongoose.model('Usuarios');
var multiFunct = require('../extFunction/utilidades');//multiFunc llamaddo
const bcrypt = require('bcrypt');

// controllers/instituciones.js
const express = require('express');

// Definir el controlador
exports.addLoginController = async (req, res) => {
  const {usuUserName,usuPassword,usuInstId}=req.body
  const usuPasswordNotEncrypt=usuPassword
  const filter = { usuUserName: usuUserName.toUpperCase(),usuInstId:usuInstId,status:true };
  console.log(JSON.stringify(filter))
  try {
    //Verificar si ya existe
    let resultFindUsuario = await Usuarios.find(filter).exec();
    console.log('Result: '+ resultFindUsuario)
    if(resultFindUsuario?.length==0){
      var respuesta = {
        error: true,
        codigo: 401,
        mensaje: 'Usuario o contraseña incorrecto o no pertenecen a dicha institución',
        data:[]
      };
      res.json(respuesta);
      return
    }
    const {usuPassword,usuDepartId,usuCed}=resultFindUsuario[0]
    const confirmPass =await multiFunct.comparePasswords(usuPasswordNotEncrypt,usuPassword);
    console.log('clave sin encrypt:'+ usuPasswordNotEncrypt)
    console.log('clave encrypt:'+ usuPassword)
    console.log('Confirmacion clave:'+ confirmPass)
    if(!confirmPass){
      var respuesta = {
        error: true,
        codigo: 401,
        mensaje: 'Usuario o contraseña incorrecto o no pertenecen a dicha institución',
        data:[]
      };
      res.json(respuesta);
      return
    }
    const token = await multiFunct.generarJWT(resultFindUsuario[0]);
    const dataResult={
      usuUserName:usuUserName,
      usuInstId:usuInstId,
      usuDepartId:usuDepartId,
      usuCed:usuCed,
      token:token
    }
    var respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Su sesion ha sido iniciada',
      data:dataResult
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

