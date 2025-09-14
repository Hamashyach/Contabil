import { executarComandoSQL } from "../database/mysql"; // Certifique-se que o caminho está correto
import { Lancamento } from "../model/entity/lancamento_model"; // Certifique-se que o caminho está correto

export class LancamentoRepository {

    constructor() {
        this.createTable();
    }

    private async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS lancamentos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                data DATE NOT NULL,
                historico TEXT NOT NULL
            )
        `;

        try {
            await executarComandoSQL(query, []);
            console.log('Tabela "lancamentos" criada ou já existente com sucesso.');
        } catch (err) {
            console.error('Erro ao criar a tabela "lancamentos":', err);
            throw err;
        }
    }

    /**
     * Insere um novo lançamento no banco de dados.
     * @param lancamento O objeto Lancamento a ser inserido.
     * @returns O objeto Lancamento com o ID preenchido.
     */
    async insertLancamento(lancamento: Lancamento): Promise<Lancamento> {
        const query = `INSERT INTO lancamentos (data, historico) VALUES (?, ?)`;
        const params = [lancamento.data, lancamento.historico];

        try {
            const resultado = await executarComandoSQL(query, params);
            lancamento.id = resultado.insertId;
            console.log('Lançamento inserido com sucesso. ID:', lancamento.id);
            return lancamento;
        } catch (err) {
            console.error('Erro ao inserir lançamento:', err);
            throw err;
        }
    }

    /**
     * Atualiza um lançamento existente no banco de dados.
     * @param lancamento O objeto Lancamento a ser atualizado.
     * @returns O objeto Lancamento atualizado.
     */
    async updateLancamento(lancamento: Lancamento): Promise<Lancamento> {
        if (!lancamento.id) {
            throw new Error("Para atualizar, o lançamento precisa ter um ID.");
        }

        const query = `UPDATE lancamentos SET data = ?, historico = ? WHERE id = ?`;
        const params = [lancamento.data, lancamento.historico, lancamento.id];

        try {
            const resultado = await executarComandoSQL(query, params);
            if (resultado.affectedRows === 0) {
                throw new Error(`Nenhum lançamento encontrado com o ID ${lancamento.id} para atualizar.`);
            }
            console.log('Lançamento atualizado com sucesso. ID:', lancamento.id);
            return lancamento;
        } catch (err) {
            console.error(`Erro ao atualizar o lançamento de ID ${lancamento.id}:`, err);
            throw err;
        }
    }

    /**
     * Deleta um lançamento do banco de dados pelo seu ID.
     * CUIDADO: Idealmente, você deve também deletar os registros associados no LivroDiario.
     * @param id O ID do lançamento a ser deletado.
     * @returns void
     */
    async deleteLancamentoById(id: number): Promise<void> {
        if (!id) {
            throw new Error("ID é obrigatório para deletar um lançamento.");
        }

        const query = "DELETE FROM lancamentos WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.affectedRows === 0) {
                throw new Error(`Nenhum lançamento encontrado com o ID ${id} para deletar.`);
            }
            console.log('Lançamento deletado com sucesso. ID:', id);
        } catch (err) {
            console.error(`Falha ao deletar lançamento de ID ${id}:`, err);
            throw err;
        }
    }

    /**
     * Busca um lançamento pelo seu ID.
     * @param id O ID do lançamento a ser buscado.
     * @returns Um objeto Lancamento se encontrado, caso contrário, null.
     */
    async findLancamentoById(id: number): Promise<Lancamento | null> {
        const query = "SELECT * FROM lancamentos WHERE id = ?";

        try {
            const resultados = await executarComandoSQL(query, [id]);
            if (resultados.length > 0) {
                // O driver do MySQL pode retornar a data como uma string. Convertemos para Date.
                const lancamento = resultados[0];
                lancamento.data = new Date(lancamento.data);
                return lancamento as Lancamento;
            }
            return null;
        } catch (err) {
            console.error(`Falha ao procurar lançamento com ID ${id}:`, err);
            throw err;
        }
    }

    /**
     * Lista todos os lançamentos, dos mais recentes para os mais antigos.
     * @returns Um array de todos os objetos Lancamento.
     */
    async findAllLancamentos(): Promise<Lancamento[]> {
        const query = "SELECT * FROM lancamentos ORDER BY data DESC, id DESC";

        try {
            const resultados = await executarComandoSQL(query, []);
            // Converte a string de data para um objeto Date em cada resultado
            return resultados.map((lancamento: any) => ({
                ...lancamento,
                data: new Date(lancamento.data)
            }));
        } catch (err) {
            console.error('Falha ao listar os lançamentos:', err);
            throw err;
        }
    }

    /**
     * Busca lançamentos dentro de um intervalo de datas.
     * @param dataInicial A data de início do período.
     * @param dataFinal A data de fim do período.
     * @returns Um array de objetos Lancamento encontrados no período.
     */
    async findByDateRange(dataInicial: Date, dataFinal: Date): Promise<Lancamento[]> {
        const query = "SELECT * FROM lancamentos WHERE data BETWEEN ? AND ? ORDER BY data ASC, id ASC";
        const params = [dataInicial, dataFinal];

        try {
            const resultados = await executarComandoSQL(query, params);
            return resultados.map((lancamento: any) => ({
                ...lancamento,
                data: new Date(lancamento.data)
            }));
        } catch (err) {
            console.error(`Falha ao buscar lançamentos entre ${dataInicial} e ${dataFinal}:`, err);
            throw err;
        }
    }
}