"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorService = void 0;
const SensorRepository_1 = require("../repositories/SensorRepository");
const NotFoundError_1 = require("../errors/NotFoundError");
const TerritoryRepository_1 = require("../repositories/TerritoryRepository");
const AuthorizationService_1 = require("./AuthorizationService");
const SensorMapper_1 = require("../mappers/SensorMapper");
const data_filter_1 = require("../utils/data-filter");
const InternalServerError_1 = require("../errors/InternalServerError");
class SensorService {
    repo = new SensorRepository_1.SensorRepository();
    territoryRepo = new TerritoryRepository_1.TerritoryRepository();
    async listAll() {
        const sensors = await this.repo.findAllWithRelations();
        return SensorMapper_1.SensorMapper.toResponseList(sensors);
    }
    async getById(id, loggedUserId) {
        const sensor = await this.repo.findByIdWithRelations(id);
        if (!sensor) {
            throw new NotFoundError_1.NotFoundError("sensor");
        }
        AuthorizationService_1.AuthorizationService.ensureRelationActive(sensor.territorio, "sensor", "território");
        AuthorizationService_1.AuthorizationService.ensureOwnership(sensor.territorio, loggedUserId, "sensor");
        return SensorMapper_1.SensorMapper.toResponse(sensor);
    }
    async listByTerritoryId(territoryId, loggedUserId) {
        const territory = await this.territoryRepo.findByIdWithRelations(territoryId);
        if (!territory) {
            throw new NotFoundError_1.NotFoundError("território");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
        const sensors = await this.repo.findAllByTerritoryId(territoryId);
        return SensorMapper_1.SensorMapper.toResponseList(sensors);
    }
    async listByUserLogged(userId) {
        const sensors = await this.repo.findAllByUserId(userId);
        return SensorMapper_1.SensorMapper.toResponseList(sensors);
    }
    async create(data, territoryId, loggedUserId) {
        const territory = await this.territoryRepo.findByIdWithRelations(territoryId);
        if (!territory) {
            throw new NotFoundError_1.NotFoundError("território");
        }
        AuthorizationService_1.AuthorizationService.ensureRelationActive(territory, "sensor", "território");
        AuthorizationService_1.AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
        const sensor = await this.repo.create(data, territory);
        return SensorMapper_1.SensorMapper.toResponse(sensor);
    }
    async update(id, data, loggedUserId) {
        const sensor = await this.repo.findByIdWithRelations(id);
        if (!sensor) {
            throw new NotFoundError_1.NotFoundError("sensor");
        }
        AuthorizationService_1.AuthorizationService.ensureRelationActive(sensor.territorio, "sensor", "território");
        AuthorizationService_1.AuthorizationService.ensureOwnership(sensor.territorio, loggedUserId, "sensor");
        (0, data_filter_1.dataFilter)(sensor, data);
        const sensorUpdated = await this.repo.base.save(sensor);
        return sensorUpdated;
    }
    async delete(id, loggedUserId) {
        const sensor = await this.repo.findByIdWithRelations(id);
        if (!sensor) {
            throw new NotFoundError_1.NotFoundError("sensor");
        }
        AuthorizationService_1.AuthorizationService.ensureRelationActive(sensor.territorio, "sensor", "território");
        AuthorizationService_1.AuthorizationService.ensureOwnership(sensor.territorio, loggedUserId, "sensor");
        const result = await this.repo.base.softDelete(id);
        if (result.affected === 0) {
            throw new InternalServerError_1.InternalServerError("Não foi possível deletar");
        }
        return result;
    }
}
exports.SensorService = SensorService;
