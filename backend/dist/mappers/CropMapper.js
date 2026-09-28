"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropMapper = void 0;
const Crop_1 = require("../models/Crop");
const area_converter_1 = require("../calc/area-converter");
const date_utils_1 = require("../utils/date-utils");
const TerritoryMapper_1 = require("./TerritoryMapper");
const SeedMapper_1 = require("./SeedMapper");
class CropMapper {
    static toResponse(crop) {
        return {
            id: crop.id,
            nome: crop.nome,
            cultura: crop.sementes
                ? SeedMapper_1.SeedMapper.toSummaryResponse(crop.sementes)
                : "indisponível",
            variedade: crop.variedade ? crop.variedade : "variedade não informada",
            area: (0, area_converter_1.fromSquareMeters)(crop.areaM2, crop.unidadeArea),
            unidadeArea: crop.unidadeArea,
            dataPlantio: crop.dataPlantio ? crop.dataPlantio : "data não informada",
            dataColheitaPrevista: crop.dataColheitaPrevista
                ? crop.dataColheitaPrevista
                : "não foi possível calcular",
            dataColheitaReal: crop.dataColheitaReal
                ? crop.dataColheitaReal
                : "indisponível",
            responsavel: crop.responsavel
                ? crop.responsavel
                : "responsável não informado",
            status: crop.status,
            observacoes: crop.observacoes ? crop.observacoes : "sem observações",
            territorio: crop.territorio
                ? TerritoryMapper_1.TerritoryMapper.toSummaryResponse(crop.territorio)
                : "território indisponível",
        };
    }
    static toSummaryResponse(crop) {
        return {
            id: crop.id,
            nome: crop.nome,
            cultura: crop.sementes
                ? SeedMapper_1.SeedMapper.toSummaryResponse(crop.sementes)
                : "indisponível",
            variedade: crop.variedade ? crop.variedade : "variedade não informada",
            area: (0, area_converter_1.fromSquareMeters)(crop.areaM2, crop.unidadeArea),
            unidadeArea: crop.unidadeArea,
            dataPlantio: crop.dataPlantio ? crop.dataPlantio : "data não informada",
            dataColheitaPrevista: crop.dataColheitaPrevista
                ? crop.dataColheitaPrevista
                : "não foi possível calcular",
            dataColheitaReal: crop.dataColheitaReal
                ? crop.dataColheitaReal
                : "indisponível",
            responsavel: crop.responsavel
                ? crop.responsavel
                : "responsável não informado",
            status: crop.status,
            observacoes: crop.observacoes ? crop.observacoes : "sem observações",
        };
    }
    static toResponseList(crops) {
        return crops.map((crop) => CropMapper.toResponse(crop));
    }
    static toCreateEntity(data, cultivation) {
        const dataPlantio = data.dataPlantio ? new Date(data.dataPlantio) : null;
        const cicloMedio = cultivation.getCicloMedioDias();
        const dataColheitaPrevista = (0, date_utils_1.setHarvestForecast)(dataPlantio, cicloMedio);
        return {
            nome: data.nome,
            variedade: data.variedade ?? null,
            areaM2: (0, area_converter_1.toSquareMeters)(data.area, data.unidadeArea),
            unidadeArea: data.unidadeArea,
            dataPlantio: data.dataPlantio ? (0, date_utils_1.formateDateToString)(new Date(data.dataPlantio)) : null,
            dataColheitaPrevista: (0, date_utils_1.formateDateToString)(dataColheitaPrevista),
            responsavel: data.responsavel ?? null,
            status: data.status ?? Crop_1.CropStatus.PLANEJADA,
            observacoes: data.observacoes ?? null,
        };
    }
    static toUpdateEntity(data) {
        const result = {};
        if (data.area !== undefined && data.unidadeArea !== undefined) {
            result.areaM2 = (0, area_converter_1.toSquareMeters)(data.area, data.unidadeArea);
            result.unidadeArea = data.unidadeArea;
        }
        return result;
    }
}
exports.CropMapper = CropMapper;
