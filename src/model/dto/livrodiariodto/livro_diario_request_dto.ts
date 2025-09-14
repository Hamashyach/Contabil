export interface LivroDiarioRequestDto {
    lancamentoId: number;
    setupId: number;
    tipo: 'debito' | 'credito';
    valor: number;
}