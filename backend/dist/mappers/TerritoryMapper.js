"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerritoryMapper = void 0;
const area_converter_1 = require("../calc/area-converter");
const UserMapper_1 = require("./UserMapper");
const CropMapper_1 = require("./CropMapper");
class TerritoryMapper {
    static toResponse(territory) {
        return {
            id: territory.id,
            cep: territory.cep,
            cidade: territory.cidade,
            estado: territory.estado,
            bairro: territory.bairro ?? "indisponível",
            logradouro: territory.logradouro ?? "indisponível",
            area: (0, area_converter_1.fromSquareMeters)(Number(territory.areaM2), territory.unidadeArea),
            unidadeArea: territory.unidadeArea,
            usuario: territory.usuario
                ? UserMapper_1.UserMapper.toSummaryResponse(territory.usuario)
                : "usuário indisponível",
            plantacoes: territory.plantacoes
                ? territory.plantacoes.map(CropMapper_1.CropMapper.toSummaryResponse)
                : "plantações indisponíveis",
        };
    }
    static toSummaryResponse(territory) {
        return {
            id: territory.id,
            cep: territory.cep,
            cidade: territory.cidade,
            estado: territory.estado,
            bairro: territory.bairro ?? "indisponível",
            logradouro: territory.logradouro ?? "indisponível",
            area: (0, area_converter_1.fromSquareMeters)(Number(territory.areaM2), territory.unidadeArea),
            unidadeArea: territory.unidadeArea,
        };
    }
    static toResponseList(territories) {
        return territories.map((territory) => TerritoryMapper.toResponse(territory));
    }
    static toSummaryResponseList(territories) {
        return territories.map((territory) => TerritoryMapper.toSummaryResponse(territory));
    }
    static toCreateEntity(data) {
        return {
            cep: data.cep,
            unidadeArea: data.unidadeArea,
            areaM2: (0, area_converter_1.toSquareMeters)(data.area, data.unidadeArea),
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
exports.TerritoryMapper = TerritoryMapper;
