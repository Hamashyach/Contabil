"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LancamentoService = void 0;
const lancamento_model_1 = require("../model/entity/lancamento_model");
const livro_diario_model_1 = require("../model/entity/livro_diario_model");
const lancamento_repository_1 = require("../repository/lancamento_repository");
const livro_diario_repository_1 = require("../repository/livro_diario_repository");
class LancamentoService {
    constructor() {
        this.repository = new lancamento_repository_1.LancamentoRepository();
        this.livroDiarioRepository = new livro_diario_repository_1.LivroDiarioRepository();
    }
    criarLancamentoCompleto(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, historico, partidas } = dto;
            this.validarPartidas(partidas);
            // AQUI DEVE COMEÇAR UMA TRANSAÇÃO DE BANCO DE DADOS
            try {
                const novoLancamento = new lancamento_model_1.Lancamento(data, historico);
                const lancamentoSalvo = yield this.repository.insertLancamento(novoLancamento);
                for (const partida of partidas) {
                    const novaEntradaDiario = new livro_diario_model_1.LivroDiario(lancamentoSalvo.id, partida.setupId, partida.tipo, partida.valor);
                    yield this.livroDiarioRepository.insertLivroDiario(novaEntradaDiario);
                }
                // AQUI DEVE OCORRER O COMMIT DA TRANSAÇÃO
                return this.mapEntityToDto(lancamentoSalvo);
            }
            catch (error) {
                // AQUI DEVE OCORRER O ROLLBACK DA TRANSAÇÃO
                throw error;
            }
        });
    }
    atualizarLancamento(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const lancamentoExistente = yield this.repository.findLancamentoById(id);
            if (!lancamentoExistente) {
                throw new Error(`Lançamento com ID ${id} não foi encontrado.`);
            }
            const lancamentoParaAtualizar = new lancamento_model_1.Lancamento(dto.data, dto.historico);
            lancamentoParaAtualizar.id = id;
            yield this.repository.updateLancamento(lancamentoParaAtualizar);
            return this.mapEntityToDto(lancamentoParaAtualizar);
        });
    }
    deletarLancamentoPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lancamentoExistente = yield this.repository.findLancamentoById(id);
            if (!lancamentoExistente) {
                throw new Error(`Lançamento com ID ${id} não foi encontrado.`);
            }
            // AQUI DEVE COMEÇAR UMA TRANSAÇÃO DE BANCO DE DADOS
            try {
                const partidas = yield this.livroDiarioRepository.findByLancamentoId(id);
                for (const partida of partidas) {
                    yield this.livroDiarioRepository.deleteLivroDiarioById(partida.id);
                }
                yield this.repository.deleteLancamentoById(id);
                // AQUI DEVE OCORRER O COMMIT DA TRANSAÇÃO
            }
            catch (error) {
                // AQUI DEVE OCORRER O ROLLBACK DA TRANSAÇÃO
                throw error;
            }
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lancamento = yield this.repository.findLancamentoById(id);
            return lancamento ? this.mapEntityToDto(lancamento) : null;
        });
    }
    listarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const lancamentos = yield this.repository.findAllLancamentos();
            return lancamentos.map(lancamento => this.mapEntityToDto(lancamento));
        });
    }
    validarPartidas(partidas) {
        if (!partidas || partidas.length < 2) {
            throw new Error("Um lançamento deve ter no mínimo uma partida de débito e uma de crédito.");
        }
        const totalDebito = partidas
            .filter(p => p.tipo === 'debito')
            .reduce((soma, p) => soma + p.valor, 0);
        const totalCredito = partidas
            .filter(p => p.tipo === 'credito')
            .reduce((soma, p) => soma + p.valor, 0);
        if (totalDebito === 0 || totalCredito === 0) {
            throw new Error("Lançamentos devem ter pelo menos um débito e um crédito com valor maior que zero.");
        }
        if (totalDebito.toFixed(2) !== totalCredito.toFixed(2)) {
            throw new Error(`A soma dos débitos (R$ ${totalDebito.toFixed(2)}) não é igual à soma dos créditos (R$ ${totalCredito.toFixed(2)}).`);
        }
    }
    mapEntityToDto(lancamento) {
        return {
            id: lancamento.id,
            data: lancamento.data,
            historico: lancamento.historico
        };
    }
}
exports.LancamentoService = LancamentoService;
