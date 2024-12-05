const db = require('../db/db');
const joi = require('joi');

const produtoSchema = joi.object({
    idProduto: joi.string().length().required(),
    nomeProduto: joi.string().required(30),
    tipo: joi.string().required(30),
    descricao: joi.string().required(100),
    valorUnit: joi.string().required(),
    imagem: joi.string().required(200)
});
exports.listarProduto = async(req, res) => {
    try {
        const[result] = await db.query('SELECT * FROM produto');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
};
exports.buscarProdutoNome = async (req, res) => {
    const { nomeProduto } = req.params;
    try{
        const [result] = await db.query('SELECT * FROM produto WHERE nomeProduto LIKE ?', [`${nomeProduto}%`]);
        if(result.length === 0){
            
        }
    }
}
