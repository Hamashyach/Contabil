import { Lancamento } from "../model/entity/lancamento_model";
import { LivroDiario } from "../model/entity/livro_diario_model";
import { LancamentoRepository } from "../repository/lancamento_repository";
import { LivroDiarioRepository } from "../repository/livro_diario_repository";
import { LancamentoCompletoRequestDto } from "../model/dto/lancamentodto/lacamento_completo_request_dto";
import { LancamentoRequestDto } from "../model/dto/lancamentodto/lancamento_request_dto"; // para update simples
import { LancamentoResponseDto } from "../model/dto/lancamentodto/lancamento_response_dto";

export class LancamentoService {

    private repository: LancamentoRepository = new LancamentoRepository();
    private livroDiarioRepository: LivroDiarioRepository = new LivroDiarioRepository();

    public async criarLancamentoCompleto(dto: LancamentoCompletoRequestDto): Promise<LancamentoResponseDto> {
        const { data, historico, partidas } = dto;

        this.validarPartidas(partidas);

        // AQUI DEVE COMEÇAR UMA TRANSAÇÃO DE BANCO DE DADOS

        try {
            const novoLancamento = new Lancamento(data, historico);
            const lancamentoSalvo = await this.repository.insertLancamento(novoLancamento);

            for (const partida of partidas) {
                const novaEntradaDiario = new LivroDiario(
                    lancamentoSalvo.id!,
                    partida.setupId,
                    partida.tipo,
                    partida.valor
                );
                await this.livroDiarioRepository.insertLivroDiario(novaEntradaDiario);
            }

            // AQUI DEVE OCORRER O COMMIT DA TRANSAÇÃO

            return this.mapEntityToDto(lancamentoSalvo);

        } catch (error) {
            // AQUI DEVE OCORRER O ROLLBACK DA TRANSAÇÃO
            throw error;
        }
    }

    public async atualizarLancamento(id: number, dto: LancamentoRequestDto): Promise<LancamentoResponseDto> {
        const lancamentoExistente = await this.repository.findLancamentoById(id);
        if (!lancamentoExistente) {
            throw new Error(`Lançamento com ID ${id} não foi encontrado.`);
        }

        const lancamentoParaAtualizar = new Lancamento(dto.data, dto.historico);
        lancamentoParaAtualizar.id = id;

        await this.repository.updateLancamento(lancamentoParaAtualizar);
        return this.mapEntityToDto(lancamentoParaAtualizar);
    }
    
    public async deletarLancamentoPorId(id: number): Promise<void> {
        const lancamentoExistente = await this.repository.findLancamentoById(id);
        if (!lancamentoExistente) {
            throw new Error(`Lançamento com ID ${id} não foi encontrado.`);
        }

        // AQUI DEVE COMEÇAR UMA TRANSAÇÃO DE BANCO DE DADOS
        try {
            const partidas = await this.livroDiarioRepository.findByLancamentoId(id);
            for (const partida of partidas) {
                await this.livroDiarioRepository.deleteLivroDiarioById(partida.id!);
            }
            await this.repository.deleteLancamentoById(id);

            // AQUI DEVE OCORRER O COMMIT DA TRANSAÇÃO
        } catch (error) {
            // AQUI DEVE OCORRER O ROLLBACK DA TRANSAÇÃO
            throw error;
        }
    }

    public async buscarPorId(id: number): Promise<LancamentoResponseDto | null> {
        const lancamento = await this.repository.findLancamentoById(id);
        return lancamento ? this.mapEntityToDto(lancamento) : null;
    }

    public async listarTodos(): Promise<LancamentoResponseDto[]> {
        const lancamentos = await this.repository.findAllLancamentos();
        return lancamentos.map(lancamento => this.mapEntityToDto(lancamento));
    }

    private validarPartidas(partidas: any[]): void {
        if (!partidas || partidas.length < 2) {
            throw new Error("Um lançamento deve ter no mínimo uma partida de débito e uma de crédito.");
        }

        const totalDebito = partidas
            .filter(p => p.tipo === 'debito')
            .reduce((soma, p) => soma + p.valor, 0);

        const totalCredito = partidas
            .filter(p => p.tipo === 'credito')
            .reduce((soma, p) => soma + p.valor, 0);
            
        if (totalDebito === 0 || totalCredito === 0) {
            throw new Error("Lançamentos devem ter pelo menos um débito e um crédito com valor maior que zero.");
        }

        if (totalDebito.toFixed(2) !== totalCredito.toFixed(2)) {
            throw new Error(`A soma dos débitos (R$ ${totalDebito.toFixed(2)}) não é igual à soma dos créditos (R$ ${totalCredito.toFixed(2)}).`);
        }
    }

    private mapEntityToDto(lancamento: Lancamento): LancamentoResponseDto {
        return {
            id: lancamento.id!,
            data: lancamento.data,
            historico: lancamento.historico
        };
    }
}