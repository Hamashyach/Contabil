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
exports.LivroDiarioService = void 0;
const livro_diario_model_1 = require("../model/entity/livro_diario_model");
const livro_diario_repository_1 = require("../repository/livro_diario_repository");
const lancamento_repository_1 = require("../repository/lancamento_repository");
const setup_repository_1 = require("../repository/setup_repository");
class LivroDiarioService {
    constructor() {
        this.repository = new livro_diario_repository_1.LivroDiarioRepository();
        this.lancamentoRepository = new lancamento_repository_1.LancamentoRepository();
        this.setupRepository = new setup_repository_1.SetupRepository();
    }
    criarEntrada(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lancamentoId, setupId, tipo, valor } = dto;
            yield this.validarReferencias(lancamentoId, setupId);
            if (valor <= 0) {
                throw new Error("O valor do lançamento deve ser positivo.");
            }
            const novaEntrada = new livro_diario_model_1.LivroDiario(lancamentoId, setupId, tipo, valor);
            const entradaSalva = yield this.repository.insertLivroDiario(novaEntrada);
            return this.mapEntityToDto(entradaSalva);
        });
    }
    atualizarEntrada(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lancamentoId, setupId, tipo, valor } = dto;
            const entradaExistente = yield this.repository.findLivroDiarioById(id);
            if (!entradaExistente) {
                throw new Error(`Entrada no Livro Diário com ID ${id} não foi encontrada.`);
            }
            yield this.validarReferencias(lancamentoId, setupId);
            if (valor <= 0) {
                throw new Error("O valor do lançamento deve ser positivo.");
            }
            const entradaParaAtualizar = new livro_diario_model_1.LivroDiario(lancamentoId, setupId, tipo, valor);
            entradaParaAtualizar.id = id;
            yield this.repository.updateLivroDiario(entradaParaAtualizar);
            return this.mapEntityToDto(entradaParaAtualizar);
        });
    }
    deletarEntradaPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entradaExistente = yield this.repository.findLivroDiarioById(id);
            if (!entradaExistente) {
                throw new Error(`Entrada no Livro Diário com ID ${id} não foi encontrada.`);
            }
            yield this.repository.deleteLivroDiarioById(id);
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entrada = yield this.repository.findLivroDiarioById(id);
            return entrada ? this.mapEntityToDto(entrada) : null;
        });
    }
    buscarPorLancamentoId(lancamentoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const entradas = yield this.repository.findByLancamentoId(lancamentoId);
            return entradas.map(entrada => this.mapEntityToDto(entrada));
        });
    }
    listarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const entradas = yield this.repository.findAll();
            return entradas.map(entrada => this.mapEntityToDto(entrada));
        });
    }
    validarReferencias(lancamentoId, setupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const lancamento = yield this.lancamentoRepository.findLancamentoById(lancamentoId);
            if (!lancamento) {
                throw new Error(`O Lançamento com ID ${lancamentoId} não existe.`);
            }
            const setup = yield this.setupRepository.findSetupById(setupId);
            if (!setup) {
                throw new Error(`A Conta (Setup) com ID ${setupId} não existe.`);
            }
        });
    }
    mapEntityToDto(entrada) {
        return {
            id: entrada.id,
            lancamentoId: entrada.lancamentoId,
            setupId: entrada.setupId,
            tipo: entrada.tipo,
            valor: entrada.valor
        };
    }
}
exports.LivroDiarioService = LivroDiarioService;
