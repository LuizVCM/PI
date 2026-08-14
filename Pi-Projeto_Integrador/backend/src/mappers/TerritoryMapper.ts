import {
  CreateTerritoryDTO,
  UpdateTerritoryDTO,
} from "./../schemas/territory.schema";
import { Territory } from "../models/Territory";
import { fromSquareMeters, toSquareMeters } from "../utils/area-converter";
import { UserMapper } from "./UserMapper";

export class TerritoryMapper {
  static toResponse(territory: Territory) {
    return {
      id: territory.id,
      cep: territory.cep,
      area: fromSquareMeters(Number(territory.areaM2), territory.unidadeArea),
      unidadeArea: territory.unidadeArea,
      usuario: UserMapper.toResponse(territory.usuario)
    };
  }

  static toResponseList(territories: Territory[]) {
    return territories.map(this.toResponse);
  }

  static toCreateEntity(data: CreateTerritoryDTO) {
    return {
      cep: data.cep,
      unidadeArea: data.unidadeArea,
      areaM2: toSquareMeters(data.area, data.unidadeArea),
    };
  }
  static toUpdateEntity(data: UpdateTerritoryDTO) {
    const result: Partial<Territory> = {};

    if (data.cep !== undefined) {
      result.cep = data.cep;
    }

    if (data.area !== undefined && data.unidadeArea !== undefined) {
      result.areaM2 = toSquareMeters(data.area, data.unidadeArea!);
      result.unidadeArea = data.unidadeArea!;
    }

    return result;
  }
}