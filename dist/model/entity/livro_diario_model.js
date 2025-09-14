"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroDiario = void 0;
class LivroDiario {
    constructor(lancamentoId, setupId, tipo, valor) {
        if (lancamentoId == null || setupId == null || tipo == null || valor == null) {
            throw new Error("ID do lançamento, ID do setup, tipo e valor são obrigatórios para criar um lançamento no livro diário.");
        }
        this.lancamentoId = lancamentoId;
        this.setupId = setupId;
        this.tipo = tipo;
        this.valor = valor;
    }
}
exports.LivroDiario = LivroDiario;
