const mysql2 = require("mysql2/promise");

async function conectarBancoDeDados() {

      const connection = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'Atividade02',
        user: 'root',
        password: '1234',
        multipleStatements:true //permitir a execução de várias queries ao mesmo tempo
    });
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = conectarBancoDeDados;