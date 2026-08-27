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

      necessidadeLuz: plant.necessidadeLuz ?? "indisponível",
      necessidadeAgua: plant.necessidadeAgua ?? "indisponível",
      texturaSolo: plant.texturaSolo ?? "indisponível",

      kcMedio: plant.kcMedio ?? "indisponível",

      nitrogenio: plant.nitrogenio ?? "indisponível",
      fosforo: plant.fosforo ?? "indisponível",
      potassio: plant.potassio ?? "indisponível",
      unidadeNpk: plant.unidadeNpk ?? "indisponível",

      criadoEm: plant.createdAt,
      atualizadoEm: plant.updatedAt,
    };
  }
  static toResponseList(plants: Plant[]) {
    return plants.map(PlantMapper.toResponse);
  }
}