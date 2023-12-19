//Rutas comida
const express = require('express');
const router = express.Router();
const comidaController = require('../controllers/comidaController')
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken.verifyJwt ,comidaController.getComidas);
router.get('/verificar',comidaController.verificarComidas);   
router.post('/', comidaController.postComidas); 

//usar esta ruta para movil porque no tiene verificacion
router.get('/movil', comidaController.getComidaUsuario);

//ruta para enviar por parametro el nombre de la categoria y mostrar las comidas
router.get('/categoria/:id', comidaController.getComidaPorCategoria);

//ruta para enviar por body
router.post('/categoria',comidaController.getComidaPorCategoriaBody);

router.put('/:id', comidaController.actualizarComida);
router.get('/:id', comidaController.verComida);
router.delete('/:id', comidaController.deleteComida);




module.exports = router;