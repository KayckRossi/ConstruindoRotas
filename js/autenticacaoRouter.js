const express = require('express');
const router = express.Router();
const serveStatic = require('serve-static');
const credenciais = require('./verificacaoCredenciais');
const db = require('./database'); // O caminho pode variar dependendo da estrutura do seu projeto

// Rota GET para '/login'
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html')); // Atualize o caminho para encontrar o arquivo HTML corretamente
});

// Rota POST para '/login'
// Rota POST para '/login'
router.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    // Primeiro, verifique se o e-mail já existe
    const checkSql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(checkSql, [email], (err, result) => {
        if (err) {
            console.error('Erro ao verificar o e-mail: ' + err);
            res.json({ error: 'Erro ao verificar o e-mail no banco de dados.' });
        } else if (result.length > 0) {
            // Se o resultado não estiver vazio, significa que o e-mail já existe
            res.json({ error: 'Este e-mail já está sendo usado.' });
        } else {
            // Se o e-mail não existir, insira o novo usuário
            const sql = "INSERT INTO usuarios (email, senha) VALUES (?, ?)";
            db.query(sql, [email, senha], (err, result) => {
                if (err) {
                    console.error('Erro ao inserir dados: ' + err);
                    res.json({ error: 'Erro ao inserir dados no banco de dados.' });
                } else {
                    console.log('Dados inseridos com sucesso.');
                    res.json({ success: true });
                }
            });
        }
    });
});


module.exports = router;
