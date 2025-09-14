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
exports.AuthService = void 0;
const usuario_repository_1 = require("../repository/usuario_repository");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const usuario_model_1 = require("../model/entity/usuario_model");
class AuthService {
    constructor() {
        this.usuarioRepository = new usuario_repository_1.UsuarioRepository();
        this.saltRounds = 10;
    }
    registrar(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, senha, confirmeSenha } = dto;
            if (senha !== confirmeSenha) {
                throw new Error("As senhas não coincidem.");
            }
            const usuarioExistente = yield this.usuarioRepository.findByNome(nome);
            if (usuarioExistente) {
                throw new Error("Este nome de usuário já está em uso.");
            }
            const senhaHash = yield bcrypt.hash(senha, this.saltRounds);
            const novoUsuario = new usuario_model_1.Usuario(nome, senhaHash);
            const usuarioSalvo = yield this.usuarioRepository.insertUsuario(novoUsuario);
            return { id: usuarioSalvo.id, nome: usuarioSalvo.nome };
        });
    }
    login(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, senha } = dto;
            const usuario = yield this.usuarioRepository.findByNome(nome);
            if (!usuario) {
                throw new Error("Usuário ou senha inválidos.");
            }
            const senhaValida = yield bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                throw new Error("Usuário ou senha inválidos.");
            }
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("Chave secreta JWT não configurada.");
            }
            const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, secret, { expiresIn: '1h' });
            return {
                id: usuario.id,
                nome: usuario.nome,
                token: token
            };
        });
    }
}
exports.AuthService = AuthService;
