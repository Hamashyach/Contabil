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
exports.UsuarioRepository = void 0;
const mysql_1 = require("../database/mysql");
class UsuarioRepository {
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            CREATE TABLE IF NOT EXISTS usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                senha VARCHAR(255) NOT NULL
            )
         `;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log('Query executada com sucesso', resultado);
            }
            catch (err) {
                console.error('Erro');
            }
        });
    }
    insertUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO usuario (nome, senha) VALUES (?, ?)";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [usuario.nome, usuario.senha]);
                usuario.id = resultado.insertId;
                return usuario;
            }
            catch (err) {
                console.error('Erro ao inserir usuario: ', err);
                throw err;
            }
        });
    }
    findByNome(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM usuario WHERE nome = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [nome]);
                if (resultado.length > 0) {
                    return resultado[0];
                }
                return null;
            }
            catch (err) {
                console.error(`Falha ao procurar usuário com nome ${nome}:`, err);
                throw err;
            }
        });
    }
    updateUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE usuario set senha = ? where id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [usuario.senha, usuario.id]);
                console.log('Usuario atualizada com sucesso, ID: ', resultado);
                return new Promise((resolve) => {
                    resolve(usuario);
                });
            }
            catch (err) {
                console.error(`Erro ao atualizar o usuario de ID ${usuario.id} gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    deletarUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM usuario where id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [usuario.id]);
                console.log('Usuario deletada com sucesso: ', usuario);
                return new Promise((resolve) => {
                    resolve(usuario);
                });
            }
            catch (err) {
                console.error(`Falha ao deletar pessoa de ID ${usuario.id} gerando o erro:  ${err}`);
                throw err;
            }
        });
    }
    filterusuarioById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM usuario where id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log('Usuario localizada com sucesso ID: ', resultado);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Falha ao procurar usuario de ID ${id} gerando o erro${err}`);
                throw err;
            }
        });
    }
    filterAllUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM usuario";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(resultado);
                });
            }
            catch (err) {
                console.error(`Falha ao listar os usuarios gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    filterUsuarioById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM usuario WHERE idPessoa = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                if (resultado.length > 0) {
                    return resultado[0];
                }
                return null;
            }
            catch (err) {
                console.error(`Falha ao procurar usuário com idPessoa ${id}: ${err}`);
                throw err;
            }
        });
    }
}
exports.UsuarioRepository = UsuarioRepository;
