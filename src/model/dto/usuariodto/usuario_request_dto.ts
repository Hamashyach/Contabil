export interface UsuarioRequestDto {
    nome: string;
    senha: string;
    razao_social: string;
    nome_fantasia?: string;
    cnpj: string;
}