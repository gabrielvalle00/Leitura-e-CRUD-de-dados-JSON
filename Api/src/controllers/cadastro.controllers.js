const Cliente = require('../models/cadastro.models')
const { insert } = require('../models/insert');


const clienteController = {

    adicionarCliente: async (req, res) => {
        try {

            const { nome, cpf, data_nasc, genero, estado_civil, email, telefone } = req.body;

            const objCliente = new Cliente(null, nome, data_nasc, cpf, genero, estado_civil, email, telefone);



            const result = await insert(objCliente);
            return res.json(result);

        } catch (error) {
            console.log(error);
            // let error_message = verificaErro(error);
            res.json(error);
        }
    }

};

module.exports = clienteController;