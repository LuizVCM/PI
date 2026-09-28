"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const TerritoryMapper_1 = require("./TerritoryMapper");
class UserMapper {
    static toResponseSavedUser(usuario) {
        return {
            id: usuario.id,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            email: usuario.email,
            telefone: usuario.telefone,
            cpf: usuario.cpf,
        };
    }
    static toResponse(usuario) {
        return {
            id: usuario.id,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            email: usuario.email,
            telefone: usuario.telefone,
            cpf: usuario.cpf,
            territorios: usuario.territorios ? TerritoryMapper_1.TerritoryMapper.toSummaryResponseList(usuario.territorios) : [],
        };
    }
    static toSummaryResponse(usuario) {
        return {
            id: usuario.id,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
        };
    }
    static toResponseList(usuarios) {
        return usuarios.map((usuario) => UserMapper.toResponse(usuario));
    }
}
exports.UserMapper = UserMapper;
