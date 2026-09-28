"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const ConflictError_1 = require("../errors/ConflictError");
const InternalServerError_1 = require("../errors/InternalServerError");
const NotFoundError_1 = require("../errors/NotFoundError");
const SeedMapper_1 = require("../mappers/SeedMapper");
const PlantRepository_1 = require("../repositories/PlantRepository");
const SeedRepository_1 = require("../repositories/SeedRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const data_filter_1 = require("../utils/data-filter");
const AuthorizationService_1 = require("./AuthorizationService");
class SeedService {
    repo = new SeedRepository_1.SeedRepository();
    userRepo = new UserRepository_1.UserRepository();
    plantRepo = new PlantRepository_1.PlantRepository();
    async listAll() {
        const seeds = await this.repo.findAllWithRelations();
        return SeedMapper_1.SeedMapper.toResponseList(seeds);
    }
    async getById(id, loggedUserId) {
        const seed = await this.repo.findByIdWithRelations(id);
        if (!seed) {
            throw new NotFoundError_1.NotFoundError("semente");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(seed, loggedUserId, "semente");
        return SeedMapper_1.SeedMapper.toResponse(seed);
    }
    async listByUserLogged(userId) {
        const seeds = await this.repo.findByUserIdWithRelations(userId);
        return SeedMapper_1.SeedMapper.toResponseList(seeds);
    }
    async create(data, loggedUserId) {
        const user = await this.userRepo.base.findById(loggedUserId);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("usuário");
        }
        const plant = await this.plantRepo.base.findById(data.plantaId);
        if (!plant) {
            throw new NotFoundError_1.NotFoundError("planta");
        }
        const seed = await this.repo.create(data, user, plant);
        return SeedMapper_1.SeedMapper.toResponse(seed);
    }
    async update(id, data, loggedUserId) {
        const seed = await this.repo.findByIdWithRelations(id);
        if (!seed) {
            throw new NotFoundError_1.NotFoundError("semente");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(seed, loggedUserId, "semente");
        if (data.plantaId !== undefined) {
            const plant = await this.plantRepo.base.findById(data.plantaId);
            if (!plant) {
                throw new NotFoundError_1.NotFoundError("planta");
            }
            seed.planta = plant;
        }
        (0, data_filter_1.dataFilter)(seed, data);
        const seedUpdated = await this.repo.base.save(seed);
        return SeedMapper_1.SeedMapper.toResponse(seedUpdated);
    }
    async delete(id, loggedUserId) {
        const seed = await this.repo.findByIdWithRelations(id);
        if (!seed) {
            throw new NotFoundError_1.NotFoundError("semente");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(seed, loggedUserId, "semente");
        if (seed.plantacao) {
            throw new ConflictError_1.ConflictError({
                fields: ["semente"],
                info: "Não é possível excluir uma semente que está reservada para uma plantação",
                message: "Não é possível excluir uma semente que está reservada para uma plantação",
            });
        }
        const result = await this.repo.base.softDelete(id);
        if (result.affected === 0) {
            throw new InternalServerError_1.InternalServerError("Não foi possível deletar");
        }
        return result;
    }
}
exports.SeedService = SeedService;
