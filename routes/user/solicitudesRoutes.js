const express = require('express');
const router = express.Router();
const {isTokenAndCheck}=require('../../middlewares/verifyRequest')

// Importar el controlador
const solCont = require('../../controllers/solicitudes');

// Definir la ruta
router.get('/get', isTokenAndCheck, solCont.getSolController);

// Exportar el router
module.exports = router;