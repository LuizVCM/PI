"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedMapper = void 0;
const CropMapper_1 = require("./CropMapper");
const PlantMapper_1 = require("./PlantMapper");
const UserMapper_1 = require("./UserMapper");
class SeedMapper {
    static toResponse(seed) {
        return {
            id: seed.id,
            planta: PlantMapper_1.PlantMapper.toResponse(seed.planta),
            quantidade: seed.quantidade,
            unidadePeso: seed.unidadePeso,
            dataCompra: seed.dataCompra,
            dataValidade: seed.dataValidade
                ? seed.dataValidade
                : "data não informada",
            fornecedor: seed.fornecedor ? seed.fornecedor : "não informado",
            observacoes: seed.observacoes ? seed.observacoes : "sem observações",
            plantacao: seed.plantacao
                ? CropMapper_1.CropMapper.toSummaryResponse(seed.plantacao)
                : "plantação indisponível",
            usuario: seed.usuario
                ? UserMapper_1.UserMapper.toSummaryResponse(seed.usuario)
                : "usuário indisponível",
        };
    }
    static toSummaryResponse(seed) {
        return {
            id: seed.id,
            planta: PlantMapper_1.PlantMapper.toResponse(seed.planta),
            quantidade: seed.quantidade,
            unidadePeso: seed.unidadePeso,
            dataCompra: seed.dataCompra,
            dataValidade: seed.dataValidade
                ? seed.dataValidade
                : "data não informada",
            fornecedor: seed.fornecedor ? seed.fornecedor : "não informado",
            observacoes: seed.observacoes ? seed.observacoes : "sem observações",
        };
    }
    static toResponseList(seeds) {
        return seeds.map((seed) => SeedMapper.toResponse(seed));
    }
    static toSummaryResponseList(seeds) {
        return seeds.map((seed) => SeedMapper.toSummaryResponse(seed));
    }
}
exports.SeedMapper = SeedMapper;
