const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/pedidocontroller');

router.get('/pedido', pedidoController.listarPedido);
router.get('/pedido/:idPedido', pedidoController.buscaPedidoID);
router.get('/pedido/entregador/:idEntregador', pedidoController.buscaIdEntregador);
router.get('/pedido/cpf/:cpf', pedidoController.buscaCPF)
router.post('/pedido', pedidoController.adicionarPedido );
router.put('/pedido/:idPedido', pedidoController.atualizarPedido);
router.delete('/pedido/:idPedido', pedidoController.deletarPedido );

module.exports = router;