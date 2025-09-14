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
exports.SetupService = void 0;
const setup_model_1 = require("../model/entity/setup_model");
const setup_repository_1 = require("../repository/setup_repository");
class SetupService {
    constructor() {
        this.repository = new setup_repository_1.SetupRepository();
    }
    criarSetup(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial } = dto;
            const setupExistente = yield this.repository.findSetupByCodigo(codigo);
            if (setupExistente) {
                throw new Error(`Já existe uma conta com o código ${codigo}.`);
            }
            const novoSetup = new setup_model_1.Setup(codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial);
            const setupSalvo = yield this.repository.insertSetup(novoSetup);
            return this.mapEntityToDto(setupSalvo);
        });
    }
    atualizarSetup(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial } = dto;
            const setupExistente = yield this.repository.findSetupById(id);
            if (!setupExistente) {
                throw new Error(`Setup com ID ${id} não foi encontrado.`);
            }
            const conflitoCodigo = yield this.repository.findSetupByCodigo(codigo);
            if (conflitoCodigo && conflitoCodigo.id !== id) {
                throw new Error(`O código ${codigo} já está em uso por outra conta.`);
            }
            const setupParaAtualizar = new setup_model_1.Setup(codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial);
            setupParaAtualizar.id = id;
            yield this.repository.updateSetup(setupParaAtualizar);
            return this.mapEntityToDto(setupParaAtualizar);
        });
    }
    deletarSetupPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const setupExistente = yield this.repository.findSetupById(id);
            if (!setupExistente) {
                throw new Error(`Setup com ID ${id} não foi encontrado.`);
            }
            yield this.repository.deleteSetupById(id);
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const setup = yield this.repository.findSetupById(id);
            if (!setup) {
                return null;
            }
            return this.mapEntityToDto(setup);
        });
    }
    listarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const setups = yield this.repository.findAllSetups();
            return setups.map(setup => this.mapEntityToDto(setup));
        });
    }
    mapEntityToDto(setup) {
        return {
            id: setup.id,
            codigo: setup.codigo,
            nome_conta: setup.nome_conta,
            grupo_contabil: setup.grupo_contabil,
            subgrupo1: setup.subgrupo1,
            subgrupo2: setup.subgrupo2,
            saldo_inicial: setup.saldo_inicial
        };
    }
}
exports.SetupService = SetupService;
