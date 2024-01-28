const express = require('express');
const router = express.Router();

// Importar el controlador
const departCont = require('../controllers/departamentos');

// Definir la ruta
router.get('/get', departCont.getDepartController);
router.post('/add', departCont.addDepartController);
router.put('/put', departCont.deleteDepartController);

// Exportar el router
module.exports = router;