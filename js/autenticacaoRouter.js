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

router.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    console.log('E-mail recebido: ' + email);
    console.log('Senha recebida: ' + senha);


    // Verifique se o e-mail e a senha correspondem a um usuário existente
    const checkSql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    db.query(checkSql, [email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao verificar as credenciais: ' + err);
            res.json({ error: 'Erro ao verificar as credenciais no banco de dados.' });
        } else if (result.length > 0) {
            // Se o resultado não estiver vazio, significa que as credenciais estão corretas
            console.log('Login bem-sucedido.');
            req.session.user = email; // Adicione esta linha
            res.json({ success: true });
        } else {
            // Se o resultado estiver vazio, as credenciais estão incorretas
            res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }
    });
});




module.exports = router;
