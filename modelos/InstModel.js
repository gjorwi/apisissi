'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var institucionesSchema = new Schema({
  instCod: {
    type: String,
    required: [true, 'Id de la Institucion'],
    unique:true
  },
  instName: {
    type: String,
    required: [true, 'Nombre de la Institucion'],
  },
  instDireccion: {
    type: String,
    required: [true, 'Direccion de la Institucion'],
  },
  instDescripcion: {
    type: String,
    required: [true, 'Descripcion de la Institucion'],
  },
  status: {
    type: Boolean,
    default:true
  },
},{ timestamps: true });
module.exports = mongoose.model('Instituciones', institucionesSchema);