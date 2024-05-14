const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/cadastro.controllers');

// router.get('/', ClienteController.index);
router.post('/cadastro/novo', ClienteController.adicionarCliente);

module.exports = router;