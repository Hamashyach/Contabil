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
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const usuario_controller_1 = require("./../controller/usuario_controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const setup_controller_1 = require("./../controller/setup_controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const livro_diario_controller_1 = require("./../controller/livro_diario_controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const lancamento_controller_1 = require("./../controller/lancamento_controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "UsuarioRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": { "dataType": "string", "required": true },
            "senha": { "dataType": "string", "required": true },
            "razao_social": { "dataType": "string", "required": true },
            "nome_fantasia": { "dataType": "string" },
            "cnpj": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "string", "required": true },
            "data": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SetupRequestDto": {
        "dataType": "refObject",
        "properties": {
            "codigo": { "dataType": "double", "required": true },
            "nome_conta": { "dataType": "string", "required": true },
            "grupo_contabil": { "dataType": "string", "required": true },
            "subgrupo1": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "subgrupo2": { "dataType": "union", "subSchemas": [{ "dataType": "string" }, { "dataType": "enum", "enums": [null] }] },
            "saldo_inicial": { "dataType": "union", "subSchemas": [{ "dataType": "double" }, { "dataType": "enum", "enums": [null] }] },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroDiarioRequestDto": {
        "dataType": "refObject",
        "properties": {
            "lancamentoId": { "dataType": "double", "required": true },
            "setupId": { "dataType": "double", "required": true },
            "tipo": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["debito"] }, { "dataType": "enum", "enums": ["credito"] }], "required": true },
            "valor": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PartidaDto": {
        "dataType": "refObject",
        "properties": {
            "setupId": { "dataType": "double", "required": true },
            "tipo": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["debito"] }, { "dataType": "enum", "enums": ["credito"] }], "required": true },
            "valor": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LancamentoCompletoRequestDto": {
        "dataType": "refObject",
        "properties": {
            "data": { "dataType": "datetime", "required": true },
            "historico": { "dataType": "string", "required": true },
            "partidas": { "dataType": "array", "array": { "dataType": "refObject", "ref": "PartidaDto" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsUsuarioController_cadastrarUsuario = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioRequestDto" },
        badRequest: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        created: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/usuario', ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController.prototype.cadastrarUsuario)), function UsuarioController_cadastrarUsuario(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_cadastrarUsuario, request, response });
                const controller = new usuario_controller_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'cadastrarUsuario',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_atualizarUsuario = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "UsuarioRequestDto" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/usuario/:id', ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController.prototype.atualizarUsuario)), function UsuarioController_atualizarUsuario(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });
                const controller = new usuario_controller_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'atualizarUsuario',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_deletarUsuario = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/usuario/:id', ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController.prototype.deletarUsuario)), function UsuarioController_deletarUsuario(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_deletarUsuario, request, response });
                const controller = new usuario_controller_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'deletarUsuario',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_filtrarUsuarioPorId = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/usuario/:id', ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController.prototype.filtrarUsuarioPorId)), function UsuarioController_filtrarUsuarioPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_filtrarUsuarioPorId, request, response });
                const controller = new usuario_controller_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'filtrarUsuarioPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsUsuarioController_listarTodosUsuarios = {
        badRequest: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/usuario/todos', ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController)), ...((0, runtime_1.fetchMiddlewares)(usuario_controller_1.UsuarioController.prototype.listarTodosUsuarios)), function UsuarioController_listarTodosUsuarios(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_listarTodosUsuarios, request, response });
                const controller = new usuario_controller_1.UsuarioController();
                yield templateService.apiHandler({
                    methodName: 'listarTodosUsuarios',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSetupController_criarSetup = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "SetupRequestDto" },
        badRequest: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        created: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/setup', ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController)), ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController.prototype.criarSetup)), function SetupController_criarSetup(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSetupController_criarSetup, request, response });
                const controller = new setup_controller_1.SetupController();
                yield templateService.apiHandler({
                    methodName: 'criarSetup',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSetupController_atualizarSetup = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "SetupRequestDto" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/setup/:id', ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController)), ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController.prototype.atualizarSetup)), function SetupController_atualizarSetup(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSetupController_atualizarSetup, request, response });
                const controller = new setup_controller_1.SetupController();
                yield templateService.apiHandler({
                    methodName: 'atualizarSetup',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSetupController_deletarSetup = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/setup/:id', ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController)), ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController.prototype.deletarSetup)), function SetupController_deletarSetup(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSetupController_deletarSetup, request, response });
                const controller = new setup_controller_1.SetupController();
                yield templateService.apiHandler({
                    methodName: 'deletarSetup',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSetupController_buscarPorId = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/setup/:id', ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController)), ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController.prototype.buscarPorId)), function SetupController_buscarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSetupController_buscarPorId, request, response });
                const controller = new setup_controller_1.SetupController();
                yield templateService.apiHandler({
                    methodName: 'buscarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsSetupController_listarTodos = {
        badRequest: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/setup/todos', ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController)), ...((0, runtime_1.fetchMiddlewares)(setup_controller_1.SetupController.prototype.listarTodos)), function SetupController_listarTodos(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsSetupController_listarTodos, request, response });
                const controller = new setup_controller_1.SetupController();
                yield templateService.apiHandler({
                    methodName: 'listarTodos',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroDiarioController_criarEntrada = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDiarioRequestDto" },
        badRequest: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        created: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/livro-diario', ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController)), ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController.prototype.criarEntrada)), function LivroDiarioController_criarEntrada(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroDiarioController_criarEntrada, request, response });
                const controller = new livro_diario_controller_1.LivroDiarioController();
                yield templateService.apiHandler({
                    methodName: 'criarEntrada',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroDiarioController_atualizarEntrada = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LivroDiarioRequestDto" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/livro-diario/:id', ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController)), ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController.prototype.atualizarEntrada)), function LivroDiarioController_atualizarEntrada(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroDiarioController_atualizarEntrada, request, response });
                const controller = new livro_diario_controller_1.LivroDiarioController();
                yield templateService.apiHandler({
                    methodName: 'atualizarEntrada',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroDiarioController_deletarEntrada = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/livro-diario/:id', ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController)), ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController.prototype.deletarEntrada)), function LivroDiarioController_deletarEntrada(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroDiarioController_deletarEntrada, request, response });
                const controller = new livro_diario_controller_1.LivroDiarioController();
                yield templateService.apiHandler({
                    methodName: 'deletarEntrada',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroDiarioController_buscarPorId = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livro-diario/:id', ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController)), ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController.prototype.buscarPorId)), function LivroDiarioController_buscarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroDiarioController_buscarPorId, request, response });
                const controller = new livro_diario_controller_1.LivroDiarioController();
                yield templateService.apiHandler({
                    methodName: 'buscarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroDiarioController_buscarPorLancamentoId = {
        lancamentoId: { "in": "path", "name": "lancamentoId", "required": true, "dataType": "double" },
        badRequest: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livro-diario/por-lancamento/:lancamentoId', ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController)), ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController.prototype.buscarPorLancamentoId)), function LivroDiarioController_buscarPorLancamentoId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroDiarioController_buscarPorLancamentoId, request, response });
                const controller = new livro_diario_controller_1.LivroDiarioController();
                yield templateService.apiHandler({
                    methodName: 'buscarPorLancamentoId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLivroDiarioController_listarTodos = {
        badRequest: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/livro-diario/todos', ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController)), ...((0, runtime_1.fetchMiddlewares)(livro_diario_controller_1.LivroDiarioController.prototype.listarTodos)), function LivroDiarioController_listarTodos(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroDiarioController_listarTodos, request, response });
                const controller = new livro_diario_controller_1.LivroDiarioController();
                yield templateService.apiHandler({
                    methodName: 'listarTodos',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLancamentoController_criarLancamento = {
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LancamentoCompletoRequestDto" },
        badRequest: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        created: { "in": "res", "name": "201", "required": true, "ref": "BasicResponseDto" },
    };
    app.post('/lancamento', ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController)), ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController.prototype.criarLancamento)), function LancamentoController_criarLancamento(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLancamentoController_criarLancamento, request, response });
                const controller = new lancamento_controller_1.LancamentoController();
                yield templateService.apiHandler({
                    methodName: 'criarLancamento',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLancamentoController_atualizarLancamento = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        dto: { "in": "body", "name": "dto", "required": true, "ref": "LancamentoCompletoRequestDto" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.put('/lancamento/:id', ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController)), ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController.prototype.atualizarLancamento)), function LancamentoController_atualizarLancamento(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLancamentoController_atualizarLancamento, request, response });
                const controller = new lancamento_controller_1.LancamentoController();
                yield templateService.apiHandler({
                    methodName: 'atualizarLancamento',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLancamentoController_deletarLancamento = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.delete('/lancamento/:id', ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController)), ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController.prototype.deletarLancamento)), function LancamentoController_deletarLancamento(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLancamentoController_deletarLancamento, request, response });
                const controller = new lancamento_controller_1.LancamentoController();
                yield templateService.apiHandler({
                    methodName: 'deletarLancamento',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLancamentoController_buscarPorId = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
        notFound: { "in": "res", "name": "404", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/lancamento/:id', ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController)), ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController.prototype.buscarPorId)), function LancamentoController_buscarPorId(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLancamentoController_buscarPorId, request, response });
                const controller = new lancamento_controller_1.LancamentoController();
                yield templateService.apiHandler({
                    methodName: 'buscarPorId',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsLancamentoController_listarTodos = {
        badRequest: { "in": "res", "name": "400", "required": true, "ref": "BasicResponseDto" },
        success: { "in": "res", "name": "200", "required": true, "ref": "BasicResponseDto" },
    };
    app.get('/lancamento/todos', ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController)), ...((0, runtime_1.fetchMiddlewares)(lancamento_controller_1.LancamentoController.prototype.listarTodos)), function LancamentoController_listarTodos(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLancamentoController_listarTodos, request, response });
                const controller = new lancamento_controller_1.LancamentoController();
                yield templateService.apiHandler({
                    methodName: 'listarTodos',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
