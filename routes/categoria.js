const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/',categoriaController.getCategoria);
router.post('/',categoriaController.postCategoria);
router.delete('/:id',categoriaController.deleteCategoria);
router.get('/:id',categoriaController.getCategoriaId);
router.put('/:id', categoriaController.actualizarCategoria);

module.exports = router;