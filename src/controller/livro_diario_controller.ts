import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { LivroDiarioService } from "../service/livro_diario_service";
import { LivroDiarioRequestDto } from "../model/dto/livrodiariodto/livro_diario_request_dto";
import { BasicResponseDto } from "../model/dto/basic_response_dto";

@Route("livro-diario")
@Tags("Livro Diário")
export class LivroDiarioController extends Controller {

    private service = new LivroDiarioService();

    @Post()
    public async criarEntrada(
        @Body() dto: LivroDiarioRequestDto,
        @Res() badRequest: TsoaResponse<400, BasicResponseDto>,
        @Res() created: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novaEntrada = await this.service.criarEntrada(dto);
            return created(201, new BasicResponseDto("Entrada no Livro Diário criada com sucesso!", novaEntrada));
        } catch (error: any) {
            return badRequest(400, new BasicResponseDto(error.message));
        }
    }

    @Put("{id}")
    public async atualizarEntrada(
        @Path() id: number,
        @Body() dto: LivroDiarioRequestDto,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const entradaAtualizada = await this.service.atualizarEntrada(id, dto);
            return success(200, new BasicResponseDto("Entrada atualizada com sucesso!", entradaAtualizada));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message));
        }
    }

    @Delete("{id}")
    public async deletarEntrada(
        @Path() id: number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.service.deletarEntradaPorId(id);
            return success(200, new BasicResponseDto("Entrada deletada com sucesso!", undefined));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message));
        }
    }

    @Get("{id}")
    public async buscarPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const entrada = await this.service.buscarPorId(id);
            if (entrada) {
                return success(200, new BasicResponseDto("Entrada encontrada!", entrada));
            }
            return notFound(404, new BasicResponseDto("Entrada não encontrada.", undefined));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message));
        }
    }

    @Get("por-lancamento/{lancamentoId}")
    public async buscarPorLancamentoId(
        @Path() lancamentoId: number,
        @Res() badRequest: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const entradas = await this.service.buscarPorLancamentoId(lancamentoId);
            return success(200, new BasicResponseDto("Entradas encontradas para o lançamento!", entradas));
        } catch (error: any) {
            return badRequest(400, new BasicResponseDto(error.message));
        }
    }

    @Get("todos")
    public async listarTodos(
        @Res() badRequest: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const entradas = await this.service.listarTodos();
            return success(200, new BasicResponseDto("Todas as entradas listadas com sucesso!", entradas));
        } catch (error: any) {
            return badRequest(400, new BasicResponseDto(error.message));
        }
    }
}