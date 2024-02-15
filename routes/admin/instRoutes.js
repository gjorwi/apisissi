const express = require('express');
const router = express.Router();
const {isOnlyRead,isTokenAndCheck,isAdmin}=require('../../middlewares/verifyRequest')

// Importar el controlador
const instCont = require('../../controllers/instituciones');

// Definir la ruta
router.get('/getLogin', instCont.getInstController);
router.get('/get', isTokenAndCheck, instCont.getInstController);
router.post('/add', isTokenAndCheck, isOnlyRead, instCont.addInstController);
router.put('/put', isTokenAndCheck, isOnlyRead, instCont.deleteInstController);

module.exports = router;