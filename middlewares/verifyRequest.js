// Crear un nuevo archivo llamado `middleware.js`
var mongoose = require('../modelos/usuModel'),
Usuarios = mongoose.model('Usuarios');
const express = require('express');

// Definir la función `isAdmin`
exports.isAdmin = async (req, res, next) =>{
  // Obtener el ID de usuario de la solicitud
  const {usuId} = req.body;

  // Consultar la base de datos para obtener el campo "admin" del usuario
  const result = await Usuarios.findById(usuId).select('admin');
  // Si el usuario no es administrador, devolver un error
  if (!result.admin) {
    var respuesta = {
      error: true,
      codigo: 403,
      mensaje: 'El usuario no es administrador',
      data:[]
    };
    return res.json(respuesta);;
  }
  console.log('Paso Verificacion isAdmin')
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
  // Obtener el token de la cabecera de la petición
  const token = req.headers['authorization'];

  // Verificar si el token es válido
  if (!token) {
    return res.status(401).json({
      error: 'No se ha proporcionado el token de seguridad.'
    });
  }

  // Decodificar el token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Verificar si el token ha expirado
  if (decoded.exp < Date.now()) {
    return res.status(401).json({
      error: 'El token de seguridad ha expirado.'
    });
  }

  // Verificar si el usuario tiene permiso para acceder a la ruta
  if (decoded.role !== 'admin') {
    return res.status(403).json({
      error: 'No tienes permiso para acceder a esta ruta.'
    });
  }

  // Pasar el control al siguiente middleware o controlador
  next();
}