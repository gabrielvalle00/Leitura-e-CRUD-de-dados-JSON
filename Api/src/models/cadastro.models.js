class Cliente {

    constructor(pId, pNome, pDataNasc, pCpf, pGenero, pEstadoCivil, pEmail, pTelefone) {
        this.id = pId;
        this.nome = pNome;
        this.cpf = pCpf;
        this.DataConvert(pDataNasc);
        this.genero = pGenero;
        this.estado_civil = pEstadoCivil;
        this.email = pEmail;
        this.telefone = pTelefone;
    }

    get Nome() { return this.nome; }
    set Nome(value) { this.nome = value }

   
    get Cpf() { return this.cpf; }
    set Cpf(value) { this.cpf = value }

    get Data_nasc() { return this.data_nasc; }
    set Data_nasc(value) { this.data_nasc = value }

    get Genero() { return this.genero }
    set Genero(value) { this.genero = value }

    get EstadoCivil() { return this.estado_civil }
    set EstadoCivil(value) { this.estado_civil = value }

    get Email() { return this.email }
    set Email(value) { this.email = value }

    get Telefone() { return this.telefone }
    set Telefone(value) { this.telefone = value }

    calcularIdade() {
        if (this.nascimento == undefined) return 0;
        let hoje = new Date();
        let difAno = hoje.getFullYear() - this.nascimento.getFullYear();
        console.log(difAno);
        let difMes = hoje.getMonth() - this.nascimento.getMonth();
        console.log(difMes);
        let difDia = hoje.getDate() - this.nascimento.getDate();
        console.log(difDia);
        if (difMes < 0 || (difMes == 0 && difDia < 0)) {
            difAno--;
        }
        return difAno;
    }
    DataConvert(value) {
        let [dia, mes, ano] = value.split('/'); //       19/01/2002
        let dataFormatada = `${ano}-${mes}-${dia}`;
        this.Data_nasc = dataFormatada;
        // console.log(this.Data_nasc);
    }



}


module.exports = Cliente;