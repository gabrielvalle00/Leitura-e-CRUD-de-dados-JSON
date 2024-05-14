class Cliente {

    constructor(pId, pNome, pDataNasc, pCpf, pGenero, pEstadoCivil, pEmail, pTelefone) {
        this.id = pId;
        this.nome = pNome;
        this.data_nasc = pDataNasc;
        this.cpf = pCpf;
        this.genero = pGenero;
        this.estado_civil = pEstadoCivil;
        this.email = pEmail;
        this.telefone = pTelefone;
    }

    get Nome() { return this.nome; }
    set Nome(value) { this.nome = value }

    get Data_nasc() { return this.data_nasc; }
    set Data_nasc(value) { this.data_nasc = value }

    get Cpf() { return this.cpf; }
    set Cpf(value) { this.cpf = value }

    get Genero() { return this.genero }
    set Genero(value) { this.genero = value }

    get EstadoCivil() { return this.estado_civil }
    set EstadoCivil(value) { this.estado_civil = value }

    get Email() { return this.email }
    set Email(value) { this.email = value }

    get Telefone() { return this.telefone }
    set Telefone(value) { this.telefone = value }


}


module.exports = Cliente;