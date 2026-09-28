"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorRepository = void 0;
const Sensor_1 = require("../models/Sensor");
const BaseRepository_1 = require("./BaseRepository");
class SensorRepository {
    base = (0, BaseRepository_1.createBaseRepository)(Sensor_1.Sensor);
    async findAllWithRelations() {
        return this.base.findAll({ relations: { territorio: true, dados: true } });
    }
    async findAllByTerritoryId(territoryId) {
        return this.base.getRepository().find({
            where: { territorio: { id: territoryId } },
            relations: { territorio: true },
        });
    }
    async findAllByUserId(userId) {
        return this.base
            .getRepository()
            .find({
            where: { territorio: { usuario: { id: userId } } },
            relations: { territorio: true },
        });
    }
    async findByIdWithRelations(id) {
        return this.base.findById(id, {
            relations: { territorio: true, dados: true },
            select: { territorio: { usuario: true } },
        });
    }
    async create(data, territory) {
        const sensor = this.base.create({ ...data, territorio: territory });
        return this.base.save(sensor);
    }
}
exports.SensorRepository = SensorRepository;
