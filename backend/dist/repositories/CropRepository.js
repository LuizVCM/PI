"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropRepository = void 0;
const Crop_1 = require("../models/Crop");
const BaseRepository_1 = require("./BaseRepository");
class CropRepository {
    base = (0, BaseRepository_1.createBaseRepository)(Crop_1.Crop);
    async findAllWithRelations() {
        return this.base.findAll({
            relations: { territorio: { usuario: true }, sementes: { planta: true } },
        });
    }
    /** retorna o usuário */
    async findByTerritoryId(territoryId) {
        return this.base.getRepository().find({
            where: { territorio: { id: territoryId } },
            relations: { territorio: { usuario: true }, sementes: { planta: true } },
        });
    }
    /** retorna o usuário */
    async findByIdWithRelations(id) {
        return this.base.findById(id, {
            relations: { territorio: { usuario: true }, sementes: { planta: true } },
        });
    }
    /** retorna o usuário */
    async findAllByUserId(userId) {
        return this.base.findAll({
            where: { territorio: { usuario: { id: userId } } },
            relations: { territorio: { usuario: true }, sementes: { planta: true } },
        });
    }
    async create(data, territory, seed) {
        const crop = this.base.create({
            ...data,
            territorio: territory,
            sementes: seed,
        });
        return this.base.save(crop);
    }
}
exports.CropRepository = CropRepository;
