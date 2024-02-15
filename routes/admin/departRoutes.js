const express = require('express');
const router = express.Router();
const {isTokenAndCheck,isOnlyRead,isAdmin}=require('../../middlewares/verifyRequest')

// Importar el controlador
const departCont = require('../../controllers/departamentos');

// Definir la ruta
router.get('/get', isTokenAndCheck, departCont.getDepartController);
router.post('/add', isTokenAndCheck, isOnlyRead, departCont.addDepartController);
router.put('/put', isTokenAndCheck, isOnlyRead, departCont.deleteDepartController);

// Exportar el router
module.exports = router;