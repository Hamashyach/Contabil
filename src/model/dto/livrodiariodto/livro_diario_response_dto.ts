export interface LivroDiarioResponseDto {
    id: number;
    lancamentoId: number;
    setupId: number;
    tipo: 'debito' | 'credito';
    valor: number;
}