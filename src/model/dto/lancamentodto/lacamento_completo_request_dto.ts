// Este é um sub-DTO, pode ficar no mesmo arquivo ou separado
interface PartidaDto {
    setupId: number;
    tipo: 'debito' | 'credito';
    valor: number;
}

export interface LancamentoCompletoRequestDto {
    data: Date;
    historico: string;
    partidas: PartidaDto[];
}