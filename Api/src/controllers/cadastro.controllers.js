const Cliente = require('../models/Cliente');
const { insert, verificarCpfExistente } = require('../models/ClienteModel');

const clienteController = {
    adicionarCliente: async (req, res) => {
        try {
            const { nome, cpf, data_nasc, sexo, estado_civil, email, telefone } = req.body;

            
            const cpfExistente = await verificarCpfExistente(cpf);
            if (cpfExistente > 0) {
                return res.json({ error: 'CPF já possui cadastro' });
            }

            
            const objCliente = new Cliente(null, nome, data_nasc, cpf, sexo, estado_civil, email, telefone);
            const result = await insert(objCliente);
            return res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao adicionar cliente.' });
        }
    }
};

module.exports = clienteController;
