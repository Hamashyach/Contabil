export class Empresa {
    id?: number;
    razao_social: string;
    nome_fantasia?: string;
    cnpj: string;

    constructor(razao_social: string, cnpj: string, nome_fantasia?: string, id?: number) {
        this.razao_social = razao_social;
        this.cnpj = cnpj;
        if (nome_fantasia) this.nome_fantasia = nome_fantasia;
        if (id) this.id = id;
    }
}