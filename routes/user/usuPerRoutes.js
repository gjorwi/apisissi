const express = require('express');
const router = express.Router();
const {isTokenAndCheck,isOnlyRead}=require('../../middlewares/verifyRequest')

// Importar el controlador
const usuPerCont = require('../../controllers/usuariosPer');

// Definir la ruta
router.put('/put/', isTokenAndCheck, usuPerCont.getUsuPerController);
// router.post('/add', isTokenAndCheck, isOnlyRead, usuCont.addUsuController);
// router.put('/put', isTokenAndCheck, isOnlyRead, usuCont.deleteUsuController); //aqui me quede, ahora actualizar

module.exports = router;