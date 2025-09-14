import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { LancamentoService } from "../service/lancamento_service";
import { LancamentoCompletoRequestDto } from "../model/dto/lancamentodto/lacamento_completo_request_dto";
import { BasicResponseDto } from "../model/dto/basic_response_dto";

@Route("lancamento")
@Tags("Lançamento")
export class LancamentoController extends Controller {

    private service = new LancamentoService();

    @Post()
    public async criarLancamento(
        @Body() dto: LancamentoCompletoRequestDto,
        @Res() badRequest: TsoaResponse<400, BasicResponseDto>,
        @Res() created: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoLancamento = await this.service.criarLancamentoCompleto(dto);
            return created(201, new BasicResponseDto("Lançamento criado com sucesso!", novoLancamento));
        } catch (error: any) {
            return badRequest(400, new BasicResponseDto(error.message));
        }
    }

    @Put("{id}")
    public async atualizarLancamento(
        @Path() id: number,
        @Body() dto: LancamentoCompletoRequestDto,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const lancamentoAtualizado = await this.service.atualizarLancamento(id, dto);
            return success(200, new BasicResponseDto("Lançamento atualizado com sucesso!", lancamentoAtualizado));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message));
        }
    }

    @Delete("{id}")
    public async deletarLancamento(
        @Path() id: number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.service.deletarLancamentoPorId(id);
            return success(200, new BasicResponseDto("Lançamento deletado com sucesso!", undefined));
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
            const lancamento = await this.service.buscarPorId(id);
            if (lancamento) {
                return success(200, new BasicResponseDto("Lançamento encontrado!", lancamento));
            }
            return notFound(404, new BasicResponseDto("Lançamento não encontrado.", undefined));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message));
        }
    }

    @Get("todos")
    public async listarTodos(
        @Res() badRequest: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const lancamentos = await this.service.listarTodos();
            return success(200, new BasicResponseDto("Lançamentos listados com sucesso!", lancamentos));
        } catch (error: any) {
            return badRequest(400, new BasicResponseDto(error.message));
        }
    }
}