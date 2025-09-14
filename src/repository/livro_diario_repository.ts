import { executarComandoSQL } from "../database/mysql"; // Certifique-se que o caminho está correto
import { LivroDiario } from "../model/entity/livro_diario_model"; // Certifique-se que o caminho está correto

export class LivroDiarioRepository {

    constructor() {
        this.createTable();
    }

    private async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS livro_diario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                lancamentoId INT NOT NULL,
                setupId INT NOT NULL,
                tipo ENUM('debito', 'credito') NOT NULL,
                valor DECIMAL(15, 2) NOT NULL,
                INDEX idx_lancamentoId (lancamentoId),
                INDEX idx_setupId (setupId),
                FOREIGN KEY (lancamentoId) REFERENCES lancamentos(id),
                FOREIGN KEY (setupId) REFERENCES setup(id)
            )
        `;
        
      

        try {
            await executarComandoSQL(query, []);
            console.log('Tabela "livro_diario" criada ou já existente com sucesso.');
        } catch (err) {
            console.error('Erro ao criar a tabela "livro_diario":', err);
            throw err;
        }
    }

    /**
     * Insere um novo registro no livro diário.
     * @param livroDiario O objeto LivroDiario a ser inserido.
     * @returns O objeto LivroDiario com o ID preenchido.
     */
    async insertLivroDiario(livroDiario: LivroDiario): Promise<LivroDiario> {
        const query = `
            INSERT INTO livro_diario (lancamentoId, setupId, tipo, valor)
            VALUES (?, ?, ?, ?)
        `;
        const params = [
            livroDiario.lancamentoId,
            livroDiario.setupId,
            livroDiario.tipo,
            livroDiario.valor
        ];

        try {
            const resultado = await executarComandoSQL(query, params);
            livroDiario.id = resultado.insertId;
            console.log('Registro no Livro Diário inserido com sucesso. ID:', livroDiario.id);
            return livroDiario;
        } catch (err) {
            console.error('Erro ao inserir registro no Livro Diário:', err);
            throw err;
        }
    }

    /**
     * Atualiza um registro existente no livro diário.
     * @param livroDiario O objeto LivroDiario a ser atualizado.
     * @returns O objeto LivroDiario atualizado.
     */
    async updateLivroDiario(livroDiario: LivroDiario): Promise<LivroDiario> {
        if (!livroDiario.id) {
            throw new Error("Para atualizar, o registro do livro diário precisa ter um ID.");
        }

        const query = `
            UPDATE livro_diario SET
                lancamentoId = ?,
                setupId = ?,
                tipo = ?,
                valor = ?
            WHERE id = ?
        `;
        const params = [
            livroDiario.lancamentoId,
            livroDiario.setupId,
            livroDiario.tipo,
            livroDiario.valor,
            livroDiario.id
        ];

        try {
            const resultado = await executarComandoSQL(query, params);
            if (resultado.affectedRows === 0) {
                throw new Error(`Nenhum registro encontrado com o ID ${livroDiario.id} para atualizar.`);
            }
            console.log('Registro do Livro Diário atualizado com sucesso. ID:', livroDiario.id);
            return livroDiario;
        } catch (err) {
            console.error(`Erro ao atualizar o registro de ID ${livroDiario.id}:`, err);
            throw err;
        }
    }

    /**
     * Deleta um registro do livro diário pelo seu ID.
     * @param id O ID do registro a ser deletado.
     * @returns void
     */
    async deleteLivroDiarioById(id: number): Promise<void> {
        if (!id) {
            throw new Error("ID é obrigatório para deletar um registro.");
        }

        const query = "DELETE FROM livro_diario WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.affectedRows === 0) {
                throw new Error(`Nenhum registro encontrado com o ID ${id} para deletar.`);
            }
            console.log('Registro do Livro Diário deletado com sucesso. ID:', id);
        } catch (err) {
            console.error(`Falha ao deletar registro de ID ${id}:`, err);
            throw err;
        }
    }

    /**
     * Busca um registro do livro diário pelo seu ID.
     * @param id O ID do registro a ser buscado.
     * @returns Um objeto LivroDiario se encontrado, caso contrário, null.
     */
    async findLivroDiarioById(id: number): Promise<LivroDiario | null> {
        const query = "SELECT * FROM livro_diario WHERE id = ?";

        try {
            const resultados = await executarComandoSQL(query, [id]);
            if (resultados.length > 0) {
                return resultados[0] as LivroDiario;
            }
            return null;
        } catch (err) {
            console.error(`Falha ao procurar registro com ID ${id}:`, err);
            throw err;
        }
    }

    /**
     * Busca todos os registros associados a um mesmo lançamento (partida dobrada).
     * @param lancamentoId O ID do lançamento.
     * @returns Um array de objetos LivroDiario.
     */
    async findByLancamentoId(lancamentoId: number): Promise<LivroDiario[]> {
        const query = "SELECT * FROM livro_diario WHERE lancamentoId = ?";

        try {
            const resultados = await executarComandoSQL(query, [lancamentoId]);
            return resultados as LivroDiario[];
        } catch (err) {
            console.error(`Falha ao listar registros para o lançamento de ID ${lancamentoId}:`, err);
            throw err;
        }
    }

    /**
     * Lista todos os registros do livro diário.
     * @returns Um array de todos os objetos LivroDiario.
     */
    async findAll(): Promise<LivroDiario[]> {
        const query = "SELECT * FROM livro_diario ORDER BY lancamentoId, id";

        try {
            const resultados = await executarComandoSQL(query, []);
            return resultados as LivroDiario[];
        } catch (err) {
            console.error('Falha ao listar os registros do livro diário:', err);
            throw err;
        }
    }
}