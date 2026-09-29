"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropService = void 0;
const InternalServerError_1 = require("../errors/InternalServerError");
const NotFoundError_1 = require("../errors/NotFoundError");
const CropMapper_1 = require("../mappers/CropMapper");
const Crop_1 = require("../models/Crop");
const Seed_1 = require("../models/Seed");
const CropRepository_1 = require("../repositories/CropRepository");
const SeedRepository_1 = require("../repositories/SeedRepository");
const TerritoryRepository_1 = require("../repositories/TerritoryRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const data_filter_1 = require("../utils/data-filter");
const date_utils_1 = require("../utils/date-utils");
const AuthorizationService_1 = require("./AuthorizationService");
class CropService {
    repo = new CropRepository_1.CropRepository();
    userRepo = new UserRepository_1.UserRepository();
    territoryRepo = new TerritoryRepository_1.TerritoryRepository();
    seedRepo = new SeedRepository_1.SeedRepository();
    async listAll() {
        const crops = await this.repo.findAllWithRelations();
        return CropMapper_1.CropMapper.toResponseList(crops);
    }
    async getById(id, loggedUserId) {
        const crop = await this.repo.findByIdWithRelations(id);
        if (!crop) {
            throw new NotFoundError_1.NotFoundError("plantação");
        }
        AuthorizationService_1.AuthorizationService.ensureRelationActive(crop.territorio, "plantação", "território");
        AuthorizationService_1.AuthorizationService.ensureOwnership(crop.territorio, loggedUserId, "plantação");
        return CropMapper_1.CropMapper.toResponse(crop);
    }
    async listByUserLogged(userId) {
        const crops = await this.repo.findAllByUserId(userId);
        return CropMapper_1.CropMapper.toResponseList(crops);
    }
    async listByTerritoryId(territoryId, loggedUserId) {
        const territory = await this.territoryRepo.findByIdWithRelations(territoryId);
        if (!territory) {
            throw new NotFoundError_1.NotFoundError("território");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
        const crops = await this.repo.findByTerritoryId(territoryId);
        return CropMapper_1.CropMapper.toResponseList(crops);
    }
    async create(data, territoryId, loggedUserId) {
        const user = await this.userRepo.base.findById(loggedUserId);
        if (!user) {
            throw new InternalServerError_1.InternalServerError("Ocorreu um erro inesperado");
        }
        const territory = await this.territoryRepo.findByIdWithUser(territoryId);
        if (!territory) {
            throw new NotFoundError_1.NotFoundError("território");
        }
        AuthorizationService_1.AuthorizationService.ensureRelationActive(territory, "plantação", "território");
        AuthorizationService_1.AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
        const seed = await this.seedRepo.findByIdWithRelations(data.sementeId);
        if (!seed) {
            throw new NotFoundError_1.NotFoundError("cultura");
        }
        AuthorizationService_1.AuthorizationService.ensureRelationActive(seed, "plantação", "semente");
        AuthorizationService_1.AuthorizationService.ensureOwnership(seed, loggedUserId, "semente");
        const cropData = CropMapper_1.CropMapper.toCreateEntity(data, seed.planta);
        const crop = await this.repo.create(cropData, territory, seed);
        return CropMapper_1.CropMapper.toResponse(crop);
    }
    async update(id, data, loggedUserId) {
        const crop = await this.repo.findByIdWithRelations(id);
        if (!crop) {
            throw new NotFoundError_1.NotFoundError("plantação");
        }
        AuthorizationService_1.AuthorizationService.ensureRelationActive(crop.territorio, "plantação", "território");
        AuthorizationService_1.AuthorizationService.ensureOwnership(crop.territorio, loggedUserId, "território");
        // se vai trocar de semente
        const trocandoSemente = data.sementeId !== undefined && data.sementeId !== crop.sementes?.id;
        // valida e autoriza a nova semente antes de qualquer alteração
        let novaSeed = null;
        if (trocandoSemente) {
            novaSeed = await this.seedRepo.findByIdWithRelations(data.sementeId);
            if (!novaSeed) {
                throw new NotFoundError_1.NotFoundError("semente");
            }
            AuthorizationService_1.AuthorizationService.ensureRelationActive(novaSeed, "plantação", "semente");
            AuthorizationService_1.AuthorizationService.ensureOwnership(novaSeed, loggedUserId, "semente");
        }
        const cancelando = data.status === Crop_1.CropStatus.CANCELADA &&
            crop.status !== Crop_1.CropStatus.CANCELADA;
        return await this.repo.base
            .getRepository()
            .manager.transaction(async (manager) => {
            const seedRepo = manager.getRepository(Seed_1.Seed);
            const cropRepo = manager.getRepository(Crop_1.Crop);
            // desvincula a semente / cultura antiga
            if ((trocandoSemente || cancelando) && crop.sementes) {
                await seedRepo.save({ id: crop.sementes.id, plantacao: null });
            }
            // vincula a nova semente / cultura
            if (trocandoSemente && novaSeed) {
                await seedRepo.save({ id: novaSeed.id, plantacao: crop });
                crop.sementes = novaSeed;
            }
            if (cancelando) {
                crop.sementes = null;
            }
            if (data.dataPlantio) {
                const seedParaCalculo = novaSeed ?? crop.sementes;
                if (!seedParaCalculo?.planta) {
                    throw new InternalServerError_1.InternalServerError("Plantação sem semente associada");
                }
                const novaDataPlantio = new Date(data.dataPlantio);
                const cicloMedio = seedParaCalculo.planta.getCicloMedioDias();
                const novaPrevista = (0, date_utils_1.setHarvestForecast)(novaDataPlantio, cicloMedio);
                crop.dataPlantio = (0, date_utils_1.formateDateToString)(novaDataPlantio);
                crop.dataColheitaPrevista = (0, date_utils_1.formateDateToString)(novaPrevista);
            }
            else if (data.dataPlantio === null) {
                crop.dataPlantio = null;
                crop.dataColheitaPrevista = null;
            }
            else if (trocandoSemente && crop.dataPlantio && novaSeed?.planta) {
                // se trocou a semente sem mandar nova data, recalcula previsão
                const cicloMedio = novaSeed.planta.getCicloMedioDias();
                const novaPrevista = (0, date_utils_1.setHarvestForecast)(new Date(crop.dataPlantio), cicloMedio);
                crop.dataColheitaPrevista = (0, date_utils_1.formateDateToString)(novaPrevista);
            }
            if (data.dataColheitaReal) {
                const colheitaReal = new Date(data.dataColheitaReal);
                crop.dataColheitaReal = (0, date_utils_1.formateDateToString)(colheitaReal);
                if (new Date() >= colheitaReal) {
                    crop.status = Crop_1.CropStatus.CONCLUIDA;
                }
            }
            const { dataPlantio, dataColheitaReal, dataColheitaPrevista, status, sementes, ...cropData } = CropMapper_1.CropMapper.toUpdateEntity(data);
            (0, data_filter_1.dataFilter)(crop, cropData);
            const cropUpdated = await cropRepo.save(crop);
            return CropMapper_1.CropMapper.toSummaryResponse(cropUpdated);
        });
    }
    async delete(id, loggedUserId) {
        const crop = await this.repo.findByIdWithRelations(id);
        if (!crop)
            throw new NotFoundError_1.NotFoundError("plantação");
        AuthorizationService_1.AuthorizationService.ensureRelationActive(crop.territorio, "plantação", "território");
        AuthorizationService_1.AuthorizationService.ensureOwnership(crop.territorio, loggedUserId, "território");
        return await this.repo.base
            .getRepository()
            .manager.transaction(async (manager) => {
            if (crop.sementes) {
                await manager
                    .getRepository(Seed_1.Seed)
                    .save({ id: crop.sementes.id, plantacao: null });
            }
            const result = await manager.softDelete(Crop_1.Crop, id);
            if (result.affected === 0)
                throw new InternalServerError_1.InternalServerError("Não foi possível deletar");
            return result;
        });
    }
}
exports.CropService = CropService;
