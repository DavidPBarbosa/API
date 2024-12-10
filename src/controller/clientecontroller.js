const db = require('../db/db');// Módulo de conexão com o banco de dado
const joi = require('joi'); // Biblioteca de validação de dados
const bcrypt = require('bcrypt'); // Para encriptação de senhas

const clienteSchema = joi.object({
    cpf: joi.string().length(11).required(),
    //CPF deve ser uma string de exatamente 11 caracteres
    nome: joi.string().required().max(50),
    // Nome deve ser uma string e é obrigatorio
    endereco: joi.string().required(80),
    // endereço deve ser uma string e é obrigatorio
    bairro: joi.string().required(30),
    // Bairro deve ser um string e é obrigatorio
    cidade: joi.string().required(30),
    // Cidade deve ser uma string e é obrigatorio
    cep: joi.string().required(),
    // CEP deve ser uma string e é obrigatorio
    telefone: joi.string().required(),
    // Telefone deve ser uma string e é obrigatorio
    email: joi.string().required(),
    // Email deve ser valido e é obrigatorio
    senha: joi.string().min(6).required()
    // Senha deve ter no minimo 6 caracteres e é obrigatorio
});
// Listar todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM cliente');
        res.json(result); // Aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
// Buscar um cliente por CPF
exports.listarClienteCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar clientes', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
// Adiciona novo cliente
exports.adicionarCliente = async (req, res) => {
    const { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;
    // Validação de dados
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        // Criptografando a senha
        const hash = await bcrypt.hash(senha, 10);

        const novoCliente = { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha: hash };
        await db.query('INSERT INTO cliente SET ?', novoCliente);

        res.json({ message: 'Cliente adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
};
// Atualizar um cliente
exports.atualizarCliente = async (req, res) => {
    const { cpf } = req.params;
    const { nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;
    // Validação de dados
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        //Verifica se o cliente existe antes de atualizar
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Cliente não encontrado' });
        }
        //criptografando a senha
        const hash = await bcrypt.hash(senha, 10);
        const clienteAtualizado = { nome, endereco, bairro, complemento, cep, telefone, email, senha: hash };
        await db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf]);
        res.json({ message: 'Cliente atulizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
};

exports.deletarCliente = async (req, res) => {
    const { cpf } = req.params;
    try {
        //verifica se o cliente existe antes de deletar
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Cliente não encontrado' });
        }
        await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf]);
        res.json({ message: 'Cliente deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletarcons cliente:', err);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};