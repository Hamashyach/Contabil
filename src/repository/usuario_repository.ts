import { executarComandoSQL } from "../database/mysql";
import { Usuario} from "../model/entity/usuario_model";

export class UsuarioRepository{

    constructor(){
        this.createTable();
    }

    private async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                senha VARCHAR(255) NOT NULL
            )
         `;

        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso', resultado);

        }catch (err){
                console.error('Erro');
        }
            
    }

   async insertUsuario(usuario: Usuario): Promise<Usuario> {
        const query = "INSERT INTO usuario (nome, senha) VALUES (?, ?)";
        try {
            const resultado = await executarComandoSQL(query, [usuario.nome, usuario.senha]);
            usuario.id = resultado.insertId;
            return usuario;
        } catch (err) {
            console.error('Erro ao inserir usuario: ', err);
            throw err;
        }
    }
    
    async findByNome(nome: string): Promise<Usuario | null> {
        const query = "SELECT * FROM usuario WHERE nome = ?";
        try {
            const resultado = await executarComandoSQL(query, [nome]);
            if (resultado.length > 0) {
                return resultado[0];
            }
            return null;
        } catch (err) {
            console.error(`Falha ao procurar usuário com nome ${nome}:`, err);
            throw err;
        }
    }

    async updateUsuario(usuario: Usuario): Promise<Usuario>{
        const query = "UPDATE usuario set senha = ? where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [usuario.senha, usuario.id]);
            console.log('Usuario atualizada com sucesso, ID: ', resultado);
            return new Promise<Usuario> ((resolve) =>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }

    } 
    
    async deletarUsuario(usuario: Usuario):Promise<Usuario>{
        const query = "DELETE FROM usuario where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [usuario.id]);
            console.log('Usuario deletada com sucesso: ', usuario);
            return new Promise<Usuario>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any){
            console.error(`Falha ao deletar pessoa de ID ${usuario.id} gerando o erro:  ${err}`);
            throw err;
        }
    }

   

public async filterUsuarioByNomeOuEmpresa(nomeLogin: string): Promise<Usuario | null> {
    
    let query = "SELECT * FROM usuario WHERE nome = ?";
    let resultado = await executarComandoSQL(query, [nomeLogin]);

    if (resultado.length > 0) {
        return resultado[0] as Usuario;
    }

    
    query = `
        SELECT u.* FROM usuario u
        INNER JOIN empresa e ON u.id_empresa = e.id
        WHERE e.razao_social = ? OR e.nome_fantasia = ?
        LIMIT 1
    `;
    resultado = await executarComandoSQL(query, [nomeLogin, nomeLogin]);

    if (resultado.length > 0) {
        return resultado[0] as Usuario;
    }

    return null; 
}
    async filterAllUsuarios(): Promise<Usuario[]>{
        const query = "SELECT * FROM usuario";

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Usuario[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any){
            console.error(`Falha ao listar os usuarios gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterUsuarioById(id: number): Promise<Usuario | null> {
        const query = "SELECT * FROM usuario WHERE idPessoa = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length > 0) {
                return resultado[0];
            }
            return null;
        } catch (err: any) {
            console.error(`Falha ao procurar usuário com idPessoa ${id}: ${err}`);
            throw err;
        }
    }

    

}