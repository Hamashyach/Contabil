import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { SetupService } from "../service/setup_service";
import { SetupRequestDto } from "../model/dto/setupdto/setup_request_dto";
import { BasicResponseDto } from "../model/dto/basic_response_dto";

@Route("setup")
@Tags("Setup")
export class SetupController extends Controller {

    private service = new SetupService();

    @Post()
    public async criarSetup(
        @Body() dto: SetupRequestDto,
        @Res() badRequest: TsoaResponse<400, BasicResponseDto>,
        @Res() created: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoSetup = await this.service.criarSetup(dto);
            return created(201, new BasicResponseDto("Setup criado com sucesso!", novoSetup));
        } catch (error: any) {
            return badRequest(400, new BasicResponseDto(error.message));
        }
    }

    @Put("{id}")
    public async atualizarSetup(
        @Path() id: number,
        @Body() dto: SetupRequestDto,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const setupAtualizado = await this.service.atualizarSetup(id, dto);
            return success(200, new BasicResponseDto("Setup atualizado com sucesso!", setupAtualizado));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message));
        }
    }

    @Delete("{id}")
    public async deletarSetup(
        @Path() id: number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.service.deletarSetupPorId(id);
            return success(200, new BasicResponseDto("Setup deletado com sucesso!", undefined));
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
            const setup = await this.service.buscarPorId(id);
            if (setup) {
                return success(200, new BasicResponseDto("Setup encontrado!", setup));
            }
            return notFound(404, new BasicResponseDto("Setup não encontrado.", undefined));
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
            const setups = await this.service.listarTodos();
            return success(200, new BasicResponseDto("Setups listados com sucesso!", setups));
        } catch (error: any) {
            return badRequest(400, new BasicResponseDto(error.message));
        }
    }
}