const db = require('./database');

function verificarCredenciaisNoBancoDeDados(email, senha, callback) {
    // Implemente a lógica para verificar as credenciais no banco de dados.
    // Use uma consulta SQL para comparar as credenciais com os registros no banco de dados.
    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
    db.query(sql, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao verificar credenciais no banco de dados: ' + err);
            callback(false);
        } else {
            if (results.length > 0) {
                callback(true); // Credenciais válidas
            } else {
                callback(false); // Credenciais inválidas
            }
        }
    });
}

function registrarUsuarioLogadoNoBancoDeDados(email) {
    const sql = "INSERT INTO usuarios_logados (email, data_login) VALUES (?, NOW())";
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Erro ao registrar usuário logado no banco de dados: ' + err);
        } else {
            console.log('Usuário registrado com sucesso.');
        }
    });
}

module.exports = { verificarCredenciaisNoBancoDeDados, registrarUsuarioLogadoNoBancoDeDados };
