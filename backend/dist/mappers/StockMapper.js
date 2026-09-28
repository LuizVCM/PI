"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockMapper = void 0;
const UserMapper_1 = require("./UserMapper");
class StockMapper {
    static toResponse(stock) {
        return {
            id: stock.id,
            nome: stock.nome,
            quantidade: stock.quantidade,
            unidade: stock.unidade,
            categoria: stock.categoria,
            limiteMinimo: stock.limiteMinimo ?? null,
            dataValidade: stock.dataValidade,
            usuario: stock.usuario
                ? UserMapper_1.UserMapper.toSummaryResponse(stock.usuario)
                : "usuário indisponível",
        };
    }
    static toSummaryResponse(stock) {
        return {
            id: stock.id,
            nome: stock.nome,
            quantidade: stock.quantidade,
            unidade: stock.unidade,
            categoria: stock.categoria,
            dataValidade: stock.dataValidade,
        };
    }
    static toResponseList(stocks) {
        return stocks.map((stock) => StockMapper.toResponse(stock));
    }
    static toSummaryResponseList(stocks) {
        return stocks.map((stock) => StockMapper.toSummaryResponse(stock));
    }
}
exports.StockMapper = StockMapper;
