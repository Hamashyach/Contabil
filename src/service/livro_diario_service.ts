import { LivroDiario } from "../model/entity/livro_diario_model";
import { LivroDiarioRepository } from "../repository/livro_diario_repository";
import { LancamentoRepository } from "../repository/lancamento_repository";
import { SetupRepository } from "../repository/setup_repository";
import { LivroDiarioRequestDto } from "../model/dto/livrodiariodto/livro_diario_request_dto";
import { LivroDiarioResponseDto } from "../model/dto/livrodiariodto/livro_diario_response_dto";

export class LivroDiarioService {

    private repository: LivroDiarioRepository = new LivroDiarioRepository();
    private lancamentoRepository: LancamentoRepository = new LancamentoRepository();
    private setupRepository: SetupRepository = new SetupRepository();

    public async criarEntrada(dto: LivroDiarioRequestDto): Promise<LivroDiarioResponseDto> {
        const { lancamentoId, setupId, tipo, valor } = dto;

        await this.validarReferencias(lancamentoId, setupId);
        
        if (valor <= 0) {
            throw new Error("O valor do lançamento deve ser positivo.");
        }

        const novaEntrada = new LivroDiario(lancamentoId, setupId, tipo, valor);
        const entradaSalva = await this.repository.insertLivroDiario(novaEntrada);

        return this.mapEntityToDto(entradaSalva);
    }

    public async atualizarEntrada(id: number, dto: LivroDiarioRequestDto): Promise<LivroDiarioResponseDto> {
        const { lancamentoId, setupId, tipo, valor } = dto;

        const entradaExistente = await this.repository.findLivroDiarioById(id);
        if (!entradaExistente) {
            throw new Error(`Entrada no Livro Diário com ID ${id} não foi encontrada.`);
        }
        
        await this.validarReferencias(lancamentoId, setupId);

        if (valor <= 0) {
            throw new Error("O valor do lançamento deve ser positivo.");
        }

        const entradaParaAtualizar = new LivroDiario(lancamentoId, setupId, tipo, valor);
        entradaParaAtualizar.id = id;

        await this.repository.updateLivroDiario(entradaParaAtualizar);

        return this.mapEntityToDto(entradaParaAtualizar);
    }

    public async deletarEntradaPorId(id: number): Promise<void> {
        const entradaExistente = await this.repository.findLivroDiarioById(id);
        if (!entradaExistente) {
            throw new Error(`Entrada no Livro Diário com ID ${id} não foi encontrada.`);
        }

        await this.repository.deleteLivroDiarioById(id);
    }

    public async buscarPorId(id: number): Promise<LivroDiarioResponseDto | null> {
        const entrada = await this.repository.findLivroDiarioById(id);
        return entrada ? this.mapEntityToDto(entrada) : null;
    }

    public async buscarPorLancamentoId(lancamentoId: number): Promise<LivroDiarioResponseDto[]> {
        const entradas = await this.repository.findByLancamentoId(lancamentoId);
        return entradas.map(entrada => this.mapEntityToDto(entrada));
    }

    public async listarTodos(): Promise<LivroDiarioResponseDto[]> {
        const entradas = await this.repository.findAll();
        return entradas.map(entrada => this.mapEntityToDto(entrada));
    }
    
    private async validarReferencias(lancamentoId: number, setupId: number): Promise<void> {
        const lancamento = await this.lancamentoRepository.findLancamentoById(lancamentoId);
        if (!lancamento) {
            throw new Error(`O Lançamento com ID ${lancamentoId} não existe.`);
        }

        const setup = await this.setupRepository.findSetupById(setupId);
        if (!setup) {
            throw new Error(`A Conta (Setup) com ID ${setupId} não existe.`);
        }
    }

    private mapEntityToDto(entrada: LivroDiario): LivroDiarioResponseDto {
        return {
            id: entrada.id!,
            lancamentoId: entrada.lancamentoId,
            setupId: entrada.setupId,
            tipo: entrada.tipo,
            valor: entrada.valor
        };
    }
}