"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSensorRepository = void 0;
const DataSensor_1 = require("../models/DataSensor");
const BaseRepository_1 = require("./BaseRepository");
class DataSensorRepository {
    base = (0, BaseRepository_1.createBaseRepository)(DataSensor_1.DataSensor);
    async findBySensorId(sensorId) {
        return this.base.findAll({
            where: { sensor: { id: sensorId } },
            relations: { sensor: true },
        });
    }
    async findByIdWithRelation(id) {
        return this.base.findById(id, {
            relations: { sensor: true },
        });
    }
    async create(data, sensor) {
        const dataSensor = this.base.create({ ...data, sensor });
        return this.base.save(dataSensor);
    }
}
exports.DataSensorRepository = DataSensorRepository;
