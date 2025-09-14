"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.LivroDiarioController = void 0;
const tsoa_1 = require("tsoa");
const livro_diario_service_1 = require("../service/livro_diario_service");
const basic_response_dto_1 = require("../model/dto/basic_response_dto");
let LivroDiarioController = class LivroDiarioController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.service = new livro_diario_service_1.LivroDiarioService();
    }
    criarEntrada(dto, badRequest, created) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novaEntrada = yield this.service.criarEntrada(dto);
                return created(201, new basic_response_dto_1.BasicResponseDto("Entrada no Livro Diário criada com sucesso!", novaEntrada));
            }
            catch (error) {
                return badRequest(400, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    atualizarEntrada(id, dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entradaAtualizada = yield this.service.atualizarEntrada(id, dto);
                return success(200, new basic_response_dto_1.BasicResponseDto("Entrada atualizada com sucesso!", entradaAtualizada));
            }
            catch (error) {
                return notFound(404, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    deletarEntrada(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.service.deletarEntradaPorId(id);
                return success(200, new basic_response_dto_1.BasicResponseDto("Entrada deletada com sucesso!", undefined));
            }
            catch (error) {
                return notFound(404, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    buscarPorId(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entrada = yield this.service.buscarPorId(id);
                if (entrada) {
                    return success(200, new basic_response_dto_1.BasicResponseDto("Entrada encontrada!", entrada));
                }
                return notFound(404, new basic_response_dto_1.BasicResponseDto("Entrada não encontrada.", undefined));
            }
            catch (error) {
                return notFound(404, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    buscarPorLancamentoId(lancamentoId, badRequest, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entradas = yield this.service.buscarPorLancamentoId(lancamentoId);
                return success(200, new basic_response_dto_1.BasicResponseDto("Entradas encontradas para o lançamento!", entradas));
            }
            catch (error) {
                return badRequest(400, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    listarTodos(badRequest, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entradas = yield this.service.listarTodos();
                return success(200, new basic_response_dto_1.BasicResponseDto("Todas as entradas listadas com sucesso!", entradas));
            }
            catch (error) {
                return badRequest(400, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
};
exports.LivroDiarioController = LivroDiarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroDiarioController.prototype, "criarEntrada", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroDiarioController.prototype, "atualizarEntrada", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroDiarioController.prototype, "deletarEntrada", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroDiarioController.prototype, "buscarPorId", null);
__decorate([
    (0, tsoa_1.Get)("por-lancamento/{lancamentoId}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroDiarioController.prototype, "buscarPorLancamentoId", null);
__decorate([
    (0, tsoa_1.Get)("todos"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], LivroDiarioController.prototype, "listarTodos", null);
exports.LivroDiarioController = LivroDiarioController = __decorate([
    (0, tsoa_1.Route)("livro-diario"),
    (0, tsoa_1.Tags)("Livro Diário")
], LivroDiarioController);
