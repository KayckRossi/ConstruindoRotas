const express = require('express');
const router = express.Router();
const db = require('./database');
const path = require('path'); // Importe o módulo 'path'


function tratarNome(nome) {
    var mapaAcentosHex  = {
        a : /[\xE0-\xE6]/g,
        e : /[\xE8-\xEB]/g,
        i : /[\xEC-\xEF]/g,
        o : /[\xF2-\xF6]/g,
        u : /[\xF9-\xFC]/g,
        c : /\xE7/g,
        n : /\xF1/g,
        y : /\xFD/g
    };

    for (var letra in mapaAcentosHex) {
        var expressaoRegular = mapaAcentosHex[letra];
        nome = nome.replace(expressaoRegular, letra);
    }

    return nome;
}
// Rota para servir o arquivo HTML de formulário
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cadastro.html')); // Atualize o caminho para encontrar o arquivo HTML corretamente
});


// Rota para processar o envio do formulário
router.post('/processar-formulario', (req, res) => {
    console.log('Recebendo solicitação de submissão do formulário.');
    const email = req.body.email;
    const senha = req.body.senha;
    const cpf = req.body.cpf;
    const cnpj = req.body.cnpj;
    let nome = req.body.nome;


    nome = tratarNome(nome);

    // Primeiro, verifique se o e-mail, CPF ou CNPJ já existem
    const checkSql = "SELECT * FROM usuarios WHERE email = ? OR cpf = ? OR cnpj = ?";
    db.query(checkSql, [email, cpf, cnpj], (err, result) => {
        if (err) {
            console.error('Erro ao verificar o e-mail, CPF ou CNPJ: ' + err);
            res.json({ error: 'Erro ao verificar o e-mail, CPF ou CNPJ no banco de dados.' });
        } else if (result.length > 0) {
            // Se o resultado não estiver vazio, significa que o e-mail, CPF ou CNPJ já existem
            res.json({ error: 'Este e-mail, CPF ou CNPJ já está sendo usado.' });
        } else {
            // Se o e-mail, CPF ou CNPJ não existirem, insira o novo usuário
            let sql;
            let values;
            if (cpf) {
                sql = "INSERT INTO usuarios (email, senha, cpf, nome) VALUES (?, ?, ?, ?)";
                values = [email, senha, cpf, nome];
            } else if (cnpj) {
                sql = "INSERT INTO usuarios (email, senha, cnpj, nome) VALUES (?, ?, ?, ?)";
                values = [email, senha, cnpj, nome];
            }
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error('Erro ao inserir dados: ' + err);
                    res.json({ error: 'Erro ao inserir dados no banco de dados.' });
                } else {
                    console.log('Dados inseridos com sucesso.');
                    res.json({ success: true }); // Envia 'success' como resposta
                }
            });
        }
    });
});


module.exports = router;
