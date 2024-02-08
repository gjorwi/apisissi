const express = require('express');
const router = express.Router();
const {isAdmin,isOnlyRead}=require('../middlewares/verifyRequest')

// Importar el controlador
const departCont = require('../controllers/departamentos');

// Definir la ruta
router.get('/get', departCont.getDepartController);
router.post('/add',isAdmin,isOnlyRead, departCont.addDepartController);
router.put('/put',isAdmin,isOnlyRead, departCont.deleteDepartController);

// Exportar el router
module.exports = router;