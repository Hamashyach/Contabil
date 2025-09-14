export class Lancamento{
    id?: number;
    data: Date;
    historico: string;

    constructor(data: Date, historico: string){
        if(data == null || historico == null){
            throw new Error("Data e histórico são obrigatórios.");
        }
        this.data = data;
        this.historico = historico;
    }

}