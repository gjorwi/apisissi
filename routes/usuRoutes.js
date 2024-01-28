const express = require('express');
const router = express.Router();

// Importar el controlador
const usuCont = require('../controllers/usuarios');

// Definir la ruta
router.get('/get', usuCont.getUsuController);
router.post('/add', usuCont.addUsuController);
router.put('/put', usuCont.deleteUsuController); //aqui me quede, ahora actualizar

module.exports = router;