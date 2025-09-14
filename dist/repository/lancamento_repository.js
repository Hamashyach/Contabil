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
exports.LancamentoRepository = void 0;
const mysql_1 = require("../database/mysql"); // Certifique-se que o caminho está correto
class LancamentoRepository {
    constructor() {
        this.createTable();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            CREATE TABLE IF NOT EXISTS lancamentos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                data DATE NOT NULL,
                historico TEXT NOT NULL
            )
        `;
            try {
                yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log('Tabela "lancamentos" criada ou já existente com sucesso.');
            }
            catch (err) {
                console.error('Erro ao criar a tabela "lancamentos":', err);
                throw err;
            }
        });
    }
    /**
     * Insere um novo lançamento no banco de dados.
     * @param lancamento O objeto Lancamento a ser inserido.
     * @returns O objeto Lancamento com o ID preenchido.
     */
    insertLancamento(lancamento) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO lancamentos (data, historico) VALUES (?, ?)`;
            const params = [lancamento.data, lancamento.historico];
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                lancamento.id = resultado.insertId;
                console.log('Lançamento inserido com sucesso. ID:', lancamento.id);
                return lancamento;
            }
            catch (err) {
                console.error('Erro ao inserir lançamento:', err);
                throw err;
            }
        });
    }
    /**
     * Atualiza um lançamento existente no banco de dados.
     * @param lancamento O objeto Lancamento a ser atualizado.
     * @returns O objeto Lancamento atualizado.
     */
    updateLancamento(lancamento) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lancamento.id) {
                throw new Error("Para atualizar, o lançamento precisa ter um ID.");
            }
            const query = `UPDATE lancamentos SET data = ?, historico = ? WHERE id = ?`;
            const params = [lancamento.data, lancamento.historico, lancamento.id];
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, params);
                if (resultado.affectedRows === 0) {
                    throw new Error(`Nenhum lançamento encontrado com o ID ${lancamento.id} para atualizar.`);
                }
                console.log('Lançamento atualizado com sucesso. ID:', lancamento.id);
                return lancamento;
            }
            catch (err) {
                console.error(`Erro ao atualizar o lançamento de ID ${lancamento.id}:`, err);
                throw err;
            }
        });
    }
    /**
     * Deleta um lançamento do banco de dados pelo seu ID.
     * CUIDADO: Idealmente, você deve também deletar os registros associados no LivroDiario.
     * @param id O ID do lançamento a ser deletado.
     * @returns void
     */
    deleteLancamentoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório para deletar um lançamento.");
            }
            const query = "DELETE FROM lancamentos WHERE id = ?";
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                if (resultado.affectedRows === 0) {
                    throw new Error(`Nenhum lançamento encontrado com o ID ${id} para deletar.`);
                }
                console.log('Lançamento deletado com sucesso. ID:', id);
            }
            catch (err) {
                console.error(`Falha ao deletar lançamento de ID ${id}:`, err);
                throw err;
            }
        });
    }
    /**
     * Busca um lançamento pelo seu ID.
     * @param id O ID do lançamento a ser buscado.
     * @returns Um objeto Lancamento se encontrado, caso contrário, null.
     */
    findLancamentoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM lancamentos WHERE id = ?";
            try {
                const resultados = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                if (resultados.length > 0) {
                    // O driver do MySQL pode retornar a data como uma string. Convertemos para Date.
                    const lancamento = resultados[0];
                    lancamento.data = new Date(lancamento.data);
                    return lancamento;
                }
                return null;
            }
            catch (err) {
                console.error(`Falha ao procurar lançamento com ID ${id}:`, err);
                throw err;
            }
        });
    }
    /**
     * Lista todos os lançamentos, dos mais recentes para os mais antigos.
     * @returns Um array de todos os objetos Lancamento.
     */
    findAllLancamentos() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM lancamentos ORDER BY data DESC, id DESC";
            try {
                const resultados = yield (0, mysql_1.executarComandoSQL)(query, []);
                // Converte a string de data para um objeto Date em cada resultado
                return resultados.map((lancamento) => (Object.assign(Object.assign({}, lancamento), { data: new Date(lancamento.data) })));
            }
            catch (err) {
                console.error('Falha ao listar os lançamentos:', err);
                throw err;
            }
        });
    }
    /**
     * Busca lançamentos dentro de um intervalo de datas.
     * @param dataInicial A data de início do período.
     * @param dataFinal A data de fim do período.
     * @returns Um array de objetos Lancamento encontrados no período.
     */
    findByDateRange(dataInicial, dataFinal) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM lancamentos WHERE data BETWEEN ? AND ? ORDER BY data ASC, id ASC";
            const params = [dataInicial, dataFinal];
            try {
                const resultados = yield (0, mysql_1.executarComandoSQL)(query, params);
                return resultados.map((lancamento) => (Object.assign(Object.assign({}, lancamento), { data: new Date(lancamento.data) })));
            }
            catch (err) {
                console.error(`Falha ao buscar lançamentos entre ${dataInicial} e ${dataFinal}:`, err);
                throw err;
            }
        });
    }
}
exports.LancamentoRepository = LancamentoRepository;
