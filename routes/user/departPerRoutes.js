const express = require('express');
const router = express.Router();
const {isTokenAndCheck,isOnlyRead,isAdmin}=require('../../middlewares/verifyRequest')

// Importar el controlador
const departPerCont = require('../../controllers/departamentosPer');

// Definir la ruta
router.put('/put', isTokenAndCheck, departPerCont.getDepartPerController);

// Exportar el router
module.exports = router;