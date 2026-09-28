"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherRepository = void 0;
const Weather_1 = require("../models/Weather");
const BaseRepository_1 = require("./BaseRepository");
const date_utils_1 = require("../utils/date-utils");
class WeatherRepository {
    base = (0, BaseRepository_1.createBaseRepository)(Weather_1.Weather);
    async findAllWithTerritory() {
        return this.base.findAll({ relations: { territorio: true } });
    }
    async findConflicts(territoryId) {
        const date = (0, date_utils_1.formateDateToString)(new Date());
        return await this.base.findOne({
            where: { territorio: { id: territoryId }, data: date },
        });
    }
    async findByIdWithTeritory(id) {
        return this.base.findById(id, {
            relations: { territorio: true },
        });
    }
    async findByTerritoryId(territoryId) {
        return this.base.getRepository().find({
            where: { territorio: { id: territoryId } },
            relations: { territorio: true },
        });
    }
    async findAllByUserId(userId) {
        return this.base
            .getRepository()
            .find({ where: { territorio: { usuario: { id: userId } } }, relations: { territorio: true } });
    }
    async create(data, territory) {
        const weather = this.base.create({ ...data, territorio: territory });
        return this.base.save(weather);
    }
}
exports.WeatherRepository = WeatherRepository;
