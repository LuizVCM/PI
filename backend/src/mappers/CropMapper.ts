import { Crop } from "../models/Crop";
import { CreateCropDTO, UpdateCropDTO } from "../schemas/crop.schema";
import { fromSquareMeters, toSquareMeters } from "../utils/area-converter";
import { TerritoryMapper } from "./TerritoryMapper";

export class CropMapper {
  static toResponse(crop: Crop) {
    return {
      id: crop.id,
      nome: crop.nome,
      cultura: crop.cultura,
      variedade: crop.variedade ? crop.variedade : "variedade não informada",

      area: fromSquareMeters(crop.areaM2, crop.unidadeArea),
      unidadeArea: crop.unidadeArea,

      dataPlantio: crop.dataPlantio ? crop.dataPlantio : "data não informada",

      colheitaPrevista: crop.colheitaPrevista
        ? crop.colheitaPrevista
        : "data não informada",

      responsavel: crop.responsavel
        ? crop.responsavel
        : "responsável não informado",

      status: crop.status,

      observacoes: crop.observacoes ? crop.observacoes : "sem observações",

      territorio: crop.territorio
        ? TerritoryMapper.toSummaryResponse(crop.territorio)
        : "território indisponível",
    };
  }

  static toSummaryResponse(crop: Crop) {
    return {
      id: crop.id,
      nome: crop.nome,
      cultura: crop.cultura,
      status: crop.status,
    };
  }

  static toResponseList(crops: Crop[]) {
    return crops.map((crop) => CropMapper.toResponse(crop));
  }
  static toCreateEntity(data: CreateCropDTO) {
    return {
      nome: data.nome,
      cultura: data.cultura,
      variedade: data.variedade,
      areaM2: toSquareMeters(data.area, data.unidadeArea),
      unidadeArea: data.unidadeArea,
      dataPlantio: data.dataPlantio,
      colheitaPrevista: data.colheitaPrevista,
      responsavel: data.responsavel,
      status: data.status,
      observacoes: data.observacoes,
    };
  }
  static toUpdateEntity(data: UpdateCropDTO) {
    const result: Partial<Crop> = {};
    if (data.area !== undefined && data.unidadeArea !== undefined) {
      result.areaM2 = toSquareMeters(data.area, data.unidadeArea!);
      result.unidadeArea = data.unidadeArea!;
    }
    return result;
  }
}
