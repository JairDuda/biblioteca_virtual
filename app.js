const express = require("express"); // chama o Express
// middleware para parser na saída do corpo da mensagem: https://github.com/expressjs/body-parser
const bodyParser = require("body-parser");

const model = require("./models"); //chama os models
const apiCliente = require("./api/cliente"); // a API de cliente
const apiGenero = require("./api/genero"); // a API de genero
const apiLivro = require("./api/livro"); // a API de livro
const app = express(); //inicia o Express
app.use(bodyParser.json()); // usando o middleware para saída em JSON
// transmitindo o express e o model para o uso nas APIs
apiCliente(app, model);
apiGenero(app, model);
apiLivro(app, model);
// execução do app
app.listen(3000, function(){ 
    //aqui você define a porta que quiser
    console.info('Servidor rodando na porta 3000');
});