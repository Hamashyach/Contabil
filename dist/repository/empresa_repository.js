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
exports.EmpresaRepository = void 0;
const mysql_1 = require("../database/mysql");
class EmpresaRepository {
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            CREATE TABLE IF NOT EXISTS empresa (
                id INT AUTO_INCREMENT PRIMARY KEY,
                razao_social VARCHAR(255) NOT NULL,
                nome_fantasia VARCHAR(255),
                cnpj VARCHAR(18) NOT NULL UNIQUE
            )
        `;
            try {
                yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log('Tabela "empresa" criada ou já existente com sucesso.');
            }
            catch (err) {
                console.error('Erro ao criar a tabela "empresa":', err);
                throw err;
            }
        });
    }
    /**
     * Insere uma nova empresa no banco de dados.
     * @param empresa
     * @returns
     */
    insertEmpresa(empresa) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO empresa (razao_social, nome_fantasia, cnpj)
            VALUES (?, ?, ?)
        `;
            const params = [
                empresa.razao_social,
                empresa.nome_fantasia,
                empresa.cnpj
            ];
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                empresa.id = resultado.insertId;
                console.log('Empresa inserida com sucesso. ID:', empresa.id);
                return empresa;
            }
            catch (err) {
                console.error('Erro ao inserir empresa:', err);
                throw err;
            }
        });
    }
    /**
     * Atualiza uma empresa existente no banco de dados.
     * @param empresa
     * @returns
     */
    updateEmpresa(empresa) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!empresa.id) {
                throw new Error("Para atualizar, a empresa precisa ter um ID.");
            }
            const query = `
            UPDATE empresa SET
                razao_social = ?,
                nome_fantasia = ?,
                cnpj = ?
            WHERE id = ?
        `;
            const params = [
                empresa.razao_social,
                empresa.nome_fantasia,
                empresa.cnpj,
                empresa.id
            ];
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                if (resultado.affectedRows === 0) {
                    throw new Error(`Nenhuma empresa encontrada com o ID ${empresa.id} para atualizar.`);
                }
                console.log('Empresa atualizada com sucesso. ID:', empresa.id);
                return empresa;
            }
            catch (err) {
                console.error(`Erro ao atualizar a empresa de ID ${empresa.id}:`, err);
                throw err;
            }
        });
    }
    /**
     * Deleta uma empresa do banco de dados pelo seu ID.
     * @param id
     */
    deleteEmpresaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM empresa WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                if (resultado.affectedRows === 0) {
                    throw new Error(`Nenhuma empresa encontrada com o ID ${id} para deletar.`);
                }
                console.log('Empresa deletada com sucesso. ID:', id);
            }
            catch (err) {
                console.error(`Falha ao deletar empresa de ID ${id}:`, err);
                throw err;
            }
        });
    }
    /**
     * Busca uma empresa pelo seu ID.
     * @param id
     * @returns
     */
    findEmpresaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM empresa WHERE id = ?";
            try {
                const resultados = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                if (resultados.length > 0) {
                    console.log('Empresa localizada com sucesso. ID:', id);
                    return resultados[0];
                }
                return null;
            }
            catch (err) {
                console.error(`Falha ao procurar empresa de ID ${id}:`, err);
                throw err;
            }
        });
    }
    /**
     * Lista todas as empresas cadastradas.
     @returns
     */
    findAllEmpresas() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM empresa";
            try {
                const resultados = yield (0, mysql_1.executarComandoSQL)(query, []);
                return resultados;
            }
            catch (err) {
                console.error('Falha ao listar as empresas:', err);
                throw err;
            }
        });
    }
}
exports.EmpresaRepository = EmpresaRepository;
