const express = require('express');
const router = express.Router();

// Importar el controlador
const instCont = require('../controllers/instituciones');

// Definir la ruta
router.get('/get', instCont.getInstController);
// router.get('/get/:id', instCont.getIdInstController);
router.post('/add', instCont.addInstController);
router.put('/put', instCont.deleteInstController);

module.exports = router;