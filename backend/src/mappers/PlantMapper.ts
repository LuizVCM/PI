import { Plant } from "../models/Plant";

export class PlantMapper {
  static toResponse(plant: Plant) {
    return {
      id: plant.id,
      nome: plant.nome,
      nomeCientifico: plant.nomeCientifico,
      cicloMinimoDias: plant.cicloMinimoDias,
      cicloMaximoDias: plant.cicloMaximoDias,

      phMinimo: plant.phMinimo,
      phMaximo: plant.phMaximo,

      temperaturaMinima: plant.temperaturaMinima,
      temperaturaMaxima: plant.temperaturaMaxima,

      precipitacaoMinima: plant.precipitacaoMinima,
      precipitacaoMaxima: plant.precipitacaoMaxima,

      necessidadeLuz: plant.necessidadeLuz,
      necessidadeAgua: plant.necessidadeAgua,
      texturaSolo: plant.texturaSolo,

      nitrogenio: plant.nitrogenio ?? "indisponível",
      fosforo: plant.fosforo ?? "indisponível",
      potassio: plant.potassio ?? "indisponível",
      unidadeNpk: plant.unidadeNpk ?? "indisponível",

      createdAt: plant.createdAt,
      updatedAt: plant.updatedAt,
    };
  }
  static toResponseList(plants: Plant[]) {
    return plants.map(PlantMapper.toResponse);
  }
}