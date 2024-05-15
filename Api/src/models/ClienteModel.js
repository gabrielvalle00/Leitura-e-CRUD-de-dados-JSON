const conectarBancoDeDados = require('../../config/db');

async function insert(cliente) {
    const connection = await conectarBancoDeDados();
    try {

        await connection.beginTransaction();

        const res = await connection.query('INSERT INTO tbl_cliente (nome, cpf, data_nasc, genero, estado_civil, email, telefone) VALUES (?, ?, ?, ?, ?, ?, ?)', [cliente.nome, cliente.cpf, cliente.data_nasc, cliente.genero, cliente.estado_civil, cliente.email, cliente.telefone]);
        console.log('RESULTADO INSERT CLIENTE =>', res);

        
        await connection.commit();
        console.log('Transação concluída com sucesso.');
    } catch (error) {
       
        await connection.rollback();
        console.log(error);
        return (error);
    } finally {
        
        await connection.end(null);
    }

}


async function verificarCpfExistente(cpf) {
    const connection = await conectarBancoDeDados();
    try {

        const res = await connection.query('select count(*) from tbl_cliente where cpf = (?)', [cpf]);
        console.log(res); 
        return res;


       
    } catch (error) {
        console.error('Erro ao verificar CPF:', error);
        throw error; 
    } finally {
        await connection.end(); 
    }
}

module.exports = { insert , verificarCpfExistente };
