import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { UsuarioService } from "../service/usuario_service";
import { UsuarioRequestDto } from "../model/dto/usuariodto/usuario_request_dto";
import { BasicResponseDto } from "../model/dto/basic_response_dto";

@Route("usuario")
@Tags("Usuário")
export class UsuarioController extends Controller {

    private service = new UsuarioService();

    @Post()
    public async cadastrarUsuario(
        @Body() dto: UsuarioRequestDto,
        @Res() badRequest: TsoaResponse<400, BasicResponseDto>,
        @Res() created: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoUsuario = await this.service.cadastrarUsuario(dto);
            return created(201, new BasicResponseDto("Usuário criado com sucesso!", novoUsuario));
        } catch (error: any) {
            return badRequest(400, new BasicResponseDto(error.message));
        }
    }

    @Put("{id}")
    public async atualizarUsuario(
        @Path() id: number,
        @Body() dto: UsuarioRequestDto,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarioAtualizado = await this.service.atualizarUsuario(id, dto);
            return success(200, new BasicResponseDto("Usuário atualizado com sucesso!", usuarioAtualizado));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message));
        }
    }

    @Delete("{id}")
    public async deletarUsuario(
        @Path() id: number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.service.deletarUsuarioPorId(id);
            return success(200, new BasicResponseDto("Usuário deletado com sucesso!", undefined));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message));
        }
    }

    @Get("{id}")
    public async filtrarUsuarioPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.service.filtrarUsuarioPorId(id);
            if (usuario) {
                return success(200, new BasicResponseDto("Usuário encontrado!", usuario));
            }
            return notFound(404, new BasicResponseDto("Usuário não encontrado.", undefined));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message));
        }
    }

    @Get("todos")
    public async listarTodosUsuarios(
        @Res() badRequest: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarios = await this.service.listarTodosUsuarios();
            return success(200, new BasicResponseDto("Usuários listados com sucesso!", usuarios));
        } catch (error: any) {
            return badRequest(400, new BasicResponseDto(error.message));
        }
    }
}