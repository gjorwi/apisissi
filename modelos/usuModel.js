'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuariosSchema = new Schema({
  usuCed: {
    type: String,
    required: [true, 'Cedula del usuario']
  },
  usuInstId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Instituciones',
    required: [true, 'Id de la institucion']
  },
  usuDepartId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Departamentos',
    required: [true, 'Id del departamento']
  },
  usuName: {
    type: String,
    required: [true, 'Nombre del usuario'],
  },
  usuUserName: {
    type: String,
    required: [true, 'Nombre de usuario del usuario'],
    unique:true
  },
  usuPassword: {
    type: String,
    required: [true, 'Contraseña del usuario'],
  },
  usuTelefono: {
    type: String,
    required: [true, 'Telefono del usuario'],
  },
  admin: {
    type: Boolean,
    default:false
  },
  onlyRead: {
    type: Boolean,
    default:false
  },
  status: {
    type: Boolean,
    default:true
  },
},{ timestamps: true });
module.exports = mongoose.model('Usuarios', usuariosSchema);