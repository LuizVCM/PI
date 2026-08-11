import { Territory } from "../models/Territory";
import { CreateTerritoryDTO } from "../schemas/territory.schema";
import { fromSquareMeters, toSquareMeters } from "../utils/area-converter";

export class territoryMapper {
  static toResponse(territory: Territory) {
    return {
      id: territory.id,
      cep: territory.cep,
      tamanho: fromSquareMeters(
        Number(territory.areaM2),
        territory.unidadeArea
      ),
      unidade: territory.unidadeArea,
    };
  }

  static toEntity(data: CreateTerritoryDTO) {
    return {
      cep: data.cep,
      areaM2: toSquareMeters(data.tamanho, data.unidade),
      unidadeArea: data.unidade,
    };
  }
}