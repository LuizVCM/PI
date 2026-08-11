import { Territory } from "../models/Territory";
import { CreateCropDTO } from "../schemas/crop.schema";
import { fromSquareMeters, toSquareMeters } from "../utils/area-converter";

export class CropMapper {
  static toResponse(crop: Crop) {
    return {
      id: crop.id,
      cep: crop.cep,
      tamanho: fromSquareMeters(
        Number(crop.areaM2),
        crop.unidadeArea
      ),
      unidade: crop.unidadeArea,
    };
  }

  static toEntity(data: CreateCropDTO) {
    return {
      cep: data.cep,
      areaM2: toSquareMeters(data.tamanho, data.unidade),
      unidadeArea: data.unidade,
    };
  }
}