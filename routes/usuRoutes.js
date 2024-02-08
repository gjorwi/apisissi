const express = require('express');
const router = express.Router();
const {isAdmin,isOnlyRead}=require('../middlewares/verifyRequest')

// Importar el controlador
const usuCont = require('../controllers/usuarios');

// Definir la ruta
router.get('/get', usuCont.getUsuController);
router.post('/add',isAdmin,isOnlyRead, usuCont.addUsuController);
router.put('/put',isAdmin,isOnlyRead, usuCont.deleteUsuController); //aqui me quede, ahora actualizar

module.exports = router;