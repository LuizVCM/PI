"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerritoryService = void 0;
const InternalServerError_1 = require("../errors/InternalServerError");
const NotFoundError_1 = require("../errors/NotFoundError");
const TerritoryMapper_1 = require("../mappers/TerritoryMapper");
const TerritoryRepository_1 = require("../repositories/TerritoryRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const address_service_1 = require("../integrations/address-service");
const data_filter_1 = require("../utils/data-filter");
const AuthorizationService_1 = require("./AuthorizationService");
class TerritoryService {
    repo = new TerritoryRepository_1.TerritoryRepository();
    userRepo = new UserRepository_1.UserRepository();
    async listAll() {
        const territories = await this.repo.findAllWithUser();
        return TerritoryMapper_1.TerritoryMapper.toResponseList(territories);
    }
    async getById(id, loggedUserId) {
        const territory = await this.repo.findByIdWithRelations(id);
        if (!territory) {
            throw new NotFoundError_1.NotFoundError("território");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
        return TerritoryMapper_1.TerritoryMapper.toResponse(territory);
    }
    async listByUserLogged(userId) {
        const territories = await this.repo.findByUserIdWithRelations(userId);
        return TerritoryMapper_1.TerritoryMapper.toResponseList(territories);
    }
    async create(data, loggedUserId) {
        const user = await this.userRepo.base.findById(loggedUserId);
        if (!user) {
            throw new NotFoundError_1.NotFoundError("usuário");
        }
        const address = await (0, address_service_1.fetchAddress)(data.cep);
        const territoryData = {
            ...TerritoryMapper_1.TerritoryMapper.toCreateEntity(data),
            cidade: address.cidade,
            estado: address.estado,
            bairro: address.bairro,
            logradouro: address.logradouro,
        };
        const territory = await this.repo.create(territoryData, user);
        return TerritoryMapper_1.TerritoryMapper.toResponse(territory);
    }
    async update(id, data, loggedUserId) {
        const territory = await this.repo.findByIdWithUser(id);
        if (!territory) {
            throw new NotFoundError_1.NotFoundError("território");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
        const address = data.cep != null ? await (0, address_service_1.fetchAddress)(data.cep) : null;
        const territoryData = {
            ...TerritoryMapper_1.TerritoryMapper.toUpdateEntity(data),
            ...(address && {
                cep: address.cep,
                cidade: address.cidade,
                estado: address.estado,
                bairro: address.bairro,
                logradouro: address.logradouro,
            }),
        };
        (0, data_filter_1.dataFilter)(territory, territoryData);
        const territoryUpdated = await this.repo.base.save(territory);
        return TerritoryMapper_1.TerritoryMapper.toSummaryResponse(territoryUpdated);
    }
    async delete(id, loggedUserId) {
        const territory = await this.repo.findByIdWithUser(id);
        if (!territory) {
            throw new NotFoundError_1.NotFoundError("território");
        }
        AuthorizationService_1.AuthorizationService.ensureOwnership(territory, loggedUserId, "território");
        const result = await this.repo.base.softDelete(id);
        if (result.affected === 0) {
            throw new InternalServerError_1.InternalServerError("Não foi possível deletar");
        }
        return result;
    }
}
exports.TerritoryService = TerritoryService;
