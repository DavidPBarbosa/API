const db = require('../db/db');
const joi = require('joi'); 

const itemSchema = joi.object({
    idItem: joi.string().length(100).required(),
    qtde: joi.string().required().max(50),
    valorParcial: joi.string().required(80),
    idProduto: joi.string().length(100).required(),
    idPedido: joi.string().length(100).required(),    
});
exports.listarItemPedido = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM itempedido');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar Item do Pedido:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.listarItemID = async (req, res) => {
    const { idItem } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM itempedido WHERE idItem = ?', [idItem]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Item Pedido não encontrado' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar Item Pedido', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.adicionarItemPedido = async (req, res) => {
    const { idItem, qtde, valorParcial, idProduto, idPedido } = req.body;
    const { error } = clienteSchema.validate({ idItem, qtde, valorParcial, idProduto, idPedido });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const novoItemPedido = { idItem, qtde, valorParcial, idProduto, idPedido: hash };
        await db.query('INSERT INTO itempedido SET ?', novoItemPedido);
        res.json({ message: 'Item do pedido adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar item do pedido:', err);
        res.status(500).json({ error: 'Erro ao adicionar item do pedido' });
    }
};
exports.atualizarItemPedido = async (req, res) => {
    const { idItem } = req.params;
    const { qtde, valorParcial, idProduto, idPedido } = req.body;
    const { error } = clienteSchema.validate({ qtde, valorParcial, idProduto, idPedido });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const [result] = await db.query('SELECT * FROM itempedido WHERE idItem = ?', [idItem]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Item do pedido não encontrado' });
        }
        const itempedidoAtualizado = { qtde, valorParcial, idProduto, idPedido: hash };
        await db.query('UPDATE itempedido SET ? WHERE idItem = ?', [itempedidoAtualizado, idItem]);
        res.json({ message: 'Item do pedido atulizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar o item do pedido:', err);
        res.status(500).json({ error: 'Erro ao atualizar o item do pedido' });
    }
};

exports.deletarItemPedido = async (req, res) => {
    const { idItem } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM itempedido WHERE idItem = ?', [idItem]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Item do pedido não encontrado' });
        }
        await db.query('DELETE FROM itempedido WHERE idItem = ?', [idItem]);
        res.json({ message: 'Item do pedido deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar o item do pedido:', err);
        res.status(500).json({ error: 'Erro ao deletar o item do pedido' });
    }
};