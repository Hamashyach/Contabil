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
exports.SetupController = void 0;
const tsoa_1 = require("tsoa");
const setup_service_1 = require("../service/setup_service");
const basic_response_dto_1 = require("../model/dto/basic_response_dto");
let SetupController = class SetupController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.service = new setup_service_1.SetupService();
    }
    criarSetup(dto, badRequest, created) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoSetup = yield this.service.criarSetup(dto);
                return created(201, new basic_response_dto_1.BasicResponseDto("Setup criado com sucesso!", novoSetup));
            }
            catch (error) {
                return badRequest(400, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    atualizarSetup(id, dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setupAtualizado = yield this.service.atualizarSetup(id, dto);
                return success(200, new basic_response_dto_1.BasicResponseDto("Setup atualizado com sucesso!", setupAtualizado));
            }
            catch (error) {
                return notFound(404, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    deletarSetup(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.service.deletarSetupPorId(id);
                return success(200, new basic_response_dto_1.BasicResponseDto("Setup deletado com sucesso!", undefined));
            }
            catch (error) {
                return notFound(404, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    buscarPorId(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setup = yield this.service.buscarPorId(id);
                if (setup) {
                    return success(200, new basic_response_dto_1.BasicResponseDto("Setup encontrado!", setup));
                }
                return notFound(404, new basic_response_dto_1.BasicResponseDto("Setup não encontrado.", undefined));
            }
            catch (error) {
                return notFound(404, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    listarTodos(badRequest, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const setups = yield this.service.listarTodos();
                return success(200, new basic_response_dto_1.BasicResponseDto("Setups listados com sucesso!", setups));
            }
            catch (error) {
                return badRequest(400, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
};
exports.SetupController = SetupController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Function]),
    __metadata("design:returntype", Promise)
], SetupController.prototype, "criarSetup", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], SetupController.prototype, "atualizarSetup", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], SetupController.prototype, "deletarSetup", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], SetupController.prototype, "buscarPorId", null);
__decorate([
    (0, tsoa_1.Get)("todos"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], SetupController.prototype, "listarTodos", null);
exports.SetupController = SetupController = __decorate([
    (0, tsoa_1.Route)("setup"),
    (0, tsoa_1.Tags)("Setup")
], SetupController);
