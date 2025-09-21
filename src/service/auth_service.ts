import { UsuarioRepository } from "../repository/usuario_repository";
import { RegistroUsuarioRequestDto } from "../model/dto/usuariodto/registro_usuario_request_dto";
import { LoginRequestDto } from "../model/dto/usuariodto/login_request_dto";
import { LoginResponseDto } from "../model/dto/usuariodto/login_response_dto";
import { UsuarioResponseDto } from "../model/dto/usuariodto/usuario_response_dto";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Usuario } from "../model/entity/usuario_model";
import{Empresa} from "../model/entity/empresa_model"
import { EmpresaRepository } from "../repository/empresa_repository";


export class AuthService {
    private empresaRepository: EmpresaRepository = new EmpresaRepository();
    private usuarioRepository: UsuarioRepository = new UsuarioRepository();
    private saltRounds = 10;

    public async registrar(dto: RegistroUsuarioRequestDto): Promise<UsuarioResponseDto> {

         const { nome, senha, confirmeSenha, razao_social, cnpj, nome_fantasia } = dto;

        if (senha !== confirmeSenha) {
            throw new Error("As senhas não coincidem.");
        }

        const usuarioExistente = await this.usuarioRepository.findByNome(nome);
        if (usuarioExistente) {
            throw new Error("Este nome de usuário já está em uso.");
        }

        const novaEmpresa = new Empresa(razao_social, cnpj, nome_fantasia);
        const empresaSalva = await this.empresaRepository.insertEmpresa(novaEmpresa);

        if (!empresaSalva.id) {
            throw new Error("Falha ao criar a empresa, o ID não foi retornado.");
        }

        const senhaHash = await bcrypt.hash(senha, this.saltRounds);
        const novoUsuario = new Usuario(nome, senhaHash, empresaSalva.id);
        const usuarioSalvo = await this.usuarioRepository.insertUsuario(novoUsuario);

        return { id: usuarioSalvo.id!, nome: usuarioSalvo.nome };
    }

    public async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
        const { nome, senha } = dto;

        const usuario = await this.usuarioRepository.filterUsuarioByNomeOuEmpresa(nome);
        if (!usuario) {
            throw new Error("Usuário/Empresa ou senha inválidos.");
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Usuário/Empresa ou senha inválidos.");
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("Chave secreta JWT não configurada.");
        }

        const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, secret, { expiresIn: '1h' });

        return {
            id: usuario.id!,
            nome: usuario.nome,
            token: token
        };
    }
}