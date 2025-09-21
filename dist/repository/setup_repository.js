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
exports.SetupRepository = void 0;
const mysql_1 = require("../database/mysql");
class SetupRepository {
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            CREATE TABLE IF NOT EXISTS setup (
                id INT AUTO_INCREMENT PRIMARY KEY,
                codigo INT NOT NULL UNIQUE,
                nome_conta VARCHAR(255) NOT NULL,
                grupo_contabil VARCHAR(255) NOT NULL,
                subgrupo1 VARCHAR(255),
                subgrupo2 VARCHAR(255),
                saldo_inicial DECIMAL(15, 2) DEFAULT 0.00
            )
        `;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log('Tabela "setup" criada ou já existente com sucesso.');
            }
            catch (err) {
                console.error('Erro ao criar a tabela "setup":', err);
                throw err;
            }
        });
    }
    /**
     * Insere um novo setup no banco de dados.
     * @param setup O objeto Setup a ser inserido.
     * @returns O objeto Setup com o ID preenchido.
     */
    insertSetup(setup) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO setup (codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
            const params = [
                setup.codigo,
                setup.nome_conta,
                setup.grupo_contabil,
                setup.subgrupo1,
                setup.subgrupo2,
                setup.saldo_inicial
            ];
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                setup.id = resultado.insertId;
                console.log('Setup inserido com sucesso. ID:', setup.id);
                return setup;
            }
            catch (err) {
                console.error('Erro ao inserir setup:', err);
                throw err;
            }
        });
    }
    /**
     * Atualiza um setup existente no banco de dados.
     * @param setup O objeto Setup a ser atualizado.
     * @returns O objeto Setup atualizado.
     */
    updateSetup(setup) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!setup.id) {
                throw new Error("Para atualizar, o setup precisa ter um ID.");
            }
            const query = `
            UPDATE setup SET
                codigo = ?,
                nome_conta = ?,
                grupo_contabil = ?,
                subgrupo1 = ?,
                subgrupo2 = ?,
                saldo_inicial = ?
            WHERE id = ?
        `;
            const params = [
                setup.codigo,
                setup.nome_conta,
                setup.grupo_contabil,
                setup.subgrupo1,
                setup.subgrupo2,
                setup.saldo_inicial,
                setup.id
            ];
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                if (resultado.affectedRows === 0) {
                    throw new Error(`Nenhum setup encontrado com o ID ${setup.id} para atualizar.`);
                }
                console.log('Setup atualizado com sucesso. ID:', setup.id);
                return setup;
            }
            catch (err) {
                console.error(`Erro ao atualizar o setup de ID ${setup.id}:`, err);
                throw err;
            }
        });
    }
    /**
     * Deleta um setup do banco de dados pelo seu ID.
     * @param id O ID do setup a ser deletado.
     * @returns void
     */
    deleteSetupById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório para deletar um setup.");
            }
            const query = "DELETE FROM setup WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                if (resultado.affectedRows === 0) {
                    throw new Error(`Nenhum setup encontrado com o ID ${id} para deletar.`);
                }
                console.log('Setup deletado com sucesso. ID:', id);
            }
            catch (err) {
                console.error(`Falha ao deletar setup de ID ${id}:`, err);
                throw err;
            }
        });
    }
    /**
     * Busca um setup pelo seu ID.
     * @param id O ID do setup a ser buscado.
     * @returns Um objeto Setup se encontrado, caso contrário, null.
     */
    findSetupById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM setup WHERE id = ?";
            try {
                const resultados = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                if (resultados.length > 0) {
                    console.log('Setup localizado com sucesso. ID:', id);
                    return resultados[0];
                }
                return null;
            }
            catch (err) {
                console.error(`Falha ao procurar setup de ID ${id}:`, err);
                throw err;
            }
        });
    }
    /**
     * Busca um setup pelo seu código.
     * @param codigo O código do setup a ser buscado.
     * @returns Um objeto Setup se encontrado, caso contrário, null.
     */
    findSetupByCodigo(codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM setup WHERE codigo = ?";
            try {
                const resultados = yield (0, mysql_1.executarComandoSQL)(query, [codigo]);
                if (resultados.length > 0) {
                    console.log('Setup localizado com sucesso. Código:', codigo);
                    return resultados[0];
                }
                return null;
            }
            catch (err) {
                console.error(`Falha ao procurar setup com o código ${codigo}:`, err);
                throw err;
            }
        });
    }
    /**
     * Lista todos os setups cadastrados.
     * @returns Um array de objetos Setup.
     */
    findAllSetups() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM setup";
            try {
                const resultados = yield (0, mysql_1.executarComandoSQL)(query, []);
                return resultados;
            }
            catch (err) {
                console.error('Falha ao listar os setups:', err);
                throw err;
            }
        });
    }
}
exports.SetupRepository = SetupRepository;
