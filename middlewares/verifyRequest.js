// Crear un nuevo archivo llamado `middleware.js`
var mongoose = require('../modelos/usuModel'),
Usuarios = mongoose.model('Usuarios');
var jwt = require('jsonwebtoken');
const datos=require('../config.js')
const express = require('express');

// Definir la función `isOnlyRead`
exports.isAdmin = async (req, res, next) =>{
  // Obtener el ID de usuario de la solicitud
  const {usuId} = req.body;
  
  // Consultar la base de datos para obtener el campo "admin" del usuario
  const result = await Usuarios.findById(usuId).select('admin');
  // Si el usuario es solo lectura, devolver un error
  if (!result?.admin) {
    var respuesta = {
      error: true,
      codigo: 403,
      mensaje: 'No tienes permiso para acceder a esta ruta.',
      data:[]
    };
    return res.json(respuesta);;
  }
  console.log('Paso Verificacion isOnlyRead')
  // Si el usuario es administrador, continuar con la solicitud
  next();
}
// Definir la función `isOnlyRead`
exports.isOnlyRead = async (req, res, next) =>{
  // Obtener el ID de usuario de la solicitud
  const {usuId} = req.body;
  
  // Consultar la base de datos para obtener el campo "admin" del usuario
  const result = await Usuarios.findById(usuId).select('onlyRead');
  // Si el usuario es solo lectura, devolver un error
  if (result?.onlyRead) {
    var respuesta = {
      error: true,
      codigo: 403,
      mensaje: 'El usuario es de solo lectura',
      data:[]
    };
    return res.json(respuesta);;
  }
  console.log('Paso Verificacion isOnlyRead')
  // Si el usuario es administrador, continuar con la solicitud
  next();
}
// Definir la función `isTokenAndCheck`
exports.isTokenAndCheck = async (req, res, next) =>{
  let fullPath=req.originalUrl
  // Obtener el token de la cabecera de la petición
  const token = req.headers['authorization'];
  // Verificar si el token es válido
  if (!token) {
    var respuesta = {
      error: true,
      codigo: 401,
      mensaje: 'No se ha proporcionado el token de seguridad.',
      data:[]
    };
    return res.json(respuesta);
  }
  // Decodificar el token
  // Verificar si el token ha expirado
  try {
    var decoded = jwt.verify(token, datos.JWT_SECRET);
    if(!fullPath.includes('admin')){
      next();
      return
    }
    if (!decoded?.isAdmin) {
      var respuesta = {
        error: true,
        codigo: 403,
        mensaje: 'No tienes permiso para acceder a esta ruta.',
        data:[]
      };
      return res.json(respuesta);
    }
    console.log('Paso Verificacion isTokenAndCheck')
    next();
    // Pasar el control al siguiente middleware o controlador
    
  } catch (error) {
    
    console.log('expirado:'+error)
    var respuesta = {
      error: true,
      codigo: 401,
      mensaje: 'El token de seguridad ha expirado.',
      data:[]
    };
    return res.json(respuesta);
  }
}