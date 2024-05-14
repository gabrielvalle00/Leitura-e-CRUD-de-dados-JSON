const conectarBancoDeDados = require('../../config/db');

async function insert(cliente) {
    const connection = await conectarBancoDeDados();
    try {
        
        await connection.beginTransaction();

        // Insere o cliente, a variável 'res' nos informa qual é o id do cliente para realizar os 'inserts' de endereços e telefones que contém chave estrangeira (FK)
        const res = await connection.query('INSERT INTO cliente (nome, cpf, data_nasc, genero, estado_civil, email, telefone) VALUES (?, ?, ?, ?, ?, ?, ?)', [cliente.nome, cliente.cpf, cliente.data_nasc, cliente.genero, cliente.estado_civil, cliente.email, cliente.telefone]);
        console.log('RESULTADO INSERT CLIENTE =>', res);

    
       

        // Se todas as queries forem bem-sucedidas, um 'commit' é realizado para confirmar as execuções
        await connection.commit();
        console.log('Transação concluída com sucesso.');
    } catch (error) {
        // Em caso de erro, um 'rollback' é realizado para cancelar as execuções que foram realizadas
        await connection.rollback();
        console.log(error);
        return (error);
    } finally {
        // Fecha a conexão com o banco de dados
        await connection.end(null);
    }
}

module.exports = { insert };