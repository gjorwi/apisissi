const express = require('express');
const router = express.Router();

// Importar el controlador
const loginCont = require('../../controllers/login');

// Definir la ruta
router.post('/add', loginCont.addLoginController);

// Exportar el router
module.exports = router;