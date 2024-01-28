// routes.js
const express = require('express');
const router = express.Router();

const loginRouter = require('./loginRoutes');
const institucionesRouter = require('./instRoutes');
const departamentosRouter = require('./departRoutes');
const usuariosRouter = require('./usuRoutes');

// Importar las rutas
router.use('/login', loginRouter);
router.use('/instituciones', institucionesRouter);
router.use('/departamentos', departamentosRouter);
router.use('/usuarios', usuariosRouter);

// Exportar el router
module.exports = router;