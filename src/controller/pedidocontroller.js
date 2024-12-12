const db = require('../db/db');
const joi = require('joi');

const pedidoSchema = joi.object({
    idPedido: joi.string().required(),
    dataPedido: joi.string().required(),
    qtdeItens: joi.string().required(),
    formaPagto: joi.string().required(),
    valorTotal: joi.string().required(),
    observacao: joi.string().required(),
    cpf: joi.string().required(),
    idEntregador: joi.string().required()
});
exports.listarPedido = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM pedido');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar pedido:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.buscaPedidoID = async (req, res) => {
    const { idPedido } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM pedido WHERE idPedido LIKE ?', [`${idPedido}%`]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar o Pedido:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.buscaIdEntregador = async (req, res) => {
    const { idEntregador } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM pedido WHERE idEntregador LIKE ?', [`${idEntregador}%`]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar o pedido:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.buscaCPF = async (req, res) => {
    const { cpf} = req.params;
    try {
        const [result] = await db.query('SELECT * FROM pedido WHERE cpf LIKE ?', [`${cpf}%`]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar o entregador:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.adicionarPedido = async (req, res) => {
    const { idPedido, dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador } = req.body;
    const { error } = pedidoSchema.validate({ idPedido, dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    } try {
        const novoPedido = { idPedido, dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador: hash };
        await db.query('INSERT INFO pedido SET ?', novoPedido);
        res.json({ message: 'Pedido adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar pedido:', err);
        res.status(500).json({ error: 'Erro ao adicionar pedido' });
    }
};
exports.atualizarPedido = async (req, res) => {
    const { idPedido } = req.params;
    const { dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador} = req.body;
    const { error } = pedidoSchema.validate({ idPedido, dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const [result] = await db.query('SELECT * FROM pedido WHERE idPedido = ?', [idPedido]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Pedido não encontrado' });
        }
        const pedidoAtualizado = { dataPedido, qtdeItens, formaPagto, valorTotal, observacao, cpf, idEntregador: hash };
        await db.query('UPDATE pedido SET ? WHERE idPedido = ?', [pedidoAtualizado, idPedido]);
        res.json({ message: 'Pedido atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar pedido:', err);
        res.status(500).json({ error: 'Erro ao atualizar o pedido' });
    }
};
exports.deletarPedido = async (req, res) => {
    const { idPedido } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM pedido WHERE idPedido = ?', [idPedido]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Pedido não encontrado' });
        }
        await db.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido]);
        res.json({ message: 'Pedido deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar o pedido:', err);
        res.status(500).json({ error: 'Erro ao deletar o pedido' });
    }
};