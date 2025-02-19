const express = require('express');
const router = express.Router();
const entregadorController = require('../controller/entregadorcontroler');

router.get('/entregador', entregadorController.listarEntregador);
router.get('/entregador/:idEntregador', entregadorController.buscaEntregadorID);
router.post('/entregador', entregadorController.adicionarEntregador);
router.put('/entregador/:idEntregador', entregadorController.atualizarEntregador);
router.delete('/entregador/:idEntregador', entregadorController.deletarEntregar);

module.exports = router;