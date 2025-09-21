

import { executarComandoSQL } from "../database/mysql";
import { Empresa } from "../model/entity/empresa_model";

export class EmpresaRepository {

    constructor() {
        this.createTable(); 
    }

    private async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS empresa (
                id INT AUTO_INCREMENT PRIMARY KEY,
                razao_social VARCHAR(255) NOT NULL,
                nome_fantasia VARCHAR(255),
                cnpj VARCHAR(18) NOT NULL UNIQUE
            )
        `;

        try {
            await executarComandoSQL(query, []);
            console.log('Tabela "empresa" criada ou já existente com sucesso.');
        } catch (err) {
            console.error('Erro ao criar a tabela "empresa":', err);
            throw err;
        }
    }

    /**
     * Insere uma nova empresa no banco de dados.
     * @param empresa 
     * @returns 
     */
    async insertEmpresa(empresa: Empresa): Promise<Empresa> {
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
            const resultado = await executarComandoSQL(query, params);
            empresa.id = resultado.insertId;
            console.log('Empresa inserida com sucesso. ID:', empresa.id);
            return empresa;
        } catch (err) {
            console.error('Erro ao inserir empresa:', err);
            throw err;
        }
    }

    /**
     * Atualiza uma empresa existente no banco de dados.
     * @param empresa 
     * @returns 
     */
    async updateEmpresa(empresa: Empresa): Promise<Empresa> {
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
            const resultado = await executarComandoSQL(query, params);
            if (resultado.affectedRows === 0) {
                throw new Error(`Nenhuma empresa encontrada com o ID ${empresa.id} para atualizar.`);
            }
            console.log('Empresa atualizada com sucesso. ID:', empresa.id);
            return empresa;
        } catch (err) {
            console.error(`Erro ao atualizar a empresa de ID ${empresa.id}:`, err);
            throw err;
        }
    }

    /**
     * Deleta uma empresa do banco de dados pelo seu ID.
     * @param id 
     */
    async deleteEmpresaById(id: number): Promise<void> {
        const query = "DELETE FROM empresa WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.affectedRows === 0) {
                throw new Error(`Nenhuma empresa encontrada com o ID ${id} para deletar.`);
            }
            console.log('Empresa deletada com sucesso. ID:', id);
        } catch (err) {
            console.error(`Falha ao deletar empresa de ID ${id}:`, err);
            throw err;
        }
    }

    /**
     * Busca uma empresa pelo seu ID.
     * @param id
     * @returns 
     */
    async findEmpresaById(id: number): Promise<Empresa | null> {
        const query = "SELECT * FROM empresa WHERE id = ?";

        try {
            const resultados = await executarComandoSQL(query, [id]);
            if (resultados.length > 0) {
                console.log('Empresa localizada com sucesso. ID:', id);
                return resultados[0] as Empresa;
            }
            return null;
        } catch (err) {
            console.error(`Falha ao procurar empresa de ID ${id}:`, err);
            throw err;
        }
    }

    /**
     * Lista todas as empresas cadastradas.
     @returns 
     */
    async findAllEmpresas(): Promise<Empresa[]> {
        const query = "SELECT * FROM empresa";

        try {
            const resultados = await executarComandoSQL(query, []);
            return resultados as Empresa[];
        } catch (err) {
            console.error('Falha ao listar as empresas:', err);
            throw err;
        }
    }
}