const express = require('express');
const router = express.Router();
const {isAdmin,isOnlyRead,isTokenAndCheck}=require('../middlewares/verifyRequest')

// Importar el controlador
const instCont = require('../controllers/instituciones');

// Definir la ruta
router.get('/get', instCont.getInstController);
// router.get('/get/:id', instCont.getIdInstController);
router.post('/add', isAdmin,isOnlyRead, instCont.addInstController);
router.put('/put', isAdmin,isOnlyRead, instCont.deleteInstController);

module.exports = router;