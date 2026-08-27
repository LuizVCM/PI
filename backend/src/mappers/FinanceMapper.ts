import { Finance } from "../models/Finance";
import { UserMapper } from "./UserMapper";

export class FinanceMapper {
  static toResponse(finance: Finance) {
    return {
      id: finance.id,
      tipo: finance.tipo,
      valor: finance.valor,
      observacoes: finance.observacoes
        ? finance.observacoes
        : "sem observações",
      detalhes: finance.detalhes ? finance.detalhes : "sem detalhes",
      dataFinanca: finance.dataFinanca,
      usuario: finance.usuario
        ? UserMapper.toSummaryResponse(finance.usuario)
        : "usuário indisponível",
    };
  }
  static toSummaryResponse(finance: Finance) {
    return {
      id: finance.id,
      tipo: finance.tipo,
      valor: finance.valor,
      observacoes: finance.observacoes
        ? finance.observacoes
        : "sem observações",
      detalhes: finance.detalhes ? finance.detalhes : "sem detalhes",
      data: finance.dataFinanca,
    };
  }
  static toResponseList(finances: Finance[]) {
    return finances.map((finance) => FinanceMapper.toResponse(finance));
  }
  static toSummaryResponseList(finances: Finance[]) {
    return finances.map((finance) => FinanceMapper.toSummaryResponse(finance));
  }
}