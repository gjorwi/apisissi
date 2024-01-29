const express = require('express');
const router = express.Router();

// Importar el controlador
const homeCont = require('../controllers/home');

// Definir la ruta
router.get('/', homeCont.getHomeController);

// Exportar el router
module.exports = router;