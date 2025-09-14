"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lancamento = void 0;
class Lancamento {
    constructor(data, historico) {
        if (data == null || historico == null) {
            throw new Error("Data e histórico são obrigatórios.");
        }
        this.data = data;
        this.historico = historico;
    }
}
exports.Lancamento = Lancamento;
