

import { Usuario } from "../model/entity/usuario_model";
import { Empresa } from "../model/entity/empresa_model"; 
import { UsuarioRepository } from "../repository/usuario_repository";
import { UsuarioRequestDto } from "../model/dto/usuariodto/usuario_request_dto";
import { UsuarioResponseDto } from "../model/dto/usuariodto/usuario_response_dto";
import { EmpresaRepository } from "../repository/empresa_repository";
import * as bcrypt from 'bcrypt';

export class UsuarioService {

    private repository: UsuarioRepository = new UsuarioRepository();
    private empresaRepository: EmpresaRepository = new EmpresaRepository();
    private saltRounds = 10;

    public async cadastrarUsuario(dto: UsuarioRequestDto): Promise<UsuarioResponseDto> {
        const { senha, nome, razao_social, cnpj, nome_fantasia } = dto;

        if (!senha) {
            throw new Error("Senha é obrigatória.");
        }
        if (!nome || !razao_social || !cnpj) {
            throw new Error("Nome, Email, Razão Social e CNPJ são obrigatórios.");
        }
        
        
        
        const novaEmpresa = new Empresa(razao_social, cnpj, nome_fantasia);
        const empresaSalva = await this.empresaRepository.insertEmpresa(novaEmpresa);

        
        
        
        if (!empresaSalva.id) {
            throw new Error("Falha ao criar a empresa, o ID não foi retornado.");
        }
        

        
        const senhaHash = await bcrypt.hash(senha, this.saltRounds);
        
        
        const novoUsuario = new Usuario(nome, senhaHash, empresaSalva.id); 
        
        
        const usuarioSalvo = await this.repository.insertUsuario(novoUsuario);

        return this.mapEntityToDto(usuarioSalvo);
    }

    public async atualizarUsuario(id: number, dto: UsuarioRequestDto): Promise<UsuarioResponseDto> {
        const { senha, nome } = dto;

        const usuarioExistente = await this.repository.filterUsuarioById(id);
        if (!usuarioExistente) {
            throw new Error(`Usuário com ID ${id} não foi encontrado.`);
        }

        const senhaHash = await bcrypt.hash(senha, this.saltRounds);
        
        const usuarioParaAtualizar = new Usuario(nome, senhaHash, usuarioExistente.id_empresa); 
        usuarioParaAtualizar.id = id;

        await this.repository.updateUsuario(usuarioParaAtualizar);

        return this.mapEntityToDto(usuarioParaAtualizar);
    }

    public async deletarUsuarioPorId(id: number): Promise<void> {
        const usuarioExistente = await this.repository.filterUsuarioById(id);
        if (!usuarioExistente) {
            throw new Error(`Usuário com ID ${id} não foi encontrado.`);
        }

        await this.repository.deletarUsuario(usuarioExistente);
    }

    public async filtrarUsuarioPorId(id: number): Promise<UsuarioResponseDto | null> {
        const usuario = await this.repository.filterUsuarioById(id);

        if (!usuario) {
            return null;
        }

        return this.mapEntityToDto(usuario);
    }

    public async listarTodosUsuarios(): Promise<UsuarioResponseDto[]> {
        const usuarios = await this.repository.filterAllUsuarios();
        return usuarios.map(usuario => this.mapEntityToDto(usuario));
    }

    private mapEntityToDto(usuario: Usuario): UsuarioResponseDto {
        return {
            id: usuario.id!,
            nome: usuario.nome!
        };
    }
}