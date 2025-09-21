"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.UsuarioService = void 0;
const usuario_model_1 = require("../model/entity/usuario_model");
const empresa_model_1 = require("../model/entity/empresa_model");
const usuario_repository_1 = require("../repository/usuario_repository");
const empresa_repository_1 = require("../repository/empresa_repository");
const bcrypt = __importStar(require("bcrypt"));
class UsuarioService {
    constructor() {
        this.repository = new usuario_repository_1.UsuarioRepository();
        this.empresaRepository = new empresa_repository_1.EmpresaRepository();
        this.saltRounds = 10;
    }
    cadastrarUsuario(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senha, nome, razao_social, cnpj, nome_fantasia } = dto;
            if (!senha) {
                throw new Error("Senha é obrigatória.");
            }
            if (!nome || !razao_social || !cnpj) {
                throw new Error("Nome, Email, Razão Social e CNPJ são obrigatórios.");
            }
            const novaEmpresa = new empresa_model_1.Empresa(razao_social, cnpj, nome_fantasia);
            const empresaSalva = yield this.empresaRepository.insertEmpresa(novaEmpresa);
            if (!empresaSalva.id) {
                throw new Error("Falha ao criar a empresa, o ID não foi retornado.");
            }
            const senhaHash = yield bcrypt.hash(senha, this.saltRounds);
            const novoUsuario = new usuario_model_1.Usuario(nome, senhaHash, empresaSalva.id);
            const usuarioSalvo = yield this.repository.insertUsuario(novoUsuario);
            return this.mapEntityToDto(usuarioSalvo);
        });
    }
    atualizarUsuario(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senha, nome } = dto;
            const usuarioExistente = yield this.repository.filterUsuarioById(id);
            if (!usuarioExistente) {
                throw new Error(`Usuário com ID ${id} não foi encontrado.`);
            }
            const senhaHash = yield bcrypt.hash(senha, this.saltRounds);
            const usuarioParaAtualizar = new usuario_model_1.Usuario(nome, senhaHash, usuarioExistente.id_empresa);
            usuarioParaAtualizar.id = id;
            yield this.repository.updateUsuario(usuarioParaAtualizar);
            return this.mapEntityToDto(usuarioParaAtualizar);
        });
    }
    deletarUsuarioPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioExistente = yield this.repository.filterUsuarioById(id);
            if (!usuarioExistente) {
                throw new Error(`Usuário com ID ${id} não foi encontrado.`);
            }
            yield this.repository.deletarUsuario(usuarioExistente);
        });
    }
    filtrarUsuarioPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.repository.filterUsuarioById(id);
            if (!usuario) {
                return null;
            }
            return this.mapEntityToDto(usuario);
        });
    }
    listarTodosUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.repository.filterAllUsuarios();
            return usuarios.map(usuario => this.mapEntityToDto(usuario));
        });
    }
    mapEntityToDto(usuario) {
        return {
            id: usuario.id,
            nome: usuario.nome
        };
    }
}
exports.UsuarioService = UsuarioService;
