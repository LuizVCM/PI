"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantService = void 0;
const PlantRepository_1 = require("../repositories/PlantRepository");
const NotFoundError_1 = require("../errors/NotFoundError");
const PlantMapper_1 = require("../mappers/PlantMapper");
const SeedRepository_1 = require("../repositories/SeedRepository");
const AuthorizationService_1 = require("./AuthorizationService");
class PlantService {
    repo = new PlantRepository_1.PlantRepository();
    seedRepo = new SeedRepository_1.SeedRepository();
    async listAll() {
        const plants = await this.repo.base.findAll();
        return PlantMapper_1.PlantMapper.toResponseList(plants);
    }
    async getById(id) {
        const plant = await this.repo.base.findById(id);
        if (!plant) {
            throw new NotFoundError_1.NotFoundError("planta");
        }
        return PlantMapper_1.PlantMapper.toResponse(plant);
    }
    async getPlantBySeedId(seedId, loggedUserId) {
        const seed = await this.seedRepo.findByIdWithRelations(seedId);
        if (!seed) {
            throw new NotFoundError_1.NotFoundError("semente");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(seed, loggedUserId, "semente");
        return PlantMapper_1.PlantMapper.toResponse(seed.planta);
    }
    async listUsedByUser(userId) {
        const plants = await this.repo.findByUserId(userId);
        return PlantMapper_1.PlantMapper.toResponseWithRelationList(plants);
    }
}
exports.PlantService = PlantService;
