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
exports.UsuarioController = void 0;
const tsoa_1 = require("tsoa");
const usuario_service_1 = require("../service/usuario_service");
const basic_response_dto_1 = require("../model/dto/basic_response_dto");
let UsuarioController = class UsuarioController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.service = new usuario_service_1.UsuarioService();
    }
    cadastrarUsuario(dto, badRequest, created) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoUsuario = yield this.service.cadastrarUsuario(dto);
                return created(201, new basic_response_dto_1.BasicResponseDto("Usuário criado com sucesso!", novoUsuario));
            }
            catch (error) {
                return badRequest(400, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    atualizarUsuario(id, dto, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioAtualizado = yield this.service.atualizarUsuario(id, dto);
                return success(200, new basic_response_dto_1.BasicResponseDto("Usuário atualizado com sucesso!", usuarioAtualizado));
            }
            catch (error) {
                return notFound(404, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    deletarUsuario(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.service.deletarUsuarioPorId(id);
                return success(200, new basic_response_dto_1.BasicResponseDto("Usuário deletado com sucesso!", undefined));
            }
            catch (error) {
                return notFound(404, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    filtrarUsuarioPorId(id, notFound, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.service.filtrarUsuarioPorId(id);
                if (usuario) {
                    return success(200, new basic_response_dto_1.BasicResponseDto("Usuário encontrado!", usuario));
                }
                return notFound(404, new basic_response_dto_1.BasicResponseDto("Usuário não encontrado.", undefined));
            }
            catch (error) {
                return notFound(404, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
    listarTodosUsuarios(badRequest, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield this.service.listarTodosUsuarios();
                return success(200, new basic_response_dto_1.BasicResponseDto("Usuários listados com sucesso!", usuarios));
            }
            catch (error) {
                return badRequest(400, new basic_response_dto_1.BasicResponseDto(error.message));
            }
        });
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "cadastrarUsuario", null);
__decorate([
    (0, tsoa_1.Put)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizarUsuario", null);
__decorate([
    (0, tsoa_1.Delete)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "deletarUsuario", null);
__decorate([
    (0, tsoa_1.Get)("{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "filtrarUsuarioPorId", null);
__decorate([
    (0, tsoa_1.Get)("todos"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listarTodosUsuarios", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, tsoa_1.Route)("usuario"),
    (0, tsoa_1.Tags)("Usuário")
], UsuarioController);
