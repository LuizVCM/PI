"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantMapper = void 0;
const SeedMapper_1 = require("./SeedMapper");
class PlantMapper {
    static toResponse(plant) {
        return {
            id: plant.id,
            nome: plant.nome,
            nomeCientifico: plant.nomeCientifico,
            categoria: plant.categoria,
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
        };
    }
    static toSummaryResponse(plant) {
        return {
            id: plant.id,
            nome: plant.nome,
            nomeCientifico: plant.nomeCientifico,
            categoria: plant.categoria,
        };
    }
    static toResponseWithRelation(plant) {
        return {
            id: plant.id,
            nome: plant.nome,
            nomeCientifico: plant.nomeCientifico,
            categoria: plant.categoria,
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
            sementes: plant.sementes
                ? SeedMapper_1.SeedMapper.toSummaryResponseList(plant.sementes)
                : "sementes indisponíveis",
        };
    }
    static toResponseList(plants) {
        return plants.map(PlantMapper.toResponse);
    }
    static toSummaryResponseList(plants) {
        return plants.map((plant) => PlantMapper.toSummaryResponse(plant));
    }
    static toResponseWithRelationList(plants) {
        return plants.map((plant) => PlantMapper.toResponseWithRelation(plant));
    }
}
exports.PlantMapper = PlantMapper;
