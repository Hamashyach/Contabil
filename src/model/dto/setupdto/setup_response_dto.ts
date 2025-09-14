export interface SetupResponseDto {
    id: number;
    codigo: number;
    nome_conta: string;
    grupo_contabil: string;
    subgrupo1: string | null;
    subgrupo2: string | null;
    saldo_inicial: number | null;
}