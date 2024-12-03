// IPORATAÇÃO DE TODAS AS DEPENDÊNCIAS
require('dotenv').config(); //Carrega variáveis de ambiente de um arquivo .env

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('./db/db') 

const routes = require('./routes/routes'); // Importa as rotas

const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'], //lista de origens permitidas
    methods: 'GET, POST, PUT, PATCH, DELETE', //Metodos http permitidos
    credentials: true, //permite o envio de cookies
};
const app = express();
// O app irá receber o express e todas suas dependencias
// Middlewares de segurança e utilidades
app.use(helmet()); // Protege a aplicação com headers de segurança
app.use(cors(corsOptions)); // Habilita o CORS
app.use(morgan('dev')); // Loga as requisições no console
app.use(express.json()); //converte os dados recebidos para JASON

// Servindo arquivos estaticos
app.use(express.static(path.join(__dirname, 'public'))); //Pasta de arquivos estaticos
// O PATH RETORNA O CAMINHO DE FORMA DINAMICA

// Rota para servir o home.html como sendo nossa pagina principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'))
});

// configuração de rotas
//Apos declarar nossa rotas,qui falamos para nosso app usar elas como referencia
app.use('/', routes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    consol.console.error(err.stack);
    res.status(500).send('Algo de errado!');
});    

//Inicialização do servidor
// AQUI DEFINIMOS QUEM IRÁ ESCUTAR NOSSO CHAMADO E NOS RESPONDER
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});