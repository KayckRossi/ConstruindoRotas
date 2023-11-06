//mysql -u root -p -h localhost testandobd

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Sua senha do banco de dados
    database: 'testandobd',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco de dados: ' + err.stack);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

module.exports = connection;
