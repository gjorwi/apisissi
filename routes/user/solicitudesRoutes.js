const express = require('express');
const router = express.Router();
const {isTokenAndCheck}=require('../../middlewares/verifyRequest')

// Importar el controlador
const solCont = require('../../controllers/solicitudes');

// Definir la ruta
router.put('/put', isTokenAndCheck, solCont.getSolController);
router.post('/add', isTokenAndCheck, solCont.addSolController);

// Exportar el router
module.exports = router;