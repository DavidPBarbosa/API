const db = require('../db/db');
const joi = require('joi');

const produtoSchema = joi.object({
    idProduto: joi.string().required(),
    nomeProduto: joi.string().required(30),
    tipo: joi.string().required(30),
    descricao: joi.string().required(100),
    valorUnit: joi.string().required(),
    imagem: joi.string().required(200)
});
exports.listarProduto = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM produto');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.buscarProdutoNome = async (req, res) => {
    const { nomeProduto } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM produto WHERE nomeProduto LIKE ?', [`${nomeProduto}%`]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.buscarProdutoID = async (req, res) => {
    const { idProduto } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM produto WHERE idProduto LIKE ?', [`${idProduto}%`]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.adicionarProduto = async (req, res) => {
    const { idProduto, nomeProduto, tipo, descricao, valorUnit, imagem } = req.body;
    const { error } = produtoSchema.validate({ idProduto, nomeProduto, tipo, descricao, valorUnit, imagem });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    } try {
        const novoProduto = { idProduto, nomeProduto, tipo, descricao, valorUnit, imagem: hash };
        await db.query('INSERT INFO produto SET ?', novoProduto);
        res.json({ message: 'Produto adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
};
exports.atualizarProduto = async (req, res) => {
    const { idProduto } = req.params;
    const { nomeProduto, tipo, descricao, valorUnit, imagem } = req.body;
    const { error } = produtoSchema.validate({ idProduto, nomeProduto, tipo, descricao, valorUnit, imagem });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const [result] = await db.query('SELECT * FROM produto WHERE idProduto = ?', [idProduto]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Produto não encontrado' });
        }
        const produtoAtualizado = { nomeProduto, tipo, descricao, valorUnit, imagem: hash };
        await db.query('UPDATE produto SET ? WHERE idProduto = ?', [produtoAtualizado, idProduto]);
        res.json({ message: 'Produto atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ error: 'Erro ao atualizar o produto' });
    }
};
exports.deletarProduto = async (req, res) => {
    const { idProduto } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM produto WHERE idProduto = ?', [idProduto]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Produto não encontrado' });
        }
        await db.query('DELETE FROM produto WHERE idProduto = ?', [idProduto]);
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar o produto:', err);
        res.status(500).json({ error: 'Erro ao deletar o produto' });
    }
};