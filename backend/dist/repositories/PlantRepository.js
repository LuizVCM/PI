"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantRepository = void 0;
const Plant_1 = require("../models/Plant");
const BaseRepository_1 = require("./BaseRepository");
class PlantRepository {
    base = (0, BaseRepository_1.createBaseRepository)(Plant_1.Plant);
    async findExisting(scientificName) {
        const existing = await this.base.count({
            where: {
                nomeCientifico: scientificName,
            },
        });
        return existing > 0;
    }
    async findBySeedId(seedId) {
        return this.base.getRepository().findOne({
            where: { sementes: { id: seedId } },
            relations: {
                sementes: {
                    planta: true,
                },
            },
        });
    }
    async findByUserId(userId) {
        return this.base.getRepository().find({
            where: { sementes: { usuario: { id: userId } } },
            relations: {
                sementes: {
                    planta: true,
                },
            },
        });
    }
    async findByName(name) {
        return this.base.getRepository().findOne({ where: { nome: name } });
    }
}
exports.PlantRepository = PlantRepository;
