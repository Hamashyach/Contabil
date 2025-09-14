export class Setup {
    id?: number;
    codigo: number;
    nome_conta: string;
    grupo_contabil: string;
    subgrupo1: string | null;
    subgrupo2: string | null;
    saldo_inicial: number | null = 0;

  
    constructor(codigo: number, nome_conta: string, grupo_contabil: string, subgrupo1?: string | null, subgrupo2?: string | null, saldo_inicial?: number | null) {
        if (codigo == null || nome_conta == null || grupo_contabil == null) {
            throw new Error("codigo, nome da conta e grupo contabil são obrigatórios.");
        }

        this.codigo = codigo;
        this.nome_conta = nome_conta;        
        this.grupo_contabil = grupo_contabil; 
        this.subgrupo1 = subgrupo1 || null; 
        this.subgrupo2 = subgrupo2 || null; 
        this.saldo_inicial = saldo_inicial || 0;  
    }
}