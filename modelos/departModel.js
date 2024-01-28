'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var departamentosSchema = new Schema({
  departCod: {
    type: String,
    required: [true, 'Id del departamento'],
    unique:true
  },
  departName: {
    type: String,
    required: [true, 'Nombre del departamento'],
  },
  departDescripcion: {
    type: String,
    required: [true, 'Descripcion del departamento'],
  },
  status: {
    type: Boolean,
    default:true
  },
},{ timestamps: true });
module.exports = mongoose.model('Departamentos', departamentosSchema);