"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empresa = void 0;
class Empresa {
    constructor(razao_social, cnpj, nome_fantasia, id) {
        this.razao_social = razao_social;
        this.cnpj = cnpj;
        if (nome_fantasia)
            this.nome_fantasia = nome_fantasia;
        if (id)
            this.id = id;
    }
}
exports.Empresa = Empresa;
