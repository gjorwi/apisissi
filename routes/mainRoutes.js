// routes.js
const express = require('express');
const router = express.Router();

const homeRouter = require('./homeRoutes');
const loginAdminRouter = require('./admin/loginRoutes');
const institucionesRouter = require('./admin/instRoutes');
const departamentosRouter = require('./admin/departRoutes');
const usuariosRouter = require('./admin/usuRoutes');
const loginUserRouter = require('./user/loginRoutes');
const solicitudesUserRouter = require('./user/solicitudesRoutes');

// Importar las rutas
router.use('/', homeRouter);
router.use('/admin/loginadmin', loginAdminRouter);
router.use('/admin/instituciones', institucionesRouter);
router.use('/admin/departamentos', departamentosRouter);
router.use('/admin/usuarios', usuariosRouter);
router.use('/user/loginuser', loginUserRouter);
router.use('/user/solicitudes', solicitudesUserRouter);

// Exportar el router
module.exports = router;