"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAddress = fetchAddress;
const BadRequestError_1 = require("../errors/BadRequestError");
const InternalServerError_1 = require("../errors/InternalServerError");
async function fetchAddress(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    if (!response.ok) {
        throw new InternalServerError_1.InternalServerError("Não foi possível validar o CEP");
    }
    const data = await response.json();
    if (data.erro) {
        throw new BadRequestError_1.BadRequestError({
            message: "CEP não encontrado",
        });
    }
    return {
        cep: cep, // a api envia não normalizado (com hífen)
        cidade: data.localidade,
        estado: data.estado,
        bairro: data.bairro,
        logradouro: data.logradouro,
    };
}
