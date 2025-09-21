export interface RegistroUsuarioRequestDto {
    nome: string;
    senha: string;
    confirmeSenha: string;
    razao_social: string;
    nome_fantasia?: string;
    cnpj: string;
}