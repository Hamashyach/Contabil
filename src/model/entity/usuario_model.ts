export class Usuario{
    id?: number;
    nome: string;
    senha: string;

    constructor(nome: string, senha: string){
        if(nome == null || senha == null){
            throw new Error("Nome e senha são obrigatórios.");
        }
        this.nome = nome;
        this.senha = senha;
    }
}