"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSensorService = void 0;
const NotFoundError_1 = require("../errors/NotFoundError");
const AuthorizationService_1 = require("../services/AuthorizationService");
const DataSensor_1 = require("../mappers/DataSensor");
const DataSensorRepository_1 = require("../repositories/DataSensorRepository");
const SensorRepository_1 = require("../repositories/SensorRepository");
class DataSensorService {
    repo = new DataSensorRepository_1.DataSensorRepository();
    sensorRepo = new SensorRepository_1.SensorRepository();
    async getById(id, loggedUserId) {
        const data = await this.repo.findByIdWithRelation(id);
        if (!data) {
            throw new NotFoundError_1.NotFoundError("dados do sensor");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(data.sensor.territorio, loggedUserId, "sensor");
        return DataSensor_1.DataSensorMapper.toResponse(data);
    }
    async listBySensor(sensorId, loggedUserId) {
        const sensor = await this.sensorRepo.findByIdWithRelations(sensorId);
        if (!sensor) {
            throw new NotFoundError_1.NotFoundError("sensor");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(sensor.territorio, loggedUserId, "sensor");
        const data = await this.repo.findBySensorId(sensorId);
        return DataSensor_1.DataSensorMapper.toResponseList(data);
    }
    async create(data, sensorId, loggedUserId) {
        const sensor = await this.sensorRepo.findByIdWithRelations(sensorId);
        if (!sensor) {
            throw new NotFoundError_1.NotFoundError("sensor");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(sensor.territorio, loggedUserId, "sensor");
        const dataSensor = await this.repo.create(data, sensor);
        return DataSensor_1.DataSensorMapper.toResponse(dataSensor);
    }
}
exports.DataSensorService = DataSensorService;
