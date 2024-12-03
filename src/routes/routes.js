const express = require('express');
const router = express.Router();

//Exemplo de uma rota GET
router.get('/usuario',(req, res) => {
    res.send('Rota do usuario');
});
//Exemplo de outra rota GET
router.get('/david',(req, res) =>{
    res.send('Rota do David');
});
//Exporte o roteador para que ele possa ser usado no index.js
module.exports = router;