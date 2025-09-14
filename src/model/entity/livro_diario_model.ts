export class LivroDiario {
    id?: number;
    lancamentoId: number;
    setupId: number;
    tipo: 'debito' | 'credito';
    valor: number;

    constructor(lancamentoId: number, setupId: number, tipo: 'debito' | 'credito', valor: number) {
        if (lancamentoId == null || setupId == null || tipo == null || valor == null) {
            throw new Error("ID do lançamento, ID do setup, tipo e valor são obrigatórios para criar um lançamento no livro diário.");
        }
        this.lancamentoId = lancamentoId;
        this.setupId = setupId;
        this.tipo = tipo;
        this.valor = valor;
    }
}