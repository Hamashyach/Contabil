"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setup = void 0;
class Setup {
    constructor(codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial) {
        this.saldo_inicial = 0;
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
exports.Setup = Setup;
