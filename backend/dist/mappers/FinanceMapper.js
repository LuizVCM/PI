"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceMapper = void 0;
const UserMapper_1 = require("./UserMapper");
class FinanceMapper {
    static toResponse(finance) {
        return {
            id: finance.id,
            tipo: finance.tipo,
            valor: finance.valor,
            observacoes: finance.observacoes
                ? finance.observacoes
                : "sem observações",
            detalhes: finance.detalhes ? finance.detalhes : "sem detalhes",
            data: finance.data,
            usuario: finance.usuario
                ? UserMapper_1.UserMapper.toSummaryResponse(finance.usuario)
                : "usuário indisponível",
        };
    }
    static toSummaryResponse(finance) {
        return {
            id: finance.id,
            tipo: finance.tipo,
            valor: finance.valor,
            observacoes: finance.observacoes
                ? finance.observacoes
                : "sem observações",
            detalhes: finance.detalhes ? finance.detalhes : "sem detalhes",
            data: finance.data,
        };
    }
    static toResponseList(finances) {
        return finances.map((finance) => FinanceMapper.toResponse(finance));
    }
    static toSummaryResponseList(finances) {
        return finances.map((finance) => FinanceMapper.toSummaryResponse(finance));
    }
}
exports.FinanceMapper = FinanceMapper;
