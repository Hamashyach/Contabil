import { executarComandoSQL } from "../database/mysql"; // Certifique-se que o caminho está correto
import { Setup } from "../model/entity/setup_model"; // Certifique-se que o caminho está correto

export class SetupRepository {

    constructor() {
        this.createTable();
    }

    private async createTable(): Promise<void> {
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
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela "setup" criada ou já existente com sucesso.');
        } catch (err) {
            console.error('Erro ao criar a tabela "setup":', err);
            throw err; // Lançar o erro para que a aplicação possa tratá-lo, se necessário
        }
    }

    /**
     * Insere um novo setup no banco de dados.
     * @param setup O objeto Setup a ser inserido.
     * @returns O objeto Setup com o ID preenchido.
     */
    async insertSetup(setup: Setup): Promise<Setup> {
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
            const resultado = await executarComandoSQL(query, params);
            setup.id = resultado.insertId;
            console.log('Setup inserido com sucesso. ID:', setup.id);
            return setup;
        } catch (err) {
            console.error('Erro ao inserir setup:', err);
            throw err;
        }
    }

    /**
     * Atualiza um setup existente no banco de dados.
     * @param setup O objeto Setup a ser atualizado.
     * @returns O objeto Setup atualizado.
     */
    async updateSetup(setup: Setup): Promise<Setup> {
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
            const resultado = await executarComandoSQL(query, params);
            if (resultado.affectedRows === 0) {
                throw new Error(`Nenhum setup encontrado com o ID ${setup.id} para atualizar.`);
            }
            console.log('Setup atualizado com sucesso. ID:', setup.id);
            return setup;
        } catch (err) {
            console.error(`Erro ao atualizar o setup de ID ${setup.id}:`, err);
            throw err;
        }
    }

    /**
     * Deleta um setup do banco de dados pelo seu ID.
     * @param id O ID do setup a ser deletado.
     * @returns void
     */
    async deleteSetupById(id: number): Promise<void> {
        if (!id) {
            throw new Error("ID é obrigatório para deletar um setup.");
        }

        const query = "DELETE FROM setup WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.affectedRows === 0) {
                throw new Error(`Nenhum setup encontrado com o ID ${id} para deletar.`);
            }
            console.log('Setup deletado com sucesso. ID:', id);
        } catch (err) {
            console.error(`Falha ao deletar setup de ID ${id}:`, err);
            throw err;
        }
    }

    /**
     * Busca um setup pelo seu ID.
     * @param id O ID do setup a ser buscado.
     * @returns Um objeto Setup se encontrado, caso contrário, null.
     */
    async findSetupById(id: number): Promise<Setup | null> {
        const query = "SELECT * FROM setup WHERE id = ?";

        try {
            const resultados = await executarComandoSQL(query, [id]);
            if (resultados.length > 0) {
                console.log('Setup localizado com sucesso. ID:', id);
                return resultados[0] as Setup;
            }
            return null; // Retorna nulo se não encontrar
        } catch (err) {
            console.error(`Falha ao procurar setup de ID ${id}:`, err);
            throw err;
        }
    }

    /**
     * Busca um setup pelo seu código.
     * @param codigo O código do setup a ser buscado.
     * @returns Um objeto Setup se encontrado, caso contrário, null.
     */
    async findSetupByCodigo(codigo: number): Promise<Setup | null> {
        const query = "SELECT * FROM setup WHERE codigo = ?";

        try {
            const resultados = await executarComandoSQL(query, [codigo]);
            if (resultados.length > 0) {
                console.log('Setup localizado com sucesso. Código:', codigo);
                return resultados[0] as Setup;
            }
            return null;
        } catch (err) {
            console.error(`Falha ao procurar setup com o código ${codigo}:`, err);
            throw err;
        }
    }

    /**
     * Lista todos os setups cadastrados.
     * @returns Um array de objetos Setup.
     */
    async findAllSetups(): Promise<Setup[]> {
        const query = "SELECT * FROM setup";

        try {
            const resultados = await executarComandoSQL(query, []);
            return resultados as Setup[];
        } catch (err) {
            console.error('Falha ao listar os setups:', err);
            throw err;
        }
    }
}