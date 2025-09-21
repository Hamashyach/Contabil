"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(nome, senha, id_empresa) {
        if (nome == null || senha == null) {
            throw new Error("Nome e senha são obrigatórios.");
        }
        this.nome = nome;
        this.senha = senha;
        this.id_empresa = id_empresa;
    }
}
exports.Usuario = Usuario;
