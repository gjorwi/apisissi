'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var solicitudesSchema = new Schema({
  solUsuId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Instituciones',
    required: [true, 'Id del usuario creador']
  },
  solInstId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Instituciones',
    required: [true, 'Id de la institucion']
  },
  solDepartId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Departamentos',
    required: [true, 'Id del departamento']
  },
  solDepartIdDest: {
    type: mongoose.Schema.ObjectId,
    ref: 'Departamentos',
    required: [true, 'Id del departamento destino']
  },
  solDescripcion: {
    type: String,
    required: [true, 'Descripcion de la solicitud'],
  },
  solResponse: {
    type: String,
    default:''
  },
  solResponseResolved: {
    type: String,
    default:''
  },
  solFases: {
    type: String,
    default:'pendiente'
  },
  solAsignUsuId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuarios',
    default:''
  },
  status: {
    type: Boolean,
    default:true
  },
},{ timestamps: true });
module.exports = mongoose.model('Solicitudes', solicitudesSchema);