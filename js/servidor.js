const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const port = 5500;
const path = require('path');

// Middleware para processar dados de formulário
app.use(express.urlencoded({ extended: true }));

const db = require('./database'); // Importa a conexão com o banco de dados

const formularioRouter = require('./formularioRouter');
const autenticacaoRouter = require('./autenticacaoRouter');

app.use('/formulario', formularioRouter); // Rotas para o formulário
app.use('/autenticacao', autenticacaoRouter); // Rotas para autenticação

// Configure o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Defina a rota raiz para servir seu arquivo "form.html" da pasta "public"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Adicione outra rota para servir o arquivo "login.html"
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/sucesso.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sucesso.html'));
});

app.get('/erro.html', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/erro.html'));
});

app.listen(port, () => {
    console.log(`Aplicativo está rodando na porta localhost:${port}`);
});
