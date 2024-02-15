const express = require('express');
const router = express.Router();
const {isTokenAndCheck,isOnlyRead}=require('../../middlewares/verifyRequest')

// Importar el controlador
const usuCont = require('../../controllers/usuarios');

// Definir la ruta
router.get('/get', isTokenAndCheck, usuCont.getUsuController);
router.post('/add', isTokenAndCheck, isOnlyRead, usuCont.addUsuController);
router.put('/put', isTokenAndCheck, isOnlyRead, usuCont.deleteUsuController); //aqui me quede, ahora actualizar

module.exports = router;