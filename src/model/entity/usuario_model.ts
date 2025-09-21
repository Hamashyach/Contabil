export class Usuario{
    id?: number;
    nome: string;
    senha: string;
    id_empresa: number

    constructor(nome: string, senha: string, id_empresa: number){
        if(nome == null || senha == null){
            throw new Error("Nome e senha são obrigatórios.");
        }
        this.nome = nome;
        this.senha = senha;
        this.id_empresa = id_empresa;   
    }
}