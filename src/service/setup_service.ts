import { Setup } from "../model/entity/setup_model";
import { SetupRepository } from "../repository/setup_repository";
import { SetupRequestDto } from "../model/dto/setupdto/setup_request_dto";
import { SetupResponseDto } from "../model/dto/setupdto/setup_response_dto";

export class SetupService {

    private repository: SetupRepository = new SetupRepository();

    public async criarSetup(dto: SetupRequestDto): Promise<SetupResponseDto> {
        const { codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial } = dto;

        const setupExistente = await this.repository.findSetupByCodigo(codigo);
        if (setupExistente) {
            throw new Error(`Já existe uma conta com o código ${codigo}.`);
        }

        const novoSetup = new Setup(codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial);
        const setupSalvo = await this.repository.insertSetup(novoSetup);

        return this.mapEntityToDto(setupSalvo);
    }

    public async atualizarSetup(id: number, dto: SetupRequestDto): Promise<SetupResponseDto> {
        const { codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial } = dto;

        const setupExistente = await this.repository.findSetupById(id);
        if (!setupExistente) {
            throw new Error(`Setup com ID ${id} não foi encontrado.`);
        }
        
        const conflitoCodigo = await this.repository.findSetupByCodigo(codigo);
        if (conflitoCodigo && conflitoCodigo.id !== id) {
             throw new Error(`O código ${codigo} já está em uso por outra conta.`);
        }

        const setupParaAtualizar = new Setup(codigo, nome_conta, grupo_contabil, subgrupo1, subgrupo2, saldo_inicial);
        setupParaAtualizar.id = id;

        await this.repository.updateSetup(setupParaAtualizar);

        return this.mapEntityToDto(setupParaAtualizar);
    }

    public async deletarSetupPorId(id: number): Promise<void> {
        const setupExistente = await this.repository.findSetupById(id);
        if (!setupExistente) {
            throw new Error(`Setup com ID ${id} não foi encontrado.`);
        }

        await this.repository.deleteSetupById(id);
    }

    public async buscarPorId(id: number): Promise<SetupResponseDto | null> {
        const setup = await this.repository.findSetupById(id);

        if (!setup) {
            return null;
        }

        return this.mapEntityToDto(setup);
    }

    public async listarTodos(): Promise<SetupResponseDto[]> {
        const setups = await this.repository.findAllSetups();
        return setups.map(setup => this.mapEntityToDto(setup));
    }

    private mapEntityToDto(setup: Setup): SetupResponseDto {
        return {
            id: setup.id!,
            codigo: setup.codigo,
            nome_conta: setup.nome_conta,
            grupo_contabil: setup.grupo_contabil,
            subgrupo1: setup.subgrupo1,
            subgrupo2: setup.subgrupo2,
            saldo_inicial: setup.saldo_inicial
        };
    }
}